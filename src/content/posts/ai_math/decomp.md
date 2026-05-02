---
title: "[人工智能数学基础] 矩阵分解"
published: 2026-4-19 10:33:00
tags: [人工智能数学基础, 数学, 线性代数]
category: 人工智能数学基础
draft: false
---

工程上通常会用矩阵分解来求解线性方程组

## LU分解

将矩阵分解为一个下三角矩阵和一个上三角矩阵的乘积：

$$A = LU$$

其中$L$是下三角矩阵，$U$是上三角矩阵

- 下三角矩阵：所有元素在主对角线以下的矩阵，主对角线元素可以是任意值
- 上三角矩阵：所有元素在主对角线以上的矩阵，主对角线元素可以是任意值

### LU手算方法

1. 将矩阵$A$进行高斯消元，得到一个上三角矩阵$U$，消元时$R_i - k R_j$(第$i$行减去第$j$行的$k$倍)的系数$k$就是下三角矩阵$L$中元素$l_{ij}$的值

e.g.:

$$
A = \begin{bmatrix} 2 & 3 \\ 4 & 7 \end{bmatrix} \quad \rightarrow \quad
U = \begin{bmatrix} 2 & 3 \\ 0 & 1 \end{bmatrix} \quad \rightarrow \quad
L = \begin{bmatrix} 1 & 0 \\ 2 & 1 \end{bmatrix}
$$

## QR分解

将矩阵分解为一个正交矩阵和一个上三角矩阵的乘积：

$$A = QR$$

其中$Q$是正交矩阵，$R$是上三角矩阵

### QR手算方法

1. 使用格拉姆-施密特正交化方法将矩阵$A$的列向量正交化，得到一个正交矩阵$Q$，正交化过程中每个列向量的长度就是上三角矩阵$R$中的元素

e.g.:

$$
A = \begin{bmatrix} 3 & 1 \\ 4 & 2 \end{bmatrix} \\[1em]
A = \left [ \mathbf{a_1}, \mathbf{a_2} \right ] \\
Q = \left [ \mathbf{q_1}, \mathbf{q_2} \right ]
$$

先算$\mathbf{q_1}$：

$$
\mathbf{q_1} = \frac{\mathbf{a_1}}{\Vert \mathbf{a_1}\Vert} = \frac{1}{5} \begin{bmatrix} 3 \\ 4 \end{bmatrix}
$$

然后算$\mathbf{a_2}$在$\mathbf{q_1}$上的投影：

$$
\text{proj}_{\mathbf{q_1}} \mathbf{a_2} = \left( \frac{\mathbf{a_2} \cdot \mathbf{q_1}}{\mathbf{q_1} \cdot \mathbf{q_1}} \right) \mathbf{q_1} = \frac{11}{25} \begin{bmatrix} 3 \\ 4 \end{bmatrix}
$$

得垂直向量$\mathbf{v_2}$：

$$
\mathbf{v_2} = \mathbf{a_2} - \text{proj}_{\mathbf{q_1}} \mathbf{a_2} = \begin{bmatrix} 1 \\ 2 \end{bmatrix} - \frac{11}{25} \begin{bmatrix} 3 \\ 4 \end{bmatrix} = \frac{1}{25} \begin{bmatrix} -8 \\ 6 \end{bmatrix}
$$

最后算$\mathbf{q_2}$：

$$
\mathbf{q_2} = \frac{\mathbf{v_2}}{\Vert \mathbf{v_2} \Vert} = \frac{1}{10} \begin{bmatrix} -8 \\ 6 \end{bmatrix}
$$

得到：

$$
Q = \frac{1}{5} \begin{bmatrix} 3 & -4 \\ 4 & 3 \end{bmatrix} \quad \rightarrow \quad
R = Q^T A = \begin{bmatrix}
 \Vert \mathbf{a_1} \Vert & \Vert \mathbf{\text{proj}_{\mathbf{q_1}} \mathbf{a_2}} \Vert \\
    0 & \Vert \mathbf{v_2} \Vert
\end{bmatrix} = \begin{bmatrix} 5 & 2.2 \\ 0 & 0.4 \end{bmatrix}
$$

## 奇异值分解(SVD)

$$A = U \Sigma V^T$$

其中$U$是左奇异矩阵，$\Sigma$是对角矩阵，$V^T$是右奇异矩阵的转置

### SVD手算

> 这你要考手算那我还说啥了，分不要了呗

## 特征值分解(EVD)

$$A = PDP^{-1}$$

其中$P$是特征向量矩阵，$D$是特征值对角矩阵

### EVD手算

1. 计算矩阵$A$的特征值$\lambda$，通过求解特征多项式$\det(A - \lambda I) = 0$得到
2. 对于每个特征值$\lambda$，求解特征向量$\mathbf{v}$，通过求解线性方程组$(A - \lambda I)\mathbf{v} = 0$得到
3. 把特征值摆在$D$的对角线上，把对应的特征向量摆在$P$的列向量上
4. 还要求$P^{-1}$，如果是对称矩阵，特征向量相互正交，$P$是正交矩阵，$P^{-1} = P^T$，否则需要通过其他方法求逆

## Cholesky(科列斯基)分解

$$A = LL^T$$

其中$L$是下三角矩阵

### Cholesky手算

> LU分解升级版

1. 对角线元素：$l_{ii} = \sqrt{a_{ii} - \sum_{k=1}^{i-1} l_{ik}^2}$
2. 非对角线元素：$l_{ij} = \frac{1}{l_{jj}} \left( a_{ij} - \sum_{k=1}^{j-1} l_{ik} l_{jk} \right)$，其中$i > j$

e.g.:

$$
A = \begin{bmatrix}
a_{11} & a_{12} & a_{13} \\ a_{21} & a_{22} & a_{23} \\ a_{31} & a_{32} & a_{33}
\end{bmatrix}
L = \begin{bmatrix}
l_{11} & 0 & 0 \\ l_{21} & l_{22} & 0 \\ l_{31} & l_{32} & l_{33}
\end{bmatrix}
$$

先算第一列：

$$
l_{11} = \sqrt{a_{11}} \\[1em]
l_{21} = \frac{a_{21}}{l_{11}} \\[1em]
l_{31} = \frac{a_{31}}{l_{11}}
$$

然后算第二列：

$$
l_{22} = \sqrt{a_{22} - l_{21}^2} \\[1em]
l_{32} = \frac{1}{l_{22}} \left( a_{32} - l_{31} l_{21} \right)
$$

最后算第三列：

$$
l_{33} = \sqrt{a_{33} - (l_{31}^2 + l_{32}^2)}
$$
