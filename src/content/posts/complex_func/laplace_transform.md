---
title: "[工科复变函数] 拉普拉斯变换"
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

## 常见拉普拉斯变换对

| $f(t)$ | $F(s)$ | 条件 |
|--------|--------|------|
| 1 | $\frac{1}{s}$ | $\mathbf{Re}(s) > 0$ |
| $\delta(t)$ | 1 | 无 |
| $u(t)$ | $\frac{1}{s}$ | $\mathbf{Re}(s) > 0$ |
| $t^n$ | $\frac{\Gamma(n+1)}{s^{n+1}}$ | $\mathbf{Re}(s) > 0$ |
| $e^{kt}$ | $\frac{1}{s - k}$ | $\mathbf{Re}(s) > k$ |
| $\sin{(k t)}$ | $\frac{k}{s^2 + k^2}$ | $\mathbf{Re}(s) > 0$ |
| $\cos{(k t)}$ | $\frac{s}{s^2 + k^2}$ | $\mathbf{Re}(s) > 0$ |

### 微积分跳过不讲但现在还考的伽玛函数

$$
\Gamma(n) = \int_{0}^{\infty} t^{n-1} e^{-t} dt
$$

有以下性质

$$
\Gamma(n+1) = n \Gamma(n) \quad (n > 0) \\[1.5em]
\Gamma(1) = 1 \\[1.5em]
\Gamma\left(\frac{1}{2}\right) = \sqrt{\pi} \\[1.5em]
\Gamma(n+1) = n! \quad (n \in \mathbb{N})
$$

## 拉普拉斯变换存在定理

$f(t)$的增长速度不超过某个指数函数

$$
|f(t)| \leq M e^{c_0 t} \quad (t \geq 0)， M, c_0 > 0
$$

$c_0$称为$f(t)$的增长指数

条件还是很宽松的

## 拉普拉斯变换的性质

以下均设$\mathscr{L}[f(t)] = F(s)$

### 线性性质

不多说了

### 微分性质

$$
\boxed{
\mathscr{L}[f^{(n)}(t)] = s^n F(s) - s^{n-1} f(0) - s^{n-2} f'(0) - \dots - f^{(n-1)}(0)
}\\[1.5em]
\boxed{
F^{(n)}(s) = \mathscr{L} \left[ (-t)^n f(t) \right]
}
$$

这个性质在求解微分方程时会大量用到

### 积分性质

$$
\boxed{
\mathscr{L} \left[ \int_{0}^{t} f(\tau) d\tau \right] = \frac{F(s)}{s}
}
$$

更一般的式子

$$
\mathscr{L} \left[ \int_{0}^{t} dt \int_{0}^{t} dt \cdots \int_{0}^{t} f(t) dt \right ] = \frac{F(s)}{s^n} \qquad (n \text{重积分})
$$

像函数的积分性质

$$
\boxed{
    \mathscr{L} \left[ \frac{f(t)}{t} \right] = \int_s^{\infty} F(u) du
}
$$

也有更一般的形式

$$
\mathscr{L} \left[ \frac{f(t)}{t^n} \right] = \int_s^{\infty} ds \int_{s}^{\infty} ds \cdots \int_{s}^{\infty} F(s) ds, \quad (n \text{重积分})
$$

### 位移性质

$$
\boxed{
\mathscr{L}[e^{a t} f(t)] = F(s - a) \qquad (\mathbf{Re}(s-a) > c_0)
}
$$

$c_0$为$f(t)$的[**增长指数**](#拉普拉斯变换存在定理)

### 延迟性质

$$
\boxed{
\begin{aligned}
&\mathscr{L} \left[ f(t - a) u(t - a) \right] = e^{-a s} F(s) \qquad \\[1.5em]
&\mathscr{L}^{-1} \left[ e^{-s a} F(s) \right] = f(t - a) u(t - a)
\end{aligned}
}
$$

### 缩放性质

$$
\boxed{
\mathscr{L}[f(a t)] = \frac{1}{a} F\left(\frac{s}{a}\right)
} \qquad (a > 0)
$$

## 拉普拉斯的性质(2)

### 初值定理

$\lim\limits_{t \to 0^+} sF(s)$存在，则有

$$
f(0^+) = \lim\limits_{s \to \infty} sF(s)
$$

### 终值定理

$\lim\limits_{t \to \infty} f(t)$存在，且$F(s)$的极点均位于$s$平面的左半平面，则有

$$
f(\infty) = \lim\limits_{s \to 0} sF(s)
$$

## 卷积定理

设$\mathscr{L}[f(t)] = F(s)$，$\mathscr{L}[g(t)] = G(s)$，则有

### 拉普拉斯变换的卷积定义

$$
f(t) * g(t) = \int_{0}^{t} f(\tau) g(t - \tau) d\tau
$$

### 拉普拉斯变换的卷积定理

$$
\mathscr{L}[f * g] = F(s) G(s) \\[1.5em]
\mathscr{L}[f \cdot g] =  F(s) * G(s)
$$  
