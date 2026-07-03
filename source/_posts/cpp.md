---
title: C++ 基础入门
tags:
  - C++
  - 入门
  - 教程
categories:
  - C++
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/temp01_66956824_p0_4k.png
date: 2026-07-03
---

# C++ 基础入门

> 本文记录 C++ 学习过程中的核心知识点，适合有编程基础但刚接触 C++ 的同学快速上手。

---

## 1. C++ 简介

C++ 是一门静态类型的、编译型的通用编程语言，由 Bjarne Stroustrup 在贝尔实验室开发。它在 C 语言的基础上增加了面向对象、泛型编程和元编程等特性，是目前系统编程、游戏开发、嵌入式领域的主流语言之一。

C++ 的核心设计哲学是**零开销抽象**：你不需要为你没有使用到的特性付出额外的运行时代价。

---

## 2. 基本语法

### 2.1 Hello World

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, C++!" << std::endl;
    return 0;
}
```

`#include <iostream>` 引入标准输入输出流库，`std::cout` 用于向标准输出打印内容，`std::endl` 输出换行并刷新缓冲区。

### 2.2 变量与数据类型

```cpp
int age = 25;              // 整数
double pi = 3.14159;       // 双精度浮点数
char grade = 'A';          // 字符
bool is_student = true;    // 布尔值
std::string name = "Alice"; // 字符串（需要 #include <string>）
```

C++ 是**静态类型语言**，变量必须先声明后使用，且类型在编译时确定。

### 2.3 条件与循环

```cpp
// if-else
if (age >= 18) {
    std::cout << "成年了" << std::endl;
} else {
    std::cout << "未成年" << std::endl;
}

// for 循环
for (int i = 0; i < 5; i++) {
    std::cout << i << " ";  // 输出: 0 1 2 3 4
}

// while 循环
int n = 5;
while (n > 0) {
    std::cout << n-- << " "; // 输出: 5 4 3 2 1
}
```

---

## 3. 函数

函数是 C++ 程序的基本构建单元。C++ 支持函数重载——多个函数可以同名，只要参数列表不同即可。

```cpp
// 函数声明
int add(int a, int b);

// 函数定义
int add(int a, int b) {
    return a + b;
}

// 函数重载
double add(double a, double b) {
    return a + b;
}
```

---

## 4. 面向对象：类与对象

C++ 的面向对象特性包括**封装、继承、多态**三大支柱。

```cpp
class Dog {
private:
    std::string name;
    int age;

public:
    // 构造函数
    Dog(std::string n, int a) : name(n), age(a) {}

    // 成员函数
    void bark() {
        std::cout << name << " 在叫！" << std::endl;
    }

    int getAge() {
        return age;
    }
};

// 使用
Dog myDog("旺财", 3);
myDog.bark();  // 输出: 旺财 在叫！
```

---

## 5. 智能指针

C++11 引入了智能指针，解决了手动管理动态内存的痛点。最常用的是 `std::unique_ptr` 和 `std::shared_ptr`。

```cpp
#include <memory>

// 独占所有权
auto ptr = std::make_unique<int>(42);

// 共享所有权
auto ptr2 = std::make_shared<int>(100);
auto ptr3 = ptr2;  // 引用计数 +1
```

优先使用智能指针而不是裸指针（`new`/`delete`），除非你有明确的原因。

---

## 6. STL 容器

C++ 标准模板库（STL）提供了一组高效的通用容器和算法，是日常开发中最常用的部分。

| 容器 | 特点 | 适用场景 |
|------|------|----------|
| `std::vector` | 动态数组，尾部插入 O(1) | 最常用，默认选择 |
| `std::array` | 固定大小数组 | 编译期已知大小的场景 |
| `std::string` | 字符串容器 | 文本处理 |
| `std::map` | 键值对，红黑树实现 | 有序映射 |
| `std::unordered_map` | 哈希表实现 | 无序映射，查找 O(1) |

```cpp
#include <vector>
#include <unordered_map>

std::vector<int> nums = {1, 2, 3, 4, 5};
nums.push_back(6);  // 尾部插入

std::unordered_map<std::string, int> scores;
scores["Alice"] = 95;
scores["Bob"] = 87;
```

---

## 7. Lambda 表达式

C++11 引入的 Lambda 让函数式编程风格成为可能：

```cpp
#include <algorithm>
#include <vector>

std::vector<int> nums = {3, 1, 4, 1, 5, 9};

// 从小到大排序
std::sort(nums.begin(), nums.end(), [](int a, int b) {
    return a < b;
});

// 捕获外部变量
int threshold = 5;
auto count = std::count_if(nums.begin(), nums.end(), [threshold](int n) {
    return n > threshold;
});
```

---

## 8. C++20 新特性速览

如果你用的是较新的编译器，可以尝试 C++20 的一些实用特性：

- **`std::format`** — 类型安全的字符串格式化
- **`concepts`** — 泛型编程的约束机制
- **`co_await` / 协程** — 异步编程的新方式
- **Ranges** — 更直观的容器操作链式调用

```cpp
#include <format>
#include <iostream>

std::string msg = std::format("Hello, {}!", "World");
std::cout << msg << std::endl;  // 输出: Hello, World!
```

---

## 结语

C++ 的学习曲线确实陡峭，但掌握之后你会对内存管理、性能优化、程序执行模型有更深刻的理解。建议在学习过程中多写代码、多做实验，遇到不懂的就去查文档、看源码。

> 记住：C++ 给你足够的 rope to hang yourself，但也能让你写出极其高效的代码。
