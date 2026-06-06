---
title: "[计算机视觉] 斑点检测"
published: 2026-6-6 11:15:00
tags: [计算机视觉]
category: 大学计算机
draft: false
---

## 高斯拉普拉斯算子(LoG Laplacian of Gaussian)

核心思想：先用高斯模糊去除噪声，再用拉普拉斯算子计算二阶导数

$$
\text{LoG}(x, y) = \nabla^2 (G_{\sigma}(x, y) * I(x, y))
$$

整个算子可以表示成一个卷积核：

$$
\text{LoG}(x, y) = \frac{1}{\pi \sigma^4} \left(1 - \frac{x^2 + y^2}{2\sigma^2}\right) e^{-\frac{x^2 + y^2}{2\sigma^2}}
$$

当这个卷积核与图像卷积时，输出结果为绝对值较大的点即为斑点

### 尺度归一化

因为斑点的大小不确定，所以需要对不同尺度的斑点进行归一化处理，通过数学推导发现：

$$
\nabla^2 G \propto \frac{1}{\sigma^2}
$$

所以在计算斑点响应时需要乘以$\sigma^2$来进行尺度归一化：

$$
\text{LoG}(x, y) = \sigma^2 \nabla^2 (G_{\sigma}(x, y) * I(x, y))
$$

## DoG差分高斯算子(Difference of Gaussian)

LoG计算压力较大，所以可以用两个不同$\sigma$的高斯模糊图像相减来近似LoG：

$$
\text{DoG}(x, y) = G_{\sigma_1}(x, y) * I(x, y) - G_{\sigma_2}(x, y) * I(x, y)
$$

SIFT算法就用的这个
