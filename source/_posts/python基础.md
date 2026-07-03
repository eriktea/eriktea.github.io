---
title: Python 基础入门
tags:
  - Python
  - 入门
  - 教程
categories:
  - Python
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/temp01_IMG_5758.png
date: 2026-07-03
---

# Python 基础入门

> Python 是一门简洁、易读、功能强大的编程语言。本文从实际使用角度出发，梳理 Python 的核心知识点。

---

## 1. Python 是什么

Python 是一门高级、解释型、动态类型的通用编程语言。它的设计哲学强调代码可读性，用缩进代替花括号作为代码块的分隔，这使得 Python 代码读起来像伪代码一样清晰。

Python 在 Web 开发、数据分析、人工智能、自动化脚本、科学计算等领域都有广泛应用。你用的 pip、Anaconda、Jupyter Notebook 背后的主力语言就是 Python。

---

## 2. 变量与数据类型

Python 是动态类型语言，变量无需声明类型，直接赋值即可：

```python
name = "Alice"        # 字符串
age = 25              # 整数
height = 1.68         # 浮点数
is_student = True     # 布尔值
nothing = None        # 空值

# 列表（可变序列）
fruits = ["apple", "banana", "cherry"]

# 字典（键值对）
person = {"name": "Alice", "age": 25}
```

---

## 3. 控制流

### if-elif-else

```python
score = 85

if score >= 90:
    grade = 'A'
elif score >= 80:
    grade = 'B'
elif score >= 70:
    grade = 'C'
else:
    grade = 'F'

print(f"等级: {grade}")  # 输出: 等级: B
```

### for 循环

```python
# 遍历列表
for fruit in ["apple", "banana", "cherry"]:
    print(fruit)

# range 生成整数序列
for i in range(5):      # 0, 1, 2, 3, 4
    print(i)

for i in range(1, 10, 2):  # 1, 3, 5, 7, 9
    print(i)
```

### while 循环

```python
count = 3
while count > 0:
    print(count)
    count -= 1
print("出发！")
```

---

## 4. 函数

Python 使用 `def` 关键字定义函数，支持默认参数、可变参数和 Lambda 表达式：

```python
# 基本函数
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Alice"))          # Hello, Alice!
print(greet("Bob", "Hi"))      # Hi, Bob!

# 可变参数
def sum_all(*args):
    return sum(args)

print(sum_all(1, 2, 3, 4, 5))  # 15

# Lambda 表达式（匿名函数）
square = lambda x: x ** 2
print(square(5))  # 25
```

---

## 5. 列表推导式

列表推导式是 Python 中最具特色的语法之一，用一行代码完成循环和过滤：

```python
# 传统写法
squares = []
for x in range(10):
    if x % 2 == 0:
        squares.append(x ** 2)

# 列表推导式
squares = [x ** 2 for x in range(10) if x % 2 == 0]
# 结果: [0, 4, 16, 36, 64]
```

其他推导式：

```python
# 字典推导式
d = {x: x ** 2 for x in range(5)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# 生成器表达式（惰性求值）
gen = (x ** 2 for x in range(1000000))  # 不会立即生成所有元素
```

---

## 6. 文件操作

```python
# 读取文件
with open("data.txt", "r", encoding="utf-8") as f:
    content = f.read()

# 写入文件
with open("output.txt", "w", encoding="utf-8") as f:
    f.write("Hello, World!\n")

# 逐行读取
with open("data.txt", "r", encoding="utf-8") as f:
    for line in f:
        print(line.strip())
```

`with` 语句确保文件在使用完毕后自动关闭，即使发生异常也不例外。

---

## 7. 异常处理

```python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("除数不能为零")
except Exception as e:
    print(f"发生了其他错误: {e}")
else:
    print("计算成功")
finally:
    print("无论是否出错，这段都会执行")
```

---

## 8. 常用标准库速查

| 模块 | 用途 | 示例 |
|------|------|------|
| `os` | 操作系统接口 | `os.listdir()` |
| `sys` | 系统参数和函数 | `sys.argv` |
| `pathlib` | 路径操作（推荐替代 os.path） | `Path(".").glob("*.py")` |
| `json` | JSON 编解码 | `json.loads()` / `json.dumps()` |
| `requests` | HTTP 请求（第三方） | `requests.get(url)` |
| `datetime` | 日期和时间 | `datetime.now()` |
| `re` | 正则表达式 | `re.search(pattern, text)` |

---

## 9. 虚拟环境

使用虚拟环境隔离项目依赖是 Python 开发的最佳实践：

```bash
# 创建虚拟环境
python -m venv venv

# 激活虚拟环境
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# 安装依赖
pip install requests

# 导出依赖列表
pip freeze > requirements.txt

# 安装依赖列表
pip install -r requirements.txt
```

---

## 10. 实用技巧

```python
# 交换变量（无需临时变量）
a, b = 1, 2
a, b = b, a

# 合并两个字典
d1 = {"a": 1, "b": 2}
d2 = {"c": 3, "d": 4}
merged = {**d1, **d2}

# 列表去重
nums = [1, 2, 2, 3, 3, 3]
unique = list(set(nums))

# 获取字典安全值
config = {}
value = config.get("timeout", 30)  # 默认值 30
```

---

## 结语

Python 的精髓在于**简洁**和**实用**。入门阶段不需要死记语法，多写脚本解决实际问题是最快的学习方式。从自动化一个重复任务开始，你会慢慢感受到 Python 的魅力。

> 人生苦短，我用 Python。
