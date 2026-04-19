---
title: "[人工智能数学基础] 正则化"
published: 2026-4-19 10:05:00
tags: [人工智能数学基础, 数学, 线性代数]
category: 人工智能数学基础
draft: false
---

在训练过程中引入额外的约束或惩罚项，以防止模型过拟合，提高泛化能力

## L1正则化(Lasso正则化)

在损失函数中加入模型参数的L1范数，定义为：

$$L = L_0 + \lambda \Vert w\Vert_1$$

其中$L_0$是原始损失函数，$w$是模型参数，$\lambda$是正则化强度的超参数
L1正则化的效果：

- 稀疏性：倾向于产生稀疏的模型参数，即许多参数被压缩为零，从而实现特征选择
- 适用于高维数据：在特征数量远大于样本数量的情况下，L1正则化可以有效地选择重要特征

L1正则化不可导，只能通过各种迭代优化算法求解，类似于：

$$w_i = \begin{cases}
0 & \text{if } |w_i| \leq \lambda \\
w_i - \lambda & \text{if } w_i > \lambda \\
w_i + \lambda & \text{if } w_i < -\lambda
\end{cases}$$

## L2正则化(Tikhonov正则化或岭(Ridge)回归)

$$ L = L_0 + \lambda \Vert w\Vert_2^2$$

L2正则化的效果：

- 权重衰减(Weight Decay)：倾向于产生较小的模型参数，但不会将它们压缩为零，从而实现权重衰减
- 适用于多重共线性：在特征之间存在高度相关性的情况下，L2正则化可以稳定模型的训练过程

L2正则化可导，可直接求解：

$$w = (X^TX + \lambda I)^{-1} X^Ty$$

其中可以得到彭罗斯伪逆的形式：

$$
w = X^\dagger y
$$

$$
X^\dagger = \lim_{\lambda \to 0} (X^TX + \lambda I)^{-1} X^T \quad \text{适用于超定方程} \\
X^\dagger = \lim_{\lambda \to 0} X^T (XX^T + \lambda I)^{-1} \quad \text{适用于欠定方程}
$$

> 超定方程：样本多于特征，行多列少($m > n$)，$(X^TX + \lambda I)$是$n \times n$矩阵，算得快
>
> 欠定方程：样本少于特征，行少列多($m < n$)，$(XX^T + \lambda I)$是$m \times m$矩阵
