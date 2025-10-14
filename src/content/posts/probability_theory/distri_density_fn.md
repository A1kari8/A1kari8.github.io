---
title: "[概率论] 分布函数 密度函数"
published: 2025-10-14 11:10:00
tags: [概率论,数学]
category: 概率论
---

用于解决区间上的概率问题

## 区间上的概率

$$
P(x_1 < X \le x_2) = P(X \le x_2) - P(X \le x_1) = F(x_2) - F(x_1)
$$

## 分布函数

$$
F(x) = P(X \le x)
$$

### 分布函数的性质

$$
\begin{aligned}
F(-\infty) &= \lim_{x \to -\infty} F(x) = 0 \\
F(+\infty) &= \lim_{x \to +\infty} F(x) = 1 \\
F(x_1) &\le F(x_2), \quad x_1 < x_2 \quad \text{（单调不减）} \\
F(x^+) &= F(x) \quad \text{（右连续）}
\end{aligned}
$$

## 密度函数

用$f(x)$表示

$$
\begin{aligned}
F(x) = \int_{-\infty}^{x} f(t) \, dt \\
f(x) = F^{\prime}(x)
\end{aligned}
$$

## 连续型随机变量取个别值的概率为0

$$
P(X = x) = P(x \le X \le x) = F(x) - F(x) = 0
$$
