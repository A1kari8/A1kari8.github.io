---
title: "[计算机视觉] Harris哈里斯角点检测"
published: 2026-6-6 10:36:00
tags: [计算机视觉]
category: 计算机视觉
draft: false
---

## 基本思想

想象一个小窗口在图像上滑动，可以分为三种情况：

1. 窗口在大面积像素值相近的平坦区域：无论怎么移动，窗口内的像素值变化都很小
2. 窗口在平直边缘上：沿着边缘方向移动，像素值变化很小；垂直于边缘方向移动，像素值变化很大
3. 窗口在角点上：无论怎么移动，窗口内的像素值变化都很大

所以我们只要找到无论怎么移动窗口，像素值变化都很大的点，也就是像素值变化量的最小值大于一个阈值的点，就可以认为它是一个角点

## 推导

假设窗口每次移动$(u, v)$，窗口内像素值的变化可以用平方差之和来表示为：

$$
E(u, v) = \sum_{x, y} [I(x + u, y + v) - I(x, y)]^2
$$

- $I(x, y)$：图像在点$(x, y)$的像素值，后续简写为$I_x$和$I_y$

因为$u$和$v$很小，所以可以使用泰勒展开来近似$I(x + u, y + v)$：

$$
\begin{aligned}
I(x + u, y + v) &\approx I(x, y) + I_x \cdot u + I_y \cdot v \\[1em]
&= I(x, y) + \begin{bmatrix}I_x & I_y\end{bmatrix} \begin{bmatrix}u \\ v\end{bmatrix}
\end{aligned}
$$

- $I_x$和$I_y$：图像在点$(x, y)$的水平和垂直方向的梯度

所以：

$$
\begin{aligned}
E(u, v) &\approx \sum_{x, y} \left (\begin{bmatrix}I_x & I_y\end{bmatrix} \begin{bmatrix}u \\ v\end{bmatrix}\right )^2
 \\[1em]
&= \sum_{x, y} \left(\begin{bmatrix}I_x & I_y\end{bmatrix} \begin{bmatrix}u \\ v\end{bmatrix} \right )^T \left(\begin{bmatrix}I_x & I_y\end{bmatrix} \begin{bmatrix}u \\ v\end{bmatrix} \right ) \\[1em]
&= \sum_{x, y} \begin{bmatrix}u & v\end{bmatrix} \begin{bmatrix}I_x^2 & I_x I_y \\ I_x I_y & I_y^2\end{bmatrix} \begin{bmatrix}u \\ v\end{bmatrix} \\[1em]
\end{aligned}
$$

给中间矩阵取个名字：

$$
H = \begin{bmatrix}I_x^2 & I_x I_y \\ I_x I_y & I_y^2\end{bmatrix}
$$

为了防止解出$u=v=0$的平凡解，所以设置约束$\Vert \mathbf{d}\Vert^2 = u^2 + v^2 = 1$，所以就转化为求解如下问题：

$$
\underset{\Vert \mathbf{d} \Vert^2 = 1}{\text{min}} \quad \mathbf{d}^T H \mathbf{d}
$$

### 构造拉格朗日函数

$$
\begin{aligned}
\mathcal{L}(\mathbf{d}, \lambda) &= \mathbf{d}^T H \mathbf{d} - \lambda (\mathbf{d}^T \mathbf{d} - 1) \\[1em]
&= u^2 H_{11} + 2 u v H_{12} + v^2 H_{22} - \lambda (u^2 + v^2 - 1)
\end{aligned}
$$

对$u$求导并设置为零：

$$
\begin{aligned}
\frac{\partial \mathcal{L}}{\partial u} = 2 u H_{11} + 2 v H_{12} - 2 \lambda u &= 0 \\[1em]
u H_{11} + v H_{12} &= \lambda u
\end{aligned}
$$

对$v$求导并设置为零：

$$
\begin{aligned}
\frac{\partial \mathcal{L}}{\partial v} = 2 u H_{12} + 2 v H_{22} - 2 \lambda v &= 0 \\[1em]
u H_{12} + v H_{22} &= \lambda v
\end{aligned}
$$

得到方程组：

$$
\begin{cases}
u H_{11} + v H_{12} = \lambda u \\
u H_{12} + v H_{22} = \lambda v
\end{cases}
$$

可以写成矩阵形式：

$$
\begin{aligned}
\begin{bmatrix}
H_{11} & H_{12} \\
H_{12} & H_{22}
\end{bmatrix}
\begin{bmatrix}u \\
v\end{bmatrix} &=
\lambda \begin{bmatrix}u \\ v\end{bmatrix} \\[1em]
H \mathbf{d} &= \lambda \mathbf{d}
\end{aligned}
$$

后续步骤跟单应矩阵那块类似，先同左乘$d^T$，得到：

$$
\mathbf{d}^T H \mathbf{d} = \lambda \mathbf{d}^T \mathbf{d} = \lambda \qquad (\text{约束}\Vert \mathbf{d} \Vert^2 = 1)
$$

所以最小化$\mathbf{d}^T H \mathbf{d}$等价于最小化$\lambda$，如果这个最小特征值大于一个**阈值**，就认为这个点是一个角点，但是这种方法需要计算特征值，比较麻烦，所以Harris提出了一个角点响应函数来避免计算特征值

## 角点响应函数

$$
R = \text{det}(H) - k \cdot \text{trace}(H)^2
$$

- $\lambda_1,\lambda_2$：$H$的两个特征值
- $\text{det}(H) = \lambda_1 \lambda_2$：特征值的乘积，表示窗口内像素值变化的程度
- $\text{trace}(H) = \lambda_1 + \lambda_2$：特征值的和，表示窗口内像素值变化的总量
- $k$：经验参数，通常取0.04到0.06之间

当处于角点，$\lambda_1$和$\lambda_2$都较大且相当，此时乘积会远大于和的平方，所以$R$为很大的正值；当处于边缘，$\lambda_1$和$\lambda_2$其中一个较大的另一个较小，此时乘积会小于和的平方，所以$R$为很小的负值；当平坦区域，$\lambda_1$和$\lambda_2$其中一个较大另一个较小，此时乘积和和的平方相差不大，所以$R$会接近于零

$$
\begin{cases}
R \gg 0 & \text{角点} \\
R \ll 0 & \text{边缘} \\
R \approx 0 & \text{平坦区域}
\end{cases}
$$
