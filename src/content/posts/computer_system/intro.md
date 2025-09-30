---
title: "[ICS大作业] 第一章 概述"
published: 2025-09-30 23:40:00
tags: [Linux,Fedora,C]
category: 大学计算机
draft: false
---

## 1.1 Hello简介

### P2P(From Program to Process)

编写静态文本`hello.c`，通过编译器、汇编器、链接器等工具，生成可执行文件`hello`

再通过shell运行命令`./hello`，操作系统加载可执行文件到内存

系统调用`fork`创建子进程，子进程调用`execve`加载可执行文件`hello`，替换子进程的内存空间

`mmap`将代码段、数据段、堆、栈等映射到进程的虚拟地址空间

### 020(From Zero-0 to Zero-0)

进行完P2P后，调度器(`Scheduler`)为进程分配CPU时间片，进程开始执行。CPU 通过流水线执行指令，`MMU` 将虚拟地址（VA）转换为物理地址（PA），TLB 加速页表访问，若未命中则遍历 4 级页表，必要时触发 `Pagefile` 页面置换。三级 `Cache` 提升访问效率。执行 `printf` 时触发 `write()` 系统调用，IO 管理模块通过驱动控制主板总线将数据送至显卡，最终显示在屏幕上。运行过程中信号机制处理异步事件。程序结束后调用 `exit()`，进程进入僵尸态，父进程通过 `wait()` 回收资源，关闭文件描述符，释放内存，销毁 PCB，系统归零。

## 1.2 环境与工具

### 环境

- CPU: AMD Ryzen 9 7940HX
- RAM: 16GB DDR5
- OS: Fedora Linux 42

### 工具

- 编辑器: Visual Studio Code
- LSP: clangd version 20.1.8 (Fedora 20.1.8-4.fc42)
- 编译器: gcc (GCC) 15.2.1 20250808 (Red Hat 15.2.1-1) clang version 20.1.8 (Fedora 20.1.8-4.fc42)
- 调试器: GNU gdb (Fedora Linux) 16.3-1.fc42

## 1.3 中间结果

- hello.i: 预处理结果，用于生成汇编代码
- hello.s: 汇编代码，包含汇编指令，用于生成目标文件
- hello.o: 目标文件，包含机器码和符号表，用于链接生成可执行文件

## 1.4 本章小结

本章介绍了P2P和020的全过程，理解了从编写代码到程序执行的各个环节，说明了当前的环境与工具，并说明了中间结果文件及其作用
