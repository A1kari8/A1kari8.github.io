---
title: "[模式识别与机器学习] 贝叶斯学习"
published: 2026-6-26 19:37:00
tags: [模式识别, 机器学习]
category: 大学计算机
draft: false
---

>[!NOTE]
> $\sigma(z) = \dfrac{1}{1 + e^{-z}} \qquad \text{Sigmoid}$

## Logistic回归(以二分类为例)

> 直接学习$P(\omega_i | \mathbf{x})$

输出的不是类别标签而是一个概率值，表示输入样本属于某个类的概率。使用Sigmoid函数将线性判别函数的输出映射到(0, 1)区间：

$$
\begin{aligned}
P(y=1|\mathbf{x}) &= \sigma(\mathbf{w}^T \mathbf{x}) = \dfrac{1}{1 + e^{-\mathbf{w}^T \mathbf{x}}} \\
P(y=0|\mathbf{x}) &= 1 - P(y=1|\mathbf{x}) \\ &= \dfrac{e^{-\mathbf{w}^T \mathbf{x}}}{1 + e^{-\mathbf{w}^T \mathbf{x}}}
\end{aligned}
$$

- $y$：类别标签，取值为0或1
- $\sigma(z)$：Sigmoid函数，将输入映射到(0, 1)区间
- $\mathbf{w}$：增广权重向量，包含偏置项

如果概率大于0.5，则预测为正类，否则预测为负类。

Logistic回归的损失函数：

$$
J(\mathbf{w}) = -\log P(y|\mathbf{x}; \mathbf{w}) = -\log \sigma((2y-1)\mathbf{w}^T \mathbf{x})
$$

从输出中选取真实类别对应的概率值，取负对数，为了能够求导，采用one-hot编码表示类别标签：

$$
\mathbf{y} = \begin{bmatrix}y_1 \\ y_2\end{bmatrix} = \begin{bmatrix}1 \\ 0\end{bmatrix} \text{或} \begin{bmatrix}0 \\ 1\end{bmatrix}
$$

$$
J(\mathbf{w}) = -\sum_{i=1}^c y_i \log P(y_i|\mathbf{x}; \mathbf{w})
$$

- $c$：类别数，对于二分类问题，$c=2$

前面二分类的损失函数就是one-hot的其中一种情况

<!-- ## 参数估计 -->
