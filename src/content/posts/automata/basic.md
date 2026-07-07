---
title: "[形式语言与自动机] 基础知识"
published: 2026-7-7 18:08:00
tags: [形式语言与自动机]
category: 形式语言与自动机
draft: false
---

## 字符串

字符串是由有限个符号组成的有限序列。符号来自一个有限的集合，称为字母表（alphabet），通常用希腊字母 $\Sigma$ 表示。

字符串的长度可以是任意非负整数，空串用 $\epsilon$ 表示，长度为零。字符串的长度记作 $|w|$，其中 $w$ 是字符串。

字符串不可以无穷长

## 闭包

### 克林闭包

$$
\Sigma^\ast = \{ \epsilon \} \cup \Sigma \cup \Sigma^2 \cup \Sigma^3 \cup ... = \bigcup_{i=0}^{\infty} \Sigma^i
$$

注意以下两者的克林闭包并**非无穷集合**：

- $\varnothing^\ast = \{\epsilon\}$
- $\{\epsilon\}^\ast = \{\epsilon\}$

$\varnothing$代表没有字符串，$\{\epsilon\}$代表只有空串的集合，空串是一个长度为零的字符串，需要区分

### 正闭包

$$
\Sigma^+ = \Sigma \cup \Sigma^2 \cup \Sigma^3 \cup ... = \bigcup_{i=1}^{\infty} \Sigma^i
$$

注意不包含空串了
