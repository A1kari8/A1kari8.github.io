---
title: "[复变函数] 解析函数"
published: 2025-07-07 21:08:57
tags: [复变函数,数学]
category: 大学数学
---

## 复变函数的导数与微分

在复变函数中，**可导**与**可微**是等价的

$$
所以要证明复变函数在某点是否可微时只需算该点的导数是否存在
$$

$$
f^{\prime}(z_0) = \frac{f(z_0+\Delta z)-f(z_0)}{\Delta z}
$$

## 解析

### 解析与可导的区别

解析用于描述**区域**而可导用于描述**点**，也就是**解析** $\supseteq$ **可导**

若函数在一个区域内处处可导，则称该函数在该区域内**解析**

$f(z)$在$z_0$点处可导 $\Leftarrow$ $f(z)$在$z_0$处解析

$f(z)$在$z_0$点处的**邻域**可导 $\Leftrightarrow f(z)$在$z_0$处解析

## 柯西-黎曼条件

函数$f(z)=u(x,y)+iv(x,y)$在区域$D$内有定义则：

$f(z)$在点$z=x+iy$**可微**/**可导** $\Leftrightarrow$ 在点$x+iy$处，$u(x,y),v(x,y)$**可微**/**可导**且满足**柯西-黎曼条件**：

$$
\begin{aligned}
 \frac{\partial u}{\partial x} &= \frac{\partial v}{\partial y} \\
 \frac{\partial u}{\partial y}&=-\frac{\partial v}{\partial x}
\end{aligned}
$$

柯西-黎曼条件仅是$f(z)$可导的**必要条件**，但若再证明$u^{\prime}_x,u^{\prime}_y,v^{\prime}_x,v^{\prime}_y$在$z$点处连续，则可得到$f(z)$在$z$点处**可微**/**可导**的**充分必要条件**

### 如何求得/证明一个函数的解析区域

1. 先使用**柯西-黎曼条件**，求出$u,v$的偏导数
2. 列出方程组，解出$x,y$为何值时满足柯西-黎曼条件
3. 判断$u^{\prime}_x,u^{\prime}_y,v^{\prime}_x,v^{\prime}_y$在$x,y$的取值范围内是否连续，若不连续则不可导
4. $x,y$为点或线，则函数无解析区域，函数在此处可导；若$x,y$为区域，函数在此区域内解析

## 解析的一个必要条件

若$\omega = u(x,y) + iv(x,y)$是解析函数，则$\frac{\partial\omega}{\partial \bar z}=0$，即$\omega$只用$z$就可表示