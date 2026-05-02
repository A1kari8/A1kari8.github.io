---
title: "[人工智能数学基础] 秩-零度化定理"
published: 2026-4-25 14:08:00
tags: [人工智能数学基础, 数学, 线性代数]
category: 人工智能数学基础
draft: false
---

## 秩-零度化定理

设$A$是一个$m \times n$的矩阵，则有：

$$\text{rank}(A) + \text{nullity}(A) = n$$

## 一些相关性质

$$
\text{rank}(A) = \text{行空间维度} = \text{列空间维度}
$$

### 行空间和零空间是正交补

> 列空间不是

$$
A\mathbf{x} = 0 \quad \text{当且仅当} \quad \mathbf{x} \in \text{零空间}
$$

由此可得$A$的零空间中每个向量$\mathbf{x}$都会与$A$的行空间中的每个向量$\mathbf{a}_i$满足：

$$
\mathbf{a}_i^T \mathbf{x} = 0
$$

内积得0说明它们是正交的

:::note

左零空间和列空间是正交补

$$
\mathbf{y}^T A = \mathbf{0} \quad \text{当且仅当} \quad \mathbf{y} \in \text{左零空间}
$$

:::
