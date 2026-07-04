---
title: "[模式识别与机器学习] 特征提取"
published: 2026-6-18 11:58:00
tags: [模式识别, 机器学习]
category: 模式识别与机器学习
draft: false
---

## 特征选择

### 单变量选择

独立计算每个特征向量的得分，选择得分最高的m个特征

缺点：不能捕捉特征之间的相关性

### 搜索法

- 前向选择：从空特征集开始，每次添加一个特征，直到达到预定数量或性能不再提升
- 后向消除：从全特征集开始，每次删除一个特征，直到达到预定数量或性能不再提升
- 双向搜索：结合前向选择和后向消除

### 嵌入式方法

- SVM-RFE(递归特征消除)：训练SVM模型，根据权重大小递归地消除特征(得到的支持向量就是重要的特征)
- L1正则化(Lasso回归)：通过引入L1正则项，使得一些特征的权重变为零，从而实现特征选择

## 相关性评价

### 熵(信息熵)

$$
H(X) = -\sum_{i=1}^{n} p(x_i) \log p(x_i)
$$

### 联合熵

$$
H(X,Y) = -\sum_{i=1}^{n} \sum_{j=1}^{m} p(x_i, y_j) \log p(x_i, y_j)
$$

### Kullback-Leibler散度

$$
D_{KL}(P||Q) = \sum_{i=1}^{n} p(x_i) \log \frac{p(x_i)}{q(x_i)}
$$

- 非负性
- KL散度为0: PQ同分布
- **不对称**

### Jensen-Shannon散度

$$
D_{JS}(P||Q) = \frac{1}{2} D_{KL}(P||M) + \frac{1}{2} D_{KL}(Q||M) \\[1em]
M = \frac{1}{2}(P + Q) \quad \text{两个分布的平均值}
$$

- 非负性
- JS散度为0: PQ同分布
- **对称**

## 特征提取(线性方法)

### 主成分分析(PCA)

> 别名：离散K-L变换，Hotelling变换

**无监督学习**，寻找数据中方差最大的方向作为新的特征轴，实现降维。

#### 核心思想

将 $d$ 维数据投影到 $k$ 维子空间 ($k < d$)，使得投影后的数据方差最大化（或重构误差最小化）。

#### 数学推导

给定中心化后的数据矩阵 $\mathbf{X} \in \mathbb{R}^{n \times d}$（每行为一个样本，已减去均值），协方差矩阵为：

$$
\mathbf{\Sigma} = \frac{1}{n} \mathbf{X}^T \mathbf{X}
$$

寻找投影方向 $\mathbf{w}$，使得投影后方差最大：

$$
\max_{\mathbf{w}} \mathbf{w}^T \mathbf{\Sigma} \mathbf{w} \quad \text{s.t.} \quad \|\mathbf{w}\| = 1
$$

由拉格朗日乘子法得 $\mathbf{\Sigma} \mathbf{w} = \lambda \mathbf{w}$，即 $\mathbf{w}$ 为 $\mathbf{\Sigma}$ 的特征向量，$\lambda$ 为对应特征值。

#### 算法步骤

1. 对数据**中心化**：$\mathbf{x}_i \leftarrow \mathbf{x}_i - \bar{\mathbf{x}}$
2. 计算协方差矩阵 $\mathbf{\Sigma}$
3. 对 $\mathbf{\Sigma}$ 进行特征值分解，得到特征值 $\lambda_1 \geq \lambda_2 \geq \cdots \geq \lambda_d$ 及对应特征向量
4. 取前 $k$ 个最大特征值对应的特征向量构成投影矩阵 $\mathbf{W} \in \mathbb{R}^{d \times k}$
5. 得到降维后数据：$\mathbf{Z} = \mathbf{X} \mathbf{W}$

#### 方差解释率

第 $i$ 个主成分的方差解释率为 $\lambda_i / \sum_{j=1}^d \lambda_j$，前 $k$ 个主成分的累积方差解释率为 $\sum_{i=1}^k \lambda_i / \sum_{j=1}^d \lambda_j$，常以此选择 $k$。

#### SVD 实现

实际中通过对 $\mathbf{X}$ 进行 SVD 分解 $\mathbf{X} = \mathbf{U} \mathbf{\Sigma} \mathbf{V}^T$ 实现，$\mathbf{V}$ 的列即为主成分方向，计算更稳定。

#### 性质与局限

- 无监督，不使用标签信息
- 假设数据分布为高斯分布
- 对离群点敏感
- 仅能捕获线性结构
- 主成分方向通常是**不可解释**的（每个主成分是所有原始特征的线性组合）

### 线性判别分析(LDA/FDA)

> 别名：Fisher判别分析(FDA)

**有监督学习**，寻找能够最大化类间散度与最小化类内散度的线性组合，以保留类别可分性。

#### 核心思想

与 PCA 最大化整体方差不同，LDA 利用标签信息，找到使**类间距离最大、类内距离最小**的投影方向。

#### 散度矩阵

给定 $c$ 类数据，第 $i$ 类样本集 $D_i$，样本数 $n_i$，均值 $\mathbf{m}_i$，全局均值 $\mathbf{m}$：

- **类内散度矩阵**（反映类内紧密程度）：

  $$
  \mathbf{S}_w = \sum_{i=1}^c \sum_{\mathbf{x} \in D_i} (\mathbf{x} - \mathbf{m}_i)(\mathbf{x} - \mathbf{m}_i)^T
  $$

- **类间散度矩阵**（反映类间分离程度）：

  $$
  \mathbf{S}_b = \sum_{i=1}^c n_i (\mathbf{m}_i - \mathbf{m})(\mathbf{m}_i - \mathbf{m})^T
  $$

- **总体散度矩阵**：$\mathbf{S}_t = \mathbf{S}_w + \mathbf{S}_b$

#### Fisher 准则

寻找投影方向 $\mathbf{w}$，最大化 Fisher 准则：

$$
J(\mathbf{w}) = \frac{\mathbf{w}^T \mathbf{S}_b \mathbf{w}}{\mathbf{w}^T \mathbf{S}_w \mathbf{w}}
$$

等价于求解广义特征值问题：

$$
\mathbf{S}_b \mathbf{w} = \lambda \mathbf{S}_w \mathbf{w}
$$

投影方向 $\mathbf{w}$ 为 $\mathbf{S}_w^{-1} \mathbf{S}_b$ 的**最大特征值对应的特征向量**。

#### 算法步骤

1. 计算每类均值 $\mathbf{m}_i$ 和全局均值 $\mathbf{m}$
2. 计算 $\mathbf{S}_w$ 和 $\mathbf{S}_b$
3. 求解 $\mathbf{S}_w^{-1} \mathbf{S}_b$ 的特征值问题
4. 取前 $k$ 个最大特征值对应的特征向量构成投影矩阵 $\mathbf{W}$
5. 得到降维后数据：$\mathbf{Z} = \mathbf{X} \mathbf{W}$

#### 降维上限

$\mathbf{S}_b$ 的秩最多为 $c-1$，因此 LDA 最多将数据降至 **$c-1$ 维**，与原始维度无关。

#### 局限

- **小样本问题**：样本数小于特征数时 $\mathbf{S}_w$ 奇异，不可逆
- 假设各类的**协方差矩阵相同**（类内分布相同）
- 对非高斯分布数据效果较差
- 降维维度受类别数限制

#### PCA vs LDA

| 特性 | PCA | LDA |
|------|-----|-----|
| 监督性 | 无监督 | 有监督 |
| 目标 | 最大化方差 | 最大化类间/类内散度比 |
| 利用标签 | 否 | 是 |
| 降维上限 | $d$ | $c-1$ |
| 适用场景 | 数据压缩、可视化 | 分类预处理、特征提取 |

## 特征提取(非线性方法)

### 流形学习

假设数据在低维流形上分布，寻找一个映射将数据从高维空间映射到低维空间，同时保持局部结构

### 核特征提取

通过核函数将数据映射到高维特征空间，在高维空间中进行PCA
