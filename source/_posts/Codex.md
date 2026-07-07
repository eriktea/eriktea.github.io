---
title: Codex 使用指南
tags:
  - 工具
  - AI
  - Codex
  - 效率
categories:
  - 软件
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/temp01_94573417_p0.png
date: 2026-07-03
---

# Codex 使用指南

> OpenAI 出品的 AI 编程工具，不只是聊天，它能直接帮你改代码、跑命令、处理文件。

---

## 1. Codex 是什么

Codex 是 OpenAI 推出的**AI 编程助手**，区别于传统的 ChatGPT 对话式交互，Codex 可以直接在你的项目目录中执行操作：

- 读取和修改本地文件
- 在终端执行命令
- 帮你写代码、修 Bug、重构项目
- 理解整个代码库的上下文

简单说，它不像 ChatGPT 那样只"说"给你听，而是真的会"动手"帮你干活。

---

## 2. 安装

### 2.1 下载客户端

前往 [OpenAI Codex 官方下载页](https://chatgpt.com/zh-Hans-CN/codex/) 下载。网页会自动检测你的系统（Windows / macOS）并给出对应版本，新手推荐安装**可视化版本**，终端版本更适合有经验的开发者。

> 注意：安装过程中会跳转到 Microsoft Store，需要**科学上网**，否则大概率安装失败。

### 2.2 首次启动

安装完成后首次打开是英文界面，直接关闭，在右下角系统托盘中找到 Codex 图标并退出，然后重新打开，就会变成中文界面了。

登录方式有两种：

- **ChatGPT 账号登录** — 需要 Plus 会员，调用次数有限
- **API 密钥登录** — 推荐，按 Token 用量付费，更灵活

---

## 3. 接入第三方大模型

Codex 默认只支持 OpenAI API，但我们可以通过 **CC·switch** 这个开源工具，让它支持其他大模型（如 Claude、国产大模型等）。

### CC·switch 配置

CC·switch 是一个开源工具，可以修改 Codex 的配置文件，让 Codex 使用其他大模型的 API。

- GitHub 地址：[farion1231/cc-switch](https://github.com/farion1231/cc-switch/releases)

安装 CC·switch 后，按照文档修改 Codex 的配置文件即可。具体配置步骤取决于你想接入哪个大模型，这里不再赘述，CC·switch 的 README 有详细说明。

---

## 4. 实际使用体验

### 4.1 代码补全与生成

Codex 最实用的功能是直接在编辑器中帮你补全代码。你可以用自然语言描述需求，它会：

- 根据项目上下文生成符合风格的代码
- 自动引用项目中已有的函数和模块
- 支持多种编程语言（C++、Python、TypeScript 等）

### 4.2 自动重构

直接告诉 Codex "把这段代码改成异步版本" 或者 "提取出一个公共函数"，它会直接修改文件，不需要你手动复制粘贴。

### 4.3 终端操作

Codex 可以在终端中自动执行命令，比如：

```bash
# 它会自动帮你执行这些操作
git status
git diff
npm install
npm run build
```

---

## 5. 注意事项

1. **API 费用**：使用 Token 付费模式时注意用量，复杂任务可能消耗较多 Token
2. **代码审查**：AI 生成的代码不一定正确，务必自己审查一遍再合入
3. **敏感信息**：不要在对话中暴露 API Key、密码等敏感信息
4. **网络要求**：Codex 需要访问 OpenAI API，国内需要科学上网

---

## 结语

Codex 把 AI 编程助手从"聊天机器人"升级成了"能动手的副驾驶"。配合 CC·switch 接入第三方模型后，可玩性更高。建议日常开发中把它当作**辅助工具**而不是**替代品**——它能帮你省时间，但不能替代你对代码的理解。
