---
title: "[强化学习] 强化学习数学基础"
published: 2026-09-08 21:01:00
tags: ["强化学习", "马尔可夫决策过程", "MDP", "贝尔曼方程", "时序差分法", "SARSA", "Q-learning"]
category: 强化学习
draft: false
---

## 马尔可夫性质

下一时刻的状态$s_{t+1}$只取决于当前状态$s_t$

$$
P(s_{t+1}|s_t) = P(s_{t+1}| s_t, s_{t-1}, \ldots, s_0)
$$

$s_t, s_{t-1}, \ldots, s_0$为之前所有状态的历史

## 强化学习基本概念

### 状态转移矩阵

$$
P = \begin{bmatrix}
P(s_1|s_1) & P(s_2|s_1) & \cdots & P(s_n|s_1) \\
P(s_1|s_2) & P(s_2|s_2) & \cdots & P(s_n|s_2) \\
\vdots & \vdots & \ddots & \vdots \\
P(s_1|s_n) & P(s_2|s_n) & \cdots & P(s_n|s_n)
\end{bmatrix}
$$

同一行的起始状态相同，表示从该状态转移到其他状态的概率分布

## 马尔可夫奖励过程

- 回合(episode)：指从初始状态开始，智能体与环境交互直到终止状态的一个完整过程
- 时间步：指在某一时刻，智能体与环境交互的一个时间点，比如走一步
- 奖励：指在**某一状态**下，智能体采取某一动作后所获得的**即时**反馈

## 回报

某个时间步开始，未来能获得的奖励的累计值

假设时刻$t$后获得的奖励序列为$r_{t+1}, r_{t+2}, r_{t+3}, \ldots, r_T$，则时刻$t$的回报为：

$$
G_t = r_{t+1} + \gamma r_{t+2} + \gamma^2 r_{t+3} + \cdots + \gamma^{T-t-1} r_T
$$

其中：

- $\gamma$为折扣因子，$0 \leq \gamma \leq 1$，用来减弱未来奖励的影响，使学习更关注最近的奖励
- $T$为终止状态的时间步

回报由智能体行动完成后才可计算，有了回报后便可计算**状态价值函数**

## 策略

通常用$\pi$表示策略，$\pi(a|s)$表示在状态$s$下采取动作$a$的概率分布。策略可以是确定性的，也可以是随机的，也可以是一个函数。

## 状态价值函数

状态价值函数$V(s)$表示在状态$s$下，智能体能够获得的期望回报(未来可能得到多少回报)。对于马尔可夫奖励过程，它定义为回报的期望：

$$
V^\pi(s) = \mathbb{E}_\pi[G_t | S_t = s]
$$

其中$\mathbb{E}_\pi$表示在策略$\pi$下的期望值，$S_t = s$表示在时刻$t$处于状态$s$。

如果只用这个公式，当计算各个状态的状态价值函数时，必须要知道所有状态的回报序列，这会是一个非常庞大的排列组合问题，为了简化计算，可以使用 **贝尔曼方程(Bellman Equation)** 来递归地计算状态价值函数。

## 贝尔曼方程

$$
V^\pi(s) = \underbrace{R(s)}_{\text{即时奖励}} + \underbrace{\gamma \sum_{s' \in S} P(s'|s)V^\pi(s')}_{\text{未来奖励的折扣总和}}
$$

- $V^\pi(s')$: 未来状态$s'$的状态价值函数
- $P(s'|s)$: 从状态$s$转移到状态$s'$的概率

### 贝尔曼方程的矩阵形式

设每个状态$s \in S$的状态价值函数为$V^\pi(s)$，则可以将所有状态的状态价值函数表示为向量$V^\pi$，所有状态的即时奖励表示为向量$R$:

$$
V^\pi = \begin{bmatrix}
V^\pi(s_1) \\
V^\pi(s_2) \\
\vdots \\
V^\pi(s_n)
\end{bmatrix} \qquad R = \begin{bmatrix}
R(s_1) \\
R(s_2) \\
\vdots \\
R(s_n)
\end{bmatrix}
$$

有了状态转移矩阵$P$，贝尔曼方程可以写成矩阵形式：

$$
V^\pi = R + \gamma P V^\pi
$$

变形得：

$$
V^\pi - \gamma P V^\pi = R \\
(I - \gamma P)V^\pi = R \\
V^\pi = (I - \gamma P)^{-1} R
$$

若方程可解，则可以直接求解所有状态的状态价值函数$V^\pi$

### 贝尔曼方程的迭代形式(自举法)

属于动态规划的一种方法，利用当前状态的价值函数来更新未来状态的价值函数，直到收敛为止。

$$
\boxed{
\begin{array}{rl}
1: & \text{对于所有状态 }s\in S,\ V'\gets \mathbf{0},\ V\gets \mathbf{\infty}\\
2: & \text{当 }\lVert V-V'\rVert>\epsilon\text{ 执行}\\
3: & \qquad V\gets V'\\
4: & \qquad \text{对于所有状态 }s\in S:\\
   & \qquad \qquad V'(s)\gets R(s)+\gamma\displaystyle\sum_{s'\in S}P(s'|s)V(s')\\
5: & \text{结束循环}\\
6: & \text{返回 }V'(s)
\end{array}
}
$$
基于新的策略$\pi'$，因此是一个**off-policy**(离线)算法。

## 值函数(动作价值函数)

前面介绍的状态价值函数$V(s)$是指在状态$s$下，智能体能够获得的期望回报。而动作价值函数$Q(s, a)$是指在状态$s$下，**智能体采取具体动作$a$后**，能够获得的期望回报。

$$
Q^\pi(s, a) = \mathbb{E}_\pi[G_t | s_t = s, a_t = a]
$$

同时也可以由动作价值函数得到状态价值函数：

$$
V^\pi(s) = \mathbb{E}_\pi[Q^\pi(s, a_t)]
$$

动作价值函数对于决策更为重要，当我们有了动作价值函数后，当前最佳动作则为使得当前$Q(s, a)$最大的动作$a$，即：$\argmax \limits_a Q(s_t, a)$

## 时序差分法(TD)

### SARSA

$$
\boxed{
\begin{array}{rl}
1: & \text{初始化每个 }Q(s, a)\text{ 为 }0\\
2: & \text{for 周期 }i=1 \text{ to }M \text{ do}\\
3: & \qquad \text{for 时间步 }t=0 \text{ to }T-1 \text{ do}\\
4: & \qquad \qquad \text{根据当前策略 }\pi\text{选择动作 }a_t\text{并执行},\text{得到 }r_{t+1}, s_{t+1}\\
5: & \qquad \qquad \text{根据当前策略 }\pi\text{在 }s_{t+1}\text{选择动作 }a_{t+1}\\
6: & \qquad \qquad Q(s_t, a_t)_{\text{target}} = r_{t+1} + \gamma Q(s_{t+1}, a_{t+1})\\
7: & \qquad \qquad Q(s_t, a_t) \gets Q(s_t, a_t) + \alpha [Q(s_t, a_t)_{\text{target}} - Q(s_t, a_t)]\\
8: & \qquad \text{结束循环}\\
9: & \text{结束循环}\\
10: & \text{返回 }Q(s, a)
\end{array}
}
$$

- $\alpha$为学习率，$0 < \alpha \leq 1$，用来控制每次更新的幅度

SARSA选择动作基于旧的策略$\pi$，因此是一个**on-policy**(在线)算法。策略中的随机因素如果选择了奖励较低的动作，则会影响到Q值的更新，导致Q值收敛到一个较低的值。从而学习到更**保守**的策略。

> [!TIP]
> SARSA是$S \rightarrow A \rightarrow R \rightarrow S' \rightarrow A'$的缩写

### Q-learning

$$
\boxed{
\begin{array}{rl}
1: & \text{初始化每个 }Q(s, a)\text{ 为 }0\\
2: & \text{for 周期 }i=1 \text{ to }M \text{ do}\\
3: & \qquad \text{for 时间步 }t=0 \text{ to }T-1 \text{ do}\\
4: & \qquad \qquad \text{根据当前策略 }\pi\text{选择动作 }a_t\text{并执行},\text{得到 }r_{t+1}, s_{t+1}\\
5: & \qquad \qquad Q(s_t, a_t)_{\text{target}} = r_{t+1} + \gamma \max_{a} Q(s_{t+1}, a)\\
6: & \qquad \qquad Q(s_t, a_t) \gets Q(s_t, a_t) + \alpha [Q(s_t, a_t)_{\text{target}} - Q(s_t, a_t)]\\
7: & \qquad \text{结束循环}\\
8: & \text{结束循环}\\
9: & \text{返回 }Q(s, a)
\end{array}
}
$$

Q-learning选择动作直接用最大的$Q(s_{t+1}, a)$，是一个**off-policy**(离线)算法。即使策略的随机性导致选择了奖励较低的动作，也不会拉低Q值，Q值始终选择历史最优，Q值会收敛到一个较高的值，从而学习到更**激进**的策略。
