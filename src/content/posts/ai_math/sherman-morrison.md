---
title: "[人工智能数学基础] Sherman-Morrison公式及其变体"
published: 2026-4-22 16:03:00
tags: [人工智能数学基础, 数学, 线性代数]
category: 人工智能数学基础
draft: false
---

假设我们刚刚算完一个巨大的矩阵$A$的逆矩阵$A^{-1}$，但现在$A$被加上了一个秩为1的微扰(一个向量外积$uv^T$)，Sherman-Morrison公式让我们可以基于$A^{-1}$快速计算出新的矩阵$(A + uv^T)^{-1}$的逆矩阵，而不需要重新计算整个逆矩阵

## Sherman-Morrison恒等式

$$
(A + uv^T)^{-1} = A^{-1} - \frac{A^{-1}uv^TA^{-1}}{1 + v^TA^{-1}u}
$$

前提条件是$1 + v^TA^{-1}u \neq 0$，否则新的矩阵将不可逆(很明显分母不能为零)

## Sherman-Morrison-Woodbury恒等式

$A$为$d \times d$的可逆矩阵，若$U$和$V$分别是$d \times k$和$d \times k$的矩阵，$k$为较小的值时：

$$
(A + UV^T)^{-1} = A^{-1} - A^{-1}U(I + V^TA^{-1}U)^{-1}V^TA^{-1}
$$

前提条件是$I + V^TA^{-1}U$必须可逆
