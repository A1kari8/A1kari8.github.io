---
title: "[人工智能数学基础] 雅可比与海森矩阵"
published: 2026-4-25 13:44:00
tags: [人工智能数学基础, 数学, 线性代数]
category: 人工智能数学基础
draft: false
---

## 雅可比矩阵

设$f: \mathbb{R}^n \to \mathbb{R}^m$是一个向量值函数

$$
f(x_1, x_2, \ldots, x_n) = \begin{bmatrix}f_1(x_1, x_2, \ldots, x_n) \\
f_2(x_1, x_2, \ldots, x_n) \\
\vdots \\
f_m(x_1, x_2, \ldots, x_n)\end{bmatrix}
$$

则雅可比矩阵为：

$$
J_f = \begin{bmatrix}
\dfrac{\partial f_1}{\partial x_1} & \dfrac{\partial f_1}{\partial x_2} & \cdots & \dfrac{\partial f_1}{\partial x_n} \\
\dfrac{\partial f_2}{\partial x_1} & \dfrac{\partial f_2}{\partial x_2} & \cdots & \dfrac{\partial f_2}{\partial x_n} \\
\vdots & \vdots & \ddots & \vdots \\
\dfrac{\partial f_m}{\partial x_1} & \dfrac{\partial f_m}{\partial x_2} & \cdots & \dfrac{\partial f_m}{\partial x_n}
\end{bmatrix}_{m \times n}
$$

## 海森矩阵

设$f: \mathbb{R}^n \to \mathbb{R}$是一个标量值函数

其雅可比矩阵为：

$$
J_f = \begin{bmatrix}
\dfrac{\partial f}{\partial x_1} & \dfrac{\partial f}{\partial x_2} & \cdots & \dfrac{\partial f}{\partial x_n}
\end{bmatrix}_{1 \times n}
$$

则海森矩阵为对雅可比矩阵某行($f$是标量函数时就一行)的每个元素求所有二阶偏导数：

> 或者可以说海森矩阵是「雅可比矩阵的转置的雅可比矩阵」
>
> $H_f = J(\nabla f) = J(J_f^T)$

$$
H_f = \begin{bmatrix}
\dfrac{\partial^2 f}{\partial x_1^2} & \dfrac{\partial^2 f}{\partial x_1 \partial x_2} & \cdots & \dfrac{\partial^2 f}{\partial x_1 \partial x_n} \\
\dfrac{\partial^2 f}{\partial x_2 \partial x_1} & \dfrac{\partial^2 f}{\partial x_2^2} & \cdots & \dfrac{\partial^2 f}{\partial x_2 \partial x_n} \\
\vdots & \vdots & \ddots & \vdots \\
\dfrac{\partial^2 f}{\partial x_n \partial x_1} & \dfrac{\partial^2 f}{\partial x_n \partial x_2} & \cdots & \dfrac{\partial^2 f}{\partial x_n^2}
\end{bmatrix}_{n \times n}
$$

:::tip

如果$f$是一个向量值函数($f: \mathbb{R}^n \to \mathbb{R}^m$)，则海森矩阵是一个$m \times n \times n$的张量

:::

### 海森矩阵性质

- 海森矩阵是对称矩阵：$H_f^T = H_f$(通常情况下，除非$f$的二阶偏导数不连续)
- 海森矩阵的特征值可以用来判断函数的极值性质：
  - 如果$H_f$的所有特征值都大于0(正定)，则$f$在该点是局部极小值
  - 如果$H_f$的所有特征值都小于0(负定)，则$f$在该点是局部极大值
  - 如果$H_f$的特征值有正又有负(不定)，则$f$在该点是一个鞍点
  - 如果$H_f$的特征值中有0且非零值同号或全为0(奇异)，则需要进一步分析才能确定极值性质
