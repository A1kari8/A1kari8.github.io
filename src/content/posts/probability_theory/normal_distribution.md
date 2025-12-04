---
title: "[工科概率论] 正态分布"
published: 2025-11-23 17:51:00
tags: [概率论,数学]
category: 概率论
---

## 正态分布定义

$$
X \sim N(\mu, \sigma^2)
$$

$$
\large f(x) = \frac{1}{\sqrt{2 \pi} \sigma} e^{\large  -\frac{(x - \mu)^2}{2 \sigma^2}}
$$

其中，$\mu$为均值，$\sigma^2$为方差

## 标准正态分布

$$
Z = \frac{X - \mu}{\sigma} \sim N(0, 1)
$$

求解正态分布概率时，需要转换为标准正态分布后才能查表

## 标准正态分布的分布函数

$$
\Phi(z) = P(Z \le z)
$$

性质：

$$
\begin{aligned}
\Phi(-z) &= 1 - \Phi(z) \\
P(-z \le Z \le z) &= 2\Phi(z) - 1
\end{aligned}
$$

## 正态分布概率计算

设
$$
X \sim N(\mu, \sigma^2)
$$
则
$$
P(a \le X \le b) = \Phi\left(\frac{b - \mu}{\sigma}\right) - \Phi\left(\frac{a - \mu}{\sigma}\right)
$$

## 上侧$\alpha$分位数

设$X \sim N(0, 1)$，对给定的$0 < \alpha < 1$，若数$u_{\alpha}$满足条件：

$$
P(Z > u_{\alpha}) = \alpha
$$
或者说
$$
\Phi(u_{\alpha}) = 1 - \alpha
$$

则称$u_{\alpha}$为标准正态分布的**上侧$\alpha$分位数**

## 正态随机变量的线性函数仍为正态随机变量

设$X \sim N(\mu, \sigma^2)$，则对于任意常数$a$和$b$，有
$$
Y = aX + b \sim N(a\mu + b, a^2 \sigma^2)
$$

其实就是均值和方差的性质，因为正态分布的参数就是均值和方差，所以也有这个性质
