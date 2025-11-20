---
title: "[复变函数] 留数在实变函数积分中的应用"
published: 2025-10-24 19:21:00
tags: [复变函数,数学]
category: 复变函数
---

应用留数可以计算某些难以直接计算的实积分

通常有以下几种形式：

## 第一种

$$
\int_{0}^{2\pi} R(\cos{\theta}, \sin{\theta}) d\theta
$$

利用欧拉公式将$\cos{\theta}$和$\sin{\theta}$表示为复指数的形式：s

设$z = e^{i\theta}$，则

$$
\cos{n\theta} = \frac{z^n + \frac{1}{z^n}}{2}, \quad \sin{n\theta} = \frac{z^n - \frac{1}{z^n}}{2i}
$$

代入得到

$$
R(\cos{\theta}, \sin{\theta}) = R\left(\frac{z + \frac{1}{z}}{2}, \frac{z - \frac{1}{z}}{2i}\right) = f(z)
$$

从而将积分变量从$\theta$变为$z$，并利用留数定理计算积分

$$
\boxed{\int_{0}^{2\pi} R(\cos{\theta}, \sin{\theta}) d\theta = 2\pi i \sum_{k}^{p} \text{Res}(f(z),z_k)}
$$

$z_k$是$f(z)$在**单位圆**内的所有孤立奇点

有时会遇到积分区域不是$0$到$2\pi$，而是$0到\pi$、$-\pi$到$\pi$等情况，这些都可以利用周期性或奇偶性进行转换

## 第二种

$$
\int_{-\infty}^{+\infty} f(x) dx
$$

$$
\int_{-\infty}^{+\infty} f(x) dx = 2\pi i \sum_{k}^{p} \text{Res}(f(z),z_k)
$$

$z_k$是$f(z)$在**上半平面**内的所有孤立奇点

## 第三种

$f(x)$的分母至少比分子高出一阶

$$
\int_{-\infty}^{+\infty} f(x) e^{i\lambda x} dx
$$

$$
\int_{-\infty}^{+\infty} f(x) e^{i\lambda x} dx = 2\pi i \sum_{k}^{p} \text{Res}(f(z)e^{i\lambda z},z_k) + \pi i \sum_{k}^{q} \text{Res}(f(x)e^{i\lambda x},x_k)
$$

$z_k$是$f(z)$在**上半平面**内的所有孤立奇点，$x_k$是实轴上的一阶极点，且$\lambda > 0$

有时候可能遇到比较隐蔽的形式，比如

$$
\int_{-\infty}^{+\infty} \frac{\cos{\lambda x}}{g(x)} dx
$$

可以将原式补齐$i\sin{\lambda x}$再利用$\mathbf{Re}化成欧拉公式的形式$：

$$
\begin{aligned}
\int_{-\infty}^{+\infty} \frac{\cos{\lambda x}}{g(x)} dx &= \int_{-\infty}^{+\infty} \frac{ \mathbf{Re} \left ( \cos{\lambda x} + i\sin{\lambda x} \right )}{g(x)} dx \\[1.5em]
&= \mathbf{Re} \left ( \int_{-\infty}^{+\infty} \frac{e^{i\lambda x}}{g(x)} dx \right )
\end{aligned}
$$

然后利用第三种形式计算积分即可
