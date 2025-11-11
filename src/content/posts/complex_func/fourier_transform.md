---
title: "[复变函数] 傅里叶变换"
published: 2025-10-24 20:05:00
tags: [复变函数,数学]
category: 复变函数
---

~~先从傅里叶级数说起~~

说什么说，根本就不考

<!--## 傅里叶级数

上学期的微积分课程中学过实数表示的傅里叶级数

$$
\begin{aligned}
f(x) &= \frac{a_0}{2} + \sum_{n=1}^{\infty} \left[ a_n \cos{\left(\frac{2n\pi x}{T}\right)} + b_n \sin{\left(\frac{2n\pi x}{T}\right)} \right] \\[1.5em]
a_n &= \frac{2}{T} \int_{-T}^{T} f(x) \cos{\left(\frac{2n\pi x}{T}\right)} dx \\[1.5em]
b_n &= \frac{2}{T} \int_{-T}^{T} f(x) \sin{\left(\frac{2n\pi x}{T}\right)} dx
\end{aligned}
$$

通过欧拉公式，可以将其转换为复数形式：
$$
f(x) = \sum_{n=-\infty}^{\infty} c_n \exp{\left(i \frac{2n\pi x}{T}\right)} = \sum_{n=-\infty}^{\infty} c_n \exp{\left(i n \omega x\right)} \\[1.5em]
c_n = \frac{1}{T} \int_{-T}^{T} f(x) \exp{(-i n \omega x)} dx
$$

可见，傅里叶级数将周期函数表示为一组弦波函数的线性组合

其中，$n \omega$即为每个弦波的频率，$c_n$为傅里叶系数，也就是每个频率成分的权重，或者叫振幅

但是如果我想表示一个非周期函数该怎么办呢？-->

## 傅里叶变换
<!--
:::warning
以下推导施工中，请直接看结论
:::

我们可以将非周期函数看作周期趋近于无穷大的周期函数

$$
\begin{aligned}
f(x) &= \lim_{T \to \infty} \sum_{n=-\infty}^{\infty} c_n \exp{\left(i n \omega x\right)} \\
&= \lim_{T \to \infty} \sum_{n=-\infty}^{\infty} c_n \exp{\left(i \frac{2n\pi x}{T}\right)}
\end{aligned}
$$

从傅里叶级数中我们可以发现它的频率是离散的，但是当$T \to \infty$时，$\omega = \frac{2\pi}{T} \to 0$，频率间隔趋近于0，现在我们将它变成了一个连续的频率分布

$T \to \infty$时，频率间隔$\Delta \omega = \frac{2\pi}{T} = \omega \to 0$

如先前所说，原来的傅里叶系数$c_n$是每个离散频率$n \omega$对应的，所以现在我们需要将它转换为连续频率对应的，也就是**频率密度函数**，记为$F(\omega) = \frac{c_n}{\Delta \omega}$

$$
\begin{aligned}
F(\omega) &= \frac{c_n}{\Delta \omega} \\
&= c_n \frac{T}{2\pi} = \frac{1}{2\pi} \int_{-\infty}^{\infty} f(x) \exp{(-i \omega x)} dx
\end{aligned}
$$

因为$\Delta \omega \to 0$，所以可以将上面的求和式转换为积分：

$$
\begin{aligned}
f(x) &= \sum_{n=-\infty}^{\infty} \frac{c_n}{\Delta \omega} \exp{(i n \omega x)} \Delta \omega \\
&= \int_{-\infty}^{\infty} F(\omega) \exp{(i \omega x)} d\omega \\
&= \frac{1}{2\pi} \int_{-\infty}^{\infty} \left[ \int_{-\infty}^{\infty} f(t) \exp{(-i \omega t)} dt \right] \exp{(i \omega x)} d\omega
\end{aligned}
$$

由于得知傅里叶变换的多种约定形式，发现上面的结果与常见的形式略有不同，需要通过调整常数因子来得到标准形式，此推导暂时搁置-->

### 正变换

将一个**时域函数**（信号）$f(t)$转换为**频域函数**（每个频率的振幅）$F(\omega)$的过程称为傅里叶变换，公式如下：

$$
F(\omega) = \int_{-\infty}^{\infty} f(t) e^{(-i \omega t)} dt
$$

简写为$F(\omega) = \mathscr{F}[f(t)]$

### 逆变换

将一个**频域函数**$F(\omega)$转换回**时域函数**$f(t)$的过程称为傅里叶逆变换，公式如下：

$$
f(t) = \frac{1}{2\pi} \int_{-\infty}^{\infty} F(\omega) e^{(i \omega t)} d\omega
$$

简写为$f(t) = \mathscr{F}^{-1}[F(\omega)]$

### 条件

傅里叶变换要求函数$f(t)$满足一定的条件，通常包括：

1. **绝对可积性**：函数$f(t)$在整个实数轴上绝对可积，即$\int_{-\infty}^{\infty} |f(t)| dt < \infty$
2. **有限个间断点**：函数$f(t)$在任何有限区间内只有有限个间断点
3. **有限个极值点**：函数$f(t)$在任何有限区间内只有有限个极值点

## 单位脉冲函数（狄拉克函数）

有些时候人们需要考虑物理量在空间或时间上高度集中的现象，狄拉克函数$\delta(t)$就是用来描述这种现象的数学工具

<!--设$x$轴上点$x=x_0$处集中了质量为一单位的物质，在其他位置都没有物质分布，则$x$轴上的物质密度函数$\rho(x)$可以表示为：

用$m[a,b]$表示区间$[a,b]$内的物质总量，$\Delta = b - a$

$$
\begin{aligned}
\rho(x) &= \lim_{\substack{\Delta x \to 0 \\ x \in \left [ a,b \right ] }} \frac{m[a,b]}{\Delta} \\[2em]
&= \begin{cases}
0, \quad x \neq x_0 \\
\infty, \quad x = x_0
\end{cases}
\end{aligned}
$$

整个$x$轴上的物质总量为：

$$
m(-\infty, +\infty) = \int_{-\infty}^{\infty} \rho(x) dx = 1
$$

狄拉克函数即为上述这类集中分布密度函数加以抽象概括并标准化后的结果，-->定义如下：

$$
\begin{aligned}
\delta(t) = \begin{cases}
0, \quad t \neq 0 \\
\infty, \quad t = 0
\end{cases} \\[1.5em]
\int_{-\infty}^{+\infty} \delta(t) dt = 1
\end{aligned}
$$

狄拉克函数已经超出了传统函数的范畴，属于广义函数，因为任何一个普通函数不可能在定义域的某一点取无穷大值

教材224页到229页已经沉浸在自己的艺术里了，太长不看直接看结论

### 性质7.3.1

设$f(t)$是任意连续函数

$$
\int_{-\infty}^{\infty} \delta(t - t_0) f(t) dt = f(t_0)
$$

### 性质7.3.2

$$
\delta(a t) = \frac{1}{|a|} \delta(t) \quad (a \neq 0, a \in \mathbb{R})
$$

### 性质7.3.3

$$
\delta^{(n)}(-t) = (-1)^n \delta^{(n)}(t)
$$

$\delta^{(n)}(-t)$表示将$\delta(-t)$关于$-t$求$n$阶导数，$\frac{d^n \delta(-t)}{d(-t)^n}$

### $\delta (t)$ 的导数定义式

$$
\int_{-\infty}^{\infty} \delta^{(n)}(t - t_0) f(t) dt = (-1)^n \int_{-\infty}^{\infty} \delta(t) f^{(n)}(t) dt
$$

### 性质7.3.4

设$g(t)$在$(-\infty, +\infty)$上连续

$$
g(t) \delta(t - t_0) = g(t_0) \delta(t - t_0) \qquad t_0 \in (-\infty, +\infty)
$$

## 广义傅里叶变换

对于某些不满足傅里叶变换条件的函数，可以通过引入狄拉克函数来定义广义傅里叶变换

还是直接记结论吧

$$
\begin{aligned}
\mathscr{F}[\delta(t)] &= 1 \quad \mathscr{F}^{-1}[1] = \delta(t) \\[1em]
\mathscr{F}[1] &= 2\pi \delta(\omega) \quad \mathscr{F}^{-1}[2\pi \delta(\omega) ] = 1 \\[1em]
\mathscr{F}[e^{i \omega_0 t}] &= 2\pi \delta(\omega - \omega_0) \quad \mathscr{F}^{-1}[2\pi \delta(\omega - \omega_0)] = e^{i \omega_0 t}
\end{aligned}
$$

### 符号函数的傅里叶变换

$$
\begin{aligned}
\text{sgn}(t) = \begin{cases}
1, \quad t > 0 \\
-1, \quad t < 0
\end{cases} \\[1em]
\mathscr{F}[\text{sgn}(t)] = \frac{2}{i\omega}
\end{aligned}
$$

### 如何求广义傅里叶变换

核心就是将函数分解成上述几种已知的结论的组合，然后利用[傅里叶变换的性质](#傅里叶变换的性质)求解

### 三角函数的傅里叶变换

用欧拉公式然后套已知变换对

## 傅里叶变换的性质

### 线性性质

$$
\mathscr{F}[a f(t) + b g(t)] = a \mathscr{F}[f(t)] + b \mathscr{F}[g(t)]
$$

逆变换也有

### 对称性质

已知$F(\omega) = \mathscr{F}[f(t)]$，则有

$$
\mathscr{F}[F(t)] = 2\pi f(-\omega)
$$

### 位移性质

设$\mathscr{F}[f(t)] = F(\omega)$，则有

$$
\begin{aligned}
\mathscr{F}[f(t \pm t_0)] = e^{\pm i \omega t_0} \mathscr{F}[f(t)] \\[1em]
\mathscr{F}^{-1}[F(\omega \pm \omega_0)] = e^{\mp i \omega_0 t} f(t)
\end{aligned}
$$

位移会影响频域的相位（乘$e^{\pm i \omega t_0}$后辐角改变），但不会改变振幅（乘$e^{\pm i \omega t_0}$后模没变）

### 坐标缩放性质

设$a$是非零实数，$\mathscr{F}[f(t)] = F(\omega)$，则有

$$
\begin{aligned}
\mathscr{F}[f(a t)] = \frac{1}{|a|} F\left(\frac{\omega}{a}\right) \\[1em]
\mathscr{F}^{-1}[F(a \omega)] = |a| f(a t)  
\end{aligned}
$$

如果$f(t)$的图像变**窄**，则$F(\omega)$的图像变**宽**变**矮**；反之若$f(t)$的图像变**宽**，则$F(\omega)$的图像变**窄**变**高**

生活中常见的现象：音频加速播放时，声音变得尖细（频率变高），而慢速播放时，声音变得低沉（频率变低）

### 微分性质

设$\mathscr{F}[f(t)] = F(\omega)$，则有

$$
\mathscr{F}[f^{(n)}(t)] = (i\omega)^n F(\omega) \\[1.5em]
\mathscr{F}^{-1}[F^{(n)}(\omega)] = (-i t)^n f(t)
$$

这个性质在求解微分方程时会大量用到

### 乘积定理

设$F_1(\omega) = \mathscr{F}[f_1(t)]$，$F_2(\omega) = \mathscr{F}[f_2(t)]$，则有

$$
\begin{aligned}
\int_{-\infty}^{\infty} f_1(t) f_2(t) dt &= \frac{1}{2\pi} \int_{-\infty}^{\infty} \overline{F_1(\omega)} F_2(\omega) d\omega \\[2em]
&= \frac{1}{2\pi} \int_{-\infty}^{\infty} F_1(\omega) \overline{F_2(\omega)} d\omega
\end{aligned}
$$

$\overline{F(\omega)}$表示$F(\omega)$的复共轭函数

### 帕萨瓦尔定理

设$F(\omega) = \mathscr{F}[f(t)]$，则有

$$
\int_{-\infty}^{\infty} |f(t)|^2 dt = \frac{1}{2\pi} \int_{-\infty}^{\infty} |F(\omega)|^2 d\omega
$$

时域信号的总能量等于它在频域下的总能量

## 卷积

3b1b的这个视频讲得挺好 [【官方双语】那么……什么是卷积？](https://www.bilibili.com/video/BV1Vd4y1e7pj/)

### 定义

$$
(f * g)(t) = \int_{-\infty}^{\infty} f(\tau) g(t - \tau) d\tau
$$

$f*g$表示函数$f$和$g$的卷积

但是这个计算太麻烦了，好在傅里叶变换有个性质

### 卷积定理

设$\mathscr{F}[f(t)] = F(\omega)$，$\mathscr{F}[g(t)] = G(\omega)$，则有

$$
\mathscr{F}[f * g] = F(\omega) G(\omega) \\[1.5em]
\mathscr{F}[f \cdot g] = \frac{1}{2\pi} F(\omega) * G(\omega)
$$

也就是说，时域的卷积对应频域的乘积，只要先变换再相乘，最后逆变换就能得到卷积结果

### 卷积的性质

1. 交换律：$f * g = g * f$
2. 结合律：$f *(g* h) = (f * g) * h$
3. 分配律：$f *(g + h) = f* g + f* h$、

设$g(t) = f_1(t) * f_2(t)$，则有

#### 平移不变性质

$$
f_1(t-\alpha) * f_2(t-\beta) = g(t - \alpha - \beta)
$$

#### 坐标缩放

$$
f_1(a t) * f_2(a t) = \frac{1}{|a|} g(a t)
$$

### 傅里叶变换求微分方程

利用傅里叶变换的微分性质，可以将微分方程转化为代数方程，从而简化求解过程

$$
\begin{aligned}
\text{设} \quad & f^{(n)}(t) + a_{n-1} f^{(n-1)}(t) + \cdots + a_1 f'(t) + a_0 f(t) = g(t) \\[1.5em]
\text{则} \quad & (i\omega)^n F(\omega) + a_{n-1} (i\omega)^{n-1} F(\omega) + \cdots + a_1 (i\omega) F(\omega) + a_0 F(\omega) = G(\omega) \\[1.5em]
\text{解得} \quad & F(\omega) = \frac{G(\omega)}{(i\omega)^n + a_{n-1} (i\omega)^{n-1} + \cdots + a_1 (i\omega) + a_0} \\[1.5em]
\text{最后逆变换} \quad & f(t) = \mathscr{F}^{-1}[F(\omega)]
\end{aligned}
$$

## 可能会用到的

### 常见傅里叶变换对

#### 三角函数

$$
\begin{aligned}
\mathscr{F}[\cos{(\omega_0 t)}] &= \pi \left[ \delta(\omega - \omega_0) + \delta(\omega + \omega_0) \right] \\[2em]
\mathscr{F}[\sin{(\omega_0 t)}] &= i \pi \left[ \delta(\omega + \omega_0) - \delta(\omega - \omega_0) \right]
\end{aligned}
$$

#### 指数衰减函数

单边的

$$
f(t) = \begin{cases}
e^{-a t}, \quad t \geq 0 \\
0, \quad t < 0
\end{cases} \qquad (a > 0) \\[2.5em]
F(\omega) = \frac{1}{a + i \omega}
$$

双边的

$$
f(t) = e^{-a |t|} \qquad (a > 0) \\[2.5em]
F(\omega) = \frac{2a}{a^2 + \omega^2}
$$

>指数衰减函数和三角函数的变换计算其实很简单，不用硬背
>
>之后这几个就是纯折磨，现算都是神人了

#### 符号函数

$$
f(t) = \text{sgn}(t) = \begin{cases}
1, \quad t > 0 \\
-1, \quad t < 0
\end{cases} \\[2.5em]
F(\omega) = \frac{2}{i \omega}
$$

#### 单位阶跃函数

基于符号函数

$$
f(t) = \begin{cases}
1, \quad t \geq 0 \\
0, \quad t < 0
\end{cases} \\[2.5em]
F(\omega) = \pi \delta(\omega) + \frac{1}{i \omega}
$$

#### 钟形脉冲函数

设钟形脉冲函数为：

$$
f(t) = Ee^{-\beta t^2} \quad (E > 0, \beta > 0)
$$

则其傅里叶变换为：

$$
F(\omega) = E \exp{\left(-\frac{\omega^2}{4\beta}\right)} \sqrt{\frac{\pi}{\beta}}
$$

#### 矩形单脉冲函数

$$
f(t) = \begin{cases}
E, \quad |t| \leq \frac{\tau}{2} \\
0, \quad |t| > \frac{\tau}{2}
\end{cases} \qquad (E > 0, \tau > 0) \\[2.5em]
F(\omega) = \frac{2E}{\omega} \sin{\left(\frac{\omega \tau}{2}\right)}
$$

### 狄利克雷积分

$$
\int_{0}^{\infty} \frac{\sin{x}}{x} dx = \frac{\pi}{2}
$$
