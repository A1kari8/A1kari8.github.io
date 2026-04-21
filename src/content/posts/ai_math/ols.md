---
title: "[人工智能数学基础] 最小二乘法"
published: 2026-4-21 17:58:00
tags: [人工智能数学基础, 数学, 线性代数]
category: 人工智能数学基础
draft: false
---

## 最小二乘法的线代表示

给定$m$个数据点 $(x_i, y_i)$，我们希望找到一个函数 $f(x)$ 来拟合这些数据点

设拟合目标函数为:

$$
\begin{aligned}
f(x) &= a_0 + a_1 x + a_2 x^2 + \cdots + a_n x^n \\
&= \begin{bmatrix}
1 & x & x^2 & \cdots & x^n
\end{bmatrix}
\begin{bmatrix}
a_0 \\ a_1 \\ a_2 \\ \vdots \\ a_n
\end{bmatrix}
\end{aligned}
$$

所以我们的目标就是求解参数向量 $\mathbf{a} = [a_0, a_1, a_2, \cdots, a_n]^T$

于是可以将该拟合问题转化成一个解线性方程组问题：

将每个数据点 $(x_i, y_i)$ 代入拟合函数 $f(x)$ 中，我们得到以下**超定**方程组($m > n$)：

$$
\begin{bmatrix}
1 & x_1 & x_1^2 & \cdots & x_1^n \\
1 & x_2 & x_2^2 & \cdots & x_2^n \\
1 & x_3 & x_3^2 & \cdots & x_3^n \\
\vdots & \vdots & \vdots & \ddots & \vdots \\
1 & x_m & x_m^2 & \cdots & x_m^n
\end{bmatrix}
\begin{bmatrix}
a_0 \\ a_1 \\ a_2 \\ \vdots \\ a_n
\end{bmatrix}
=
\begin{bmatrix}
y_1 \\ y_2 \\ y_3 \\ \vdots \\ y_m
\end{bmatrix}
$$

简写为：

$$
\mathbf{X} \mathbf{a} = \mathbf{y}
$$

可以看到$X$的维度是$m \times (n+1)$，这个方程肯定是无精确解的，所以我们需要定义**残差向量**(损失)$\mathbf{r}$为真实值与预测值之差：

$$
\mathbf{r} = \mathbf{y} - \mathbf{X} \mathbf{a}
$$

但$r$是一个向量，为了直观且便于计算，通常使用**残差平方和**(RSS)来衡量拟合的好坏：

$$
RSS(\mathbf{a}) = \Vert \mathbf{r} \Vert^2 = (\mathbf{y} - \mathbf{X} \mathbf{a})^T (\mathbf{y} - \mathbf{X} \mathbf{a})
$$

为了找到$RSS(\mathbf{a})$的最小值，我们对$\mathbf{a}$求导并设置为零：

$$
\begin{aligned}
\frac{\partial RSS}{\partial \mathbf{a}} &= -2 \mathbf{X}^T (\mathbf{y} - \mathbf{X} \mathbf{a}) \\
&= -2 \mathbf{X}^T \mathbf{y} + 2 \mathbf{X}^T \mathbf{X} \mathbf{a}
\end{aligned}
$$

设置导数为零：

$$
-2 \mathbf{X}^T \mathbf{y} + 2 \mathbf{X}^T \mathbf{X} \mathbf{a} = 0
$$

简化得到了最小二乘法的**正规方程**：

$$
\mathbf{a} = (\mathbf{X}^T \mathbf{X})^{-1} \mathbf{X}^T \mathbf{y}
$$

如果此时$\mathbf{X}^T \mathbf{X}$恰好满秩(可逆)，那就直接解吧

## 如果不可逆怎么办

### SVD奇异值分解(伪逆)

其实用这个方法的话不到正规方程那步就可以

$$
\begin{aligned}
\mathbf{X} &= \mathbf{U} \Sigma \mathbf{V}^T \\
\mathbf{a} &= X^{-1}\mathbf{y} \\
&= X^\dagger \mathbf{y} \\
&= \mathbf{V} \Sigma^{\dagger} \mathbf{U}^T \mathbf{y}
\end{aligned}
$$

$\Sigma^{\dagger}$是$\Sigma$的伪逆，计算方法是将$\Sigma$中非零奇异值取倒数，0奇异值保持为0，然后转置

> 除了又重又慢以外毫无缺点

### L2正则化(岭回归, Ridge)

正则化就是在残差基础上加上一个惩罚项，来限制模型的复杂度，防止数值不稳定

$$
\begin{aligned}
J(\mathbf{a}) &= RSS(\mathbf{a}) + \lambda \Vert \mathbf{a} \Vert^2_2 \\
&= (\mathbf{y} - \mathbf{X} \mathbf{a})^T (\mathbf{y} - \mathbf{X} \mathbf{a}) + \lambda \mathbf{a}^T \mathbf{a}
\end{aligned}
$$

直观上理解就像用一个圆形围墙将$\mathbf{a}$限制在一个范围内，当$\Vert \mathbf{a} \Vert_2$变大，损失会迅速增大，所以**岭回归**这个名字很形象

对$J(\mathbf{a})$求导并设置为零：

$$
\begin{aligned}
\frac{\partial J}{\partial \mathbf{a}} &= -2 \mathbf{X}^T (\mathbf{y} - \mathbf{X} \mathbf{a}) + 2 \lambda \mathbf{a} \\
&= -2 \mathbf{X}^T \mathbf{y} + 2 \mathbf{X}^T \mathbf{X} \mathbf{a} + 2 \lambda \mathbf{a}
\end{aligned}
$$

设置导数为零得到带L2正则化的正规方程：

$$
\mathbf{a} = (\mathbf{X}^T \mathbf{X} + \lambda \mathbf{I})^{-1} \mathbf{X}^T \mathbf{y}
$$

其中$\mathbf{I}$是单位矩阵，$\lambda$是正则化强度的**超参数**，通常需要通过交叉验证来选择合适的$\lambda$值

### L1正则化(套索回归, Lasso)

L1正则化的损失函数定义为：

$$
\begin{aligned}
J(\mathbf{a}) &= RSS(\mathbf{a}) + \lambda \Vert \mathbf{a} \Vert_1 \\
&= (\mathbf{y} - \mathbf{X} \mathbf{a})^T (\mathbf{y} - \mathbf{X} \mathbf{a}) + \lambda \sum_{i=1}^{n} |a_i|
\end{aligned}
$$

这东西有绝对值，不可导，也就没有对应的正规方程，只能用数值优化方法来求解

其中一个最常见的是**坐标下降法**，它的核心思想是每次固定其他参数，只优化一个参数，交替进行直到收敛

优化目标：

$$
\min_{\mathbf{a}} \frac{1}{2} \Vert \mathbf{y} - \mathbf{X} \mathbf{a} \Vert^2_2 + \lambda \Vert \mathbf{a} \Vert_1
$$

:::tip
$RSS(\mathbf{a})$变成$\dfrac{1}{2} \Vert \mathbf{y} - \mathbf{X} \mathbf{a} \Vert^2_2$是因为在优化过程中这两个损失是等价的(都是二次函数)，$\dfrac{1}{2}$纯是为了求导完跟2消掉好看
:::

计算部分残差：

$$
\rho_j = \mathbf{x}_j^T(\mathbf{y} - \sum_{k \neq j} a_k \mathbf{x}_k)
$$

其中$\mathbf{x}_j$是$\mathbf{X}$的第$j$列，$a_k$是参数向量$\mathbf{a}$的第$k$个元素，左乘$\mathbf{x}_j^T$是投影(内积)，部分残差的含义为「当第$j$个参数不参与拟合时，剩余的误差与第$j$个特征的相关程度」

软阈值算子：

$$
a_j = \begin{cases}
\dfrac{\rho_j}{\Vert \mathbf{x}_j \Vert^2} & \text{if } j = 0 \quad \text{(偏移量)} \\[1em]
\dfrac{\rho_j - \lambda}{\Vert \mathbf{x}_j \Vert^2} & \text{if } \rho_j > \lambda \\[1em]
\dfrac{\rho_j + \lambda}{\Vert \mathbf{x}_j \Vert^2} & \text{if } \rho_j < -\lambda \\[1em]
0 & \text{if } |\rho_j| \leq \lambda
\end{cases}
$$

原理是$\rho_j$大于$|\lambda|$就往里收一点，小于就直接变0，把偏移量单独拿出来是防止偏移量被限制活动范围，导致无法拟合偏离中心的数据，除以$\Vert \mathbf{x}_j \Vert^2$是为了归一化特征的尺度

**部分**更新残差向量：

为了避免每次迭代都重新计算巨大的矩阵乘法，所以采用增量更新

$$
\mathbf{r}_{\text{new}} = \mathbf{r}_{\text{old}} -  \mathbf{x}_j(a_j - a_j^{\text{old}})
$$
