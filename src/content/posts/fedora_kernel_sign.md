---
title: "[Fedora 42]自签名自定义内核，启用安全启动"
published: 2025-08-04 09:30:06
tags: [Linux,Fedora]
category: Linux/Fedora
---

为了压住天选5pro上的火龙R9 7940HX，不得不用[asus-linux](http://asus-linux.org/)的asusctl，想要启用功耗控制的话还要用移植到fedora的cachyos内核

最近正好赶上战地6公测，要求启用安全启动。但是移植的cachyos内核是无签名的，只能自签名后导入MOK

## 使用pesign生成签名密钥

### 安装pesign

```shell
sudo dnf install pesign
```

### 生成签名密钥

```shell
sudo openssl req -new -x509 -newkey rsa:2048 -keyout MOK.key -out MOK.crt -nodes -days 3650 -subj "/CN=My Secure Boot Key/"

sudo openssl x509 -in MOK.crt -out MOK.cer -outform DER
```

## 导入密钥到 UEFI

```shell
sudo mokutil --import MOK.cer
```

> [!WARNING]
> 会提示设置密码，稍后导入密钥时会要求输入

重启后自动进入MOK,选择"Enroll MOK"导入密钥

## 使用sbsign签名内核

### 安装sbsigntools

```shell
sudo dnf install sbsigntools
```

### 签名内核

```shell
sudo sbsign --key MOK.key --cert MOK.crt --output /boot/vmlinuz-$(uname -r) /boot/vmlinuz-$(uname -r)

sudo mv /boot/vmlinuz-$(uname -r).signed /boot/vmlinuz-$(uname -r)

```

## 更新grub

```shell
sudo grub2-mkconfig -o /boot/grub2/grub.cfg
```

最后在BIOS设置中开启安全启动
