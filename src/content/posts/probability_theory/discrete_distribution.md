---
title: "[工科概率论] 各种离散型分布"
published: 2025-10-14 11:10:00
tags: [概率论,数学]
category: 概率论
---

## 0-1分布（伯努利分布、两点分布）

<div style="width: 20%; margin: auto;">

|X|0|1|
|---|---|---|
|P|1-p|p|

</div>

$$
X\sim B(1,p)
$$

## 二项分布

$$
P(X=k)=C_n^k p^k(1-p)^{n-k}
$$

$$
X\sim B(n,p)
$$

## 泊松分布

$$
P(X=k)=\frac{\lambda^k}{k!}e^{-\lambda}
$$

$$
X\sim P(\lambda)
$$

## 几何分布

二项分布重复试验直到第一次成功

$$
P(X=k)=(1-p)^{k-1}p
$$

$$
X \sim G(p)
$$

## 超几何分布

不放回抽样

$$
P(X=k)=\frac{C_M^k C_{N-M}^{n-k}}{C_N^n}
$$

$$
X \sim H(n,M,N)
$$
