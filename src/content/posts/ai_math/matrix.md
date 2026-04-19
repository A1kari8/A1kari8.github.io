---
title: "[人工智能数学基础] 一些矩阵基本概念"
published: 2026-4-18 14:14:00
tags: [人工智能数学基础, 数学, 线性代数, 矩阵]
category: 人工智能数学基础
draft: false
---


## 秩(Rank)

> *矩阵的维数*

线性无关的行或列的最大数量

计算方法：

- 高斯消元法：通过行变换将矩阵化为行阶梯形，非零行的数量即为秩
- 奇异值分解(SVD)：矩阵的秩等于其非零奇异值的数量
- 行列式：对于方阵，如果行列式不为零，则秩等于矩阵的大小；如果行列式为零，则秩小于矩阵的大小

## 迹(Trace)

> *矩阵的能量*

矩阵对角线元素的和：

$$\text{tr}(A) = \sum_{i=1}^n a_{ii}$$

迹的性质：

- 轮换不变性：$\text{tr}(AB) = \text{tr}(BA)$
- 线性：$\text{tr}(A + B) = \text{tr}(A) + \text{tr}(B)$，$\text{tr}(\alpha A) = \alpha \text{tr}(A)$
- $\text{tr}(A^*) = \overline{\text{tr}(A)}$，其中$A^*$是$A$的共轭转置

## 共轭矩阵

共轭矩阵是指矩阵元素取共轭复数后的矩阵，记为$A^*$或$\overline{A}$：

$$\overline{A} = [\overline{a_{ij}}]$$

如果$A$是实数矩阵，则$\overline{A} = A$

## 共轭转置矩阵(也成为伴随或埃尔米特共轭)

> 此「伴随」和线性代数课里的「伴随矩阵」不是一个概念

共轭转置矩阵是指先取共轭矩阵再转置(其实先后都一样)的矩阵，记为$A^H$或$A^*$：

$$A^* = \overline{A}^T$$

如果$A$是实数矩阵，则$A^* = A^T$

若$A^* = A$，则称$A$为埃尔米特矩阵(也称自伴矩阵)，其特征值为实数

若$A^* = -A$，则称$A$为斜(反)埃尔米特矩阵，其特征值为纯虚数或0

## 酉(Unitary)矩阵

$U$是酉矩阵当且仅当$U^* U = U U^* = I$

性质:

- $U^{-1} = U^*$

## 实正交(Real Orthogonal)矩阵(酉矩阵的特殊情况)

$A$是正交矩阵当且仅当$A^T A = I$

性质:

- $A^{-1} = A^T$

## 正规(Normal)矩阵

$A$是正规矩阵当且仅当$A^* A = A A^*$

## 正定矩阵

$A$是正定矩阵当且仅当对于所有非零向量$x$，有$x^* A x > 0$

## 半正定矩阵

$A$是半正定矩阵当且仅当对于所有向量$x$，有$x^* A x \geq 0$

## 对合(Involution)矩阵

$A$是对合矩阵当且仅当$A^2 = I$

## 幂等(Idempotent)矩阵

$A$是幂等矩阵当且仅当$A^2 = A$

## 摩尔-彭若斯(Moore-Penrose)伪逆矩阵

方程$AX = B$无解时，$A$的伪逆$A^\dagger$可以提供一个最小二乘解：

$$
A^\dagger = (A^* A)^{-1} A^* \quad \text{(当$A$列满秩时)} \\
X = A^\dagger B
$$

条件：

- $AA^\dagger A = A$
- $A^\dagger A A^\dagger = A^\dagger$
- $(AA^\dagger)^T = AA^\dagger$
- $(A^\dagger A)^T = A^\dagger A$

## Gram矩阵

每个元素是两个向量的内积

$$ G = A^* A $$

性质:

- 是埃尔米特矩阵
- 是半正定矩阵
- $G$可逆 $\Leftrightarrow$ $A$列满秩(线性无关)
