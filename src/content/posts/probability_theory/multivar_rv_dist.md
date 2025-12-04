---
title: "[工科概率论] 多维随机变量及其分布"
published: 2025-11-23 19:52:00
tags: [概率论,数学]
category: 概率论
---

应该是只考察二维的

## 定义

设$(X, Y)$为二维随机变量，$x,y$为任意实数，记事件$\left \{ X \le x \right \}$与$\left \{ Y \le y \right \}$的交为$\left \{ X \le x, Y \le y \right \}$，则二元函数

$$
F(x,y) = P\left ( X \le x, Y \le y \right )
$$

称为$(X, Y)$的**分布函数**，或称为$X$与$Y$的**联合分布函数**

## 边缘分布函数

设$(X, Y)$为二维随机变量，$F(x,y)$为其联合分布函数，则称
$$
F_X(x) = \lim_{y \to +\infty} F(x,y)
$$
为$X$的**边缘分布函数**，称
$$
F_Y(y) = \lim_{x \to +\infty} F(x,y)
$$
为$Y$的**边缘分布函数**

## 二维离散型随机变量

若二维随机变量$(X, Y)$所有可能取值$(x_i, y_j)$是有限个或可列无穷多个，则称$(X, Y)$为**二维离散型随机变量**

### 二维离散型rv的分布列

$$
p_{ij} = P(X = x_i, Y = y_j)
$$

$p_{ij}$称为$(X, Y)$的**分布列**或**联合分布列**

### 二维离散型rv的分布函数

$$
\large F(x,y) = P(X \le x, Y \le y) = \sum_{x_i \le x} \sum_{y_j \le y} p_{ij}
$$

### 二维离散型rv的边缘分布列

$$
P(X = x_i) = P(X = x_i, \bigcup_{j = 1}^{\infty} (Y = y_j)) = \sum_{j = 1}^{\infty} p_{ij} = p_{i \cdot}
$$

同理，$\large P(Y = y_j) = \sum_{i = 1}^{\infty} p_{ij} = p_{\cdot j}$

分布列表格：

| $X \backslash Y$ | $y_1$ | $y_2$ | $\cdots$ | $y_j$ | $\cdots$ |  $p_{i \cdot}$ |
|------------------|-------|-------|----------|-------|----------|----------------|
| $x_1$            | $p_{11}$ | $p_{12}$ | $\cdots$ | $p_{1j}$ | $\cdots$ | $p_{1 \cdot}$ |
| $x_2$            | $p_{21}$ | $p_{22}$ | $\cdots$ | $p_{2j}$ | $\cdots$ | $p_{2 \cdot}$ |
| $\vdots$         | $\vdots$ | $\vdots$ | $\ddots$  | $\vdots$ | $\ddots$  | $\vdots$ |
| $x_i$            | $p_{i1}$ | $p_{i2}$ | $\cdots$ | $p_{ij}$ | $\cdots$ | $p_{i \cdot}$ |
| $\vdots$         | $\vdots$ | $\vdots$ | $\ddots$  | $\vdots$ | $\ddots$  | $\vdots$ |
| $p_{\cdot j}$    | $p_{\cdot 1}$ | $p_{\cdot 2}$ | $\cdots$ | $p_{\cdot j}$ | $\cdots$ | 1 |
