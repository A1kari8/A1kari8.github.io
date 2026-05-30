---
title: "[人工智能数学基础] 向量&矩阵求导"
published: 2026-5-13 20:54:00
tags: [人工智能数学基础, 数学]
category: 人工智能数学基础
draft: false
---

> 注：分母布局

$$
\begin{aligned}
\frac{\partial \mathbf{a}^T \mathbf{x}}{\partial \mathbf{x}} &= \mathbf{a} \\[1em]
\frac{\partial \mathbf{x}^T \mathbf{a}}{\partial \mathbf{x}} &= \mathbf{a} \\[1em]
\frac{\partial \mathbf{x}^T \mathbf{x}}{\partial \mathbf{x}} &= 2\mathbf{x} \\[1em]
\frac{\partial \mathbf{a}^T A \mathbf{x}}{\partial \mathbf{x}} &= A^T \mathbf{a} \\[1em]
\frac{\partial \mathbf{x}^T A \mathbf{a}}{\partial \mathbf{x}} &= A \mathbf{a} \\[1em]
\frac{\partial \mathbf{x}^T A \mathbf{x}}{\partial \mathbf{x}} &= (A + A^T) \mathbf{x}
\end{aligned}
$$
