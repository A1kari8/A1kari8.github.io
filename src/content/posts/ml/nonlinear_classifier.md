---
title: "[模式识别与机器学习] 非线性分类器"
published: 2026-6-17 17:33:00
tags: [模式识别, 机器学习]
category: 大学计算机
draft: false
---

## 距离函数

### 欧氏距离

$$
d(\mathbf{x}, \mathbf{y}) = \sqrt{\sum_{i=1}^n (x_i - y_i)^2}
$$

### 曼哈顿距离

$$
d(\mathbf{x}, \mathbf{y}) = \sum_{i=1}^n |x_i - y_i|
$$

### 明氏距离

$$
d(\mathbf{x}, \mathbf{y}) = \left( \sum_{i=1}^n |x_i - y_i|^p \right)^{1/p}
$$

### 马氏距离

$$
d(\mathbf{x}, \mathbf{y}) = \sqrt{(\mathbf{x} - \mathbf{y})^T \mathbf{\Sigma}^{-1} (\mathbf{x} - \mathbf{y})}
$$

- $\mathbf{\Sigma}$：协方差矩阵，反映数据的分布和相关性
- $\mathbf{\Sigma}=\mathbf{I}$ 时，马氏距离退化为欧氏距离
- Cholesky分解：$\mathbf{\Sigma} = \mathbf{L}\mathbf{L}^T$，$\mathbf{L}^{-1}\mathbf{x}$ 的欧氏距离等价于 $\mathbf{x}$ 的马氏距离

### 海明距离

$$
d(\mathbf{x}, \mathbf{y}) = \sum_{i=1}^n \delta(x_i, y_i)
$$

其中 $\delta(x_i, y_i)$ 是一个指示函数，当 $x_i \neq y_i$ 时为 1，否则为 0。

### 角度相似函数

$$
d(\mathbf{x}, \mathbf{y}) = \frac{\mathbf{x}^T\mathbf{y}}{\|\mathbf{x}\| \|\mathbf{y}\|}
$$

## 最近邻分类器

### k-最近邻算法

对于一个新的输入样本，找到训练集中距离最近的k个样本，根据这k个样本的类别进行投票，决定新样本的类别。

$k=1$ 时，称为最近邻分类器，边界复杂易受噪声影响。$k$较大时，边界更平滑但可能丢失细节。

#### Voronoi网格

将输入空间划分为若干个区域，每个区域对应一个训练样本，区域内的所有点都被分类为该样本的类别。Voronoi网格的边界就是最近邻分类器的决策边界。

## 多层感知机(MLP)

### 反向传播算法

设输入层有 $n$ 个神经元，隐藏层有 $h$ 个神经元，输出层有 $m$ 个神经元。

我们需要得到第$i$层的梯度$\frac{\partial J}{\partial \mathbf{W}^{(i)}}$，其中 $J$ 是损失，$\mathbf{W}^{(i)}$ 是第$i$层的权重。

根据链式法则：

$$
\frac{\partial J}{\partial \mathbf{W}^{(i)}} = \frac{\partial J}{\partial \mathbf{z}^{(i)}} \cdot \frac{\partial \mathbf{z}^{(i)}}{\partial \mathbf{W}^{(i)}}
$$

$\mathbf{z}^{(i)}$ 是第$i$层的线性输出，$\mathbf{z}^{(i)} = \mathbf{W}^{(i)} \mathbf{a}^{(i-1)} + \mathbf{b}^{(i)}$，其中 $\mathbf{a}^{(i-1)}$ 是第$i-1$层的激活输出（也是第$i$层的输入）。

所以：

$$
\frac{\partial \mathbf{z}^{(i)}}{\partial \mathbf{W}^{(i)}} = \mathbf{a}^{(i-1)}
$$

则：

$$
\frac{\partial J}{\partial \mathbf{W}^{(i)}} = \frac{\partial J}{\partial \mathbf{z}^{(i)}} \cdot \mathbf{a}^{(i-1)}
$$

$\dfrac{\partial J}{\partial \mathbf{z}^{(i)}}$被称作第$i$层的局部误差

若$i$是最后一层时，则$\frac{\partial J}{\partial \mathbf{z}^{(i)}}$ 可以直接计算；若$i$不是最后一层，则从最后一层开始，逐层向前计算$\frac{\partial J}{\partial \mathbf{z}^{(i)}}$，直到计算到第$i$层。

$$
\begin{aligned}
\frac{\partial J}{\partial \mathbf{z}^{(i-1)}} &= \frac{\partial J}{\partial \mathbf{z}^{(i)}} \cdot \frac{\partial \mathbf{z}^{(i)}}{\partial \mathbf{a}^{(i-1)}} \cdot \frac{\partial \mathbf{a}^{(i-1)}}{\partial \mathbf{z}^{(i-1)}} \\
&= (\mathbf{W}^{(i)})^T  \cdot \frac{\partial J}{\partial \mathbf{z}^{(i)}} \cdot \sigma'(\mathbf{z}^{(i-1)})
\end{aligned}
$$

> [!TIP]
> $\dfrac{\partial \mathbf{a}^{(i-1)}}{\partial \mathbf{z}^{(i-1)}}$就是激活函数的导数
>
> $z^{(i)} = W^{(i)} a^{(i-1)} + b^{(i)}$，所以$\dfrac{\partial \mathbf{z}^{(i)}}{\partial \mathbf{a}^{(i-1)}} = W^{(i)}$

## 核方法

根据线性分类器的判别函数(非增广形式)：

$$
g(\mathbf{x}) = \mathbf{w}^T\mathbf{x} + w_0
$$

又根据感知器算法和SVM算法的权重更新规则：

$$
w_0 \leftarrow w_0 + \eta y_i
$$

$$
\mathbf{w} \leftarrow \mathbf{w} + \eta y_i \mathbf{x}_i
$$

可以发现最优解$\mathbf{w}$和$w_0$可以表示为训练样本的线性组合：

$$
\mathbf{w} = \sum_{i=1}^N \alpha_i \mathbf{x}_i
$$

> SVM时大多数$\alpha_i=0$，只有支持向量对应的$\alpha_i$非零

将$\mathbf{w}$代入判别函数：

$$
\begin{aligned}
g(\mathbf{x}) &= \left (\sum_{i=1}^N \alpha_i \mathbf{x}_i \right )^T \mathbf{x} + w_0 \\[1em]
&= \sum_{i=1}^N \alpha_i(\mathbf{x}^T \mathbf{x}_i) + w_0
\end{aligned}
$$

因此只要得到训练样本之间的内积$\mathbf{x}^T \mathbf{x}_i$，就可以计算判别函数的值。

为了处理非线性可分问题，可以将输入空间映射到一个高维特征空间：

$$
\phi: \mathbb{R}^n \rightarrow \mathbb{R}^m
$$

但是这个映射的计算非常昂贵。核方法的核心思想是引入一个核函数$K(\mathbf{x}, \mathbf{y})$，直接计算输入空间中的内积在特征空间中的值：

$$
K(\mathbf{x}, \mathbf{y}) = \phi(\mathbf{x})^T \phi(\mathbf{y})
$$

常用的核函数包括：

- 线性核：$K(\mathbf{x}, \mathbf{y}) = \mathbf{x}^T \mathbf{y}$
- 多项式核(Polynomial Kernel)：$K(\mathbf{x}, \mathbf{y}) = (\mathbf{x}^T \mathbf{y} + c)^d$
- 径向基函数核(Gaussian RBF)：$K(\mathbf{x}, \mathbf{y}) = \exp(-\gamma \|\mathbf{x} - \mathbf{y}\|^2)$
- Sigmoid核：$K(\mathbf{x}, \mathbf{y}) = \tanh(\kappa \mathbf{x}^T \mathbf{y} + c)$
- Inverse Multiquadratic核：$K(\mathbf{x}, \mathbf{y}) = \frac{1}{\sqrt{\|\mathbf{x} - \mathbf{y}\|^2 + c^2}}$

> [!TIP]
> $\tanh(x) = \dfrac{e^x - e^{-x}}{e^x + e^{-x}}$
>
> 当输入较大时，输出接近1；当输入较小时，输出接近-1

使用核函数后，判别函数可以表示为：

$$
g(\mathbf{x}) = \sum_{i=1}^N \alpha_i K(\mathbf{x}, \mathbf{x}_i) + w_0
$$

### 基于核方法的Logistic回归

$$
\begin{aligned}
P(G=k|\mathbf{x}) &= \frac{\exp(\beta_{k0} + \sum_{i=1}^N \alpha_{ki} K(\mathbf{x}_i, \mathbf{x}))}{1 + \sum_{l=1}^{K-1} \exp(\beta_{l0} + \sum_{i=1}^N \alpha_{li} K(\mathbf{x}_i, \mathbf{x}))} \\[1em]
P(G=K|\mathbf{x}) &= \frac{1}{1 + \sum_{l=1}^{K-1} \exp(\beta_{l0} + \sum_{i=1}^N \alpha_{li} K(\mathbf{x}_i, \mathbf{x}))}
\end{aligned}
$$
