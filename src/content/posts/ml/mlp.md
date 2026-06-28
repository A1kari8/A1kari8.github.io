---
title: "[模式识别与机器学习] 多层感知机"
published: 2026-6-25 19:27:00
tags: [模式识别, 机器学习]
category: 模式识别与机器学习
draft: false
---

## 常见的损失函数

### 均方误差损失函数

$$
J(\theta) = \frac{1}{2m} \sum_{i=1}^m \| h_\theta(\mathbf{x}^{(i)}) - \mathbf{y}^{(i)} \|^2
$$

- $h_\theta(\mathbf{x}^{(i)})$：模型预测值
- $\mathbf{y}^{(i)}$：真实值
- $m$：样本数量
- $\theta$：模型参数

### L1范数损失函数

$$
J(\theta) = \frac{1}{m} \sum_{i=1}^m \| h_\theta(\mathbf{x}^{(i)}) - \mathbf{y}^{(i)} \|_1
$$

### 交叉熵损失

#### 二分类交叉熵损失函数BCE

定义$z=h_\theta(\mathbf{x})$，$z$是$\mathbf{x}$属于正类的评分

使用sigmoid函数将评分映射到概率空间：

$$
p = \sigma(z) = \frac{1}{1 + e^{-z}}
$$

则$P(y=1|\mathbf{x}) = p$，$P(y=0|\mathbf{x}) = 1-p$

所以：

$$
P(y|\mathbf{x}) = \begin{cases}
\sigma(z), \quad y = 1 \\
1 - \sigma(z), \quad y = 0
\end{cases}
$$

因为$1-\sigma(z) = \sigma(-z)$，所以可以统一表示为：

$$
\begin{aligned}
P(y|\mathbf{x}) &= \sigma(zy + (1-y)(-z)) \\
&= \sigma((2y-1)z)
\end{aligned}
$$

则损失函数为：

$$
J(\theta) = -\log P(y|\mathbf{x}) = -\log \sigma((2y-1)z)
$$

#### 多分类交叉熵损失函数CE

Softmax函数将评分映射到概率空间：

$$
\begin{aligned}
p_i = \dfrac{e^{z_i}}{\sum_{j=1}^c e^{z_j}}
\end{aligned}
$$

- $c$：类别数
- $z_i$：样本属于第$i$类的评分

实际上为了数值稳定性，通常使用$\log \text{softmax}$来计算交叉熵损失，即：

$$
J(\theta) = -\log p_y = -\log \frac{e^{z_y}}{\sum_{j=1}^c e^{z_j}} = -z_y + \log \sum_{j=1}^c e^{z_j} \qquad \text{第y类的损失}
$$

## 最大均值差异MMD

通过将样本映射到高维特征空间，计算不同分布的均值差异来衡量分布之间的差异。

$$
\text{MMD}^2(p, q) = \sup_{\|f\| \leq 1} \left( \mathbb{E}_{x \sim p}[f(x)] - \mathbb{E}_{y \sim q}[f(y)] \right)
$$

- $p$：分布$p$的样本
- $q$：分布$q$的样本
- $f$：在特征空间中的函数，满足$\|f\| \leq 1$，通常使用核函数来定义特征空间
- $\mathbb{E}$：期望操作，表示对样本的平均值
- sup：上确界，表示在所有满足条件的函数中取最大的值
