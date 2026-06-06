---
title: "[模式识别与机器学习] 贝叶斯决策理论"
published: 2026-5-31 16:35:00
tags: [模式识别, 机器学习]
category: 大学计算机
draft: false
---

## 概率论复习

- **条件概率**：$P(A|B) = \frac{P(A \cap B)}{P(B)}$
- **联合概率**：$P(A \cap B) = P(A|B)P(B) = P(B|A)P(A)$
- **全概率公式**：$P(A) = \sum_{i} P(A|B_i)P(B_i)$
- **贝叶斯定理**：$P(B|A) = \frac{P(A|B)P(B)}{P(A)}$

## 贝叶斯定理

$$
P(A | B) = \frac{P(B | A) P(A)}{P(B)}
$$

- $P(A)$：先验概率，在看到证据B之前对事件A的初始认知
- $P(B|A)$：似然函数，表示假设A成立的条件下，观测到证据B的概率
- $P(B)$：证据B的边缘概率，可以通过全概率公式计算得到，表示在所有可能的事件A下，观测到证据B的总概率
- $P(A|B)$：后验概率，表示在观察到证据B后，事件A发生的概率

## 贝叶斯决策理论

### 最小错误率

哪个后验概率大选哪个：

$$
i = \arg\max_{1\leq j \leq c} P(\omega_j | x) \quad \mathbf{x} \in \omega_i
$$

### 最小平均风险

有$c$个类别$\omega_1, \omega_2, \ldots, \omega_c$，将属于$\omega_i$的样本判别为$\omega_j$的代价为$\lambda_{ij}$

则将样本$\mathbf{x}$判别为$\omega_j$类的平均风险为：

$$
\gamma_j(\mathbf{x}) = \sum_{i=1}^c \lambda_{ij} P(\omega_i | \mathbf{x})
$$

选择平均风险最小的类别：

哪个平均风险小选哪个

$$
i = \arg\min_{1\leq j \leq c} \gamma_j(\mathbf{x}) \quad \mathbf{x} \in \omega_i
$$

当代价为0-1代价函数时，效果跟[最小错误率](#最小错误率)相同

$$
\lambda_{ij} = \begin{cases}
0, & i = j \\
1, & i \neq j
\end{cases}
$$

### Neyman-Pearson准则(代价未知)

代价未知时可通过NP准则控制到指定的错误率，在限定一类错误率的前提下，最小化另一类错误率

> 不好算，应该不能考，懒得写

### 极小极大准则

最小化最大风险，适用于不确定的代价函数

> 考虑最坏情况

$$
i = \arg\min_{1\leq j \leq c} \max_{1\leq i \leq c} \lambda_{ij} P(\omega_i | \mathbf{x}) \quad \mathbf{x} \in \omega_i
$$

## 贝叶斯分类器

### 判别函数

实际工程上后验概率很难算，通常使用判别函数$g_i(\mathbf{x})$来代替后验概率$P(\omega_i | \mathbf{x})$，满足：

$$
g_i(\mathbf{x}) > g_j(\mathbf{x}), \quad \text{当且仅当} P(\omega_i | \mathbf{x}) > P(\omega_j | \mathbf{x})
$$

判别函数是单调的，常见的判别函数有：

- **线性判别函数**：$g_i(\mathbf{x}) = \mathbf{w}_i^T \mathbf{x} + w_{i0}$，其中$\mathbf{w}_i$是权重向量，$w_{i0}$是偏置项
- **二次判别函数**：$g_i(\mathbf{x}) = -\frac{1}{2} \mathbf{x}^T \Sigma_i^{-1} \mathbf{x} + \mathbf{w}_i^T \mathbf{x} + w_{i0}$，其中$\Sigma_i$是协方差矩阵
- **对数判别函数**：$g_i(\mathbf{x}) = \ln P(\omega_i) + \ln P(\mathbf{x} | \omega_i)$，适用于朴素贝叶斯分类器(Naive Bayes Classifier)
- **距离判别函数**：$g_i(\mathbf{x}) = -\|\mathbf{x} - \boldsymbol{\mu}_i\|^2$，其中$\boldsymbol{\mu}_i$是类别$\omega_i$的均值向量
- **概率判别函数**：$g_i(\mathbf{x}) = P(\omega_i | \mathbf{x})$，直接使用后验概率作为判别函数

$\mu_i$是属于类别$\omega_i$的样本的均值向量
