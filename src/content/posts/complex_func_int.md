---
title: '[复变函数] 复变函数的积分'
published: 2025-07-10 13:28:01
tags: [复变函数,数学]
category: 大学数学
# mathjax: true
# katex: true
---

## 积分的存在性及求法

### 结论1

如果$f(z)=u(x,y)+iv(x,y)$在有向光滑曲线$C$上连续，那么$f(z)$沿曲线$C$的积分存在，并且

$$
 \int _C f(z)dz=\int _C udx-vdy + i\int _C vdx +udy
$$

### 结论2

如果

$$
\begin{aligned}
z=z(t)=x(t)+iy(t)\\
(t_0\le t\le T) \\
z_0 = z(t_0),Z=z(T)
\end{aligned}
$$

那么

$$
\begin{aligned}
\int _C f(z)dz&=\int_{t_0}^T f\left [ z(t) \right ]z^{\prime}(t)dt \\
&=\int_{t_0}^T \left [ u(t)x^{\prime}(t) - v(t)y^{\prime}(t) \right ]dt
\end{aligned}
$$

> [!NOTE]
> 所以
>
> $$
> \begin{aligned}
>  \int _C f(z)dz&=\int _C udx-vdy + i\int _C vdx +udy \\
>  &=\int_{t_0}^T \left [ u(t)x^{\prime}(t) - v(t)y^{\prime}(t) \right ]dt + i\int_{t_0}^T \left [ u(t)y^{\prime}(t) + v(t)x^{\prime}(t) \right ]dt \\
>  &=\int_{t_0}^T \left [ u(t)+iv(t) \right ] \cdot \left [ x^{\prime}(t) + iy^{\prime}(t) \right ]dt
> \end{aligned}
> $$

### 结论3

如果#C#为以$z_0$中心，$r$为半径的正向圆周，那么

$$
\int _C \frac{1}{(z-z_0)^n}dz=\begin{cases}
2\pi i,&n=1 \\
0,&n \ne 1 \text{的整数}
\end{cases}
$$

## 复变函数积分的基本性质

$$
\begin{aligned}
&\int _C af(z)dz=a\int_C f(z)dz \quad \text{($a$是复常数)} \\
&\int _C \left [ f(z)+g(z) \right ] dz = \int _C f(z)dz + \int _C g(z)dz \\
&\int _{C^{-}} f(z)dz = -\int _{C} f(z)dz
\end{aligned}
$$

若$C$是由$C_1,C_2,\cdots,C_n$连接而成，则

$$
\begin{aligned}
\int _C f(z)dz = \sum_{k=1}^{n} \int_{C_k} f(z)dz
\end{aligned}
$$

如果在$C$上，$\left | f(z) \right | \le M$，曲线$C$长度为$L$，那么

$$
\left | \int _C f(z)dz \right | \le ML
$$

## 柯西-古萨基本定理
