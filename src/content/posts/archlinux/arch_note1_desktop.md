---
title: "ArchLinux笔记(2) 开始图形化"
published: 2025-11-06 20:49:00
tags: [Linux,Arch Linux]
category: Linux/ArchLinux
draft: true
---

## 安装greetd

```bash
sudo pacman -S greetd greetd-tuigreet
```

编辑配置文件`/etc/greetd/config.toml`

```toml
[terminal]
# The VT to run the greeter on. Can be "next", "current" or a number
# designating the VT.
vt = 1

# The default session, also known as the greeter.
[default_session]

# `agreety` is the bundled agetty/login-lookalike. You can replace `/bin/sh`
# with whatever you want started, such as `sway`.
command = "tuigreet --cmd niri-session"

# The user to run the command as. The privileges this user must have depends
# on the greeter. A graphical greeter may for example require the user to be
# in the `video` group.
user = "<username>"
#command = "niri-session"
```

启用greetd服务

```bash
systemctl enable greetd.service
```

### 将用户加入必要的组

```bash
sudo usermod -aG video,audio,network <username>
```

## 安装niri

```bash
sudo pacman -S niri xwayland-satellite alacritty
```

会让选择音频后端，推荐`pipewire-jack`

## 安装xdg-user-dirs

```bash
sudo pacman -S xdg-user-dirs
xdg-user-dirs-update
```

## 安装xdg-desktop-portal

```bash
sudo pacman -S xdg-desktop-portal xdg-desktop-portal-kde
```

## 安装显卡驱动

### AMD核显

```bash
sudo pacman -S mesa lib32-mesa xf86-video-amdgpu vulkan-radeon lib32-vulkan-radeon
```

### NVIDIA独显

```bash
sudo pacman -S nvidia-dkms nvidia-utils nvidia-settings lib32-nvidia-utils
```

安装后等待dkms自动编译内核模块

## 安装polkit

```bash
sudo pacman -S polkit polkit-gnome
```
