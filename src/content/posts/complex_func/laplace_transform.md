---
title: "[复变函数] 拉普拉斯变换"
published: 2025-11-11 22:24:00
tags: [复变函数,数学]
category: 复变函数
---

## 拉普拉斯变换的定义

$$
\mathscr{L}[f(t)] = F(s) = \int_{0}^{+\infty} f(t) e^{-st} dt
$$

其中$s$为复变量$s=\beta + i\omega$，$t \geq 0$

## 拉普拉斯逆变换

用留数求

只适用于$F(s)$只有有限个孤立奇点的情况，且当$s \to \infty$时，$F(s) \to 0$，不过题里既然让求了，那也没什么好说的，肯定满足条件

$$
f(t) = \mathscr{L}^{-1}[F(s)] = \sum_{k=1}^{n} \text{Res} \left( F(s) e^{st}, s_k \right)
$$

## 拉普拉斯变换存在定理

$f(t)$的增长速度不超过某个指数函数

$$
|f(t)| \leq M e^{c_0 t} \quad (t \geq 0)， M, c_0 > 0
$$

$c_0$称为$f(t)$的增长指数

条件还是很宽松的

## 拉普拉斯变换的性质

### 线性性质

不多说了

### 微分性质

设$\mathscr{L}[f(t)] = F(s)$，则有

$$
\mathscr{L}[f^{(n)}(t)] = s^n F(s) - s^{n-1} f(0) - s^{n-2} f'(0) - \dots - f^{(n-1)}(0)
$$

这个性质在求解微分方程时会大量用到

### 积分性质

设$\mathscr{L}[f(t)] = F(s)$，则有

$$
\mathscr{L} \left[ \int_{0}^{t} f(\tau) d\tau \right] = \frac{F(s)}{s}
$$

更一般的式子

$$
\mathscr{L} \left[ \int_{0}^{t} dt \int_{0}^{t} dt \cdots \int_{0}^{t} f(t) dt \right ] = \frac{F(s)}{s^n} \qquad (n \text{重积分})
$$

像函数的积分性质

$$
\int_s^{\infty} F(u) du = \mathscr{L} \left[ \frac{f(t)}{t} \right]
$$

也有更一般的形式

$$
\mathscr{L} \left[ \frac{f(t)}{t^n} \right] = \int_s^{\infty} ds \int_{s}^{\infty} ds \cdots \int_{s}^{\infty} F(s) ds, \quad (n \text{重积分})
$$

### 位移性质

设$\mathscr{L}[f(t)] = F(s)$，则有

$$
\mathscr{L}[e^{a t} f(t)] = F(s - a) \qquad (\mathbf{Re}(s-a) > c_0)
$$

$c_0$为$f(t)$的[**增长指数**](#拉普拉斯变换存在定理)

### 延迟性质

设$\mathscr{L}[f(t)] = F(s)$，又$t < 0$时$f(t) = 0$，则有

$$
\begin{aligned}
\mathscr{L} \left[ f(t - \tau) \right] &= e^{-a\tau} F(s) \qquad \\[1.5em]
\mathscr{L}^{-1} \left[ e^{-s\tau} F(s) \right] &= f(t - \tau) \qquad (\tau \geq 0)
\end{aligned}
$$

利用单位阶跃函数可以写成

$$
\mathscr{L} \left[ f(t - \tau) u(t - \tau) \right] = e^{-s\tau} F(s)
$$

这样就不用限制$\tau \geq 0$了

## 拉普拉斯的性质(2)

### 初值定理

若$\mathscr{L}[f(t)] = F(s)$，且$\lim\limits_{t \to 0^+} sF(s)$存在，则有

$$
\lim\limits_{t \to 0^+} f(t) = \lim\limits_{s \to \infty} sF(s)
$$

### 终值定理
