---
title: "[NixOS] 使用CachyOS内核启用asusctl的功耗控制"
published: 2025-10-8 18:12:00
tags: [Linux,NixOS,Nix]
category: Linux/NixOS
draft: false
---

> [!NOTE]
> 2026-07-03更新： 很久之前Linux 6.19已经集成了asusctl的补丁，现在都支持asusctl，直接用就行了

`asusctl`的功耗控制功能是依赖特殊的内核功能的，默认的内核并不支持，经过一番搜索，在NixOS Discourse上找到了对Arch Linux上`linux-g14`内核的[打包配置](https://discourse.nixos.org/t/integrating-the-linux-g14-kernel-into-nixos-kernels-broader-asus-laptop-support/63350)，但是需要自行编译，在笔记本上编译内核压力实在有点大了

但其实CachyOS的内核已经集成了这些补丁，直接用CachyOS内核就可以了，Chaotic项目还提供了CachyOS内核的二进制缓存

[https://www.nyx.chaotic.cx/](https://www.nyx.chaotic.cx/)

按照文档中的示例填入配置即可

```nix
# flake.nix
{
  description = "My configuration";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    chaotic.url = "github:chaotic-cx/nyx/nyxpkgs-unstable"; # IMPORTANT
  };

  outputs = { nixpkgs, chaotic, ... }: {
    nixosConfigurations = {
      hostname = nixpkgs.lib.nixosSystem { # Replace "hostname" with your system's hostname
        system = "x86_64-linux";
        modules = [
          ./configuration.nix
          chaotic.nixosModules.default # IMPORTANT
        ];
      };
    };
  };
}
```

```nix
{
    boot.kernelPackages = pkgs.linuxPackages_cachyos;
}
```

注意如果要在安装NixOS时就启用chaotic的二进制缓存，需要添加参数

```bash wrap=false
--option 'extra-substituters' 'https://chaotic-nyx.cachix.org/' --option extra-trusted-public-keys "chaotic-nyx.cachix.org-1:HfnXSw4pj95iI/n17rIDy40agHj12WfF+Gqk6SonIT8="
```
