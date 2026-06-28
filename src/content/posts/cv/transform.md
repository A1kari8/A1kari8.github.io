---
title: "[计算机视觉] 各类图像变换"
published: 2026-6-6 9:34:00
tags: [计算机视觉]
category: 计算机视觉
draft: false
---

## 相似变换

**形状保持不变**，只改变位置、大小和方向

$$
H_\text{similarity} = \begin{bmatrix}s \cdot \cos\theta & -s \cdot \sin\theta & t_x \\
s \cdot \sin\theta & s \cdot \cos\theta & t_y \\
0 & 0 & 1
\end{bmatrix}
$$

- $s$：缩放因子$s > 0$
- $\theta$：旋转角度
- $(t_x, t_y)$：平移向量

相似变换有4个自由度：1+1+2

## 仿射变换

**平行线保持不变**，但不保持形状，在相似变换的基础上增加了剪切操作

$$
H_\text{affine} = \begin{bmatrix}a & b & t_x \\
c & d & t_y \\
0 & 0 & 1
\end{bmatrix}
$$

- $a, b, c, d$：线性变换矩阵的元素，包含缩放、旋转和剪切信息
- $(t_x, t_y)$：平移向量

当$a = d = s\cos\theta$且$b = -c = -s\sin\theta$时，仿射变换退化为相似变换

仿射变换有6个自由度：4+2

## 单应变换/投影变换/透视变换

**直线保持不变**，但不保持平行线，在仿射变换的基础上增加了透视效果

$$
H_\text{homography} = \begin{bmatrix}h_{11} & h_{12} & h_{13} \\
h_{21} & h_{22} & h_{23} \\
h_{31} & h_{32} & h_{33}
\end{bmatrix}
$$

通常将$h_{33}$归一化为1，所以单应变换有8个自由度：9-1

当$h_{31} = h_{32} = 0$且$h_{33}$已归一化时，单应变换退化为仿射变换

## 最小二乘拟合求单应矩阵

现在我们有一对点$(x, y)$和$(x', y')$，以及单应矩阵$H$，满足：

$$
\omega\begin{bmatrix}x' \\ y' \\ 1\end{bmatrix} = H \begin{bmatrix}x \\ y \\ 1\end{bmatrix}
$$

> $\omega$是一个缩放因子，因为$h_{33}$不一定归一化为1

展开后得到：

$$
\begin{cases}
\omega x' = h_{11}x + h_{12}y + h_{13} \\
\omega y' = h_{21}x + h_{22}y + h_{23} \\
\omega = h_{31}x + h_{32}y + h_{33}
\end{cases}
$$

整理一下：

$$
\begin{cases}
h_{11}x + h_{12}y + h_{13} - h_{31}xx' - h_{32}yy' - h_{33}x' = 0 \\
h_{21}x + h_{22}y + h_{23} - h_{31}xy' - h_{32}yy' - h_{33}y' = 0
\end{cases}
$$

可以写成矩阵形式了：

$$
\begin{bmatrix}
x & y & 1 & 0 & 0 & 0 & -xx' & -yx' & -x' \\
0 & 0 & 0 & x & y & 1 & -xy' & -yy' & -y'
\end{bmatrix}
\begin{bmatrix}h_{11} \\ h_{12} \\ h_{13} \\ h_{21} \\ h_{22} \\ h_{23} \\ h_{31} \\ h_{32} \\ h_{33}\end{bmatrix} = \mathbf{0}
$$

由于单应矩阵有8个自由度，从上述矩阵可以看到一对点提供了两行约束，所以至少需要4对点才能求解单应矩阵

> 实际实现中通常使用更多的点来构建一个过约束的系统，然后通过最小二乘法来求解单应矩阵，以提高鲁棒性和精度

所以得到$n$对点后可以写出：

$$
\mathbf{A} = \begin{bmatrix}
x_1 & y_1 & 1 & 0 & 0 & 0 & -x_1x_1' & -y_1x_1' & -x_1' \\
0 & 0 & 0 & x_1 & y_1 & 1 & -x_1y_1' & -y_1y_1' & -y_1' \\
x_2 & y_2 & 1 & 0 & 0 & 0 & -x_2x_2' & -y_2x_2' & -x_2' \\
0 & 0 & 0 & x_2 & y_2 & 1 & -x_2y_2' & -y_2y_2' & -y_2' \\
\vdots & \vdots & \vdots & \vdots & \vdots & \vdots & \vdots & \vdots & \vdots \\
x_n & y_n & 1 & 0 & 0 & 0 & -x_nx_n' & -y_nx_n' & -x_n' \\
0 & 0 & 0 & x_n & y_n & 1 & -x_ny_n' & -y_ny_n' & -y_n'
\end{bmatrix}
$$

得到：

$$
\mathbf{A} \mathbf{h} = \mathbf{0}
$$

为避免解出$\mathbf{h} = \mathbf{0}$的平凡解，通常会添加约束条件$\|\mathbf{h}\| = 1$

### 将问题形式化

$$
\begin{aligned}
\underset{\mathbf{h}}{\min} \|\mathbf{A} \mathbf{h}\|^2 \quad \text{subject to} \quad \|\mathbf{h}\| = 1
\end{aligned}
$$

### 拉格朗日乘数法

构造拉格朗日函数：

$$
\begin{aligned}
\mathcal{L}(\mathbf{h}, \lambda) &= \|\mathbf{A} \mathbf{h}\|^2 - \lambda (\|\mathbf{h}\|^2 - 1) \\[1em]
&= \mathbf{h}^T \mathbf{A}^T \mathbf{A} \mathbf{h} - \lambda (\mathbf{h}^T \mathbf{h} - 1)
\end{aligned}
$$

对$\mathbf{h}$求导并设置为零：

$$
\begin{aligned}
\frac{\partial \mathcal{L}}{\partial \mathbf{h}} = 2 \mathbf{A}^T \mathbf{A} \mathbf{h} - 2 \lambda \mathbf{h} &= \mathbf{0} \\[1em]
\mathbf{A}^T \mathbf{A} \mathbf{h} &= \lambda \mathbf{h}
\end{aligned}
$$

所以解$\mathbf{h}$是矩阵$\mathbf{A}^T \mathbf{A}$的特征向量，对应的特征值为$\lambda$

由于我们要最小化$\|\mathbf{A} \mathbf{h}\|^2$，也就是最小化$\mathbf{h}^T \mathbf{A}^T \mathbf{A} \mathbf{h}$，对特征方程变形一下：

$$
\begin{aligned}
\mathbf{h}^T \mathbf{A}^T \mathbf{A} \mathbf{h} &= \lambda \mathbf{h}^T \mathbf{h} \qquad (\text{约束}\|\mathbf{h}\| = 1) \\[1em]
&= \lambda
\end{aligned}
$$

所以取$\min \lambda$(最小特征值)对应的特征向量$\mathbf{h}$(9x1)，并将其重塑(`np.reshape`)为3x3矩阵，即为求解得到的单应矩阵$H$
