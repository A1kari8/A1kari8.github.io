---
title: "[模式识别与机器学习] 线性分类器"
published: 2026-5-31 17:23:00
tags: [模式识别, 机器学习]
category: 大学计算机
draft: false
---

## 线性分类器

特点：

1. 决策面是线/平面或超平面(n维空间中的n-1维空间)
2. 判别函数是线性函数

## 判别函数

常用**增广形式**

$$
g(\mathbf{x}) = \mathbf{w}^T \mathbf{x}
$$

- $\mathbf{w}$：权重向量，决策面方程的系数，包含偏置项
- $\mathbf{x}$：输入特征向量，包含一个1以处理偏置，称增广(齐次)的特征向量

$$
\mathbf{w} = \begin{bmatrix}w_0 \\ w_1 \\ \vdots \\ w_n
\end{bmatrix} \quad \mathbf{x} = \begin{bmatrix}1 \\ x_1 \\ \vdots \\ x_n
\end{bmatrix}
$$

- 判别函数的符号决定分类结果：$g(\mathbf{x}) > 0$ 属于一类，称之正类，$g(\mathbf{x}) < 0$ 属于另一类，称之负类，$g(\mathbf{x}) = 0$ 则位于决策面上

## 目标方程

有了判别函数后，我们需要一个目标方程来优化权重向量$\mathbf{w}$，也就是让每一个样本经过判别函数运算后都能得到正确的分类结果。写成矩阵的形式：

$$
\mathbf{X}\mathbf{w} > \mathbf{0}
$$

其中：

$$
\mathbf{X} = \begin{bmatrix}\mathbf{x}_1^T \\ \mathbf{x}_2^T \\ \vdots \\ \mathbf{x}_m^T \\ -\mathbf{x}_{m+1}^T \\ \vdots \\ -\mathbf{x}_N^T
\end{bmatrix} \qquad \mathbf{w} = \begin{bmatrix}w_0 \\ w_1 \\ \vdots \\ w_n
\end{bmatrix}
$$

- $\mathbf{X}$：增广特征矩阵，前$m$行是正类样本的增广特征向量，后$N-m$行是负类样本的增广特征向量取反，取反是为了能统一大于0
- $\mathbf{w}$：权重向量，包含决策面方程的系数

## 感知器算法

只能处理线性可分的数据

### 感知器准则

最直观的准则是「最少错分样本数准则」：

$$
J_N(\mathbf{w}) = \text{样本集合中被误分类的样本数}
$$

但这个表达不可导，无法使用梯度下降法，因此改为以误分类样本的距离和为准则：

$$
\begin{aligned}
J_P(\mathbf{w}) = \sum_{\mathbf{x} \in \mathcal{M}} \left ( - \mathbf{w}^T \mathbf{x} \right ) \\[1.5em]
\nabla J_P(\mathbf{w}) = \sum_{\mathbf{x} \in \mathcal{M}} \left ( - \mathbf{x} \right )
\end{aligned}
$$

- $\mathcal{M}$：误分类样本集合

### 算法

1. 初始化权重向量 $\mathbf{w}_0 \quad k = 0$
2. 对训练样本进行迭代：
   - 计算判别函数 $g(\mathbf{x}_k)$，判断样本是否被正确分类
   - 如果$\mathbf{x}_k$被误分类，更新权重向量：$\mathbf{w}_{k+1} \leftarrow \mathbf{w}_k + \mathbf{x}_k$
3. 重复步骤2直到所有样本被正确分类或达到最大迭代次数

### 批量版算法

1. 初始化权重向量 $\mathbf{w}_0 \quad k = 0$，学习率 $\eta_k$，收敛阈值 $\epsilon$
2. 对训练样本进行迭代，收集所有误分类样本 $\mathcal{M_k}$：
   - 对每个样本计算判别函数 $g(\mathbf{x})$，判断样本是否被正确分类
   - 如果样本被误分类，将其加入集合 $\mathcal{M_k}$
   - 更新权重向量：$\mathbf{w}_{k+1} \leftarrow \mathbf{w}_k + \eta_k \sum\limits_{\mathbf{x} \in \mathcal{M_k}} \mathbf{x}$
   - 若$\left | \eta_k \sum\limits_{\mathbf{x} \in \mathcal{M_k}} \mathbf{x} \right | < \epsilon$，则停止迭代
3. 重复步骤2直到所有样本被正确分类或达到最大迭代次数

## LMSE算法(最小均方误差)

传统的感知器是让判别函数输出的绝对值大于0, 但使用LMSE可以为输出设置一个非0的目标值, 以增加分类的置信度。

LMSE可以处理**线性不可分**的数据

### LMSE的目标方程

$$
X\mathbf{w} = \mathbf{b}
$$

- $\mathbf{b}$：目标输出向量，前$m$个元素为正类样本的目标值，后$N-m$个元素为负类样本的目标值

### LMSE准则函数

定义误差向量$\mathbf{e} = X\mathbf{w} - \mathbf{b}$，LMSE准则函数为误差的平方和：

$$
J(\mathbf{w}) = \frac{1}{2} \left \| \mathbf{e}\right \|^2
$$

> $\frac{1}{2}$ 是为了求导好看

求导：

$$
\begin{aligned}
\nabla J(\mathbf{w}) = X^T (X\mathbf{w} - \mathbf{b}) &= 0 \\[1em]
\mathbf{w} &= (X^T X)^{-1} X^T \mathbf{b} \\[1em]
&= X^\dagger \mathbf{b}
\end{aligned}
$$

梯度下降：

$$
\mathbf{w}_{k+1} = \mathbf{w}_k - \eta_k \nabla J(\mathbf{w}_k) = \mathbf{w}_k - \eta_k X^T (X\mathbf{w}_k - \mathbf{b})
$$

## 多类问题扩展

设共有$C$类

### 拆分二分类法

#### 一对多

为每一个类训练一个二分类器，如果大于0就属于这个类，否则不属于这个类。测试时，输入样本通过所有分类器，选择输出最大的那个分类器对应的类。

需要$C$个分类器

#### 一对一

对任意两类训练一个二分类器，测试时，输入样本通过所有分类器，选择被最多分类器投票的那个类。

需要$\dfrac{C(C-1)}{2}$个分类器

### 扩展感知器算法

初始化$C$个权重向量$\mathbf{w}_1, \mathbf{w}_2, \ldots, \mathbf{w}_C$，每个权重向量对应一个类

$$
\mathbf{W} = \begin{bmatrix}\mathbf{w}_1^T \\ \mathbf{w}_2^T \\ \vdots \\ \mathbf{w}_C^T
\end{bmatrix}  \quad \mathbf{G(\mathbf{x})} = \begin{bmatrix}
g_1(\mathbf{x}) \\ g_2(\mathbf{x}) \\ \vdots \\ g_C(\mathbf{x})
\end{bmatrix}
$$

得到方程
$$
\mathbf{G(\mathbf{x})} = \mathbf{W} \mathbf{x}
$$

若样本$\mathbf{x}$ 属于第 $j$ 类，则：

$$
\arg\max_{k} g_k(\mathbf{x}) = j
$$

其中 $g_k(\mathbf{x})$ 是第 $k$ 个分类器的输出，也是$G(\mathbf{x})$的第 $k$ 个元素

## 支持向量机(SVM)

感知器能找到一个决策面，但可能不是最优的决策面。SVM的目标是找到一个最大化分类间隔的决策面，以提高模型的泛化能力。是**最大间隔分类器**

### 间隔

对于超平面：

$$
\mathbf{w}^T \mathbf{x} + b = 0
$$

样本点$\mathbf{x}_i$到超平面的距离为：

$$
d_i = \frac{|\mathbf{w}^T \mathbf{x}_i + b|}{\|\mathbf{w}\|}
$$

则间隔的定义：

$$
\text{margin} = \min_i d_i
$$

SVM的目标是最大化这个间隔

### 线性可分SVM(硬间隔)

为简化优化过程，要求对所有样本满足：

$$
y_i (\mathbf{w}^T \mathbf{x}_i + b) \geq 1
$$

其中 $y_i$ 是样本 $\mathbf{x}_i$ 的类别标签，取值为 $+1$ 或 $-1$。这个约束确保了所有样本都被正确分类，并且距离超平面至少为$\dfrac{1}{\|\mathbf{w}\|}$

优化问题：

$$
\begin{aligned}
\min_{\mathbf{w}, b} \quad & \frac{1}{2} \|\mathbf{w}\|^2 \\
\text{subject to} \quad & y_i (\mathbf{w}^T \mathbf{x}_i + b) \geq 1, \quad i = 1, 2, \ldots, N
\end{aligned}
$$

这是一个凸二次优化问题，可以通过拉格朗日乘子法求解

引入拉格朗日乘子 $\alpha_i \geq 0$，构建拉格朗日函数：

$$
L(\mathbf{w}, b, \boldsymbol{\alpha}) = \frac{1}{2} \|\mathbf{w}\|^2 - \sum_{i=1}^N \alpha_i [y_i (\mathbf{w}^T \mathbf{x}_i + b) - 1]
$$

对 $\mathbf{w}$ 和 $b$ 求偏导并设置为零，得到：

$$
\begin{aligned}
\frac{\partial L}{\partial \mathbf{w}} &= \mathbf{w} - \sum_{i=1}^N \alpha_i y_i \mathbf{x}_i = 0 \\ &\Rightarrow
\mathbf{w} = \sum_{i=1}^N \alpha_i y_i \mathbf{x}_i \\
\frac{\partial L}{\partial b} &=
 \sum_{i=1}^N \alpha_i y_i = 0
\end{aligned}
$$

代入拉格朗日函数，得到对偶问题：

$$
\begin{aligned}
\max_{\boldsymbol{\alpha}} \quad & \sum_{i=1}^N \alpha_i - \frac{1}{2} \sum_{i=1}^N \sum_{j=1}^N \alpha_i \alpha_j y_i y_j \mathbf{x}_i^T \mathbf{x}_j \\
\text{subject to} \quad & \alpha_i \geq 0, \quad i = 1, 2, \ldots, N \\
& \sum_{i=1}^N \alpha_i y_i = 0
\end{aligned}
$$

#### 支持向量

根据KKT条件：

$$
\alpha_i [y_i (\mathbf{w}^T \mathbf{x}_i + b) - 1] = 0
$$

- 当 $\alpha_i > 0$ 时，则$y_i (\mathbf{w}^T \mathbf{x}_i + b) = 1$，样本 $\mathbf{x}_i$ 位于间隔边界上，称为**支持向量**
- 当 $\alpha_i = 0$ 时，$y_i (\mathbf{w}^T \mathbf{x}_i + b) > 1$，样本 $\mathbf{x}_i$ 位于间隔外，不是支持向量，样本对决策面没有贡献

结论：最终分类器只由支持向量决定

$$
\mathbf{w} = \sum_{i \in SV} \alpha_i y_i \mathbf{x}_i
$$

支持向量机的决策函数：

$$
f(\mathbf{x}) = \text{sign} \left( \sum_{i \in SV} \alpha_i y_i \mathbf{x}_i^T \mathbf{x} + b \right)
$$

### 线性不可分SVM(软间隔)

引入松弛变量 $\xi_i \geq 0$，允许部分样本被误分类(可以不满足函数间隔$\ge1$)，但对误分类样本进行惩罚。优化问题：

$$
\begin{aligned}
\min_{\mathbf{w}, b, \boldsymbol{\xi}} \quad & \frac{1}{2} \|\mathbf{w}\|^2 + C \sum_{i=1}^N \xi_i \\
\text{subject to} \quad & y_i (\mathbf{w}^T \mathbf{x}_i + b) \geq 1 - \xi_i, \quad i = 1, 2, \ldots, N \\
& \xi_i \geq 0, \quad i = 1, 2, \ldots, N
\end{aligned}
$$

- $C>0$：惩罚参数，控制模型对误分类的容忍度
- $C\to\infty$ 时，软间隔SVM退化为硬间隔SVM

推导后得到对偶问题：

$$
\begin{aligned}
\max_{\boldsymbol{\alpha}} \quad & \sum_{i=1}^N \alpha_i - \frac{1}{2} \sum_{i=1}^N \sum_{j=1}^N \alpha_i \alpha_j y_i y_j \mathbf{x}_i^T \mathbf{x}_j \\
\text{subject to} \quad & 0 \leq \alpha_i \leq C, \quad i = 1, 2, \ldots, N \\
& \sum_{i=1}^N \alpha_i y_i = 0
\end{aligned}
$$

只比硬间隔多了上界$\alpha_i \leq C$

#### KKT条件

$$
\begin{aligned}
\alpha_i [y_i (\mathbf{w}^T \mathbf{x}_i + b) - 1 + \xi_i] &= 0 \\
(C - \alpha_i) \xi_i &= 0
\end{aligned}
$$

- 当 $\alpha_i > 0$ 且 $\alpha_i < C$ 时，$y_i (\mathbf{w}^T \mathbf{x}_i + b) = 1 - \xi_i$，样本 $\mathbf{x}_i$ 位于间隔边界上，称为**支持向量**
- 当 $\alpha_i = 0$ 时，$y_i (\mathbf{w}^T \mathbf{x}_i + b) > 1 - \xi_i$，样本 $\mathbf{x}_i$ 位于间隔外，不是支持向量，样本对决策面没有贡献
- 当 $\alpha_i = C$ 时，$y_i (\mathbf{w}^T \mathbf{x}_i + b) < 1 - \xi_i$，样本 $\mathbf{x}_i$ 被误分类，称为**误分类支持向量**
