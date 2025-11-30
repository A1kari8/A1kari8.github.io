---
title: "在Fedora上无需编译安装ROS/ROS2"
published: 2025-09-13 21:57:06
tags: [Linux,Fedora,ROS,HITCRT]
category: Linux/Fedora
draft: true
---

## 起因

最近在尝试加入学校的竞技机器人队，队里也是像我预想的一样要求用老版本的Ubuntu

~~用Ubuntu是不可能的，这辈子都不可能的~~

至于原因的话，Ubuntu的广告和snap实在是有点让人厌恶，但主要原因是我这台锐龙笔记本cpu发热实在太厉害，
必须要用[asus-linux](http://asus-linux.org/)的asusctl来控制功耗。然而众多热门发行版中唯独不支持Ubuntu(~~作者看来也挺不待见Ubuntu的~~)

[https://asus-linux.org/](https://asus-linux.org/)

## 尝试

经过两次在Fedora上安装ROS的rpm包的失败尝试，终于想起来Fedora还有个copr仓库，于是就在里面搜寻

(Fedora虽然背靠RedHat，却总是被rpm包排除在外，或许下次该考虑下Rocky Linux了)

找了找结果还真找到了编译好的ROS，社区还真是强大，感谢各位大佬的贡献

[https://copr.fedorainfracloud.org/coprs/tavie/ros2/](https://copr.fedorainfracloud.org/coprs/tavie/ros2/)

## 安装

安装也是相当的简单

```shell
sudo dnf copr enable tavie/ros2
```

```shell
sudo dnf install ros-{ distro }-desktop
```

`{distro}`填入要安装的ROS发行版名称，如`jazzy`(`humble`版本只有Fedora40能安装😭)

Ubuntu上使用的启动ROS环境变量的语句在这里要换成

```shell
source /usr/lib64/ros2-{ distro }/setup.bash
```

## 新发现

在问AI的时候给我介绍了个叫RoboStack的项目

[https://robostack.github.io/](https://robostack.github.io/)

这个项目把ROS打包成了conda包，可以直接安装在conda环境中，无关发行版且方便管理ROS版本

感觉是个非常有意义的项目，不知道为什么网上却几乎没有相关的讨论

亲测可以在Fedora42上使用ROS-Humble，不过自定义消息类型编译会报错，目前还没有解决思路
