---
title: "[人工智能数学基础] 上下采样矩阵"
published: 2026-4-19 10:00:00
tags: [人工智能数学基础, 数学, 线性代数]
category: 人工智能数学基础
draft: false
---

## 上采样矩阵

增加原向量的维度，插入零元素：

$$
x = \begin{bmatrix} x_1 \\ x_2  \end{bmatrix} \quad \rightarrow \quad
U = \begin{bmatrix} 1 & 0  \\
 0 & 0 \\
 0 & 1 \\
 0 & 0 \end{bmatrix} \quad \rightarrow \quad
Ux = \begin{bmatrix} x_1 \\ 0 \\ x_2 \\ 0 \end{bmatrix}
$$

## 下采样矩阵

减少原向量的维度，丢弃元素：

$$
x = \begin{bmatrix} x_1 \\ x_2 \\ x_3 \\ x_4 \end{bmatrix} \quad \rightarrow \quad
D = \begin{bmatrix} 1 & 0 & 0 & 0 \\
 0 & 0 & 1 & 0 \end{bmatrix} \quad \rightarrow \quad
Dx = \begin{bmatrix} x_1 \\ x_3 \end{bmatrix}
$$

## 上下采样矩阵的性质

根据上面两个例子，可以发现：

$$
U = D^T \\
DU = I \\
D \text{是}U\text{的左逆矩阵}
$$
