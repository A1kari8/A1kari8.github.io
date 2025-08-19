---
title: "[转载] 解决KVM虚拟机无法联网的问题"
published: 2025-08-05 18:13:58
tags: [Linux,软件问题]
author: "Ak4ri Amamiya"
category: Linux
# copyright_author_href: https://ak4ri-amamiya.github.io/
sourceLink: https://ak4ri-amamiya.github.io/2024/06/28/20240628_libvirtd-no-network/
copyright: 本文转载自原作者博客，并依据CC BY-NC-SA 4.0协议共享
draft: true
---

## 我自己遇到的问题

今天在Fedora 42上安装了virt-manager，发现虚拟机和主机互相都能ping通，但是虚拟机无法连接互联网

之后在网上搜寻解决方法找到了这篇有着完全相同问题的[文章](https://ak4ri-amamiya.github.io/2024/06/28/20240628_libvirtd-no-network/)，感谢Ak4ri大佬

## 原文解决方法

修改`/etc/libvirt/network.conf`

```plaintext
firewall_backend = "iptables"
```

重启`libvirtd`

```shell
sudo systemctl restart libvirtd
```
