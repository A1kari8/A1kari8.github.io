---
title: 解决win10资源管理器(桌面任务栏)频繁假死
published: 2022-05-06 10:47:43
tags: [Windows,Win10]
category: Win系统优化
---

**最近装了ltsc2021,发现桌面和任务栏频繁假死，且无法呼出任务管理器，只能注销重新登录，搜索了好久终于在Microsoft社区找到了解决办法**

在管理员Powershell中，输入以下两条命令：

```powershell
$manifest = (Get-AppxPackage Microsoft.WindowsStore).InstallLocation + '\AppxManifest.xml' ; Add-AppxPackage -DisableDevelopmentMode -Register $manifest
```

```powershell
Get-AppXPackage -AllUsers |Where-Object {$_.InstallLocation -like "*SystemApps*"}
```

重启计算机即可。

社区问题链接：[传送门](https://answers.microsoft.com/zh-hans/windows/forum/all/win10%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86%E5%99%A8/41e4a6f7-7cd9-475e-8949-7ed50328949b?auth=1)

<!-- ![](https://cdn.jsdelivr.net/gh/Alkaid114514/Pictures/imgs/202205060738695.png) -->
