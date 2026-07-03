---
title: "[解包] 常轨脱离(ハミダシ)语音与文本解包制作GPTSoVits数据集"
published: 2025-08-29 21:47:58
tags: [解包, TTS, GPTSoVits]
category: GPTSoVits
draft: false
---

## 需要准备什么

- 游戏本体<!-- （不建议steam版，~~虽然我也没试过~~，但之前试过解包steam版的别的游戏，内容是加密的解不了） -->
- [Lua环境](https://github.com/rjpcomputing/luaforwindows/releases)，提取文本+数据处理脚本
- [GARbro](https://github.com/morkt/GARbro/releases)，解包用
- [FFmpeg](https://ffmpeg.org/download.html#build-windows)，`.ogg`转`.wav`，记得添加到环境变量

## 解包语音和脚本资源

运行`GARbro.GUI.exe`，点击左上角`文件`->`打开`，选择游戏目录内的`hamidashi.pfs`

将`script`目录内所有内容（扩展名`.ast`的文件）导出备用，这个目录内即为脚本文件

之后打开游戏目录内的`hamidashi.pfs.000`，将`sound/vo/名简写`，比如要导出**錦あすみ**的语音，就导出`sound/vo/asu`内的所有`.ogg`音频

（如果在找**妃愛**的语音，还有一部分在`hamidashi.pfs.001`的`sound/vo/hiy`）

将所有需要的`.ogg`音频导出到一个文件夹内备用，暂且称之`voice_ogg`目录吧

## 提取语音对应的文本

不同于很多使用`.json`的其他galgame，解析这个`.ast`的过程相当波折

一段例子

```lua
text={
    [1]={
        vo={
            {"vo",file="fem_mir_10142",ch="mir"},
        },
        name={name="里"},
        ja={
            {
            "「今日はほんとお疲れー！　最後までみんな笑いすぎでウケる！　うち、しおぽよがあれだけ楽しそうにしてるの初めて見たし！」",
            },
        },
    },
...
}
```

一开始看到这语法还以为是私有标记语言，然后跟AI对线一小时整了个正则表达式

后来注意到怎么从1开始呢，不会跟lua有关吧，查了一下才知道原来这整个文件就是个lua脚本（~~电脑里有一款索引从1开始的语言~~）

> 2025-11-25: 才知道原来这个引擎就是基于Lua脚本的，早知道应该先调查一下的

### 提取文本与对应音频文件名生成json的lua脚本

将该脚本与[dkjson.lua](https://github.com/LuaDist/dkjson/blob/master/dkjson.lua)放置在与`script`目录同级

```lua title="lua2json.lua" {".ast文件目录":4-5} {"名字":6-8}
local json = require("dkjson")

local lfs = require("lfs")

local script_dir = "script"

local target_name = "妃愛" -- 名字在.ast文件里能找到
local ja_name = nil -- name={name="あすみ",ja="雪景シキ"}遇到类似想提取雪景シキ的情况时就填入"雪景シキ"，其余情况填nil，该项若非空会覆盖target_name

local all_data = {}

for file in lfs.dir(script_dir) do
    if file:match("%.ast$") then
        local path = script_dir .. "/" .. file
        dofile(path)
        local ast_data = _G.ast
        if ast_data and ast_data.text then
            for k, v in pairs(ast_data.text) do
                local should_insert = false

                if ja_name then
                    if v.name and v.name.ja and v.name.ja == ja_name then
                        should_insert = true
                    end
                else
                    if v.name and v.name.name and target_name == v.name.name then
                        should_insert = true
                    end
                end

                if should_insert then
                    if v.vo then
                        local tmp = v.ja[1][1]
                        tmp = string.gsub(tmp, "「", "")
                        tmp = string.gsub(tmp, "」", "")
                        tmp = string.gsub(tmp, "『", "")
                        tmp = string.gsub(tmp, "』", "")
                        local data = {
                            voice_file = v.vo[1].file,
                            text = tmp
                        }
                        table.insert(all_data, data)
                    end
                end
            end
        else
            print("无法加载文件：" .. path)
        end
    end
end

-- 导出为 JSON
local json_str = json.encode(all_data, {
    indent = true
})
local out = io.open("text_output.json", "w")
out:write(json_str)
out:close()
```

运行该脚本即可得到`text_output.json`

## 音频格式转换与筛选

将该脚本与[dkjson.lua](https://github.com/LuaDist/dkjson/blob/master/dkjson.lua)放置在与`script`目录同级

:::important
需要将FFmpeg添加到环境变量，或者自己改脚本里的调用命令吧
:::

```lua title="ogg2wav.lua" {"输入目录":3-4} {"输出目录":5-6} {"上一个脚本生成的json":7-8}
local lfs = require("lfs")
local json = require("dkjson")

local input_dir = "voice_ogg" 

local output_dir = "voice_wav"

local json_path = "text_output.json"

local min_duration = 3 -- 筛选音频最短时长（秒）
local max_duration = 30 -- 筛选音频最长时长（秒）

-- 创建输出目录
local attr = lfs.attributes(output_dir)
if not attr or attr.mode ~= "directory" then
    os.execute('mkdir "' .. output_dir .. '"')
end

-- 读取 JSON
local f = io.open(json_path, "r")
if not f then
    error("无法打开 JSON 文件: " .. json_path)
end
local content = f:read("*a")
f:close()

local data, pos, err = json.decode(content)
if err then
    error("JSON 解析失败: " .. err)
end

local allowed = {}
for _, entry in ipairs(data) do
    allowed[entry.voice_file] = true
end

-- 获取音频时长（秒）
local function get_duration(file_path)
    local cmd = string.format(
        'ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "%s"', file_path)
    local handle = io.popen(cmd)
    local result = handle:read("*a")
    handle:close()
    return tonumber(result)
end

for file in lfs.dir(input_dir) do
    if file:match("%.ogg$") then
        local input_path = input_dir .. "/" .. file
        local base_name = file:match("^(.*)%.ogg$")
        local output_path = output_dir .. "/" .. base_name .. ".wav"

        if allowed[base_name] then
            local duration = get_duration(input_path)

            if duration and duration >= min_duration and duration <= max_duration then
                local cmd = string.format('ffmpeg -i "%s" "%s"', input_path, output_path)
                os.execute(cmd)
            end
        end
    end
end
```

运行脚本后我们便有了所有需要的资源

## 生成GPTSoVits数据集使用的`slicer.list`

同样放置在同级目录

```lua title="gptsovits_slicer.lua" {"wav音频文件夹":5-6} {"第一个脚本生成的json":7-8} {"输出的.list文件名":9-10}
local lfs = require("lfs")

local json = require("dkjson")
local current_dir = lfs.currentdir()

local wav_dir = "voice_wav"

local json_path = "text_output.json"

local output_slicer = "slicer.list"

-- 读取 JSON
local f = io.open(json_path, "r")
if not f then
    error("无法打开 JSON 文件: " .. json_path)
end
local content = f:read("*a")
f:close()

local data, pos, err = json.decode(content)
if err then
    error("JSON 解析失败: " .. err)
end

local vtpairs = {}
for _, entry in ipairs(data) do
    vtpairs[entry.voice_file] = entry.text
end

local output = io.open(output_slicer, "w")

for file in lfs.dir(wav_dir) do
    if file:match("%.wav$") then
        local base_name = file:match("^(.*)%.wav$")
        local absolute_path = current_dir .. "\\" .. base_name .. ".wav"
        if vtpairs[base_name] then
            output:write(absolute_path .. "|slicer|JA|" .. vtpairs[base_name] .. "\n")
        end
    end
end

output:close()
```

之后就可以拿去训练GPTSoVits了

## 顺便贴一下跟AI对线一小时得到的Regex（没用了）

```regexp
/{["']vo["'],\s*file=["']([^"']+)["'],\s*ch=["']([^"']+)["']}[\s\S]*?ja=\s*\{\{\s*\{\s*["']([^"']+)["']/g
```
