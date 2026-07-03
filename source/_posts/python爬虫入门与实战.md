---
title: Python 爬虫入门与实战
tags:
  - Python
  - 爬虫
  - 教程
  - 实战
categories:
  - Python
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/temp01_IMG_5758.png
date: 2026-07-03
---

# Python 爬虫入门与实战

> 爬虫的本质是：模拟浏览器发送请求，解析网页提取你需要的数据。本文从基础讲到实战，三篇案例覆盖静态页、动态页和真实场景。

---

## 一、爬虫基础

### 1.1 爬虫是什么

爬虫（Web Crawler）是一个自动获取网页内容的程序。它的工作流程很简单：

```
发送请求 → 获取网页内容 → 解析数据 → 保存结果
```

### 1.2 核心工具

| 工具 | 用途 |
|------|------|
| `requests` | 发送 HTTP 请求，获取网页 HTML |
| `BeautifulSoup4` | 解析 HTML，提取数据 |
| `lxml` | 更快的 HTML/XML 解析器 |
| `Selenium` | 模拟浏览器，处理 JavaScript 渲染的页面 |
| `pandas` | 数据清洗和导出 Excel/CSV |

安装依赖：

```bash
pip install requests beautifulsoup4 lxml pandas selenium
```

### 1.3 基本流程

```python
import requests
from bs4 import BeautifulSoup

# 1. 发送请求
url = "https://example.com"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
}
response = requests.get(url, headers=headers)

# 2. 解析 HTML
soup = BeautifulSoup(response.text, "lxml")

# 3. 提取数据
titles = soup.select("h2.title")  # CSS 选择器
for t in titles:
    print(t.get_text(strip=True))

# 4. 保存结果
with open("output.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(titles))
```

### 1.4 注意事项

- **加 `User-Agent`**：不加的话网站会知道你是爬虫，直接拒绝
- **控制频率**：`time.sleep(1)` 每隔 1 秒请求一次，别把对方服务器打挂了
- **尊重 `robots.txt`**：`https://站点域名/robots.txt` 会告诉爬虫哪些页面可以爬
- **不要爬取敏感数据**：个人隐私、付费内容、登录后可见的内容，爬之前先想清楚合不合法

---

## 二、实战案例

### 案例 1：爬取名言警句（静态页面）

**目标**：从 [quotes.toscrape.com](http://quotes.toscrape.com/) 爬取名言、作者和标签，保存到 CSV。

```python
import requests
from bs4 import BeautifulSoup
import csv
import time

BASE_URL = "http://quotes.toscrape.com"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
}

def scrape_quotes(page=1):
    url = f"{BASE_URL}/page/{page}/"
    resp = requests.get(url, headers=headers)
    soup = BeautifulSoup(resp.text, "lxml")

    quotes = []
    for item in soup.select(".quote"):
        text = item.select_one(".text").get_text(strip=True)
        author = item.select_one(".author").get_text(strip=True)
        tags = [t.get_text(strip=True) for t in item.select(".tag")]
        quotes.append({
            "quote": text,
            "author": author,
            "tags": ", ".join(tags)
        })
    return quotes

if __name__ == "__main__":
    all_quotes = []
    for page in range(1, 11):  # 爬 10 页
        print(f"正在爬取第 {page} 页...")
        quotes = scrape_quotes(page)
        all_quotes.extend(quotes)
        time.sleep(1)  # 礼貌延迟

    # 保存到 CSV
    with open("quotes.csv", "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["quote", "author", "tags"])
        writer.writeheader()
        writer.writerows(all_quotes)

    print(f"完成！共爬取 {len(all_quotes)} 条名言，已保存到 quotes.csv")
```

**关键点解析：**
- `soup.select(".quote")` 用 CSS 选择器定位每条名言
- `get_text(strip=True)` 提取文本并自动去掉首尾空白
- `time.sleep(1)` 每页间隔 1 秒，避免被封 IP

---

### 案例 2：爬取豆瓣电影 Top250（翻页 + 数据清洗）

**目标**：爬取豆瓣电影 Top250 的电影名称、评分、导演、年份，保存到 Excel。

```python
import requests
from bs4 import BeautifulSoup
import pandas as pd
import time

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
}

def scrape_douban(start=0):
    url = f"https://movie.douban.com/top250?start={start}&filter="
    resp = requests.get(url, headers=headers)
    soup = BeautifulSoup(resp.text, "lxml")

    movies = []
    for item in soup.select(".item"):
        title = item.select_one(".title").get_text(strip=True)
        rating = item.select_one(".rating_num").get_text(strip=True)
        info = item.select_one(".bd p").get_text(strip=True)

        # 从 info 字符串中提取导演和年份
        lines = info.split("\n")
        director_line = lines[0].strip() if lines else ""
        year = ""
        for line in lines:
            if line.strip() and line.strip()[0].isdigit():
                year = line.strip()[:4]
                break

        movies.append({
            "title": title,
            "rating": float(rating),
            "director": director_line,
            "year": year
        })
    return movies

if __name__ == "__main__":
    all_movies = []
    for start in range(0, 250, 25):
        print(f"正在爬取 start={start}...")
        movies = scrape_douban(start)
        all_movies.extend(movies)
        time.sleep(2)  # 豆瓣反爬较严，多等一会

    df = pd.DataFrame(all_movies)
    df.to_excel("douban_top250.xlsx", index=False)
    print(f"完成！共 {len(df)} 部电影，已保存到 douban_top250.xlsx")
    print(df.head())
```

**关键点解析：**
- 豆瓣电影每页 25 条，`start` 参数控制翻页（0, 25, 50, ...）
- `.bd p` 里的文本包含导演、主演、年份等信息，需要 split 和 strip 清洗
- 用 `pandas` 直接导出 Excel，比手动写 CSV 更方便
- `time.sleep(2)` 豆瓣反爬严格，建议不低于 2 秒

---

### 案例 3：批量下载壁纸（文件下载 + 异常处理）

**目标**：从 [wallhaven.cc](https://wallhaven.cc/) 搜索关键词，批量下载高清壁纸到本地。

```python
import requests
import os
import time
from bs4 import BeautifulSoup

SEARCH_URL = "https://wallhaven.cc/search?q={keyword}&purity=100&sorting=relevance"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "Referer": "https://wallhaven.cc/"
}

def search_wallpapers(keyword, max_pages=3):
    """搜索壁纸并获取高清图链接"""
    image_urls = []

    for page in range(1, max_pages + 1):
        url = SEARCH_URL.format(keyword=keyword) + f"&page={page}"
        print(f"搜索第 {page} 页: {url}")
        resp = requests.get(url, headers=headers, timeout=10)
        soup = BeautifulSoup(resp.text, "lxml")

        for item in soup.select(".thumb-list .thumb"):
            link = item.select_one("a")["href"]
            # 进入详情页获取原图
            detail_resp = requests.get(link, headers=headers, timeout=10)
            detail_soup = BeautifulSoup(detail_resp.text, "lxml")
            img = detail_soup.select_one("#wallpaper")
            if img and img.get("src"):
                image_urls.append(img["src"])

        time.sleep(1.5)

    return image_urls

def download_images(urls, folder="wallpapers"):
    """批量下载图片"""
    if not os.path.exists(folder):
        os.makedirs(folder)

    for i, url in enumerate(urls, 1):
        try:
            ext = url.split(".")[-1].split("?")[0]
            filename = os.path.join(folder, f"wallpaper_{i:03d}.{ext}")

            print(f"下载 [{i}/{len(urls)}]: {url}")
            img_resp = requests.get(url, headers=headers, timeout=15)
            img_resp.raise_for_status()

            with open(filename, "wb") as f:
                f.write(img_resp.content)
            print(f"  已保存: {filename} ({len(img_resp.content) // 1024} KB)")

        except Exception as e:
            print(f"  下载失败: {e}")
        time.sleep(0.8)

if __name__ == "__main__":
    keyword = input("输入搜索关键词（如 anime, landscape）: ").strip()
    urls = search_wallpapers(keyword, max_pages=2)
    print(f"\n找到 {len(urls)} 张壁纸，开始下载...")
    download_images(urls)
    print("全部完成！")
```

**关键点解析：**
- 先搜索列表页，再进入每张图的详情页获取高清原图链接
- `purity=100` 参数只搜索 SFW 内容
- `try/except` 包裹下载逻辑，单张失败不影响其他
- 图片以二进制模式 `"wb"` 写入，注意 `Referer` 头有些图站需要

---

## 三、进阶建议

### 3.1 遇到 JavaScript 渲染的页面怎么办

如果 `requests.get()` 拿到的 HTML 里没有你要的数据（数据是 JS 动态加载的），可以用 **Selenium**：

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
driver.get("https://example.com")

# 等待某个元素加载完成
element = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.CSS_SELECTOR, ".data-list"))
)

html = driver.page_source
# 之后用 BeautifulSoup 解析 html
driver.quit()
```

Selenium 会启动一个真实的浏览器，等页面 JS 执行完后再获取 HTML。缺点是速度慢、资源消耗大，适合 `requests` 搞不定的场景。

### 3.2 爬虫框架

如果项目变大，考虑用框架管理：

- **Scrapy**：工业级爬虫框架，自带异步、中间件、管道，适合大规模爬取
- **Playwright**：微软出品，比 Selenium 更快，支持多浏览器

### 3.3 反爬应对

| 反爬手段 | 应对方式 |
|----------|----------|
| User-Agent 检测 | 加 headers，或用 `fake-useragent` 库随机生成 |
| IP 封禁 | 用代理池轮换 IP |
| 验证码 | 接入打码平台（如 2Captcha） |
| 动态加载 | 用 Selenium / Playwright 模拟浏览器 |
| 频率限制 | `time.sleep()` 控制请求间隔 |
| Cookie / Session | 用 `requests.Session()` 保持会话 |

---

## 四、总结

爬虫的核心思路就是三个步骤：

1. **拿到 HTML** — `requests` 或 `Selenium`
2. **提取数据** — `BeautifulSoup` 或 CSS 选择器
3. **保存结果** — CSV、Excel、JSON、数据库

入门不需要学复杂的框架，`requests + BeautifulSoup` 能解决 80% 的场景。多写几个案例，自然就熟了。

> 最后再提醒一次：控制频率、尊重版权、不要碰敏感数据。做个有礼貌的爬虫。
