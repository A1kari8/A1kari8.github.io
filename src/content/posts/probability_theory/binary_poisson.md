---
title: "[工科概率论] 二项分布的泊松逼近"
published: 2025-10-14 10:43:00
tags: [概率论,数学]
category: 概率论
---

## 二项分布

:::tip

$\binom{n}{k} = C_{n}^{k}$

:::

$$
P(X=k) = C_{n}^{k} p^k (1-p)^{n-k} \quad k=0,1,2,\cdots,n
$$

可见当 $n$ 很大时，计算 $P(X=k)$ 会相当困难，所以要使用泊松分布来近似

## 泊松分布

$$
P_n(k) = C_{n}^{k}p^k (1-p)^{n-k} \approx \frac{\lambda^k}{k!} e^{-\lambda}
$$

其中 $\lambda = np$，$k=0,1,2,\cdots,n$

实际计算时，当$n \ge 10$ 且 $p \le 0.1$ 时，就可使用

## 查表

很多情况下会用到泊松分布的概率和$\sum\limits_{i=0}^{k} \frac{e^{-\lambda} \lambda^k}{k!}$

一般是不会让自己算的，可能试卷上会给出表格？
