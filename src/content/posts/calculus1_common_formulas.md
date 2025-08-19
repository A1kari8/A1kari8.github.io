---
title: 微积分上册常用公式
published: 2025-01-02 13:37:18
tags: [微积分,数学]
category: 大学数学
---

## 1. 常见等价无穷小

$$
\begin{aligned}
\large ln\left(1+x\right)&\large\sim\ x \\\\
\large log_a\left(1+x\right)&\large\sim\frac{x}{lna} \\\\
\large1-cosx &\large\sim\frac{1}{2}x^2 \\\\
\large x-sin{x}&\large\sim\frac{1}{6}x^3 \\\\
\large\left(1+x\right)^\alpha-1&\large\sim\alpha\ x \\\\
\large x-arctan{x}&\large\sim\frac{1}{3}x^3 \\\\
\large e^x-1&\large\sim\ x \\\\
\large a^x-1&\large\sim\ xlna \\\\
\large tan{x}-x&\large\sim\frac{1}{6}x^3 \\\\
\large arcsin{x}-x&\large\sim\frac{1}{6}x^3 \\\\
\large tan{x}-sin{x}&\large \sim\frac{1}{2}x^3
\end{aligned}
$$

## 2. 高中大概率没讲过的导数

$$
\begin{aligned}
\large \left(arctan{x}\right)^\prime&\large=\frac{1}{1+x^2} \\\\
\large \left(arcsin{x}\right)^\prime&\large=\frac{1}{\sqrt{1-x^2}} \\\\
\large \left(arccos{x}\right)^\prime&\large=\frac{-1}{\sqrt{1-x^2}} \\\\
\large \left(cot{x}\right)^\prime&\large=\frac{-1}{sin^2x}
\end{aligned}
$$

## 3. 高阶导数

$$
\begin{aligned}
\large\left(x^\alpha\right)^{\left(n\right)}&\large=\alpha\left(\alpha-1\right)\ldots\left(\alpha-n+1\right)x^{\alpha-n} \\\\
\large \left(\frac{1}{x}\right)^{\left(n\right)}&\large=\frac{\left(-1\right)^nn!}{x^{n+1}} \\\\
\large \left(a^x\right)^{\left(n\right)}&\large=\left(lna\right)^na^x \\\\
\large \left(sin{x}\right)^{\left(n\right)}&\large=sin{\left(x+\frac{n\pi}{2}\right)} \\\\
\large \left(cos{x}\right)^{\left(n\right)}&\large=cos{\left(x+\frac{n\pi}{2}\right)}
\end{aligned}
$$

### 高阶导莱布尼茨公式

用于解决一些两式相乘求高阶导，k大于等于某值后其中一导数为零

$\large\left(f\left(x\right)g\left(x\right)\right)^{\left(n\right)}=\sum\limits_{k=0}^{n}C_n^kf\left(x\right)^{\left(k\right)}g\left(x\right)^{\left(n-k\right)}$

## 4. 曲率

$$
\begin{aligned}
\large K=\frac{ \left|y^{\prime\prime}\right|}{\left(1+y^{\prime2}\right)^\frac{3}{2}}
\end{aligned}
$$

曲率半径 $\large R=\frac{\large 1}{\large K}$

## 5. 不定积分

$$
\begin{aligned}
\large \int\frac{1}{sin^2x}dx&\large=\int{csc}^2{x}dx=-cot{x}+C \\\\
\large \int{\frac{1}{\sqrt{x^2+a^2}}dx}&\large=ln\left(x+\sqrt{x^2+a^2}\right)+C \\\\
\large \int{sec{x}dx}&\large=ln\left|sec{x}+tan{x}\right|+C \\\\
\large \int{\frac{1}{\sqrt{x^2-a^2}}dx}&\large=ln\left|x+\sqrt{x^2-a^2}\right|+C \\\\
\large \int s e c{x}tan{x}dx&\large=sec{x}+C \\\\
\large \int c o t{x}dx&\large=ln\left|sin{x}\right|+C \\\\
\large \int c s c{x}dx&\large=ln\left|csc{x}-cot{x}\right|+C \\\\
\large \int c s c{x}cot{x}dx&\large=-csc{x}+C
\end{aligned}
$$

## 6. 积分求导法则

$\large \left(\int_{a}^{g\left(x\right)}f\left(t\right)dt\right)^{\prime}=f\left(g\left(x\right)\right)g^\prime\left(x\right)\ \ \ \text{a为常数}$
