---
title: 解决禁用Microsoft商店自动更新后wsappx仍然运行的问题
published: 2022-05-06 17:38:45
category: Win系统优化
tags: [Windows, Win10]
---

***解决禁用Microsoft商店自动更新后wsappx仍然运行的问题***

解决方法：

在管理员PowerShell中输入命令卸载应M用商店

```powershell
Get-AppxPackage *WindowsStore*
Remove-AppxPackage
```

再输入命令，重新安装商店

```powershell
get-appxpackage *store*
remove-Appxpackage
```

再执行以下命令

```powershell
add-appxpackage -register "C:\Program Files\WindowsApps\*Store*\AppxManifest.xml" -disabledevelopmentmode
```

之后打开商店再关闭自动更新即可
