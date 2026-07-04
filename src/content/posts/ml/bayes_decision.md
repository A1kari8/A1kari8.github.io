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

特征向量 $\mathbf{x} = (x_1, x_2, \ldots, x_d)^T$ 的联合概率 $P(x_1, \ldots, x_d | \omega_i)$ 所需样本数随 $d$ 指数增长——即使每个特征为二值，也有 $2^d$ 种组合，实际数据难以覆盖所有情况。

#### 核心假设：条件独立性

朴素贝叶斯假设给定类别 $\omega_i$ 时，各特征**条件独立**：

$$
P(x_1, x_2, \ldots, x_d | \omega_i) = \prod_{j=1}^d P(x_j | \omega_i)
$$

只需估计 $d$ 个单特征的条件概率，复杂度从 $O(2^d)$ 降至 $O(d)$。

#### 分类决策

结合贝叶斯定理与独立性假设，判别函数为：

$$
\begin{aligned}
g_i(\mathbf{x}) &= \ln P(\omega_i) + \ln P(\mathbf{x} | \omega_i) \\
&= \ln P(\omega_i) + \sum_{j=1}^d \ln P(x_j | \omega_i)
\end{aligned}
$$

最终决策：

$$
\hat{\omega} = \arg\max_i \; g_i(\mathbf{x})
$$

#### $P(x_j | \omega_i)$ 的建模方式

| 变体 | 适用特征 | 分布假设 |
|------|----------|----------|
| **高斯朴素贝叶斯** | 连续特征 | $P(x_j \mid \omega_i) = \frac{1}{\sqrt{2\pi\sigma_{ij}^2}} \exp\left(-\frac{(x_j - \mu_{ij})^2}{2\sigma_{ij}^2}\right)$ |
| **多项式朴素贝叶斯** | 离散计数(如词频) | $P(x_j \mid \omega_i) = \frac{N_{ij} + \alpha}{N_i + \alpha d}$（含拉普拉斯平滑） |
| **伯努利朴素贝叶斯** | 二值特征(词是否出现) | $P(x_j \mid \omega_i) = p_{ij}^{x_j} (1 - p_{ij})^{1 - x_j}$ |

- $\mu_{ij}, \sigma_{ij}^2$：第 $i$ 类第 $j$ 个特征的均值和方差（由训练数据估计）
- $N_{ij}$：第 $i$ 类中特征 $j$ 出现的总次数，$N_i$ 第 $i$ 类所有特征出现总次数
- $\alpha \geq 0$：平滑系数，$\alpha = 1$ 为拉普拉斯平滑，防止零概率

#### 训练：最大似然估计

参数 $\theta_{ij}$（如 $\mu_{ij}, \sigma_{ij}^2$ 或 $p_{ij}$）通过对各类训练样本**独立进行最大似然估计**获得——条件独立假设使每个特征的参数可单独估计。

#### 特点

- **优点**：计算高效；所需样本少；对缺失数据不敏感；在高维文本分类中效果优异
- **缺点**：条件独立假设过强，特征相关时性能下降；无法学习特征间的交互关系
- 即使假设不成立，分类决策边界常仍合理（估计 $P(\omega_i \mid \mathbf{x})$ 的偏置可能相互抵消）
