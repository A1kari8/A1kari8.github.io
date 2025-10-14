---
title: "[概率论] 条件概率与独立性"
published: 2025-10-14 10:22:00
tags: [概率论,数学]
category: 概率论
---

## 条件概率

设事件$A$和$B$是样本空间$S$中的两个事件，且$P(B)>0$，则在事件$B$发生的条件下，事件$A$发生的概率称为**条件概率**，记为$P(A|B)$

## 常用公式

$$
P(A|B) = \frac{P(A B)}{P(B)} \quad P(B) > 0
$$

### 乘法定理

$$
P(A B) = P(B) P(A|B)  = P(A) P(B|A)
$$

推广到$n$个事件

$$
P(A_1 A_2 \cdots A_n) = P(A_1) P(A_2|A_1) P(A_3|A_1 A_2) \cdots P(A_n|A_1 A_2 \cdots A_{n-1})
$$

### 全概率公式

设$A_1,A_2,\cdots,A_n$是互不相容的事件，若对任一事件$B$，都有$B \subset A_1 + A_2 + \cdots + A_n$，则

$$
P(B) = \sum_{i=1}^{n} P(A_i) P(B|A_i)
$$

### 贝叶斯公式

其实就是上述三个公式的结合，所以也不用特意背下来套公式，
我认为更好的方法是灵活组合上面的三个

设$A_1,A_2,\cdots,A_n$是互不相容的事件，若对任一事件$B$，都有$B \subset A_1 + A_2 + \cdots + A_n$，且$P(B)>0$，则

$$
P(A_i|B) = \frac{P(A_i) P(B|A_i)}{\sum\limits_{j=1}^{n} P(A_j) P(B|A_j)}
$$

## 独立性

### 独立的定义

两事件$A$和$B$为任意事件，若

$$
P(A B) = P(A) P(B)
$$

则称事件$A$和$B$是**相互独立**的

### 独立的性质

$A$和$B$独立

条件不影响概率

$$
P(B|A) = P(B|\bar{A}) = P(B)
$$

### 多个事件的独立性

事件$A,B,C$，如果有

$$
\begin{aligned}
P(A B) = P(A) P(B) \\
P(A C) = P(A) P(C) \\
P(B C) = P(B) P(C)
\end{aligned}
$$

则称事件$A,B,C$是**两两独立**的

若再同时满足

$$
P(A B C) = P(A) P(B) P(C)
$$

则称事件$A,B,C$是**相互独立**的
