---
title: LeetCode 热题 Top 100 刷题顺序推荐
tag:
  - 算法
  - LeetCode
  - 刷题
categories:
  - 学习
date: 2026-07-01
top: 1
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/temp01_96145490_p0.png
---

# LeetCode 热题 Top 100 刷题顺序推荐

> 别从第 1 题开始刷，那样你会倒在 Two Sum 前面。

## 为什么要按顺序刷

LeetCode 目前有 3000+ 题，但面试真正高频的不过百题。盲目刷题效率极低——做了 200 题 still 不会做动态规划的大有人在。

**关键**：按知识点分组，先易后难，同类题刷够 3-5 道形成肌肉记忆，再进入下一个知识点。

---

## 推荐刷题顺序

### 第一阶段：数组与字符串（第 1-20 题）

这是最基础的题型，面试中出现率最高。

| 题号 | 题目 | 知识点 |
|------|------|--------|
| 1 | Two Sum | 哈希表 |
| 3 | Longest Substring Without Repeating Characters | 滑动窗口 |
| 11 | Container With Most Water | 双指针 |
| 15 | 3Sum | 双指针 + 去重 |
| 42 | Trapping Rain Water | 双指针 / 单调栈 |
| 53 | Maximum Subarray | 动态规划 |
| 56 | Merge Intervals | 排序 + 区间合并 |
| 70 | Climbing Stairs | 动态规划入门 |

**核心技巧**：
- 哈希表用于快速查找 / 去重
- 双指针用于有序数组的优化
- 滑动窗口用于子数组 / 子字符串问题

### 第二阶段：链表（第 20-35 题）

链表题考察的是**指针操作**和**边界处理**。

| 题号 | 题目 | 知识点 |
|------|------|--------|
| 206 | Reverse Linked List | 链表反转 |
| 141 | Linked List Cycle | 快慢指针 |
| 142 | Linked List Cycle II | 快慢指针 + 数学推导 |
| 21 | Merge Two Sorted Lists | 虚拟头节点 |
| 19 | Remove Nth Node From End | 快慢指针 |
| 148 | Sort List | 归并排序 |
| 160 | Intersection of Two Linked Lists | 双指针 |

**核心技巧**：
- **虚拟头节点（dummy node）**：解决头节点可能被删除的问题
- **快慢指针**：判断环、找中点、倒数第 N 个节点
- 画图！链表题不画图 90% 会写错

### 第三阶段：二叉树（第 35-55 题）

递归 + 迭代，面试最高频。

| 题号 | 题目 | 知识点 |
|------|------|--------|
| 94 | Binary Tree Inorder Traversal | 中序遍历 |
| 101 | Symmetric Tree | 递归 / 迭代 BFS |
| 102 | Binary Tree Level Order Traversal | BFS |
| 104 | Maximum Depth of Binary Tree | DFS |
| 108 | Sorted Array to BST | 分治 |
| 236 | Lowest Common Ancestor | 递归 |
| 297 | Serialize and Deserialize Binary Tree | BFS + 序列化 |

### 第四阶段：动态规划（第 55-80 题）

DP 是大部分人的噩梦，但其实是有套路的。

**DP 四步法**：
1. 定义 `dp[i]` 的含义
2. 找出状态转移方程
3. 确定初始值
4. 确定遍历顺序

| 题号 | 题目 | 类型 |
|------|------|------|
| 70 | Climbing Stairs | 一维 DP |
| 198 | House Robber | 一维 DP |
| 300 | Longest Increasing Subsequence | 一维 DP（经典） |
| 322 | Coin Change | 完全背包 |
| 0/1 背包模板 | — | 二维 DP |
| 1143 | Longest Common Subsequence | 二维 DP |
| 72 | Edit Distance | 二维 DP |
| 5 | Longest Palindromic Substring | 区间 DP / 中心扩展 |

### 第五阶段：回溯与贪心（第 80-100 题）

| 题号 | 题目 | 类型 |
|------|------|------|
| 46 | Permutations | 回溯 |
| 78 | Subsets | 回溯 |
| 39 | Combination Sum | 回溯 |
| 200 | Number of Islands | DFS / BFS |
| 55 | Jump Game | 贪心 |
| 435 | Non-overlapping Intervals | 贪心 |

---

## 刷题时间规划

| 周期 | 内容 | 日均题数 |
|------|------|----------|
| 第 1-2 周 | 数组、字符串、链表 | 3-4 题/天 |
| 第 3-4 周 | 二叉树、DFS/BFS | 3-4 题/天 |
| 第 5-7 周 | 动态规划 | 2-3 题/天（DP 需要更多思考） |
| 第 8-9 周 | 回溯、贪心、堆、图 | 3-4 题/天 |
| 第 10-12 周 | 高频 Top 100 二轮复习 | 按类型复习 |

**总计约 12 周（3 个月）**，每天投入 2-3 小时。

---

## 避坑指南

1. **不要光看不练**：看懂答案和能写出来之间差一个太平洋。每道题至少自己独立写一遍。
2. **不要死磕**：15 分钟没思路就看答案。看完后隔一天再做一遍。
3. **要总结模板**：DP、回溯、二分查找都有固定模式。把模板背下来。
4. **重视边界条件**：空数组、单元素、重复元素、INT_MAX/INT_MIN。
5. **复杂度要会算**：每道题都要能说出时间复杂度和空间复杂度。

---

## 推荐资源

- **LeetCode 热题 100**：https://leetcode.cn/problem-list/top100/
- **代码随想录**：https://programmercarl.com/ （强烈推荐，刷题路线 + 详解）
- **Labuladong 算法小抄**：https://labuladong.github.io/algo/

坚持 3 个月，面试手撕代码不再是问题。💪
