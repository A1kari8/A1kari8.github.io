---
title: "[RM] 卡尔曼滤波快速入门"
published: 2025-09-02 11:44:00
tags: [RM, 卡尔曼滤波]
category: RM
draft: false
---

本文旨在以最快的速度学会卡尔曼滤波的使用方法，并不做理论推导和进一步的深入理解

~~诶我草了我一个学计算机的为什么要学现代控制理论的知识啊~~

## 五条最重要的公式

$$
\begin{aligned}
\text{状态预测 } \hat{x}_{k|k-1} &= F_k \hat{x}_{k-1|k-1} + B_k u_k
\\
\text{协方差预测 } P_{k|k-1} &= F_k P_{k-1|k-1} F_k^T + Q_k
\\
\text{卡尔曼增益计算 } K_k &= P_{k|k-1} H_k^T (H_k P_{k|k-1} H_k^T + R_k)^{-1}
\\
\text{状态更新 } \hat{x}_{k|k} &= \hat{x}_{k|k-1} + K_k (z_k - H_k \hat{x}_{k|k-1})
\\
\text{协方差更新 } P_{k|k} &= (I - K_k H_k) P_{k|k-1}
\end{aligned}
$$

## 什么是$\hat x$状态？

$\hat x$表示对系统状态的估计值，通常是一个向量，包含了系统的各种状态变量，比如位置、速度、加速度等

比如一个物体正在直线运动，它当前的真实状态就可以表示为

$$
x = \begin{bmatrix} position \\ 
velocity \\
acceleration
\end{bmatrix}
$$

## $\hat x$和$x$有什么区别？

$x$表示真实状态，而$\hat x$表示状态的估计值

:::note
真实状态$x$是我们不知道的，而卡尔曼滤波的目的就是通过**测量值**和**估计值**$\hat x_{k|k-1}$计算出$\hat x_{k|k}$来尽量接近真实状态$x$
:::

## $\hat x_{k|k-1}$是什么意思？

$\hat x_{k|k-1}$表示在当前时刻$k$，基于时刻$k-1$的信息进行的对当前时刻$k$预测，但并未融合$k$时刻的测量值$z_k$，也称为**先验估计**/**先验状态**

## $\hat x_{k|k}$又是什么意思？

$\hat x_{k|k}$是在当前时刻$k$，由$\hat x_{k|k-1}$和$k$时刻的**测量值**$z_k$计算得出的更接近$k$时刻的真实状态的估计值，也称为**后验估计**/**后验状态**

这个**后验状态**$\hat x_{k|k}$就是我们最终想要的结果

## 什么是观测矩阵$H_k$？

观测矩阵$H_k$定义了如何从状态变量$\hat x$映射到测量值$z_k$

:::tip
举个例子，假设我们使用的测量仪器只能测量物体的位置，不能测量速度和加速度
:::

所以$H_k$就应该是
$$
H_k = \begin{bmatrix} 1 & 0 & 0 \end{bmatrix}
$$

因为

$$
z = H_k x = \begin{bmatrix} 1 & 0 & 0 \end{bmatrix} \begin{bmatrix} position \\ 
velocity \\
acceleration
\end{bmatrix} = \begin{bmatrix} position \end{bmatrix}
$$

## 什么是状态转移矩阵$F_k$？

状态转移矩阵$F_k$定义了系统状态**如何**从时刻$k-1$转移到时刻$k$

举个例子，一个物体在匀加速直线运动，假设每次时间步长为$\Delta t$，那么状态转移矩阵$F_k$可以表示为

$$
F_k = \begin{bmatrix}
1 & \Delta t & \frac{1}{2} \Delta t^2 \\
0 & 1 & \Delta t \\
0 & 0 & 1
\end{bmatrix}
$$

因为

$$
x_k = F_k x_{k-1} = \begin{bmatrix}
1 & \Delta t & \frac{1}{2} \Delta t^2 \\
0 & 1 & \Delta t \\
0 & 0 & 1
\end{bmatrix} \begin{bmatrix} position \\ 
velocity \\
acceleration
\end{bmatrix}_{k-1} = \begin{bmatrix} position \\ 
velocity \\
acceleration
\end{bmatrix}_k
$$

换成高中物理的写法就是

$$
\begin{aligned}
p_k &= p_{k-1} + v_{k-1} \Delta t + \frac{1}{2} a_{k-1} \Delta t^2 \\
v_k &= v_{k-1} + a_{k-1} \Delta t \\
a_k &= a_{k-1}
\end{aligned}
$$

~~这下看懂了~~

## 什么是控制输入矩阵$B_k$和$u_k$？

控制输入矩阵$B_k$定义了外部控制输入$u_k$**如何影响**系统状态

:::tip
简单来说就像你在匀速驾驶一辆车，突然猛踩了一下油门，车的加速度会增加，从而影响车的速度和位置
:::

而控制输入矩阵$B_k$就是用来描述这种**外部控制**（猛踩一下油门）对**系统状态**（车的加速度）的影响

而$u_k$就是这个外部控制输入的**具体数值**，也就是$k$时刻踩油门踩了多深


举个例子，假设我们在$k$时刻对直线运动的物体施加一个额外的力$\Delta force$作为控制输入$u_k$

$$
u_k = \Delta  force
$$

那么根据牛顿第二定律$F=ma$就能得到加速度的改变量

$$
\Delta a = \frac{\Delta force}{m}
$$

因为卡尔曼滤波是个**离散系统**，所以我们不关心加速度的连续变化，只关心在每个时间步长$\Delta t$内加速度的变化量$\Delta a$

控制输入矩阵$B_k$就可以表示为

$$
B_k = \begin{bmatrix}
\frac{1}{2} \Delta t^2 \frac{1}{m} \\
\Delta t \frac{1}{m}\\
\frac{1}{m}
\end{bmatrix}
$$

$$
B_k u_k = \begin{bmatrix}
\frac{1}{2} \Delta t^2 \frac{1}{m} \\
\Delta t \frac{1}{m}\\
\frac{1}{m}
\end{bmatrix} \Delta  force = \begin{bmatrix}
\Delta positon \\
\Delta velocity \\
\Delta acceleration
\end{bmatrix}
$$

## 什么是过程噪声协方差矩阵$Q_k$？

过程噪声协方差矩阵$Q_k$表示系统在状态转移过程中可能存在的随机扰动或不确定性

比如风吹、路面不平等因素都会影响物体的运动状态，这个在$k$时刻对物体的不确定影响我们就用$Q_k$来表示

## 什么是测量噪声协方差矩阵$R_k$？

测量噪声协方差矩阵$R_k$表示测量仪器本身存在的误差或不确定性

比如测量仪器的精度有限，可能会有一定的误差，这个误差我们就用$R_k$来表示

## 什么是协方差矩阵$P$？

~~主包也不知道，等主包学完概率论了再来补充~~

## 更适合程序中使用的协方差更新公式

由于浮点数运算是有误差的，直接使用

$$
P_{k|k} = (I - K_k H_k) P_{k|k-1}
$$可能会导致协方差矩阵$P$变得不正定

所以更推荐使用下面的公式来更新协方差矩阵$P$

$$
P_{k|k} = (I - K_k H_k) P_{k|k-1} (I - K_k H_k)^T + K_k R_k K_k^T
$$
