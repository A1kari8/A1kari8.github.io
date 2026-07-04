---
title: "[模式识别与机器学习] 神经网络优化"
published: 2026-6-27 21:29:00
tags: [模式识别, 机器学习]
category: 模式识别与机器学习
draft: false
---

## 反向传播算法

在[非线性分类器](/post/ml/nonlinear_classifier#反向传播算法)

## 优化器(不考)

$\eta$ 学习率

### GD梯度下降

最普通的优化方法，一次计算所有样本的损失的梯度，更新参数

$$
\theta_t = \theta_{t-1} - \eta \nabla_\theta J(\theta_{t-1})
$$

### SGD随机梯度下降

每次只计算随机一个样本的损失的梯度，更新参数

$$
\theta_t = \theta_{t-1} - \eta \nabla_\theta J(\theta_{t-1}; x^{(i)}, y^{(i)})
$$

### Mini-batch SGD小批量随机梯度下降

每次随机选择一小批样本，计算损失的梯度，更新参数

$$
\theta_t = \theta_{t-1} - \eta \nabla_\theta J(\theta_{t-1}; x^{(i:i+n)}, y^{(i:i+n)})
$$

### Momentum动量法

模拟物理中的动量，更新参数时考虑上一次的更新方向

$$
v_t = \beta v_{t-1} +\nabla_\theta J(\theta_{t-1}) \\
\theta_t = \theta_{t-1} - \eta v_t
$$

- $\beta$ 是动量系数，通常取值在 [0.9, 0.99] 之间

### Nesterov加速梯度法

> 改进自动量法

先在当前位置按上次的动量方向走一点再算梯度

$$
v_t = \beta v_{t-1} +\nabla_\theta J(\theta_{t-1}) \\
\theta_{t} = \theta_{t-1} - \eta (\nabla_\theta J(\theta_{t-1})+ \beta v_{t})
$$

### Adagrad自适应梯度算法

令$g_{t,i}$为第$i$个参数$\theta_i$在第$t$次迭代的梯度，累计梯度平方和：

$$
G_{t,i} = \sum_{\tau=1}^{t} g_{\tau,i}^2
$$

> 实际实现是递推相加避免重复计算：$G_{t,i} = G_{t-1,i} + g_{t,i}^2$

则参数更新：

$$
\theta_{t,i} = \theta_{t-1,i} - \frac{\eta}{\sqrt{G_{t-1,i}} + \epsilon} \cdot g_{t,i}
$$

- $\epsilon$ 是一个小常数，防止除零错误，通常取 $10^{-8}$
- $\eta$ 是初始学习率，通常取 $0.01$

缺点：学习率单调递减，最后学不动

### RMSProp均方根传播算法

> 改进自Adagrad，解决学习率单调递减的问题
>
> 核心思想是按比例丢弃历史的梯度平方和，且按比例新增梯度平方，限制梯度平方和的增长速度

定义梯度平方和的指数移动平均$r_t$(或$E[g_t^2]$/$v_t$)：

$$
r_t = \rho r_{t-1} + (1 - \rho) g_t^2
$$

- $\rho$ 是衰减率，通常取 $0.9$

参数更新：

$$
\theta_{t} = \theta_{t-1} - \frac{\eta}{\sqrt{r_t} + \epsilon} \cdot g_t
$$

### Adam自适应矩估计算法

> 结合Momentum和RMSProp

$$
\text{一阶矩} \quad m_t = \beta_1 m_{t-1} + (1 - \beta_1) g_t \\
\text{二阶矩} \quad v_t = \beta_2 v_{t-1} + (1 - \beta_2) g_t^2
$$

- $\beta_1$ 是一阶矩的衰减率，通常取 $0.9$
- $\beta_2$ 是二阶矩的衰减率，通常取 $0.999$

$m_t$和$v_t$初始化为0, 训练初期期望值会偏向0导致更新过小，需进行偏差修正：

$$
m_t = \frac{m_t}{1 - \beta_1^t} \\
v_t = \frac{v_t}{1 - \beta_2^t}
$$

- $t$ 是迭代次数
- $\beta_1^t$ 和 $\beta_2^t$ 是衰减率的$t$次幂，随着迭代次数增加，趋近于0

参数更新：

$$
\theta_{t} = \theta_{t-1} - \eta \cdot  \frac{m_t}{\sqrt{v_t} + \epsilon}
$$

### AdamW自适应矩估计权重衰减算法

> 改进自Adam，解决L2正则化在Adam中不生效的问题

在Adam的基础上，参数更新后再进行权重衰减：

$$
\theta_{t} = \theta_{t-1} - \eta \cdot  \frac{m_t}{\sqrt{v_t} + \epsilon} - \eta \lambda \theta_{t-1}
$$

- $\lambda$ 是权重衰减系数，通常取 $[10^{-2}, 10^{-1}]$

## 激活函数

### 对数Sigmoid函数

$$
\sigma(x) = \frac{1}{1 + e^{-x}}
$$

### 双曲正切函数

$$
\tanh(x) = \frac{e^x - e^{-x}}{e^x + e^{-x}} = 2\sigma(2x) - 1
$$

### ReLU

$$
\text{ReLU}(x) = \max(0, x)
$$

> [!NOTE]
> 平滑ReLU（Softplus）：
> $$
> \text{Softplus}(x) = \log(1 + e^x)
> $$

## 批归一化(BN)

> 通过规范化每层输入，解决训练过程中**内部协变量偏移(Internal Covariate Shift)**问题，即前层参数变化导致后层输入分布持续变化的现象。

### 前向传播

对每个 mini-batch $\mathcal{B} = \{\mathbf{x}_1, \dots, \mathbf{x}_m\}$，对每个特征维独立进行归一化：

$$
\begin{aligned}
\mu_{\mathcal{B}} &= \frac{1}{m} \sum_{i=1}^m \mathbf{x}_i \qquad \text{(批均值)} \\[1em]
\sigma_{\mathcal{B}}^2 &= \frac{1}{m} \sum_{i=1}^m (\mathbf{x}_i - \mu_{\mathcal{B}})^2 \qquad \text{(批方差)} \\[1em]
\hat{\mathbf{x}}_i &= \frac{\mathbf{x}_i - \mu_{\mathcal{B}}}{\sqrt{\sigma_{\mathcal{B}}^2 + \epsilon}} \qquad \text{(归一化)} \\[1em]
\mathbf{y}_i &= \gamma \hat{\mathbf{x}}_i + \beta \qquad \text{(缩放平移)}
\end{aligned}
$$

- $\gamma$（缩放参数）、$\beta$（平移参数）是可学习参数，恢复网络的表达能力
- $\epsilon$ 防止除零，通常取 $10^{-5}$

> 引入 $\gamma, \beta$ 的原因是：单纯归一化会将数据限制在单位方差、零均值，可能破坏网络的表达能力（如将原本在 Sigmoid 线性区的输入推到饱和区）；通过可学习的 $\gamma, \beta$，网络可以自行决定是否恢复原始分布。

### 训练与推理的差异

- **训练时**：使用当前 mini-batch 的 $\mu_{\mathcal{B}}, \sigma_{\mathcal{B}}^2$ 进行归一化
- **推理时**：使用训练集上累积的**全局**均值 $\mu_{\text{run}}$ 和方差 $\sigma_{\text{run}}^2$（指数移动平均）：

  $$
  \mu_{\text{run}} \leftarrow \alpha \mu_{\text{run}} + (1 - \alpha) \mu_{\mathcal{B}} \\
  \sigma_{\text{run}}^2 \leftarrow \alpha \sigma_{\text{run}}^2 + (1 - \alpha) \sigma_{\mathcal{B}}^2
  $$

  - $\alpha$ 为动量系数（通常 $0.9$），推理时固定该统计量

### 反向传播

BN 层参与梯度计算，链式法则需考虑 $\mu$ 和 $\sigma^2$ 对输入的依赖。现代框架自动处理，梯度通过归一化、$\gamma$、$\beta$ 逐层回传。

### 放置位置

通常置于**线性变换之后、激活函数之前**：

$$
\mathbf{z} = \mathbf{W}\mathbf{x} + \mathbf{b} \rightarrow \text{BN}(\mathbf{z}) \rightarrow \sigma(\cdot)
$$

> 因 BN 含有平移参数 $\beta$，线性层中的偏置 $\mathbf{b}$ 可省略。

### 作用与效果

| 作用 | 说明 |
|------|------|
| 加速收敛 | 缓解梯度消失/梯度爆炸，允许使用更大的学习率 |
| 减少过拟合 | 每个 batch 的均值方差存在随机性，带来轻微正则化效果 |
| 降低对初始化的依赖 | 每层输入分布相对稳定，参数初始化不必过于精确 |
| 允许更大学习率 | 输出分布受控，不易发散 |

### 局限

- **小 batch 不友好**：batch 过小时统计量不稳定，影响训练质量（替代方案：LayerNorm、GroupNorm）
- **训练与推理行为不一致**：训练依赖 batch 内其他样本，推理使用全局统计量
- **对序列模型不直接适用**：RNN 中不同时间步共享 BN 参数需特殊处理
