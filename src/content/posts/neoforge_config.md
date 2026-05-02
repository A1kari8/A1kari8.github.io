---
title: Neoforge模组开发-Config
published: 2025-09-24 18:08:00
tags: [NeoForge, Minecraft, Modding, Java]
category: Minecraft/NeoForge
draft: true
---

Config用于存储模组的配置选项，允许用户在游戏内或通过配置文件进行调整。NeoForge提供了一个强大的配置系统，支持多种数据类型

## Config的三种类型

### Server

Server配置存储在服务端，会在客户端连接时同步，可在世界存档的`serverconfig`目录中单独配置，neoforge会优先读取存档中的配置，若不单独配置则默认在游戏的`config`目录下

### Common

Common配置存储在服务端和客户端，不会自动同步，适用于不需要同步的配置选项

### Client

Client配置存储在客户端，适用于仅影响客户端的选项（如gui等）

## 如何使用

### 新建自己的Config类

```java title="MyModConfig.java" {"创建Buider,需要放在最前":2-3} {"调用build,需要放在最后":7-8} {"添加自己的配置项":4-6}
public class MyModConfig {
    
    private static final ModConfigSpec.Builder BUILDER = new ModConfigSpec.Builder();

    //...

    
    public static final ModConfigSpec SPEC = BUILDER.build();
}
```

### 配置项举例

```java title="MyModConfig.java" {"配置的详情描述":6-7} {"翻译键名，对应lang/xx_xx.json":8-9} {"定义path和默认值":10-11}
public class MyModConfig {

    private static final ModConfigSpec.Builder BUILDER = new ModConfigSpec.Builder();
    
    public static final ModConfigSpec.BooleanValue MY_CONFIG_1 = BUILDER
            
            .comment("This is my first config")
            
            .translation("mod_id.config.my_config_1")
            
            .define("myConfig1", false);
    
    //...

    public static final ModConfigSpec SPEC = BUILDER.build();
}
```
