---
title: "[概率论] 分布函数 密度函数"
published: 2025-11-23 17:40:00
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
F(x) = \int_{-\infty}^{x} f(t) \, dt \\[1.5em]
f(x) = F^{\prime}(x)
\end{aligned}
$$

## 连续型随机变量取个别值的概率为0

$$
P(X = x) = P(x \le X \le x) = F(x) - F(x) = 0
$$

:::tip
一个事件的概率为0不一定是不可能发生的事件；概率为1也不一定是必然发生的事件
:::

## 常见题型

### 已知密度函数，求分布函数

$$
F(x) = \int_{x_1}^{x_2} f(x) \, dx
$$

$x_1, x_2$分别为密度函数区间的上下限

注意分布函数是累计概率，需要叠加之前区间的概率

e.g.

已知密度函数
$$
f(x) = \begin{cases}
\dfrac{1}{b-a}, \quad a < x < b \\[1.5em]
0, \quad \text{其他}
\end{cases}
$$
求分布函数，解：

$$
F(x) = \begin{cases}
\int_{-\infty}^{x} 0 \, dx = 0, \quad x \le a \\[1.5em]
\int_{a}^{x} \dfrac{1}{b-a} \, dx + 0 = \dfrac{x-a}{b-a}, \quad a < x < b \\[1.5em]
\int_{a}^{b} \dfrac{1}{b-a} \, dx + 0 = 1, \quad x \ge b
\end{cases}
$$

### 已知分布函数，求密度函数

$$
f(x) = F^{\prime}(x)
$$

这个就很无脑了，直接求导完把对应的分布函数的区间抄下来就行
