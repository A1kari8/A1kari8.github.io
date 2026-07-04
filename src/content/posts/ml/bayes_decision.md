---
title: "[模式识别与机器学习] 贝叶斯决策理论"
published: 2026-6-26 16:35:00
tags: [模式识别, 机器学习]
category: 模式识别与机器学习
draft: false
---

## 概率论复习

- **条件概率**：$P(A|B) = \frac{P(AB)}{P(B)}$
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

## 贝叶斯决策理论(不考)

### 最小错误率(最小平均风险的特殊情况)

哪个后验概率大选哪个：

$$
i = \arg\max_{1\leq j \leq c} P(\omega_j | x) \quad \mathbf{x} \in \omega_i
$$

### 最小平均风险(贝叶斯准则)

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

> 无需先验概率

代价未知时可通过NP准则控制到指定的错误率，在限定一类错误率的前提下，最小化另一类错误率

已知要求将属于$\omega_1$的样本判别为$\omega_2$的错误率不超过$\alpha$，即：

$$
P(\text{判为}\omega_2 | \omega_1) \leq \alpha
$$

进行似然比检验：

$$
\frac{P(\mathbf{x} | \omega_1)}{P(\mathbf{x} | \omega_2)}  \begin{cases}
\geq \eta, & \text{判为}\omega_1 \\
< \eta, & \text{判为}\omega_2
\end{cases}
$$

- $\eta$：阈值，控制错误率

通过$\alpha$计算$\eta$：

$$
P(\text{判为}\omega_2 | \omega_1) = P(\frac{P(\mathbf{x} | \omega_1)}{P(\mathbf{x} | \omega_2)} < \eta | \omega_1) = \alpha
$$

之后解方程确定分布函数右边的面积等于$\alpha$，即可得到$\eta$的值

### 极小极大准则(先验概率未知)

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

### 朴素贝叶斯分类器(Naive Bayes Classifier)

> 先估计 $P(\mathbf{x} | \omega_i)$，再用贝叶斯公式求 $P(\omega_i | \mathbf{x})$

#### 动机：维度灾难

对于 $d$ 维特征向量 $\mathbf{x} = (x_1, x_2, \ldots, x_d)^T$，要直接估计联合条件概率 $P(x_1, x_2, \ldots, x_d | \omega_i)$，参数空间随 $d$ 呈**指数级增长**：

- 若每个特征 $x_j$ 为**二值变量**（取值 $\{0, 1\}$），$d$ 个特征的联合分布有 $2^d - 1$ 个独立参数需估计
- 若每个特征 $x_j$ 取 $k$ 个离散值，则需估计 $k^d - 1$ 个独立参数
- $d = 10, k = 5$ 时，需约 $5^{10} \approx 10^7$ 个参数——远超实际训练样本数

即使每个特征为二值，$d = 30$ 时已有 $2^{30} \approx 10^9$ 种组合，需要**指数级数量的样本**才能可靠估计每种组合的概率，这在实际中根本不可能。这就是所谓的**维度灾难**（the curse of dimensionality）。

#### 核心假设：条件独立性

朴素贝叶斯假设**给定类别 $\omega_i$ 时，各特征条件独立**：

$$
P(x_1, x_2, \ldots, x_d | \omega_i) = \prod_{j=1}^d P(x_j | \omega_i)
$$

#### 举个例子看懂怎么用

先看贝叶斯公式：

$$
P(\omega_i | \mathbf{x}) = \frac{P(\mathbf{x} | \omega_i) P(\omega_i)}{P(\mathbf{x})}
$$

假设要做一个垃圾邮件识别器，则类别为 $\omega_1$（垃圾邮件）和 $\omega_2$（非垃圾邮件），特征向量 $\mathbf{x}$ 为邮件中是否包含某些关键词的二值向量，例如：

$$
\mathbf{x} =\left [x_1, x_2, x_3 \right ]^T = (\text{包含“免费”}, \text{包含“中奖”}, \text{包含“优惠”})^T
$$

现在有一封邮件，其中包含“免费”和“优惠”，但不包含“中奖”，则 $\mathbf{x} = [1, 0, 1]^T$。

假设同时我们有一批邮件样本数据集，经过统计得到以下数据：

- 先验概率(垃圾邮件和非垃圾邮件的占比)$P(\omega_1) = 0.4, P(\omega_2) = 0.6$
- 条件概率(垃圾邮件中出现各个词的占比)$P(x_1=1 | \omega_1) = 0.8, P(x_2=0 | \omega_1) = 0.7, P(x_3=1 | \omega_1) = 0.9$
- 条件概率(非垃圾邮件中出现各个词的占比)$P(x_1=1 | \omega_2) = 0.2, P(x_2=0 | \omega_2) = 0.3, P(x_3=1 | \omega_2) = 0.1$

现对其进行分类，计算其属于垃圾邮件的后验概率：

$$
P(\omega_1 | \mathbf{x}) = \frac{P(\mathbf{x} | \omega_1) P(\omega_1)}{P(\mathbf{x})} = \frac{P(x_1=1, x_2=0, x_3=1 | \omega_1) P(\omega_1)}{P(\mathbf{x})}
$$

因为朴素贝叶斯假设条件独立性，所以：

$$
\begin{aligned}
P&(x_1=1, x_2=0, x_3=1 | \omega_1) \\ &= P(x_1=1 | \omega_1) P(x_2=0 | \omega_1) P(x_3=1 | \omega_1) \\
&= 0.8 \times 0.7 \times 0.9 = 0.504
\end{aligned}
$$

则其属于垃圾邮件的后验概率为：

$$
P(\omega_1 | \mathbf{x}) = \frac{0.504 \times 0.4}{P(\mathbf{x})} = \frac{0.2016}{P(\mathbf{x})}
$$

同理得到其属于非垃圾邮件的后验概率：

$$
\begin{aligned}
P(\omega_2 | \mathbf{x}) &= \frac{P(\mathbf{x} | \omega_2) P(\omega_2)}{P(\mathbf{x})} \\[1em] &= \frac{0.2 \times 0.3 \times 0.1 \times 0.6}{P(\mathbf{x})} = \frac{0.0036}{P(\mathbf{x})}
\end{aligned}
$$

$P(\mathbf{x})$ 不需要计算，因为它是共用的，不影响比大小结果，除非需要计算具体概率：

$$
P(\mathbf{x}) = P(\mathbf{x} | \omega_1) P(\omega_1) + P(\mathbf{x} | \omega_2) P(\omega_2) = 0.2016 + 0.0036 = 0.2052
$$

则：

$$
P(\omega_1 | \mathbf{x}) = \frac{0.2016}{0.2052} \approx 0.9825, \quad P(\omega_2 | \mathbf{x}) = \frac{0.0036}{0.2052} \approx 0.0175
$$

这封邮件属于垃圾邮件的概率为98.25%，属于非垃圾邮件的概率为1.75%，因此可以判定这封邮件是垃圾邮件。
