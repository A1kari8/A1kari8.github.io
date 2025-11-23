---
title: "[概率论] 二维连续型随机变量"
published: 2025-11-23 20:13:00
tags: [概率论,数学]
category: 概率论
---

$f(x,y)$为二维随机变量$(X, Y)$的概率密度函数

## 分布函数

$$
F(x,y) = P(X \le x, Y \le y) = \int_{-\infty}^{y} \int_{-\infty}^{x} f(u,v) \, du \, dv
$$

概率密度相当于平面的质量密度，分布函数相当于某一区域的质量总和

$$
\dfrac{\partial^2 F(x,y)}{\partial x \partial y} = f(x,y)
$$

## 区域概率

设$G$为平面上的一个区域，则点$(X, Y)$落在区域$G$内的概率为

$$
P\left((X, Y) \in G\right) = \iint_{G} f(x,y) \, dx \, dy
$$

## 边缘分布

$$
f_X(x) = \int_{-\infty}^{\infty} f(x,y) \, dy
$$
$$
f_Y(y) = \int_{-\infty}^{\infty} f(x,y) \, dx
$$

## 常见二维连续型分布

### 二维均匀分布

设$(X, Y)$在区域$G$内服从二维均匀分布，则其概率密度函数为
$$
f(x,y) = \begin{cases}
\dfrac{1}{S(G)}, & (x,y) \in G \\
0, & \text{otherwise}
\end{cases}
$$

$S(G)$为区域$G$的面积

设$D$为$G$的子区域，则可以很直观地得到
$$
P\left((X, Y) \in D\right) = \frac{S(D)}{S(G)}
$$
就是子区域面积占总面积的比例

### 二维正态分布

设$(X, Y)$服从二维正态分布，记为
$$
(X, Y) \sim N(\mu_X, \mu_Y, \sigma_X^2, \sigma_Y^2, \rho)
$$

$\rho$为相关系数，$-1 \le \rho \le 1$

则其概率密度函数为
$$
f(x,y) = \frac{1}{2 \pi \sigma_X \sigma_Y \sqrt{1 - \rho^2}} \exp{\left\{ -\frac{1}{2(1 - \rho^2)} \left[ \frac{(x - \mu_X)^2}{\sigma_X^2} - \frac{2 \rho (x - \mu_X)(y - \mu_Y)}{\sigma_X \sigma_Y} + \frac{(y - \mu_Y)^2}{\sigma_Y^2} \right] \right\}}
$$

> 我草了怎么这么长

#### 边缘密度

其实就是一维正态分布密度函数
$$
f_X(x) = \frac{1}{\sqrt{2 \pi} \sigma_X} \exp{\left( -\frac{(x - \mu_X)^2}{2 \sigma_X^2} \right)}
$$
$y$的同理
