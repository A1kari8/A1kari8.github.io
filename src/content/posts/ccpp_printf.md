---
title: C/C++ printf() 的使用
published: 2023-12-15 18:19:25
tags: [C++,C]
category: Programming
# cover: https://img-blog.csdnimg.cn/20200107215639651.png
---

## 1. 转换说明符

`%s` 字符串

`%a` 浮点数、十六进制bai数字和p-记法(C99)

`%c` 一个字符

`%d` 有符号十进制整数

`%e` 浮点数、e-记数法

`%f` 浮点数、十进制记数法

`%g` 根据数值不同自动选择`％f`或`％e`

`%i` 有符号十进制数(与`％d`相同)

`%o` 无符号八进制整数

`%p` 指针

`%u` 无符号十进制整数

`%x` 使用十六进制数字0f的无符号十六进制整数

`%%` 打印一个百分号

> [!TIP]
> ps: 使用`printf()`打印`std::string`可能出现乱码，可使用`std::string.c_str()`
