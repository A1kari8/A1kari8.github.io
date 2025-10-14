---
title: "[复变函数] 初等函数"
published: 2025-09-26 22:13:00
tags: [复变函数,数学]
category: 复变函数
---

## 复变函数的指数函数

<!-- {% note blue 'fas fa-clipboard' %} -->
需要满足的条件:

1. $f(z)$在复平面内**解析**
2. $f^{\prime}(z)=f(z), z \in C$
3. $\mathit{Im}(z)=0$时，$f(z)=e^x$,其中$x=\mathit{Re}(z)$，可见$f(z)=e^x \left ( \cos y + i\sin y \right )$
<!-- {% endnote %} -->

如果$z=x+iy$，那么称函数$f(z)=e^x \left ( \cos y + i\sin y \right )$为复变数$z$的指数函数，记作$\exp z$

$$
\begin{aligned}
\exp z &= e^x \left ( \cos y + i\sin y \right ) = e^{x+iy} \\
\left | \exp z \right | &= e^x \\
\arg (\exp z) &= y + 2k\pi
\end{aligned}
$$

### 复变指数函数的特殊性质

$e^z$是以$2k\pi i$为周期的周期函数

## 复变函数的对数函数

若$z \ne 0$，称满足方程$e^{\omega}=z$的函数$\omega=f(z)$为复变数$z$的对数函数，记作

$$
\omega = \mathit{Ln} z
$$

令$\omega = u+iv$，则有$z=e^{u+iv}=e^{u} \cdot e^{iv}$

$\because e^{u}=\left | z \right |,v=\arg z$

$\therefore \omega = \mathit{Ln}z=\ln{\left |z \right |}+i\arg z + 2k\pi i$ ($k=0$时为**主值**)

:::caution

指定$k$为某具体值时

$\mathit{Ln}z^n \ne n\mathit{Ln}z$ 与 $\mathit{Ln}\sqrt[n]{z} \ne \frac{1}{n}\mathit{Ln}z$ 不一定成立

:::

## 复数的乘幂

$$
\mathbf{a^b}=e^{\mathbf{b}\mathit{Ln}\mathbf a}=e^{\mathbf{b}\ln \mathbf a} \cdot e^{2 \mathbf{b} k \pi i}
$$

当$b$为整数时，$e^{2\mathbf{b}k\pi i}=1$，因$2\mathbf{b}k\pi$是$2k\pi$的倍数，故$\mathbf{a^b}$仅有一个值

当$b$为非整有理数$\frac{p}{q}$时，$e^{2\mathbf{b}k\pi i}=e^{2\mathbf{\frac{p}{q}k\pi i}}$，$\mathbf{a^b}$具有$q$个值

对于其他形式，有无穷多个值

## 复变函数的幂函数

形如

$$
z^{\mathbf{b}}=e^{\mathbf{b}\mathit{Ln}z}
$$

的函数称为幂函数($\mathbf{b}$为常复数)

$$
\begin{aligned}
z^{\mathbf{b}}&=e^{\mathbf{b}\mathit{Ln}z} \\
&= e^{\mathbf{b}\ln{\left | z \right |}}\left [ \cos{\mathbf{b} \left ( \arg z + 2k\pi \right ) } + i \sin{\mathbf{b} \left ( \arg z + 2k\pi \right ) }  \right ] \text{ (k为任意整数)}
\end{aligned}
$$

### 复变幂函数的求导公式仍然成立

$\left ( z^{\mathbf{b}} \right ) ^{\prime}=\mathbf{b}z^{\mathbf{b-1}}$

## 复变三角函数

由[欧拉公式](#欧拉公式)

$$
\begin{aligned}
e^{i\theta} = \cos \theta + i\sin \theta \\
e^{-i\theta} = \cos \theta - i\sin \theta
\end{aligned}
$$

得到

$$
\begin{aligned}
\cos \theta = \frac{e^{i \theta}+e^{-i \theta}}{2} \\
\sin \theta = \frac{e^{i \theta}-e^{-i \theta}}{2i}
\end{aligned}
$$

$\theta = z$为复数时仍然成立

### 复变三角函数性质

都在复平面内解析，其余与实变函数相同

公式

$$
\begin{aligned}
\cos z &= \cos{\left ( x+iy \right )}&=\cos x \cosh y - i\sin x\sinh y \\
\sin z &= \sin{\left ( x+iy \right )}&=\sin x \cosh y + i\cos x\sinh y
\end{aligned}
$$

### 双曲函数

$$
\begin{aligned}
\cosh x &= \cos ix &= \frac{e^{x}+e^{-x}}{2}\\
\sinh x &= -i\sin ix &= \frac{e^{x}-e^{-x}}{2}
\end{aligned}
$$

:::warning

用欧拉公式表示的$e$的形式需要重点记忆，题目中可能会出现双曲函数和三角函数之间的转换

:::

## 反三角函数

$$
\begin{aligned}
\arcsin z &= -i\mathit{Ln}\left ( iz +\sqrt{1-z^2} \right ) \\
\arccos z &= -i\mathit{Ln}\left ( iz +\sqrt{z^2-1} \right ) \\
\arctan z &= -\frac{i}{2}\mathit{Ln}\frac{1+iz}{1-iz}
\end{aligned}
$$

## 反双曲三角函数

$$
\begin{aligned}
\text{arcsinh} z &= \mathit{Ln}\left ( z +\sqrt{z^2+1} \right ) \\
\text{arccosh} z &= \mathit{Ln}\left ( z +\sqrt{z^2-1} \right ) \\
\text{arctanh} z &= \frac{1}{2}\mathit{Ln}\frac{1+z}{1-z}
\end{aligned}
$$
