---
title: "[计算机视觉] 卷积与图像降噪"
published: 2026-5-30 18:04:00
tags: [计算机视觉]
category: 大学计算机
draft: false
---

## 图像2D卷积

就是CNN里的那个卷积

一个卷积核在图像上滑动，计算卷积核和图像重叠部分的乘积和，得到一个新的像素值

### 概念和参数

1. 核大小(Kernel Size): 卷积核的尺寸，通常是一个奇数，如3x3、5x5等
2. 步长(Stride): 卷积核在图像上每次滑动的步长，默认为1，步长越大，输出图像越小
3. 填充(Padding): 在图像边缘添加额外的像素，以控制输出图像的尺寸，常见的填充方式有零填充（Zero Padding）
4. 感受野(Receptive Field): 卷积输出的单个像素点所能"看到"的输入图像区域大小，n层3x3卷积的感受野为(2n+1)，感受野是边长

```python
import numpy as np

def convolve2d_advanced(image, kernel, stride=1, padding=0):
    # 填充操作 (Padding)
    # 如果 padding > 0，在图像四周补零
    if padding > 0:
        image = np.pad(image, ((padding, padding), (padding, padding)), mode='constant')
    
    img_h, img_w = image.shape
    ker_h, ker_w = kernel.shape
    
    # 计算输出图像尺寸
    # 公式: O = (I - K + 2P) / S + 1
    out_h = (img_h - ker_h) // stride + 1
    out_w = (img_w - ker_w) // stride + 1
    
    # 初始化输出矩阵
    output = np.zeros((out_h, out_w))
    
    # 带步长的卷积操作
    for i in range(out_h):
        for j in range(out_w):
            # 计算切片在原图上的起始位置
            start_i = i * stride
            start_j = j * stride
            
            # 提取感兴趣区域
            region = image[start_i : start_i + ker_h, start_j : start_j + ker_w]
            
            # 执行点乘并求和
            output[i, j] = np.sum(region * kernel)
            
    return output
```

### 感受野计算公式

对于第$l$层卷积，感受野的计算公式为：

$$
R_l = R_{l-1} + (K_l - 1) \times \prod_{i=1}^{l-1} S_i
$$

其中：

- $R_l$ 是第$l$层的感受野大小，$R_0$ 是输入图像的感受野大小，通常为1
- $K_l$ 是第$l$层卷积核的大小
- $S_i$ 是第$i$层的步长

## 图像降噪

### 均值滤波(Mean Filter)

原理是用一个像素邻域内的像素值的平均值来替换中心像素值

本质上就是一个卷积核全部元素为$\frac{1}{9}$的卷积操作

$$
\text{Kernel} = \frac{1}{9} \begin{bmatrix}
1 & 1 & 1 \\
1 & 1 & 1 \\
1 & 1 & 1
\end{bmatrix}
$$

缺点：

- 模糊了图像的边缘，变糊
- 椒盐噪声的黑白点极端值会对平均值产生较大影响，去除效果不好

### 中值滤波(Median Filter)

原理是用一个像素邻域内的像素值的中位数来替换中心像素值

卷积核的元素不固定，而是根据邻域内像素值的排序来确定

```python
import numpy as np

def median_filter(image, kernel_size=3):
    img_h, img_w = image.shape
    pad = kernel_size // 2
    
    # 填充图像，防止边缘处理越界
    padded_img = np.pad(image, ((pad, pad), (pad, pad)), mode='edge')
    output = np.zeros_like(image)
    
    for i in range(img_h):
        for j in range(img_w):
            # 提取邻域窗口
            region = padded_img[i:i + kernel_size, j:j + kernel_size]
            # 排序并取中位数
            output[i, j] = np.median(region)
            
    return output
```

优点：

- 中位数能排除黑白点这种极端值的影响，能有效去除椒盐噪声
- 少数服从多数的特点可以保护图像的边缘

缺点：

- 计算慢，需要排序
- 细节丢失
- 无法有效去除高斯噪声，因为高斯噪声的像素值分布较为连续，没有明显的极端值

### 高斯滤波(Gaussian Filter)

利用正态分布的权重对像素进行加权平均，权重随距离中心像素的距离增加而减小

$$
\text{Kernel}(x, y) = \frac{1}{2\pi\sigma^2} e^{-\frac{x^2 + y^2}{2\sigma^2}}
$$

一个可行的3x3高斯核（$\sigma=1$）如下：

$$
\text{Kernel} = \frac{1}{16} \begin{bmatrix}
1 & 2 & 1 \\
2 & 4 & 2 \\
1 & 2 & 1
\end{bmatrix}
$$

```python
import numpy as np

def gaussian_kernel(size, sigma=1.0):
    # 生成中心点坐标
    ax = np.arange(-size // 2 + 1., size // 2 + 1.)
    xx, yy = np.meshgrid(ax, ax)
    
    # 高斯分布公式: G(x, y) = exp(-(x^2 + y^2) / (2 * sigma^2))
    kernel = np.exp(-(xx**2 + yy**2) / (2. * sigma**2))
    
    # 归一化，确保所有元素之和为 1
    return kernel / np.sum(kernel)

# 使用方式
kernel = gaussian_kernel(size=3, sigma=1.0)
# 调用之前的卷积函数
output = convolve2d_advanced(image, kernel, padding=1)
```

优点：

- 能有效去除高斯噪声，因为高斯滤波的权重分布与高斯噪声的分布相匹配
- 边缘保护较好，因为权重随距离增加而减小，远离中心像素的噪声对结果影响较小
- 可分离性：一个二维高斯核可以分解为两个一维高斯核的卷积，计算效率更高

缺点：

- 对于椒盐噪声效果不佳，因为椒盐噪声的极端值会对加权平均产生较大影响
