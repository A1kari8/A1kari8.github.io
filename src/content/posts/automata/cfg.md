---
title: "[形式语言与自动机] CFG上下文无关文法"
published: 2026-5-30 16:36:00
tags: [形式语言与自动机]
category: 形式语言与自动机
draft: false
---

## 上下文无关文法的定义

上下文无关文法（Context-Free Grammar，CFG）是一个四元组：

$$G = (V, \Sigma, R, S)$$

其中：

- $V$ 是一个有限的非终结符集合
- $\Sigma$ 是一个有限的终结符集合，且 $V \cap \Sigma = \emptyset$
- $R$ 是一个有限的产生式集合，每个产生式的形式为 $A \to \alpha$，其中 $A \in V$ 是一个非终结符，$\alpha \in (V \cup \Sigma)^*$ 是一个由非终结符和终结符组成的字符串
- $S \in V$ 是开始符号

**终结符**: 简单来说跟字母表类似，是构成语言的基本符号，不能再被替换

**非终结符**: 是用来定义语言结构的符号，可以被替换成其他非终结符或终结符的组合

**产生式**: 定义了非终结符如何被替换成其他符号的规则

**开始符号**: 是生成语言的起点，所有生成的字符串都必须从开始符号出发通过一系列产生式替换得到

## 例子

设计一个上下文无关文法来生成语言 $L = \{a^n b^{m} | m \ge n \geq 0\}$，即由相同数量的 $a$ 和 $b$ 组成的字符串集合

> 因为我们老师说不用写完整的文法定义，给出产生式即可，所以我就不写了

可以定义以下产生式：

$$
\begin{aligned}
S &\to aSb \\
S &\to bS \\
S &\to \epsilon
\end{aligned}
$$

### 如何理解产生式？

可以当作我们一开始只有一个符号$S$，我们可以用产生式来替换它，直到我们得到一个由终结符组成的字符串为止

例如：

$$
\text{情况一：} S \Rightarrow aSb \Rightarrow aaSbb \Rightarrow aa\epsilon bb \Rightarrow aabb \\[6pt]
\text{情况二：} S \Rightarrow bS \Rightarrow bbS \Rightarrow bbbS \Rightarrow bbb\epsilon \Rightarrow bbb
$$

可以看到以上举例的两种情况都满足 $m \ge n \geq 0$ 的条件，因此它们都属于语言 $L$

> 第二条规则写成 $S \to Sb$ 也是可以的
>
> 以及如果想一行完事可以用更简单的产生式 $S \to aS | bS | \epsilon$

## CFG的歧义性

举个有歧义的文法例子：

设计CFG来生成一个算术表达式语言，包含加法和乘法运算符，并且满足乘法优先于加法

可以定义以下产生式：

$$
\begin{aligned}
E &\to E + E \\
E &\to E * E \\
E &\to (E) \\
E &\to \text{数字}
\end{aligned}
$$

这个文法是有歧义的，因为对于一个表达式 $E$，我们可以有多种不同的解析树来表示它，例如对于表达式 $a + b * c$，我们可以有以下两种解析树：

1. 解析树1：

```plaintext
        E
       /|\
      E + E
     /     \
    a       E
           /|\
          E * E
         /     \
        b       c
```

1. 解析树2：

```plaintext
        E
       /|\
      E * E
     /     \
    E       c
   /|\
  E + E 
 /     \
a       b
```

可以发现解析树2是有问题的，这样的结构会导致先运算加法而不是乘法，因此这个文法是有歧义的

修改后的文法如下：

$$
\begin{aligned}
E &\to E + T \mid T \\
T &\to T * F \mid F \\
F &\to (E) \\
F &\to \text{数字}
\end{aligned}
$$

这个文法通过引入新的非终结符 $T$ 和 $F$ 来区分加法和乘法的优先级，从而消除了歧义性

## CFG简化方法

以下按顺序进行

### 消除$\epsilon$-产生式

$\epsilon$-产生式意思是右侧是空字符串的产生式，例如 $A \to \epsilon$，它表示非终结符 $A$ 可以被替换成空字符串

例子：

$$
\begin{aligned}
S &\to AB \\
A &\to aA \mid \epsilon \\
B &\to bB \mid \epsilon
\end{aligned}
$$

消除后：

因为这个文法必须能产生空串，所以单独添加一个 $S_0$ 作为新的开始符号

$$
\begin{aligned}
S_0 &\to S \mid \epsilon \\
S &\to AB \mid A \mid B \\
A &\to aA \mid a \\
B &\to bB \mid b
\end{aligned}
$$

### 消除单元产生式

单元产生式是指右侧是一个非终结符的产生式，例如 $A \to B$，它表示非终结符 $A$ 可以被替换成非终结符 $B$

例子：

$$
\begin{aligned}
S &\to A \\
A &\to B \\
B &\to b
\end{aligned}
$$

消除后：

$$
\begin{aligned}
S &\to b \\
A &\to b \\
B &\to b
\end{aligned}
$$

### 消除无用符号

#### 先消非产生

非产生式是指无法通过一系列产生式替换得到一个由终结符组成的字符串的非终结符，比如

$$
\begin{aligned}
S &\to AB \mid a \\
A &\to b\\
B &\to bB \\
\end{aligned}
$$

可以发现$B \to bB$会无穷递归，所以它是一个非产生式，可以直接删掉:

$$
\begin{aligned}
S &\to a \\
A &\to b\\
\end{aligned}
$$

#### 再消不可达

不可达符号是指无法从开始符号出发通过一系列产生式替换得到的非终结符，比如

$$
\begin{aligned}
S &\to AB \\
A &\to aA \mid \epsilon \\
B &\to bB \mid \epsilon \\
C &\to c
\end{aligned}
$$

$C$根本就产生不了，所以它是不可达，可以直接删掉

## 乔姆斯基范式(CNF)

乔姆斯基范式是一种特殊的上下文无关文法形式，所有的产生式都满足以下两种形式之一：

1. $A \to BC$，其中 $A, B, C$ 是非终结符，且 $B$ 和 $C$ 不能是开始符号
2. $A \to a$，其中 $A$ 是非终结符，$a$ 是终结符

### 将一个CFG转换成CNF的步骤

例子：

$$
\begin{aligned}
S &\to AB \mid a \\
A &\to aA \mid \epsilon \\
B &\to bB \mid \epsilon \\
\end{aligned}
$$

消除$\epsilon$-产生式：

$$
\begin{aligned}
S &\to AB \mid A \mid B \mid a \\
A &\to aA \mid a \\
B &\to bB \mid b \\
\end{aligned}
$$

消除单元产生式：

$$
\begin{aligned}
S &\to AB \mid a \\
A &\to aA \mid a \\
B &\to bB \mid b \\
\end{aligned}
$$

没有无用符号，不变

引入新的非终结符：

$$
\begin{aligned}
S &\to AB \mid a \\
A &\to CA \mid a \\
B &\to DB \mid b \\
C &\to a \\
D &\to b \\
\end{aligned}
$$
