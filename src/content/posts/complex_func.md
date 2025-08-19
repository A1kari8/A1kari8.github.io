---
title: "[复变函数] 解析函数"
published: 2025-07-07 21:08:57
tags: [复变函数,数学]
category: 大学数学
---

## 复变函数的微分

复变函数的微分由导数定义

$$
d\omega |_{z=z_0} = f^{\prime}(z_0)\Delta z

$$
所以要证明复变函数在某点是否可微时要算该点的导数是否存在
$$

f^{\prime}(z_0) = \frac{f(z_0+\Delta z)-f(z_0)}{\Delta z}
$$

## 解析

$f(z)$在$z_0$点处可导 $\Leftarrow$ $f(z)$在$z_0$处解析

$f(z)$在$z_0$点处的**邻域**可导 $\Leftrightarrow f(z)$在$z_0$处解析

## 柯西-黎曼条件

### 定理1

函数$f(z)=u(x,y)+iv(x,y)$在区域$D$内有定义则：

$f(z)$在点$z=x+iy$**可微** $\Leftrightarrow$ 在点$(x,y)$处，$u(x,y),v(x,y)$**可微**且满足**柯西-黎曼条件**：

$$
\begin{aligned}
 \frac{\partial u}{\partial x} &= \frac{\partial v}{\partial y} \\
 \frac{\partial u}{\partial y}&=-\frac{\partial v}{\partial x}
\end{aligned}
$$

如果$f(z)$在点$z=x+iy$**可微**，那么

$$
f^{\prime}(z) = \frac{\partial u}{\partial x} + i \frac{\partial v}{\partial x} = \frac{\partial u}{\partial x} - i\frac{\partial u}{\partial y}
$$

### 定理2

$f(z)$在区域$D$内**解析** $\Leftrightarrow$ $u(x,y),v(x,y)$在区域$D$内**可微**且满足**柯西-黎曼条件**

## 辐角的连续性

辐角 $\omega = \arg z$ 在**除去原点和负实轴**的复平面上连续

## 复变函数的指数函数

<!-- {% note blue 'fas fa-clipboard' %} -->
需要满足的条件:

1. $f(z)$在复平面内**解析**
2. $f^{\prime}(z)=f(z), z \in C$
3. $\mathit{Im}(z)=0$时，$f(z)=e^x$,其中$x=\mathit{Re}(z)$，可见$f(z)=e^x \left ( \cos y + i\sin y \right )$
<!-- {% endnote %} -->

### 欧拉公式

> [!TIP]
> $e^{i \varphi}=\cos \varphi + i\sin \varphi$

### 定义1

如果$z=x+iy$，那么称函数$f(z)=e^x \left ( \cos y + i\sin y \right )$为复变数$z$的指数函数，记作$\exp z$

$$
\begin{aligned}
 \exp z &= e^x \left ( \cos y + i\sin y \right ) = e^{x+iy} \\
 \left | \exp z \right | &= e^x \\
 \arg (\exp z) &= y + 2k\pi
\end{aligned}
$$

### 复变指数函数的特殊性质

> [!NOTE]
> $e^z$是以$2k\pi i$为周期的周期函数

## 复变函数的对数函数

### 定义

若$z \ne 0$，称满足方程$e^{\omega}=z$的函数$\omega=f(z)$为复变数$z$的对数函数，记作

$$
\omega = \mathit{Ln} z
$$

令$\omega = u+iv$，则有$z=e^{u+iv}=e^{u} \cdot e^{iv}$

$\because e^{u}=\left | z \right |,v=\arg z$

$\therefore \omega = \mathit{Ln}z=\ln{\left |z \right |}+i\arg z + 2k\pi i$ ($k=0$时为**主值**)

> [!WARNING]
>
> ### 注意
>
>$\mathit{Ln}z^n=n\mathit{Ln}z,\mathit{Ln}\sqrt[n]{z}=\frac{1}{n}\mathit{Ln}z$不再成立

## 乘幂

$$
\mathbf{a^b}=e^{\mathbf{b}\mathit{Ln}\mathbf a}=e^{\mathbf{b}\ln \mathbf a} \cdot e^{2 \mathbf{b} k \pi i}
$$

当$b$为整数时，$e^{2\mathbf{b}k\pi i}=1$，$\mathbf{a^b}\text{具有单一的值}$

当$b$为非整有理数时，$e^{2\mathbf{b}k\pi i}=e^{2\mathbf{\frac{p}{q}k\pi i}}$，$\mathbf{a^b}$具有$q$个值

对于其他形式，有无穷多个值

## 复变函数的幂函数

### 定义5

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

### 幂函数的导数

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

### 双曲三角函数

$$
\begin{aligned}
\cosh x &= \cos ix &= \frac{e^{x}+e^{-x}}{2}\\
\sinh x &= -i\sin ix &= \frac{e^{x}-e^{-x}}{2}
\end{aligned}
$$

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
