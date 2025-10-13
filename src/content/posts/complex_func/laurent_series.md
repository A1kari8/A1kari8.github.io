---
title: '[复变函数] 洛朗级数'
published: 2025-09-27 17:02:00
tags: [复变函数,数学]
category: 大学数学
draft: false
---

:::warning

本文以及本博客的数学内容主要作为个人笔记，其中包含大量的**个人理解**，本人并非数学专业，对于此类数学课只想以最低的成本拿到满意的分数，因此存在大量不严谨甚至错误的内容，可能造成不适，请谨慎阅读

:::

## 洛朗级数

洛朗级数是泰勒级数的推广

泰勒级数只适用于解析函数，而洛朗级数适用于在某个环域内解析的函数

它可以绕开奇点，表示在奇点附近的函数行为

$$
f(z) = \sum_{n=-\infty}^{\infty} a_n (z - z_0)^n
$$

### 系数的计算

$$
a_n = \frac{1}{2\pi i} \oint_C \frac{f(z)}{(z - z_0)^{n+1}} dz
$$

### 收敛半径

洛朗级数的收敛域是一个圆环，所以收敛半径有两个

- 内收敛半径$R_1$：从奇点到内侧边界的距离，用负幂项求得
- 外收敛半径$R_2$：从奇点到外侧边界的距离，用正幂项求得

### 求一个函数的洛朗级数

e.g. 求$f(z) = \frac{1}{(z-i)(z-2)}$在$1 < |z| < 2$的洛朗级数

#### 第一步 裂项

[裂项技巧](#裂项技巧覆盖法)

$$
\begin{aligned}
\frac{1}{(z-i)(z-2)} &= \frac{A}{z-i} + \frac{B}{z-2} \\
A &= \frac{1}{i-2} \\
B &= \frac{1}{2-i} \\
\frac{1}{(z-i)(z-2)} &= \frac{1}{i-2} \cdot \frac{1}{z-i} + \frac{1}{2-i} \cdot \frac{1}{z-2}
\end{aligned}
$$

#### 第二步 确定每一项的奇点在圆环内侧还是外侧

- $\frac{1}{z-i}$的奇点$z=i$在圆环内侧，所以$\frac{1}{z-i}$是负幂项
- $\frac{1}{z-2}$的奇点$z=2$在圆环外侧，所以$\frac{1}{z-2}$是正幂项

#### 第三步 展开每一项

*负幂项的自变量为$\frac{1}{z}$，正幂项的自变量为$z$*

之所以需要化为$\frac{1}{z}$，是为了将展开后的收敛域"翻转"至边界的外侧

正幂项内侧收敛，负幂项外侧收敛，两侧一夹就形成了环形收敛域

$$
\begin{aligned}
f(z) &= \frac{1}{(z-i)(z-2)} = \frac{1}{i-2} \cdot \frac{1}{z-i} + \frac{1}{2-i} \cdot \frac{1}{z-2} \\
&= \frac{1}{i-2} \cdot \frac{1}{z} \cdot \frac{1}{1 - \frac{i}{z}} + \frac{1}{2-i} \cdot \left(-\frac{1}{2-z}\right) \\
&= \frac{1}{i-2} \cdot \frac{1}{z} \sum_{n=0}^{\infty} \left(\frac{i}{z}\right)^n + \frac{1}{2-i} \sum_{n=0}^{\infty} \left(\frac{z}{2}\right)^n \quad (|z| > 1, |z| < 2) \quad \text{利用几何级数} \\
&= \sum_{n=0}^{\infty} \frac{i^n}{(i-2)} \cdot \frac{1}{z^{n+1}} + \sum_{n=0}^{\infty} \frac{z^n}{(2-i) 2^n} \\
&= \sum_{n=1}^{\infty} \frac{i^{n-1}}{(i-2)} \cdot \frac{1}{z^n} + \sum_{n=0}^{\infty} \frac{z^n}{(2-i) 2^n}
\end{aligned}
$$

### 裂项技巧：覆盖法

$$
\frac{P(x)}{(x-a_1)(x-a_2)\dots(x-a_n)} = \frac{A_1}{x-a_1} + \frac{A_2}{x-a_2} + \dots + \frac{A_n}{x-a_n}
$$

若要求$A_k$，则将等式两边同乘以$(x-a_k)$

令$x=a_k$，此时除了$A_k$外，其他项均得0

所以

$$
A_k = \frac{P(a_k)}{(a_k - a_1)(a_k - a_2) \dots (a_k - a_{k-1})(a_k - a_{k+1}) \dots (a_k - a_n)}
$$

由此可得每个系数$A_k$的值
