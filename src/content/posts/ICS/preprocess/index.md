---
title: "[ICS大作业] 第二章 预处理"
published: 2025-10-1 10:53:00
tags: [Linux,C]
category: ICS
draft: false
---

## 2.1 预处理的概念和作用

预处理是编译过程的第一步，主要负责处理源代码中的预处理指令，如宏定义、文件包含和条件编译等。预处理器会将这些指令转换为相应的代码片段，生成一个中间文件（通常以.i为后缀），该文件不包含任何预处理指令，只有纯粹的C代码

预处理的主要作用包括：

1. 宏替换：将源代码中的宏定义替换为相应的代码片段
2. 文件包含：处理`#include`指令，将指定的头文件内容插入到源代码中
3. 条件编译：根据条件编译指令（如`#ifdef`、`#ifndef`、`#endif`等）选择性地编译代码块
4. 生成调试信息：预处理器可以生成调试信息，帮助开发者定位代码中的问题

## 2.2 预处理命令

```shell
cpp hello.c -o hello.i
```

![截图](./preprocess.png)

## 2.3 Hello的预处理结果解析

因生成文件过大无法贴出全部内容，以下为部分内容解析

```c
# 0 "hello.c"
# 0 "<built-in>"
# 0 "<命令行>"
# 1 "/usr/include/stdc-predef.h" 1 3 4
# 0 "<命令行>" 2
# 1 "hello.c"

...

```

- **`# 0 "hello.c"`**: 表示接下来的代码来自 `hello.c` 文件的第 0 行
- **`# 0 "<built-in>"`**: 表示接下来的代码来自编译器内置代码的第 0 行
- **`# 0 "<命令行>"`**: 表示接下来的代码来自命令行参数（宏定义）的第 0 行
- **`# 1 "/usr/include/stdc-predef.h" 1 3 4`**: 表示接下来的代码来自 `/usr/include/stdc-predef.h` 文件的第 1 行，标志 `1` 表示文件包含开始，标志 `3` 表示这是系统头文件
- **`# 0 "<命令行>" 2`**: 表示接下来的代码回到命令行参数的第 0 行，标志 `2` 表示文件包含结束
- **`# 1 "hello.c"`**: 表示接下来的代码来自 `hello.c` 文件的第 1 行

```c
# 1 "/usr/include/stdio.h" 1 3 4
# 28 "/usr/include/stdio.h" 3 4
# 1 "/usr/include/bits/libc-header-start.h" 1 3 4
# 33 "/usr/include/bits/libc-header-start.h" 3 4
# 1 "/usr/include/features.h" 1 3 4
# 415 "/usr/include/features.h" 3 4
# 1 "/usr/include/features-time64.h" 1 3 4
# 20 "/usr/include/features-time64.h" 3 4
# 1 "/usr/include/bits/wordsize.h" 1 3 4
# 21 "/usr/include/features-time64.h" 2 3 4
# 1 "/usr/include/bits/timesize.h" 1 3 4
# 19 "/usr/include/bits/timesize.h" 3 4
# 1 "/usr/include/bits/wordsize.h" 1 3 4
# 20 "/usr/include/bits/timesize.h" 2 3 4

...

```

可见此部分用于包含`hello.c`中通过`#include`指令包含的各类头文件，如`stdio.h`，以及`stdio.h`中包含的其他头文件

而后续大量代码即为这些头文件的内容，包含各种函数声明、宏定义和类型定义等

翻到文件末尾，可以看到`hello.c`中的代码：

```c
# 10 "hello.c" 2


# 11 "hello.c"
int main(int argc,char *argv[]){
 int i;

 if(argc!=5){
  printf("用法: Hello 学号 姓名 手机号 秒数！\n");
  exit(1);
 }
 for(i=0;i<10;i++){
  printf("Hello %s %s %s\n",argv[1],argv[2],argv[3]);
  sleep(atoi(argv[4]));
 }
 getchar();
 return 0;
}
```

这部分代码与`hello.c`中的代码完全一致，说明预处理器已经完成了宏替换和文件包含等工作

## 2.4 本章小结

本章介绍了预处理的概念和作用，讲解了如何使用预处理命令生成预处理结果，并对`hello.c`的预处理结果进行了大致解析，理解了预处理器如何处理源代码中的预处理指令
