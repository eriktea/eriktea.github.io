---
title: 从零搭建 Hexo 博客踩坑记录
tag:
  - Hexo
  - 博客
  - 踩坑
categories:
  - 其他
date: 2026-07-01
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/temp01_Angel.png
---

# 从零搭建 Hexo 博客踩坑记录

> 理论上是"一次部署，永久托管"，但实际上……

## 为什么选 Hexo

- 纯静态，GitHub Pages 免费托管
- Markdown 写作，专注内容
- 主题生态丰富（Butterfly 颜值高）
- 插件多，想要什么功能基本都有

## 踩坑记录

### 1. 中文路径乱码

**现象**：文章标题含中文，部署后 404。

**原因**：Hexo 默认用 URL 编码处理中文，但 GitHub Pages 和某些主题不支持。

**解决**：在 `_config.yml` 中设置：

```yaml
permalink: :year/:month/:day/:title/
# 或者
permalink: posts/:title.html
```

### 2. 图片不显示

**现象**：Markdown 里的图片本地能看，部署后不显示。

**原因**：相对路径的问题。

**解决**：
- 开启 `post_asset_folder: true`，把图片放在文章同名的文件夹里
- 使用图床（推荐 PicList + 阿里云 OSS）

### 3. 评论系统

试了一圈评论系统：
- **Disqus**：需要翻墙，国内访问不了
- **Valine**：LeanCloud 国内版已经停止服务
- **Waline**：目前最推荐的，支持 Vercel 部署，国内可用

### 4. 部署后样式丢失

**现象**：CSS/JS 404，页面一片空白。

**原因**：根路径和子路径的问题。

**解决**：确认 `_config.yml` 中的 `url` 设置正确。

```yaml
url: https://eriktea.github.io/  # 你的实际域名
root: /                           # 如果是项目页面，这里是 /项目名/
```

### 5. 搜索功能

Hexo 自带的搜索只索引文章内容。如果需要全文搜索，使用：

```bash
npm install hexo-generator-search
```

然后在 `_config.yml` 中配置：

```yaml
search:
  path: search.xml
  field: post
  format: html
  limit: 10000
```

---

## 推荐工作流

```
写文章 → hexo clean → hexo g → git push → 自动部署
```

搭配 `hexo-deployer-git` 插件，一条命令完成部署：

```bash
hexo clean && hexo g -d
```

---

## 总结

搭建博客的过程确实踩了不少坑，但完成后非常有成就感。最重要的是**保持更新**，而不是追求完美。

> 先发布，再迭代。完成比完美更重要。
