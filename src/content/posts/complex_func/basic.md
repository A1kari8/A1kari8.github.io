---
title: "[复变函数] 复数基础"
published: 2025-09-01 22:02:12
tags: [复变函数,数学]
category: 复变函数
---

## 欧拉公式

$$
e^{i \theta} = cos \theta + i \sin \theta
$$

:::tip
欧拉公式非常重要，大部分复数的运算都需要用到
:::

## 复数的辐角

辐角是复数与实轴的夹角，记作 $\arg z$

$$
\begin{aligned}
\arg z = \begin{cases}
\arctan\left(\frac y x\right) & \qquad x > 0 \\
\arctan\left(\frac y x\right) + \pi& \qquad y \ge 0 , x < 0 \\
\arctan\left(\frac y x\right) - \pi& \qquad y < 0 , x < 0 \\
+\frac{\pi}{2} & \qquad y > 0 , x = 0 \\
-\frac{\pi}{2} & \qquad y < 0 , x = 0
\end{cases}
\end{aligned}
$$

:::tip
感没感觉有点眼熟，这个东西其实就是`atan2`
:::

$$
\begin{aligned}
\operatorname{atan2}(y, x) = \begin{cases}
\arctan\left(\frac y x\right) & \qquad x > 0 \\
\arctan\left(\frac y x\right) + \pi& \qquad y \ge 0 , x < 0 \\
\arctan\left(\frac y x\right) - \pi& \qquad y < 0 , x < 0 \\
+\frac{\pi}{2} & \qquad y > 0 , x = 0 \\
-\frac{\pi}{2} & \qquad y < 0 , x = 0 \\
\text{undefined} & \qquad y = 0, x = 0
\end{cases}
\end{aligned}
$$

### 辐角的连续性

辐角 $\omega = \arg z$ 在**除去原点和负实轴**的复平面上连续

## 复数开根多解

$$
\sqrt[3]{i} = ?
$$

$$
\begin{aligned}
z &= \sqrt[3]{i} \\
&= \sqrt[3]{\cos{\left ( \frac{\pi}{2} + 2k\pi \right )} + i\sin{\left ( \frac{\pi}{2} + 2k\pi \right )}} \\
&= \sqrt[3]{e^{i \left ( \frac{\pi}{2} + 2k\pi \right )}} \\
&= e^{i \left ( \frac{\pi}{6} + \frac{2}{3}k\pi \right )} \\
&= \cos{\left ( \frac{\pi}{6} + \frac{2}{3}k\pi \right )} + i\sin{\left ( \frac{\pi}{6} + \frac{2}{3}k\pi \right )}
\end{aligned}
$$
