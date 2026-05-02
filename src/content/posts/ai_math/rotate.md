---
title: "[人工智能数学基础] 快速写出旋转矩阵"
published: 2026-4-25 14:28:00
tags: [人工智能数学基础, 数学, 线性代数]
category: 人工智能数学基础
draft: false
---

## 旋转方向

> 常见的都是右手坐标系

右手螺旋定则：大拇指指向旋转轴的正方向时，四指弯曲的方向就是旋转的正方向

也就是从旋转轴正方向看去的**逆时针**为正($\theta > 0$)

## 二维旋转矩阵

只需先写出二维空间的正交基：

$$
\mathbf{e_1} = \begin{bmatrix}1 \\ 0\end{bmatrix}, \quad \mathbf{e_2} = \begin{bmatrix}0 \\ 1\end{bmatrix}
$$

然后将它们分别旋转$\theta$角度，得到新的基：

$$
\mathbf{e_1'} = \begin{bmatrix}\cos \theta \\ \sin \theta\end{bmatrix}, \quad \mathbf{e_2'} = \begin{bmatrix}-\sin \theta \\ \cos \theta\end{bmatrix}
$$

最后将新的基按列拼成矩阵：

$$
R = \begin{bmatrix}\cos \theta & -\sin \theta \\ \sin \theta & \cos \theta\end{bmatrix}
$$

## 三维(以及更高维)旋转矩阵

> 只是二维旋转的推广

只需保持未旋转的基不变，另外两个被旋转的基的「旋转轴上的分量」为0即可

e.g.: 绕$z$轴旋转$\theta$角度：

此时「旋转轴上的分量」就是$z$轴上的分量，所以$\mathbf{e_3}$不变，$\mathbf{e_1}$和$\mathbf{e_2}$的$z$轴分量为0：

$$
R_z = \begin{bmatrix}\cos \theta & -\sin \theta & 0 \\ \sin \theta & \cos \theta & 0 \\ 0 & 0 & 1\end{bmatrix}
$$
