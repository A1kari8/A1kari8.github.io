---
title: '[复变函数] 泰勒级数'
published: 2025-09-27 16:37:00
tags: [复变函数,数学]
category: 复变函数
draft: false
---

这篇的常见级数主要在洛朗级数中使用，复变的考试不会再考泰勒级数了

## 泰勒级数

$$
f(z) = \sum_{n=0}^{\infty} \frac{f^{(n)}(z_0)}{n!} (z - z_0)^n
$$

## 常用的泰勒级数

$$
\begin{aligned}
\frac{1}{1+z} = \sum_{n=0}^{\infty} (-1)^n z^n \quad |z| < 1 \\
\frac{1}{1-z} = \sum_{n=0}^{\infty} z^n \quad |z| < 1
\end{aligned}
$$

### 自然对数

$$
\ln(1+z) = \sum_{n=1}^{\infty} (-1)^{n-1} \frac{z^n}{n} \quad |z| < 1
$$

### 自然指数函数

$$
e^z = \sum_{n=0}^{\infty} \frac{z^n}{n!} \quad |z| < \infty
$$

### 正弦函数

$$
\sin z = \sum_{n=0}^{\infty} (-1)^n \frac{z^{2n+1}}{(2n+1)!} \quad |z| < \infty
$$

### 余弦函数

$$
\cos z = \sum_{n=0}^{\infty} (-1)^n \frac{z^{2n}}{(2n)!} \quad |z| < \infty
$$

正弦、余弦和自然指数函数的收敛域非常棒，展开洛朗级数的时候直接无脑展开
