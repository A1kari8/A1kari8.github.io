---
title: "在容器中开发ROS/ROS2"
published: 2025-12-11 13:30:00
tags: [ROS,Linux]
category: ROS
---

## 引言

ROS1以及ROS2 Humble这类常用的版本要求的Ubuntu都太老了，这些老系统在新的电脑尤其是笔记本上总会有很多问题，最经典的就是X11不支持笔记本的核显独显双显卡（只能装其中一个的驱动），而且ROS的巨量依赖直接装系统里也挺脏的，所以说还是关在容器里比较好

## 需要的工具

安装`distrobox`和`podman`（`docker`也可以，但是我觉得`podman`比较轻量）

## 生成nvidia的cdi配置（不需要独显可以跳过）

先安装`nvdia-container-toolkit`

```bash
sudo nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml
sudo nvidia-ctk runtime configure --runtime=docker #虽说这里是docker但是podman也得用

# 如果用docker还需要重启docker服务
sudo systemctl restart docker
```

`nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml`这行命令貌似每次更新nvidia驱动都需要执行一次，nvidia的文档里也有自动生成的办法，不过更新也不频繁我觉得手动就行了

## 创建容器

```bash
distrobox create --name <实例名称> --additional-flags "--device nvidia.com/gpu=all" --image docker.io/nvidia/cuda:12.9.1-cudnn-runtime-ubuntu22.04
```

这里nvidia的带cudnn-runtime的镜像了，如果你不需要可以直接用ubuntu的官方镜像

:::warning
使用nvidia的镜像时会弹广告，这个广告内容会被旧版的`distrobox`当成命令执行导致报错，所以记得更新`distrobox`到最新版
:::

:::tip
至于为什么不用`distrobox`的`--nvidia`参数启用nvidia独显，因为它会把宿主机的`libicudata`挂载进容器，导致容器中无法安装`libicu-dev`
:::

## 进入容器

```bash
distrobox enter <实例名称>
```

之后像正常使用Ubuntu一样安装ROS就好了

## 常见问题

### `dpkg`报错`xserver-*`无法安装

类似于

```plaintext
 dpkg: error processing package xserver-xorg-input-all (--configure):

 dependency problems - leaving unconfigured

Errors were encountered while processing:

 keyboard-configuration

 xserver-xorg-core

 xserver-xorg-video-ati

 xserver-xorg-video-radeon

 xserver-xorg-input-wacom

 xserver-xorg-video-fbdev

 xserver-xorg-video-vmware

 xserver-xorg-video-intel

 xserver-xorg-video-all

 xserver-xorg-video-vesa

 xserver-xorg-video-qxl

 xserver-xorg-video-amdgpu

 xserver-xorg

 xserver-xorg-video-nouveau

 xserver-xorg-input-libinput

 xserver-xorg-input-all

E: Sub-process /usr/bin/dpkg returned an error code (1) 
```

这个问题应该只会出现在安装ROS1的desktop-full时，因为是容器所以用不上这些包，就算要在容器里显示图形界面软件也用不上，可以直接移除掉

```bash
sudo apt remove --purge xserver-xorg-core
sudo apt autoremove
```

### 每次使用`apt`都有未设置语言环境的警告

先用`apt`安个编辑器`vim`,`nano`之类的都可以

```bash
sudo vim /etc/locale.gen
```

将`en_US.UTF-8 UTF-8`和`zh_CN.UTF-8 UTF-8`取消注释

```bash
sudo locale-gen
```

### 容器内的图形软件不用独显渲染

这个其实不是容器的问题，在哪都一样

需要在运行软件前设置环境变量

```bash
__NV_PRIME_RENDER_OFFLOAD=1 __VK_LAYER_NV_optimus=NVIDIA_only __GLX_VENDOR_LIBRARY_NAME=nvidia <命令>
```

为了方便可以在`~/.bashrc`或者`~/.zshrc`之类的里面加个别名（取决于你用什么shell）

```bash
alias prime-run='__NV_PRIME_RENDER_OFFLOAD=1 __VK_LAYER_NV_optimus=NVIDIA_only __GLX_VENDOR_LIBRARY_NAME=nvidia '
```

之后直接用`prime-run <命令>`就行
