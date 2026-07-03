---
title: Linux 常用命令速查表
tag:
  - Linux
  - 命令
  - 运维
categories:
  - 学习
date: 2026-07-01
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/temp01_ecc64c64ba13687b74ec5d42f8eb7f7cd7fcd789.jpg
---

# Linux 常用命令速查表

> 常用命令不用背，但常用的几个必须形成肌肉记忆。

---

## 文件操作

```bash
# 查看文件
ls -la                    # 列出所有文件（含隐藏）
ls -lh                    # 人类可读的文件大小
tree                      # 目录树

# 复制/移动/删除
cp -r src/ dest/          # 递归复制目录
mv old.txt new.txt        # 移动/重命名
rm -rf folder/            # 删除目录（慎用！）

# 查找文件
find . -name "*.cpp"      # 查找所有 cpp 文件
find / -size +100M        # 查找大于 100MB 的文件
grep -r "TODO" .          # 递归搜索文本
```

---

## 权限管理

```bash
chmod 755 script.sh       # rwxr-xr-x
chmod +x script.sh        # 添加执行权限
chown user:group file     # 修改所有者
```

---

## 进程管理

```bash
ps aux                    # 查看所有进程
top / htop                # 实时监控（htop 更好用）
kill -9 PID               # 强制杀死进程
nohup command &           # 后台运行
```

---

## 网络

```bash
curl -I https://example.com   # 查看响应头
wget file.zip                 # 下载文件
ssh user@host                 # SSH 连接
scp file user@host:/path/     # 远程复制
netstat -tlnp                 # 查看端口占用
```

---

## 压缩解压

```bash
tar -czf archive.tar.gz folder/   # 压缩
tar -xzf archive.tar.gz           # 解压
zip -r archive.zip folder/        # zip 压缩
unzip archive.zip                 # zip 解压
```

---

## Git 高频命令

```bash
git status                    # 查看状态
git add .                     # 添加所有修改
git commit -m "msg"           # 提交
git push origin main          # 推送到远程
git pull origin main          # 拉取更新
git checkout -b feature       # 创建并切换分支
git stash                     # 暂存修改
git log --oneline -10         # 查看最近 10 条提交
```

---

## 实用技巧

```bash
# 查看最近执行的命令
history | grep git

# 清屏
clear 或 Ctrl + L

# 查看磁盘空间
df -h

# 查看当前目录大小
du -sh .

# 后台任务管理
jobs      # 查看后台任务
fg %1     # 恢复第 1 个后台任务到前台
Ctrl + Z  # 暂停当前任务（放到后台）
```

---

## 结语

这些命令不用死记硬背，用多了自然就熟了。记不住就收藏这篇文章，用的时候来查。📋
