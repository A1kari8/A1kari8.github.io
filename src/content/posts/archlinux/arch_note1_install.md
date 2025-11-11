---
title: "ArchLinux笔记(1) 系统安装与基本配置"
published: 2025-11-06 20:20:00
tags: [Linux,Arch Linux]
category: Linux/ArchLinux
draft: false
---

## 设置字体

高分屏可能觉得字体太小看不清

```bash
setfont ter-132b
```

## 联网

先查看网卡信息

```bash
ip link
```

可能有网卡的状态是DOWN的，需要启用

稍后安装好系统后也可以用下面的命令启用网卡

```bash
ip link set <接口名> up
```

## 设置时间同步

查看时间同步状态

```bash
timedatectl status
```

设置时区

```bash
timedatectl set-timezone Asia/Shanghai
```

## 磁盘分区及格式化并挂载

### 分区

我推荐使用`cfdisk`

查看磁盘情况

```bash
lsblk
```

启动`cfdisk`

```bash
cfdisk <磁盘设备>
```

### 格式化

同样使用`lsblk`查看磁盘情况

格式化EFI分区为FAT32

```bash
mkfs.fat -F32 <EFI分区>
```

格式化交换分区为swap

```bash
mkswap <交换分区>
```

格式化根分区为btrfs

```bash
mkfs.btrfs <根分区>
```

### btrfs子卷创建

先挂载根分区

```bash
mount <根分区> /mnt
```

创建子卷

```bash
btrfs subvolume create /mnt/@
btrfs subvolume create /mnt/@home
btrfs subvolume create /mnt/@root
btrfs subvolume create /mnt/@srv
btrfs subvolume create /mnt/@cache
btrfs subvolume create /mnt/@log
btrfs subvolume create /mnt/@tmp
btrfs subvolume create /mnt/@nix
```

:::caution
卸载根分区
:::

```bash
umount /mnt
```

### 挂载

挂载btrfs子卷

```bash
mount -o compress=zstd:3,noatime,ssd,space_cache=v2,discard=async,subvol=@ <btrfs分区> /mnt
mkdir -p /mnt/{home,root,srv,var/cache,var/log,tmp,nix}
mount -o compress=zstd:4,noatime,ssd,space_cache=v2,discard=async,subvol=@home <btrfs分区> /mnt/home
mount -o compress=zstd:4,noatime,ssd,space_cache=v2,discard=async,subvol=@root <btrfs分区> /mnt/root
mount -o compress=zstd:4,noatime,ssd,space_cache=v2,discard=async,subvol=@srv <btrfs分区> /mnt/srv
mount -o compress=zstd:3,noatime,ssd,space_cache=v2,discard=async,subvol=@cache <btrfs分区> /mnt/var/cache
mount -o compress=zstd:3,noatime,ssd,space_cache=v2,discard=async,subvol=@log <btrfs分区> /mnt/var/log
mount -o compress=zstd:3,noatime,ssd,space_cache=v2,discard=async,subvol=@tmp <btrfs分区> /mnt/tmp
mount -o compress=zstd:4,noatime,ssd,space_cache=v2,discard=async,subvol=@nix <btrfs分区> /mnt/nix
```

挂载EFI分区

```bash
mkdir -p /mnt/boot
mount <EFI分区设备位置> /mnt/boot
```

启用交换分区

```bash
swapon <交换分区设备位置>
```

## 安装基础系统

### pacman镜像源设置

使用`reflector`选择镜像源

```bash
reflector --country China --age 12 --protocol https --sort rate --save /etc/pacman.d/mirrorlist
```

### 基础系统安装

使用`pacstrap`安装基础系统

```bash
pacstrap /mnt base linux linux-firmware btrfs-progs vim
```

安装CPU微码

```bash# Intel CPU
pacstrap /mnt intel-ucode
```

```bash# AMD CPU
pacstrap /mnt amd-ucode
```

### 生成fstab文件

```bash
genfstab -U /mnt >> /mnt/etc/fstab
```

## 进入新系统进行配置

```bash
arch-chroot /mnt
```

## 设置时间

```bash
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```

```bash
hwclock --systohc
```

## 本地化设置

编辑`/etc/locale.gen`，取消需要的语言前的注释

取消`zh_CN.UTF-8 UTF-8`和`en_US.UTF-8 UTF-8`的注释

```bash
vim /etc/locale.gen
```

生成语言环境

```bash
locale-gen
```

创建`/etc/locale.conf`，写入以下内容

```plain
LANG=zh_CN.UTF-8
```

## 设置主机名

创建`/etc/hostname`，写入主机名

## 生成initramfs

```bash
mkinitcpio -P
```

## 设置root密码

```bash
passwd
```

## 安装引导

我用`grub`

```bash
pacman -S grub efibootmgr
```

安装grub到EFI分区并创建配置文件

```bash
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB
grub-mkconfig -o /boot/grub/grub.cfg
```

安装`os-prober`以支持多系统启动

```bash
pacman -S os-prober
grub-mkconfig -o /boot/grub/grub.cfg
```

## 退出并重启

关机后记得拔U盘

```bash
exit
umount -R /mnt
swapoff -a
reboot
```

## 进入新系统后的必要配置

先登录root账号

### 网络配置

安装`networkmanager`

```bash
pacman -S networkmanager
systemctl enable NetworkManager
systemctl start NetworkManager
```

连接无线网络

```bash
nmcli device wifi list
nmcli device wifi connect <SSID> password <PASSWORD>
```

### 添加普通用户

```bash
useradd -m -G wheel -s /bin/bash <用户名>
passwd <用户名>
```

### 允许wheel组使用sudo

```bash
EDITOR=vim visudo
```

取消以下行的注释

```plain
%wheel ALL=(ALL) ALL
```

### 安装snapper

```bash
pacman -S snapper
snapper -c root create-config /
```

创建快照命令

```bash
snapper -c root create -d "描述信息"
```
