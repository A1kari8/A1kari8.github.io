---
title: 常系数(非)齐次线性微分方程
published: 2025-01-09 18:25:47
tags: [微积分,数学]
category: 大学数学
---

## 齐次线性微分方程求通解

称$\large y^{(n)}+a_{n-1}y^{(n-1)}+\cdots +a_{1}y^{\prime}+a_{0}y=0$为常系数齐次线性微分方程  
$\large \lambda ^{n}+a_{n-1}\lambda ^{n-1}+\cdots +a_{1}\lambda +a_{0}=0$为它的特征方程

### 特征值四种情况

- $\large \lambda$是单实特征根，则$\large y=e^{\lambda x}$ (基础解系)
- $\large \lambda$是$\large k$重实特征根，则基础解系中的$\large k$个解$\large y_1=e^{\lambda x},y_2=xe^{\lambda x},\cdots,y_k=x^{k-1}e^{\lambda x}$
- $\large \lambda=\alpha \pm i\beta$是单复特征根，则方程基础解系中对应的两个解$\large y_1=e^{\alpha x}\cos {\beta x},y_2=e^{\alpha x}\sin{\beta x}$
- $\large \lambda=\alpha \pm i\beta$是$\large k$重复特征根，则对应$\large 2k$个解

$$
\begin{aligned}
\large y_1=e^{\alpha x}\cos{\beta x}&\large,y_2=e^{\alpha x}\sin{\beta x}  \\
\large xe^{\alpha x}\cos{\beta x}&\large,xe^{\alpha x}\sin{\beta x} \\
\large \cdots&\large,\cdots \\
\large x^{k-1}e^{\alpha x}\cos{\beta x}&\large,x^{k-1}e^{\alpha x}\sin{\beta x}
\end{aligned}
$$

> [!TIP]
> 由欧拉公式$\large e^{i\theta}=\cos{\theta} \pm i\sin{\theta}$ 得出

> [!NOTE]
>
> 例题：  
> **求$\large y^{\prime \prime} +3y^{\prime}+2y=0$的通解**
>
> 解：特征方程$\large \lambda ^{2}+3\lambda +2=0$  
> 特征根为$\large \lambda_{1}=-1,\lambda_2=-2$  
> 故通解为$\large y=C_{1}e^{-x}+C_{2}e^{-2x}$

> [!NOTE]
> 例题：  
> **求$\large y^{\prime \prime} +2y^{\prime}+y=0$的通解**
>
> 解：特征方程$\large \lambda ^{2}+2\lambda +1=0$  
> 特征根为$\large \lambda_{1}=\lambda_2=-1$  
> 故通解为$\large y=C_{1}e^{-x}+C_{2}xe^{-x}$

> [!NOTE]
> 例题：  
> **求$\large y^{\prime \prime} +y=0$的通解**
>
> 解：特征方程$\large \lambda ^{2}+1=0$  
> 特征根为$\large \lambda_{1}=i,\lambda_2=-i$  
> ($\large \alpha = 0,\beta = 1$ 代入公式)  
> 故通解为$\large y=C_{1}\cos{x}+C_{2}\sin{x}$

## 非齐次

称$\large y^{(n)}+a_{n-1}y^{(n-1)}+\cdots +a_{1}y^{\prime}+a_{0}y=f(x)$为常系数非齐次线性微分方程  
区别就是右边的0变成了关于x的函数

### 求通解

方法：非齐次方程特解加对应的齐次方程通解（跟线代里学的线性方程组一样）

### 求特解

- $\large f(x)$多项式型

设$\large f(x)=P_n(x)$

$\large k$为0作为该方程特征根的重数，0不是特征根则重数为0，$\large k=0$

可设特解$\large y^{\ast}=x^{k}Q_n(x)$

$\large Q_n(x)=a_nx^{n}+\cdots+a_1x+a_0$

> [!NOTE]
> 例题：  
> **求$\large y^{\prime \prime} -y^{\prime}=x^{2}$特解**
>
> 解：设$\large y^{\ast}=ax^{3}+bx^{2}+cx+d, y^{\ast \prime}=3ax^{2}+2bx+c,y^{\ast \prime \prime}=6ax+2b$  
> (设$\large ax^{3}$是因为等号右侧最高次为$\large x^{2}$，左侧最低阶导数为1阶，$\large ax^{3}$求导一次得$\large 3ax^{2}$)  
> 代入方程，$\large 6ax+2b-3ax^{2}-2bx-c=x^{2}$  
> 解出$\large a,b,c$ 得特解

- $\large f(x)$非多项式型

一般可设$\large f(x)=P_{n}(x)e^{\alpha x}\cos{\beta x}+Q_{m}(x)e^{\alpha x}\sin{\beta x}$  

$\large P_{n}(x)$和$\large Q_{m}(x)$为多项式  

特解为$\large y^{\ast}=x^{k}\left [ \tilde{P} _{t}(x)e^{\alpha x}\cos{\beta x}+\tilde{Q} _{t}(x)e^{\alpha x}\sin{\beta x}\right ]$

$\large k$为$\large \alpha \pm i\beta$作为特征根时的重数且$\large t=\max \left \{ n,m \right \}$

$\large k$分为两种情况

- 若$\large \alpha \pm i\beta$为方程的$\large n$重特征根，则$\large k=n$，特解中要多乘$\large x^{k}$
- 若$\large \alpha \pm i\beta$不是特征根则重数为0，则$\large k=0$，也就是乘$\large x^{0}=1$

所以解特解的思路就变成了先将$\large f(x)$化成$\large P_{n}(x)e^{\alpha x}\cos{\beta x}+Q_{m}(x)e^{\alpha x}\sin{\beta x}$的形式，进而就求得了$\large \alpha,\beta$的值，得$\large k$的值为$\large \alpha \pm i\beta$作为方程特征根时的重数

> [!NOTE]
> 例题：  
> **求$\large y^{\prime \prime} +y\prime=x-2+3e^{2x}$特解**
>
> 其实是分成了两个方程$\large x-2$和$\large 3e^{2x}$分别求特解再相加  
> 解：特征方程$\large \lambda ^{2}+\lambda=0$  
> 特征根为$\large \lambda_1=0,\lambda_2=-1$  
> 对于$\large x-2$的部分  
> $\large \alpha \pm i\beta=0\pm i0=0$是1重特征根，所以$\large k_1 = 1$  
> 所以设$\large y^{\ast}_1=x^{k_1}\left ( ax+b \right )=x\left ( ax+b \right )$  
> 对于方程$\large 3e^{2x}$的部分  
> $\large \alpha \pm i\beta=2\pm i0=2$，不是$\large 3e^{2x}$的特征根，所以重数为0，$\large k_2=0$  
> 所以设$\large y^{\ast}_2=x^{k_2}\left [ ce^{2x}\cos{0x}+ae^{2x}\sin{0x} \right ]=ce^{2x}$  
> 因此$\large y^{\ast}=y_1^{\ast}+y_2^{\ast}=x(ax+b)+ce^{2x}$  
> 代入求解$\large a,b,c$即可
