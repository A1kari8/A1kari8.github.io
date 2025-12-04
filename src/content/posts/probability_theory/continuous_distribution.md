---
title: "[工科概率论] 各种连续型分布"
published: 2025-11-23 17:44:00
tags: [概率论,数学]
category: 概率论
---

## 均匀分布

$$
X \sim U(a, b)
$$

$$
f(x) = \begin{cases}
\frac{1}{b-a}, & a \le x \le b \\
0, & \text{otherwise}
\end{cases}
$$

$$
F(x) = \begin{cases}
0, & x < a \\
\frac{x-a}{b-a}, & a \le x \le b \\
1, & x > b
\end{cases}
$$

$$
E(X) = \frac{a+b}{2}
$$

$$
D(X) = \frac{(b-a)^2}{12}
$$

## 指数分布

$$
X \sim E(\lambda)
$$

$\lambda$称为指数分布的参数，$\lambda > 0$

$$
f(x) = \begin{cases}
\lambda e^{-\lambda x}, & x \ge 0 \\
0, & x < 0
\end{cases}
$$

$$
F(x) = \begin{cases}
1 - e^{-\lambda x}, & x \ge 0 \\
0, & x < 0
\end{cases}
$$

$$
E(X) = \frac{1}{\lambda}
$$

$$
D(X) = \frac{1}{\lambda^2}
$$

## 正态分布

$$
X \sim N(\mu, \sigma^2)
$$

$$
\large f(x) = \frac{1}{\sqrt{2\pi} \sigma} e^{\large -\frac{(x-\mu)^2}{2\sigma^2}}
$$

分布函数不考察，通过查表求值

$$
E(X) = \mu
$$

$$
D(X) = \sigma^2
$$

### 标准正态分布

$$
X \sim N(0, 1)
$$
