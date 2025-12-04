---
title: "[工科概率论] 随机变量函数的分布"
published: 2025-11-23 18:12:00
tags: [概率论,数学]
category: 概率论
---

本节用于解决已知随机变量$X$的分布，求随机变量$Y = g(X)$的分布的问题

## 离散型随机变量

离散的简单，一个例题就能看懂了

e.g. 已知随机变量$X$的分布如下表：

| $x_i$ | -1  |   1   | 2   | 3   |
|-------|-----|-----|-----|-----|
| $p_i$ | 0.2 | 0.2 | 0.3 | 0.3 |

求随机变量$Y = X^2$的分布

解：

先算$Y$的可能取值： $y_1 = (-1)^2 = 1$，$y_2 = 1^2 = 1$，$y_3 = 2^2 = 4$，$y_4 = 3^2 = 9$

把重复的值合并，概率相加，得到$Y$的可能取值为：$\{1, 4, 9\}$

| $y_j$ | 1   | 4   | 9   |
|-------|-----|-----|-----|
| $p_j$ | 0.4 | 0.3 | 0.3 |

## 连续型随机变量

用到的方法有**分布函数法**和**公式法**

### 分布函数法

e.g. 已知$X \sim N(\mu, \sigma^2)$，求$Y = \dfrac{X - \mu}{\sigma}$的概率密度

解：

先求$Y$的分布函数：

$$
\begin{aligned}
F_Y(y) &= P(Y \le y) = P\left(\frac{X - \mu}{\sigma} \le y\right) \\
&= P(X \le \sigma y + \mu) \\
&= F_X(\sigma y + \mu)
\end{aligned}
$$

如果已知$X$的分布函数$F_X(x)$，也可以代入得到$Y$的分布函数$F_Y(y)$再求导得$f_Y(y)$（记得要把$F_X(x)$的区间也带入）但这道例题正态分布的分布函数没有解析式，所以接下来直接求导得到密度函数

将上式两侧分别对$y$求导，得到$Y$的密度函数：

$$
\begin{aligned}
f_Y(y) &= F_Y^{\prime}(y) = F_X^{\prime}(\sigma y + \mu) \cdot \sigma \\
&= f_X(\sigma y + \mu) \cdot \sigma
\end{aligned}
$$

$f_X(x)$为已知的正态分布密度函数，代入上式即可得到$Y$的密度函数：

$$
f_Y(y) =\large \dfrac{1}{\sqrt{2 \pi}} e^{\large -\frac{y^2}{2}}
$$

### 公式法

设$X$为连续型随机变量，$Y = g(X)$，且$g(x)$为区间$(a,b)$上的**单调**可微函数，则$Y=g(X)$的概率密度为：

$$
\large f_Y(y) = \begin{cases}
\large f_X(h(y)) |h^{\prime} (y)|, \quad A<y<B \\[1.5em]
0, \quad \text{其他}
\end{cases}
$$

其中，$h(y)$为$g(x)$的反函数，$A = \min\{g(a), g(b)\}$，$B = \max\{g(a), g(b)\}$

e.g. 对球的直径进行测量，设其值$X$在区间$(a,b)$上服从均匀分布，求球的体积$Y$的概率密度

解：

先写出$X$的密度函数：

$$
f_X(x) = \begin{cases}
\dfrac{1}{b-a}, \quad a < x < b \\[1.5em]
0, \quad \text{其他}
\end{cases}
$$

球的体积$Y$与直径$X$的关系为： $Y = g(X) = \dfrac{\pi}{6} X^3$

得$y = \dfrac{\pi}{6} x^3 \quad a<x<b$

可见这是一个单调可微函数，接下来求反函数$h(y)$： $x = h(y) = \sqrt[3]{\dfrac{6y}{\pi}} \quad \dfrac{\pi}{6}a^3 < y < \dfrac{\pi}{6}b^3$

所以：

$$
\large f_Y(y) = f_X(h(y)) |h^{\prime}(y)| = \frac{1}{b-a} \sqrt[3]{\frac{2}{9 \pi}} y^{\large -\frac{2}{3}}
$$

#### 当$g(x)$分段单调时

可将区间$(a,b)$划分为若干个单调区间，分别求出各区间对应的密度函数，然后将各区间的密度函数相加

此处约定对于使得反函数$h_i(y)$无意义的$y$值，$f_X(h_i(y)) |h_i^{\prime}(y)| = 0$

## 即不离散也不连续的随机变量

e.g. 已知随机变量$X$的概率密度为：

$$
f_X(x) = \begin{cases}
\dfrac{1}{a}x^2, \quad 0 < x < 3 \\[1.5em]
0, \quad \text{其他}
\end{cases}
$$

令随机变量$Y$为：

$$
Y = \begin{cases}
2, \quad X \le 1 \\[1em]
X, \quad 1 < X < 2 \\[1em]
1, \quad X \ge 2
\end{cases}
$$

求$Y$的分布函数

解：

因为$f_X(x)$的总面积是1，所以$a$是可以确定的：

$$
\int_{-\infty}^{+\infty} f_X(x) \, dx = \int_{0}^{3} \frac{1}{a}x^2 \, dx = \frac{1}{a} \int_{0}^{3} x^2 \, dx = \frac{1}{a} \cdot \frac{27}{3} = \frac{9}{a} = 1 \Rightarrow a = 9
$$

可得$Y$De

设$F_Y(y)$为$Y$的分布函数，则：

$y < 1$时，$F_Y(y)= P(Y \le y) = 0$

$y \ge 2$时，$F_Y(y)= P(Y \le y) = 1$

当$1 \le y < 2$时，

$$
\begin{aligned}
F_Y(y) &= P(Y \le y) = P(Y=1) + P(1<Y \le y) \\
&= P(X \ge 2) + P(1 < X \le y) \\
&= \int_{2}^{3} \frac{1}{9} x^2 \, dx + \int_{1}^{y} \frac{1}{9} x^2 \, dx \\[1.5em]
&= \frac{y^3 + 18}{27}
\end{aligned}
$$
