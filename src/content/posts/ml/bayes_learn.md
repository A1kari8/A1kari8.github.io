---
title: "[模式识别与机器学习] 贝叶斯学习"
published: 2026-6-26 19:37:00
tags: [模式识别, 机器学习]
category: 模式识别与机器学习
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

## 参数估计和非参数估计

|比较方面|参数估计|非参数估计|
|---|---|---|
|模型假设|假设数据服从某种分布，参数是未知的|不假设数据服从某种分布|
|模型复杂度|模型复杂度固定，参数个数有限|模型复杂度随数据量增加而增加，参数个数可能无限|
|数据需求|需要较少的数据来估计参数|需要大量的数据来估计分布|
|计算复杂度|计算复杂度较低|计算复杂度较高|
|泛化能力|可能存在模型偏差，如果假设不成立，泛化能力较差|泛化能力较好，能够适应复杂的数据分布|

### 常见的参数估计方法

- 极大似然估计(MLE)：通过最大化似然函数来估计参数。
- 矩估计：通过样本矩来估计参数。
- 贝叶斯估计：通过先验分布和观测数据来估计参数。

### 常见的非参数估计方法

- 核密度估计(KDE)：通过核函数对样本进行平滑，估计概率密度函数。
- 经验分布函数(EDF)：通过样本的经验分布来估计总体分布。

#### Parzen窗核密度估计

> 窗口固定，密集处样本多，稀疏处样本少

先固定窗口宽度$h$，然后对每个样本点$\mathbf{x}_i$，在其周围放置一个核函数$K(\cdot)$，计算所有核函数的平均值作为估计的概率密度函数：

$$
\hat{p}(\mathbf{x}) = \frac{1}{n h} \sum_{i=1}^{n} K\left(\frac{\mathbf{x} - \mathbf{x}_i}{h}\right)
$$

- $K(\cdot)$：核函数，决定每个样本的贡献值
- $h$：窗口宽度，一维就是长度，二维就是正方形的边长，...

#### K近邻密度估计(KNN)

> 窗口大小自动变化，稀疏处扩大，密集处缩小

在样本中寻找距离输入样本$\mathbf{x}$最近的$k$个样本点，计算这些样本点覆盖的区域体积$V$，然后估计概率密度函数为：

$$
\hat{p}(\mathbf{x}) = \frac{k}{n V}
$$

- $V$：「体积」在一维中就是长度，二维中就是面积，三维中就是体积。
