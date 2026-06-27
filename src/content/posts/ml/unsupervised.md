---
title: "[模式识别与机器学习] 非监督学习"
published: 2026-6-18 20:43:00
tags: [模式识别, 机器学习]
category: 大学计算机
draft: false
---


## 分类和聚类

### 分类

给定样本和类别标签，确定决策函数用于分类，属于监督学习

### 聚类

只给定样本，根据样本之间的相似性将样本分组，形成簇，属于非监督学习

## 聚类准则函数

将样本分成$c$个子集$D_1, \cdots, D_c$, $n_i$为第$i$个子集中的样本数，$\mathbf{m_i}$为第$i$个子集的样本均值

$$
\mathbf{m_i} = \frac{1}{n_i} \sum_{\mathbf{x} \in D_i} \mathbf{x}
$$

### 误差平方和准则

$$
J_e = \sum_{i=1}^c \sum_{\mathbf{x} \in D_i} \|\mathbf{x} - \mathbf{m_i}\|^2
$$

## 散布矩阵

### 类内散布矩阵

$$
\mathbf{S_w} = \sum_{i=1}^c \sum_{\mathbf{x} \in D_i} (\mathbf{x} - \mathbf{m_i})(\mathbf{x} - \mathbf{m_i})^T
$$

> 就是误差平方和准则的矩阵形式

反映了各个子集的样本与其均值之间的差异，衡量了各个子集内部的紧密程度

### 类间散布矩阵

$$
\mathbf{S_B} = \sum_{i=1}^c n_i (\mathbf{m_i} - \mathbf{m})(\mathbf{m_i} - \mathbf{m})^T
$$

- $\mathbf{m}$为所有样本的均值

反映了各个子集的均值与整体均值之间的差异，衡量了各个子集之间的分离程度

### 总体散布矩阵

$$
\mathbf{S_T} = \sum_{i=1}^c \sum_{\mathbf{x} \in D_i} (\mathbf{x} - \mathbf{m})(\mathbf{x} - \mathbf{m})^T = S_w + S_B
$$

反映了所有样本的分散程度，衡量了所有样本之间的差异

## 散布准则

基于行列式的散布准则：

$$
J_d = |\mathbf{S_w}|
$$

基于不变量的散布准则：

$$
J_f = \text{tr}(\mathbf{S_T^{-1}}\mathbf{S_w})
$$

## 准则函数的优化

### 穷举法优化

对于每个样本，尝试将其分配到不同的子集中，计算准则函数的值，选择使准则函数最小的分配方式，NP问题，不现实

### 迭代最优化

随机设置初始聚类，计算将样本$\mathbf{x}$从子集$D_i$移动到子集$D_j$后的准则函数值是否减小，如果减小则进行移动，直到没有样本可以移动为止

## 层次聚类

### 凝聚层次聚类

初始每个样本作为一类，计算**距离**，合并距离最近的两类，直到达到要求的类数为止

### 距离

- 两类最近的样本的距离最小
- 两类的中心的距离最小
- 如何定义距离(欧氏距离、曼哈顿距离等)
- 如何定义类的中心(均值、质心等)

## k-均值聚类(K-means)

1. 随机选择$k$个样本作为初始聚类中心
2. 将每个样本分配到距离最近的聚类中心所在的子集中
3. 重新计算每个子集内所有点的均值作为新的聚类中心
4. 重复步骤2和3，直到聚类中心不再发生变化或达到最大迭代次数为止

可看作是对**平方误差准则**的**贪心搜索**算法

聚类结果受初始聚类中心的选择影响较大，可能会陷入局部最优解

## 高斯混合模型(GMM)

一个复杂的概率密度分布函数可以由多个简单的密度函数线性组合而成：

$$
p(\mathbf{x}|\theta) = \sum_{i=1}^M a_i p_i(\mathbf{x}|\theta_i) \qquad \sum_{i=1}^M a_i = 1, a_i \geq 0
$$

最常用的是GMM:

$$
p(\mathbf{x}) = \sum_{i=1}^M a_i N(\mathbf{x};\mathbf{\mu_i}, \mathbf{\Sigma_i}) \qquad \sum_{i=1}^M a_i = 1
$$

- $\mu_i$为第$i$个高斯函数的均值（中心位置）
- $\Sigma_i$为第$i$个高斯函数的协方差矩阵（控制形状和方向）

GMM能得到每个样本属于每个子集的概率，适用于样本分布不均匀的情况，可用于软聚类，输出属于哪类的可能性，而非硬聚类的类别标签

## 期望最大化算法(EM)

### E-Step求期望

用当前参数计算每个样本$\mathbf{x_i}$由每个高斯分量$k$生成的后验概率：

$$
\gamma_{ik} = \frac{a_k N(\mathbf{x_i};\mathbf{\mu_k}, \mathbf{\Sigma_k})}{\sum_{j=1}^M a_j N(\mathbf{x_i};\mathbf{\mu_j}, \mathbf{\Sigma_j})}
$$

### M-Step求最大化

根据E-Step计算的后验概率，重新估计参数：

$$
\begin{aligned}
\text{新权重} \quad a_k &= \frac{1}{N} \sum_{i=1}^N \gamma_{ik} \\[1.5em]
\text{新均值} \quad \mathbf{\mu_k} &= \frac{\sum_{i=1}^N \gamma_{ik} \mathbf{x_i}}{\sum_{i=1}^N \gamma_{ik}} \\[1.5em]
\text{新协方差矩阵} \quad \mathbf{\Sigma_k} &= \frac{\sum_{i=1}^N \gamma_{ik} (\mathbf{x_i} - \mathbf{\mu_k})(\mathbf{x_i} - \mathbf{\mu_k})^T}{\sum_{i=1}^N \gamma_{ik}}
\end{aligned}
$$

得到新参数后重复E-Step和M-Step，直到参数收敛为止
