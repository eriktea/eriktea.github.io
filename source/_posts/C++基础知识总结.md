---
title: C++基础知识总结
tag:
  - cpp基础
categories:
  - C++
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/temp01_66956824_p0_4k.png
#top_img: https://eriktea.oss-cn-hongkong.aliyuncs.com/title_logo.jpg # 优先级，当先配置玩cover再配置top_img时，封面会显示cover，但文章顶部会出现 top_img

# swiper_index: 1 #置顶轮播图顺序，非负整数，数字越大越靠前
# sticky: 2 #  文章置顶，ux填的值越大，置顶的优先级也会越大


# 密码框区

message: 请输入密码=v=
password: 123456 # 设置文章的私有密码为XXXXXX，任意组合即可
---

# C++基础知识总结

## 基本语法和数据类型

```c++
#include <iostream>

int main() {
    // 变量和数据类型
    int num = 10;
    float floatNum = 3.14;
    char character = 'A';

    // 输出
    std::cout << "整数: " << num << std::endl;
    std::cout << "浮点数: " << floatNum << std::endl;
    std::cout << "字符: " << character << std::endl;

    return 0;
}
```

## 循环

```c++
#include <iostream>

int main() {
    // if语句
    int x = 5;
    if (x > 0) {
        std::cout << "x是正数" << std::endl;
    } else if (x < 0) {
        std::cout << "x是负数" << std::endl;
    } else {
        std::cout << "x是零" << std::endl;
    }

    // for循环
    for (int i = 0; i < 5; ++i) {
        std::cout << i << " ";
    }
    std::cout << std::endl;

    // while循环
    int j = 0;
    while (j < 3) {
        std::cout << j << " ";
        ++j;
    }
    std::cout << std::endl;

    return 0;
}
```

## 函数式

```c++
#include <iostream>

// 函数声明
int add(int a, int b) {
    return a + b;
}

int main() {
    // 函数调用
    int result = add(3, 4);
    std::cout << "3 + 4 = " << result << std::endl;

    return 0;
}
```

## Vector(矢量)

```c++
#include <iostream>
#include <vector>

int main() {
    // 向量的声明和初始化
    std::vector<int> vec = {1, 2, 3, 4, 5};

    // 向量的遍历和输出
    for (int i : vec) {
        std::cout << i << " ";
    }
    std::cout << std::endl;

    // 向量的添加元素
    vec.push_back(6);

    // 向量的遍历和输出
    for (int i : vec) {
        std::cout << i << " ";
    }
    std::cout << std::endl;

    return 0;
}
```

## queue

```c++
#include <iostream>
#include <queue>

int main() {
    // 队列的声明和初始化
    std::queue<int> q;

    // 队列的入队
    q.push(1);
    q.push(2);
    q.push(3);

    // 队列的出队
    std::cout << q.front() << " ";
    q.pop();
    std::cout << q.front() << " ";
    q.pop();

    // 输出队列大小
    std::cout << "队列大小: " << q.size() << std::endl;

    return 0;
}
```

## Map(映射)

```c++
#include <iostream>
#include <map>

int main() {
    // 映射的声明和初始化
    std::map<std::string, int> myMap;

    // 映射的插入元素
    myMap["one"] = 1;
    myMap["two"] = 2;
    myMap["three"] = 3;

    // 映射的遍历和输出
    for (auto& pair : myMap) {
        std::cout << pair.first << ": " << pair.second << std::endl;
    }

    return 0;
}

```

## List(链表)

```c++
#include <iostream>

// 链表节点
struct Node {
    int data;
    Node* next;
    Node(int value) : data(value), next(nullptr) {}
};

int main() {
    // 链表的初始化
    Node* head = new Node(1);
    head->next = new Node(2);
    head->next->next = new Node(3);

    // 链表的遍历和输出
    Node* current = head;
    while (current != nullptr) {
        std::cout << current->data << " ";
        current = current->next;
    }
    std::cout << std::endl;

    return 0;
}

```
