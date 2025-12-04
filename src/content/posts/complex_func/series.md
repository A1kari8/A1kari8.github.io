---
title: '[工科复变函数] 级数'
published: 2025-09-26 23:38:00
tags: [复变函数,数学]
category: 复变函数
draft: false
---

## 微积分级数复习

### p-级数

$$
\sum_{n=1}^{\infty} \frac{1}{n^p}
$$

当 $p \leq 1$ 时，发散；当 $p > 1$ 时，收敛。

### 几何级数

$$
\sum_{n=0}^{\infty} ar^n = \frac{a}{1-r} \quad (|r| < 1)
$$

### 正项级数的判敛法

:::warning
这个判别法比较重要，需要看，其余部分大概率是不会考了
:::

#### 比较判别法

若 $0 \leq a_n \leq b_n$，则

- 若 $\large \sum b_n$ 收敛，则 $\large \sum a_n$ 收敛
- 若 $\large \sum a_n$ 发散，则 $\large \sum b_n$ 发散

#### 比值判别法

设 $\lim\limits_{n \to \infty} \frac{a_{n+1}}{a_n} = L$，则

- 若 $L < 1$，则 $\large \sum a_n$ 收敛
- 若 $L > 1$，则 $\large \sum a_n$ 发散
- 若 $L = 1$，则无法判断

#### 根值判别法

设 $\lim\limits_{n \to \infty} \sqrt[n]{a_n} = L$，则

- 若 $L < 1$，则 $\large \sum a_n$ 收敛
- 若 $L > 1$，则 $\large \sum a_n$ 发散
- 若 $L = 1$，则无法判断

#### 积分判别法

设 $f(x)$ 在 $[1, +\infty)$ 上连续、正值且单调递减，且 $a_n = f(n)$，则 $\large \sum a_n$ 与 $\int_1^{\infty} f(x) \, dx$ 同敛散

#### 莱布尼兹判别法

设 $\{a_n\}$ 单调递减且 $\lim\limits_{n \to \infty} a_n = 0$，则交错级数 $\large \sum (-1)^{n-1} a_n$ 收敛

## 复数项级数

$$
\sum_{n=1}^{\infty} z_n ( z_n = a_n + ib_n)
$$

### 收敛的充分必要条件

$\large \sum\limits_{n=1}^{\infty} a_n$ 和 $\large \sum\limits_{n=1}^{\infty} b_n$ 同时收敛

### 收敛的必要条件

$\lim\limits_{n \to \infty} z_n = 0$

### 绝对收敛与条件收敛

若 $\large \sum\limits_{n=1}^{\infty} |z_n|$ 收敛，则 $\large \sum\limits_{n=1}^{\infty} z_n$ **绝对收敛**；

若 $\large \sum\limits_{n=1}^{\infty} z_n$ 收敛但不**绝对收敛**，则**条件收敛**。

绝对收敛 $\supset$ 条件收敛。

在收敛域内一定绝对收敛并且一致收敛（不包含边界），条件收敛只可能出现在边界上

#### 复数取绝对值就是取模

$$
|z| = \sqrt{a^2 + b^2}
$$

### 复变函数项级数

$$
\sum_{n=1}^{\infty} f_n(z)
$$

#### 收敛域

级数 $\large \sum f_n(z)$ 收敛的点的全体称为收敛域

#### 和函数

$$
\begin{aligned}
s_n(z) &= \sum_{n=1}^{\infty} f_n(z) \\
s(z) &= \lim_{n \to \infty} s_n(z)
\end{aligned}
$$

$s(z)$ 称为级数 $\large \sum f_n(z)$ 的和函数

#### 定理 4.1.7

若级数 $\large \sum f_n(z)$ 在域 $D$ 上**一致收敛**于和函数 $s(z)$，且各项 $f_n(z)$ 在域 $D$ 上连续，则其和函数 $s(z)$ 在域 $D$ 内处处连续

### 幂级数

$$
\sum_{n=0}^{\infty} a_n (z - z_0)^n
$$

#### 阿贝尔定理

若幂级数在点$z_1$ 收敛，则在以$z_0$为圆心、$|z_1 - z_0|$为半径的圆盘内**绝对收敛**，且在所有半径小于$|z_1 - z_0|$的闭圆盘上**一致收敛**

#### 求收敛半径

##### 比值法

若极限$\lim\limits_{n \to \infty} |\frac{a_{n+1}}{a_n}| = \lambda$，则收敛半径为

$$
R = \left\{\begin{matrix}
+\infty, & \lambda = 0 \\
\frac{1}{\lambda}, & 0 < \lambda < +\infty \\
0, & \lambda = +\infty
\end{matrix}\right.
$$

##### 根值法

后面的就不写了，和实变函数的判别法都是一样的

#### 柯西乘积

设级数 $\large \sum_{n=0}^{\infty} a_n z^n$ 和 $\large \sum_{n=0}^{\infty} b_n z^n$ 的和分别为 $A$ 和 $B$，则级数

$$
\sum_{n=0}^{\infty} c_n z^n = \sum_{n=0}^{\infty} \left( \sum_{k=0}^{n} a_k b_{n-k} \right) z^n
$$

称为柯西乘积，记作 $C = A \cdot B$
