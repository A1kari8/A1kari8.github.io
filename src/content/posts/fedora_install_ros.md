---
title: "在Fedora上无需编译安装ROS/ROS2"
published: 2025-09-13 21:57:06
tags: [Linux,Fedora,ROS,HITCRT]
category: Linux/Fedora
draft: false
---

## 起因

最近尝试加入学校的竞技机器人队，队里也是如预想的一样要求用老版本的Ubuntu

~~不想用Ubuntu~~

## 尝试

经过两次在Fedora上安装ROS的rpm包的失败尝试(~~依旧RHEL专用版~~)，想起来Fedora还有个copr仓库，于是从中找到了别人打包的ROS

[https://copr.fedorainfracloud.org/coprs/tavie/ros2/](https://copr.fedorainfracloud.org/coprs/tavie/ros2/)

## 安装

安装挺简单的

```shell
sudo dnf copr enable tavie/ros2
```

```shell
sudo dnf install ros-{distro}-desktop
```

`{distro}`填ROS发行版名称，如`jazzy`(`humble`版本只有Fedora40能安装😭)

Ubuntu上使用的启动ROS环境变量的语句在这里要换成

```shell
source /usr/lib64/ros2-{distro}/setup.bash
```

## 新发现

在问AI的时候给我介绍了个叫RoboStack的项目

[https://robostack.github.io/](https://robostack.github.io/)

这个项目把ROS打包成了conda包，可以直接安装在conda环境中，无关发行版且方便管理ROS版本

感觉是个非常有意义的项目，不知道为什么网上却几乎没有相关的讨论

亲测可以在Fedora42上使用ROS-Humble，不过自定义消息类型编译会报错，目前还没有解决思路

## 最终

别折腾，建议用容器

[/posts/ros_in_container/](/posts/ros_in_container/)
