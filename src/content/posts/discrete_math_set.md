---
title: "[离散数学] 第一章 集合论"
published: 2025-01-04 21:49:10
tags: [离散数学,数学]
category: 大学数学
---

### 定义1.2.4 以集合为元素的集合称为集族

设$\large A_1,A_2,A_3$为集合，则$\large \left \{ A_1,A_2,A_3 \right \}$为一个集族。若令$\large I=\left \{ 1,2,3 \right \}$，则$\large \forall i\in I$，$\large i$确定了一个唯一的集合$\large A_i$

集族$\large \left \{ A_1,A_2,A_3 \right \}$又常写成$\large \left \{ A_i \right \} _{i\in I}$，即$\large I$中元素$\large i$确定的那些集形成的集族

### 定义1.2.5

集合$\large S$的所有子集(包括空集$\large \varnothing$及$\large S$本身)形成的集族称为$\large S$的幂集，并记为$\large 2^{S}$，或$\large \mathscr{P}(S)$

($\large \mathscr{P}$是字母$\large P$)

于是，$\large 2^{S}=\left \{ A | A\subseteq S \right \}$

例: 设$\large S= \left \{ 1,2,3 \right \}$，则$\large 2^{S}=\left \{\varnothing ,\left \{ 1 \right \} \left \{ 2 \right \} \left \{ 3 \right \} \left \{ 1,2 \right \} \left \{ 1,3 \right \} \left \{ 2,3 \right \} \left \{ 1,2,3 \right \} \right \}$

$\large S$有八个子集

#### 区分$\large \varnothing$和$\large \left \{ \varnothing \right \}$

$\large 2^{\varnothing}=\left \{ \varnothing \right \}$

$\large \varnothing$为空集，而$\large \left \{ \varnothing \right \}$是一个集族，这个集族仅有一个元素，就是空集。

因此，$\large \varnothing \neq \left \{ \varnothing \right \}$，但$\large \varnothing \in \left \{ \varnothing \right \}$且$\large \varnothing \subseteq \left \{ \varnothing \right \}$ (因为空集是任何集合的子集)。集$\left \{ \varnothing , \left \{ \varnothing  \right \} \right \}$含有两个元素。

### 多个集合的并集

$\large A_1 \cup A_2 \cup \cdots \cup A_n$缩写为$\large \bigcup\limits_{i=1}^{n}A_i$

若$\large A_1,A_2,\cdots ,A_n,\cdots$是一个集合的无穷序列，则它们的并集缩写为$\large \bigcup\limits_{n=1}^{\infty}A_n$其定义为$\large \bigcup\limits_{n=1}^{\infty}A_n=\left \{ x | \exists n \in N\text{ 使得 }x\in A_{n} \right \}$，$\large N$是自然数之集

若$\large \left \{ A_l \right \} _{l\in I}$是任一集族，则集族中那些集之并集记为$\large \bigcup\limits_{l=I}A_l$  并且$\large \bigcup\limits_{l=I}A_l= \left \{ x | \exists l \in I \text{ 使得 }x\in A_{l} \right \}$

### 多个集合的交集

$\large A_1 \cap A_2 \cap \cdots \cap A_n=\bigcap\limits_{i=1}^{n}A_n=\left \{ x | \forall i \in \left \{ 1,2,\cdots ,n \right \} ,x\in A_{i} \right \}$

$\large A_1 \cap A_2 \cap \cdots \cap A_n \cap \cdots=\bigcap\limits_{n=1}^{\infty}A_n=\left \{ x | \forall n \in N ,x\in A_{n} \right \}$

集族$\large \left \{ A_l \right \} _{l\in I}$各集的交记为$\large \bigcap\limits_{l=I}A_l=\left \{ x | \forall \xi \in I\text{ 使得 }x\in A_{\xi} \right \}$

### 定理1.3.3

设$\large A$为任一集合，$\large \left \{ B_l \right \} _{l\in I}$为任一集族，则

$$
\begin{aligned}
\large A \cap \left ( \bigcup\limits_{l=I}B_l \right ) &=\large \bigcup\limits_{l=I} \left ( A\cap B_{l} \right ) \\\\
\large A \cup \left ( \bigcap\limits_{l=I}B_l \right ) &=\large \bigcap\limits_{l=I} \left ( A\cup B_{l} \right )
\end{aligned}
$$

其中$\large I \neq \varnothing$

### 交并运算满足分配律

$$
\begin{aligned}
\large A \cap \left ( B \cup C \right )&=\large \left ( A \cap B \right ) \cup \left ( A \cap C \right )  \\\\
\large A \cup \left ( B \cap C \right )&=\large \left ( A \cup B \right ) \cap \left ( A \cup C \right )  
\end{aligned}
$$

### 定理 1.3.5 吸收律

$$
\begin{aligned}
\large A \cap \left ( A \cup B \right )&=\large A  \\\\
\large A \cup \left ( A \cap B \right )&=\large A
\end{aligned}
$$

### 差集 定义 1.3.4

设$\large A$与$\large B$为两个任意的集合，由属于$\large A$但不属于$\large B$的一切元素构成的集合称为$\large A$与$\large B$的差集，并记为$\large A \backslash B$

$\large A \backslash B=\left \{ x | x \in A \text{ 且 }x \notin B  \right \}$

$\large A$有$\large B$没有的元素

#### 差集分配律 定理 1.3.6

设$\large A,B,C$为任意三个集合，则$\large A\cap \left ( B \backslash C \right )=\left (A\cap B \right ) \backslash \left ( A\cap C \right )$

#### 差集不满足交换律

$\large A\backslash B \neq B \backslash A$

#### 定理 1.3.7

$\large \left ( A\backslash B \right )\cup B=A\Leftrightarrow B\subseteq A$

### 对称差

定义1.3.5 $\large A\backslash B$与$\large B\backslash A$的并集称为$\large A$与$\large B$的对称差，记为$\large A \Delta B$

$\large A \Delta B=\left ( A\backslash B\right )\cup \left ( B\backslash A \right )=\left \{ x | x\in A\cup B \text{ 且 }x\notin A\cap B \right \}=\left \{ x | x\in A \text{ 或 }x\in B \text{ 但 }x\notin A\cap B \right \}$

说白了就是$\large A$和$\large B$不同时含有的元素

#### 对称差性质 定理 1.3.8

$$
\begin{aligned}
&\large A \Delta B =\large B \Delta A \text{  满足交换律}  \\
&\large \left ( A \Delta B \right )\Delta C=\large A \Delta \left ( B \Delta C \right ) \text{  满足结合律} \\
&\large A \Delta A=\varnothing \\
&\large A \Delta \varnothing = A  
\end{aligned}
$$

交运算关于对称差满足分配律

$\large A \cap \left ( B \Delta C \right )=\left ( A \cap B \right )\Delta\left ( A \cap C \right )$

### 余集 定义 1.4.1

设$\large S$是一个集合，$\large A\subseteq S$，差集$\large S\backslash A$称为集$\large A$对集$\large S$的余集，记为$\large A^{c}$，即$\large A^{c}=S\backslash A$

余集也称为补集，有的使用$\large C_{S}A$表示$\large A$对$\large S$的余集(本人高中就学的这种写法)

#### 性质

$\large S$对$\large S$的余集$\large S^{c}$为空集,即

$\large C_{S}S=S^{c}=\varnothing$

$\large \varnothing^{c}=S\left ( C_{S}\varnothing =S \right )$

$\large A\cap A^{c}=\varnothing$，即$\large C_{S}A\cap A=\varnothing$

$\large A\cup A^{c}=S$，即$\large A\cup C_{S}A=S$

#### 定理 1.4.1

并集的余集等于各余集的交集 $\large \left ( \bigcup\limits_{\xi \in I}A_{\xi} \right )^{c}=\bigcap\limits_{\xi \in I}A_{\xi}^{c}$

#### 定理 1.4.2

交集的余集等于各余集的并集 $\large \left ( \bigcap\limits_{\xi \in I}A_{\xi} \right )^{c}=\bigcup\limits_{\xi \in I}A_{\xi}^{c}$

定理1.4.1和1.4.2称为$\large \text{De Morgan}$公式。在有限的形式下，我们有公式

$\large \left ( A\cup B \right )^{c}=A^{c}\cap B^{c}$

$\large \left ( A\cap B \right )^{c}=A^{c}\cup B^{c}$

#### 余集，差集，对称差之间的联系 定理 1.4.3

设$\large A$和$\large B$都是$\large S$的子集，则

$\large A\backslash B=A\cap B^{c}$

$\large A\Delta B=\left( A\cap B^{c} \right )\cup \left ( B\cap A^{c} \right )$

$\large A^{c}=S\Delta A$

#### 对偶原理

若有关集的并、交及余集运算的某一关系式成立，如果将式中的记号$\large \cup ,\cap ,\subseteq ,\supseteq$分别换成$\large \cap ,\cup ,\supseteq ,\subseteq$，等号保持不变，并将式中每个集换成它们的余集，由此得到的关系式一定成立
