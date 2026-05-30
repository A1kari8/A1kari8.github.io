---
title: "[人工智能数学基础] 凸优化"
published: 2026-5-04 09:37:00
tags: [人工智能数学基础, 数学]
category: 人工智能数学基础
draft: false
---

## 凸集

凸集是指对于集合中的任意两点，连接这两点的线段也完全包含在该集合中

性质：

- 交集：任意数量的凸集的交集仍然是凸集
- 凸包：任意集合的凸包是包含该集合的最小凸集
- 仿射变换：凸集在仿射变换下仍然是凸集(仿射变换：线性变换 $\cup$ 平移)

## 凸函数

一个函数 $f: \mathbb{R}^n \to \mathbb{R}$ 是凸函数，如果对于任意 $x, y \in \mathbb{R}^n$ 和 $\lambda \in [0, 1]$，满足：

$$f(\lambda x + (1 - \lambda) y) \leq \lambda f(x) + (1 - \lambda) f(y)$$

对于一元标量函数 $f: \mathbb{R} \to \mathbb{R}$，就是函数上的任意两点之间的线段在函数图像上方

## 琴生不等式

若 $f$ 是一个凸函数，则对于任意 $x, y \in \mathbb{R}^n$ 和 $\lambda \in [0, 1]$，有：

$$f(\lambda x + (1 - \lambda) y) \leq \lambda f(x) + (1 - \lambda) f(y)$$

## 线性规划问题

线性规划问题是指优化一个线性目标函数，约束条件也是线性的优化问题

### 标准形式

$$
\begin{aligned}
\max \quad & c^T x \\
\text{s.t.} \quad & Ax \leq b \\
& x \geq 0
\end{aligned}
$$

### 代数法解线性规划问题
