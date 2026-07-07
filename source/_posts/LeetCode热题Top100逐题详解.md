---
title: LeetCode 热题 Top 100 逐题详解
tags:
  - 算法
  - LeetCode
  - 刷题
  - 题解
categories:
  - 学习
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/temp01_96145490_p0.png
date: 2026-07-03
---

# LeetCode 热题 Top 100 逐题详解

> 对应刷题顺序推荐篇，每道题给出详细思路、手把手推导、完整代码、复杂度分析和易错点提醒。建议先自己写一遍，再看答案。

---

## 第一阶段：数组与字符串

### 1. Two Sum（1）

**题目**：给定一个整数数组 `nums` 和一个目标值 `target`，找出数组中和为目标值的两个整数，返回它们的下标。

**暴力解法**：两层循环，枚举所有配对。时间复杂度 O(n²)。面试写这个大概率被挂。

**优化思路**：遍历一次，对每个元素 `nums[i]`，我们需要的另一个数是 `target - nums[i]`。如果这个数之前见过，直接返回结果。关键是要**快速查找**——哈希表可以把查找时间从 O(n) 降到 O(1)。

**手推示例**：
```
nums = [2, 7, 11, 15], target = 9

i=0, num=2: 需要 9-2=7，hashmap 里没有 → 存 {2: 0}
i=1, num=7: 需要 9-7=2，hashmap 里有 2（下标 0）→ 返回 [0, 1]
```

```python
def twoSum(nums, target):
    hashmap = {}
    for i, num in enumerate(nums):
        if target - num in hashmap:
            return [hashmap[target - num], i]
        hashmap[num] = i
```

- 时间复杂度：O(n) — 只遍历一次
- 空间复杂度：O(n) — 哈希表最多存 n 个元素
- **易错点**：不能先遍历一遍把所有元素存入哈希表再查，因为可能用到同一个元素两次（比如 `[3,3]`  target=6）

---

### 2. Longest Substring Without Repeating Characters（3）

**题目**：给定一个字符串，找出不包含重复字符的最长子串的长度。

**思路**：滑动窗口。维护一个窗口 `[left, right]`，窗口内没有重复字符。`right` 向右移动扩大窗口，遇到重复字符时，`left` 跳到重复字符的下一个位置。

**为什么窗口收缩是对的**：当 `s[right]` 在窗口中已经出现过，说明以当前 `left` 为起点的所有子串都不可能比当前更长了，必须移动 `left`。

**手推示例**：
```
s = "abcabcbb"

right=0, 'a': window={a}, left=0, max_len=1
right=1, 'b': window={a,b}, left=0, max_len=2
right=2, 'c': window={a,b,c}, left=0, max_len=3
right=3, 'a': 'a' 在窗口中（位置0）→ left = 0+1 = 1, window={b,c,a}, max_len=3
right=4, 'b': 'b' 在窗口中（位置1）→ left = 1+1 = 2, window={c,a,b}, max_len=3
right=5, 'c': 'c' 在窗口中（位置2）→ left = 2+1 = 3, window={a,b,c}, max_len=3
...
结果: 3 ("abc")
```

```python
def lengthOfLongestSubstring(s):
    window = {}
    left = 0
    res = 0
    for right, c in enumerate(s):
        if c in window and window[c] >= left:
            left = window[c] + 1
        window[c] = right
        res = max(res, right - left + 1)
    return res
```

- 时间复杂度：O(n)
- 空间复杂度：O(min(n, charset))
- **易错点**：`window[c] >= left` 这个判断很重要。如果 `window[c] < left`，说明那个重复字符已经在窗口外面了，不需要收缩

---

### 3. Container With Most Water（11）

**题目**：给定一个高度数组 `height`，选择两条线（下标 i, j），使它们与 x 轴围成的容器能装最多的水。

**面积公式**：`area = min(height[i], height[j]) × (j - i)`

**贪心思路**：初始时 `left=0, right=n-1`（宽度最大）。每次移动较矮的那一端。为什么？因为面积受限于矮边，移动高边只会让宽度变小而高度不变或变小，面积不可能更大；只有移动矮边，才有机会找到更高的边从而增大面积。

**手推示例**：
```
height = [1,8,6,2,5,4,8,3,7]

left=0(1), right=8(7): area = min(1,7)*8 = 8
  → 移动 left（因为 1 < 7）
left=1(8), right=8(7): area = min(8,7)*7 = 49
  → 移动 right（因为 7 < 8）
left=1(8), right=7(3): area = min(8,3)*6 = 18
  → 移动 right
...
最终最大面积 = 49
```

```python
def maxArea(height):
    left, right = 0, len(height) - 1
    res = 0
    while left < right:
        area = min(height[left], height[right]) * (right - left)
        res = max(res, area)
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    return res
```

- 时间复杂度：O(n)
- 空间复杂度：O(1)
- **易错点**：移动较矮的那端，不是较高端。如果两端相等，移动哪端都可以

---

### 4. 3Sum（15）

**题目**：找出数组中所有和为 0 的三元组，不能包含重复的三元组。

**思路**：排序 + 双指针。先排序，然后固定 `nums[i]`，剩下两个数用双指针在 `i+1` 到末尾之间找，和为 `-nums[i]`。

**去重策略**：
- 外层：`if i > 0 and nums[i] == nums[i-1]: continue` — 跳过重复的 target
- 内层：找到一个解后，`left` 和 `right` 都要跳过重复值

**手推示例**：
```
nums = [-1, 0, 1, 2, -1, -4] → 排序后 [-4, -1, -1, 0, 1, 2]

i=0, nums[0]=-4: 需要在 [-1,-1,0,1,2] 中找和为 4 的两数 → 无解
i=1, nums[1]=-1: 需要在 [-1,0,1,2] 中找和为 1 的两数
  left=2(-1), right=5(2): sum=-1+0+1=0 → 找到 [-1,-1,2] 不对，应该是 [-1,0,1]
  纠正: left=2(-1), right=5(2): -1+2=1 ≠ 1... 
  让我重新推：
  i=1, target=1, 在 [2,3,4,5] 即 [-1,0,1,2] 中找和为 1
  left=2(-1), right=5(2): -1+2=1 ✓ → [-1,-1,2]
  跳过重复: left=2→3, right=5→4
  left=3(0), right=4(1): 0+1=1 ✓ → [-1,0,1]
i=2, nums[2]=-1: 和 nums[1] 相同 → skip（去重）
...
结果: [[-1,-1,2], [-1,0,1]]
```

```python
def threeSum(nums):
    nums.sort()
    res = []
    n = len(nums)
    for i in range(n - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        left, right = i + 1, n - 1
        while left < right:
            s = nums[i] + nums[left] + nums[right]
            if s == 0:
                res.append([nums[i], nums[left], nums[right]])
                left += 1
                right -= 1
                while left < right and nums[left] == nums[left - 1]:
                    left += 1
                while left < right and nums[right] == nums[right + 1]:
                    right -= 1
            elif s < 0:
                left += 1
            else:
                right -= 1
    return res
```

- 时间复杂度：O(n²)
- 空间复杂度：O(1)
- **易错点**：三重去重最容易漏。排序是前提，不排序无法保证相邻的就是重复的

---

### 5. Trapping Rain Water（42）

**题目**：给定一个高度数组，计算它能装多少单位的水。

**经典误区**：很多人想先找到全局最高点，然后分别算左右两边。这需要两次遍历，而且逻辑容易写错。

**双指针思路**：维护 `left_max` 和 `right_max`。每次移动较矮的那端，因为当前格能装的水量取决于**较矮的那一边的最大高度**。

**手推示例**：
```
height = [0,1,0,2,1,0,1,3,2,1,2,1]

left=0(0), right=11(1): left_max=0, right_max=1
  height[left]=0 < height[right]=1 → 移动 left
  left=0: height[0]=0, left_max=0, water += 0-0=0
  left=1: height[1]=1 > left_max → left_max=1, water += 0

left=1(1), right=11(1): 
  height[1]=1 ≮ height[11]=1 → 移动 right（相等时移哪边都行）
  right=11: height[11]=1 < right_max=1 → water += 1-1=0
  right=10: height[10]=2 > right_max=1 → right_max=2

继续...
最终 water = 6
```

```python
def trap(height):
    if not height:
        return 0
    left, right = 0, len(height) - 1
    left_max = right_max = 0
    water = 0
    while left < right:
        if height[left] < height[right]:
            if height[left] >= left_max:
                left_max = height[left]
            else:
                water += left_max - height[left]
            left += 1
        else:
            if height[right] >= right_max:
                right_max = height[right]
            else:
                water += right_max - height[right]
            right -= 1
    return water
```

- 时间复杂度：O(n)
- 空间复杂度：O(1)
- **易错点**：不需要知道全局最大值。只要当前端是较矮的，`left_max - height[left]` 就一定能接住这些水

---

### 6. Maximum Subarray（53）

**题目**：给定一个整数数组，找出具有最大和的连续子数组，返回最大和。

**DP 思路**：`dp[i]` 表示以 `nums[i]` 结尾的最大子数组和。对每个元素，要么把它接在之前的子数组后面（`dp[i-1] + nums[i]`），要么从自己重新开始（`nums[i]`）。

**转移方程**：`dp[i] = max(nums[i], dp[i-1] + nums[i])`

**手推示例**：
```
nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]

i=0: dp[0] = -2
i=1: dp[1] = max(1, -2+1) = max(1, -1) = 1
i=2: dp[2] = max(-3, 1-3) = max(-3, -2) = -2
i=3: dp[3] = max(4, -2+4) = max(4, 2) = 4  ← 从 4 重新开始
i=4: dp[4] = max(-1, 4-1) = max(-1, 3) = 3
i=5: dp[5] = max(2, 3+2) = 5
i=6: dp[6] = max(1, 5+1) = 6
i=7: dp[7] = max(-5, 6-5) = max(-5, 1) = 1
i=8: dp[8] = max(4, 1+4) = 5

max = max of all dp = 6（子数组 [4,-1,2,1]）
```

```python
def maxSubArray(nums):
    cur_sum = max_sum = nums[0]
    for num in nums[1:]:
        cur_sum = max(num, cur_sum + num)
        max_sum = max(max_sum, cur_sum)
    return max_sum
```

- 时间复杂度：O(n)
- 空间复杂度：O(1)
- **易错点**：`cur_sum` 变成负数后必须重新开始，负数对后面是累赘。`max_sum` 的初始值必须是 `nums[0]` 而不是 0（数组可能全负）

---

### 7. Merge Intervals（56）

**题目**：给定一个区间数组，合并所有重叠的区间。

**关键前提**：合并前必须先**按区间起点排序**。不排序的话，`[1,4]` 和 `[0,4]` 虽然重叠但因为顺序靠后不会被合并。

**合并逻辑**：
- 如果当前区间起点 > 上一个区间的终点 → 不重叠，直接加入结果
- 否则 → 重叠，更新上一个区间的终点为 `max(终点1, 终点2)`

**手推示例**：
```
intervals = [[1,3],[2,6],[8,10],[15,18]]

排序后: [[1,3],[2,6],[8,10],[15,18]]

merged=[]

处理 [1,3]: merged=[[1,3]]
处理 [2,6]: 2 ≤ 3（重叠）→ merged=[[1,6]]
处理 [8,10]: 8 > 6（不重叠）→ merged=[[1,6],[8,10]]
处理 [15,18]: 15 > 10（不重叠）→ merged=[[1,6],[8,10],[15,18]]
```

```python
def merge(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = []
    for interval in intervals:
        if not merged or interval[0] > merged[-1][1]:
            merged.append(interval)
        else:
            merged[-1][1] = max(merged[-1][1], interval[1])
    return merged
```

- 时间复杂度：O(n log n) — 排序是瓶颈
- 空间复杂度：O(n)
- **易错点**：排序是必须的。合并时更新的是 `merged[-1][1]`（终点），不是起点

---

### 8. Climbing Stairs（70）

**题目**：爬 n 阶楼梯，每次可以爬 1 或 2 阶，有多少种不同的方法？

**数学本质**：这就是斐波那契数列。

```
n=1: 1 种（1）
n=2: 2 种（1+1, 2）
n=3: 3 种（1+1+1, 1+2, 2+1）
n=4: 5 种（1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2）
```

规律：`f(n) = f(n-1) + f(n-2)`，因为第 n 阶可以从 n-1 阶爬 1 步上来，也可以从 n-2 阶爬 2 步上来。

```python
def climbStairs(n):
    if n <= 2:
        return n
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, a + b
    return b
```

- 时间复杂度：O(n)
- 空间复杂度：O(1)
- **易错点**：`n=1` 返回 1，`n=2` 返回 2，不要搞错初始值。递归写法会超时，必须用迭代

---

## 第二阶段：链表

### 9. Reverse Linked List（206）

**题目**：反转单链表。

**迭代法**（推荐面试用）：三指针。`prev` 指向已反转部分的头部（初始为 `None`），`curr` 指向当前正在处理的节点。每次把 `curr.next` 指向 `prev`，然后三个指针同步前移。

**手推示例**：
```
初始: prev=None, curr=1→2→3→None

第1步: 保存 nxt=2, curr.next=None, prev=1, curr=2
  结果: None←1  2→3→None
第2步: 保存 nxt=3, curr.next=1, prev=2, curr=3
  结果: None←1←2  3→None
第3步: 保存 nxt=None, curr.next=2, prev=3, curr=None
  结果: None←1←2←3
返回 prev=3
```

```python
def reverseList(head):
    prev = None
    curr = head
    while curr:
        nxt = curr.next  # 先保存，不然断链就找不到了
        curr.next = prev
        prev = curr
        curr = nxt
    return prev
```

- 时间复杂度：O(n)
- 空间复杂度：O(1)
- **易错点**：必须先保存 `curr.next` 再反转，否则链表就断了。递归写法虽然简洁但面试容易写错

---

### 10. Linked List Cycle（141）

**题目**：判断链表中是否有环。

**思路**：快慢指针（Floyd 判圈算法）。慢指针每次走一步，快指针每次走两步。如果有环，快指针一定会追上慢指针；如果无环，快指针会先走到 `None`。

**为什么快指针一定能追上**：在环中，每轮快慢指针的距离缩短 1（快比慢多走 1 步），距离有限所以一定能追上。

```python
def hasCycle(head):
    if not head or not head.next:
        return False
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False
```

- 时间复杂度：O(n)
- 空间复杂度：O(1)
- **易错点**：循环条件必须是 `fast and fast.next`，否则 `fast.next.next` 会报错

---

### 11. Linked List Cycle II（142）

**题目**：判断链表是否有环，如果有环，返回环的入口节点。

**思路**：先用快慢指针找到相遇点。然后一个指针从 `head` 出发，另一个从相遇点出发，每次都走一步，再次相遇的节点就是环的入口。

**数学推导**：
- 设头节点到环入口的距离为 a，环入口到相遇点的距离为 b，环长为 c
- 慢指针走了 a + b 步，快指针走了 a + b + k*c 步（k 为快指针在环中绕的圈数）
- 快指针是慢指针的 2 倍：`a + b + k*c = 2(a + b)` → `a = (k-1)*c + (c-b)`
- 左边 `a` 是头节点到入口的距离，右边 `(c-b)` 是相遇点到入口的距离
- 所以从 head 和相遇点同时出发，走 a 步后会在入口相遇

```python
def detectCycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            ptr = head
            while ptr != slow:
                ptr = ptr.next
                slow = slow.next
            return ptr
    return None
```

- 时间复杂度：O(n)
- 空间复杂度：O(1)
- **易错点**：先判环，再找入口。如果没有环直接返回 None

---

### 12. Merge Two Sorted Lists（21）

**题目**：合并两个升序链表，返回新的升序链表。

**思路**：虚拟头节点 + 双指针。比较两个链表当前节点的值，小的接到结果链表后面。

**为什么用虚拟头节点**：合并后的链表头节点可能是 list1 的头，也可能是 list2 的头。用虚拟头节点 `dummy` 可以统一处理，最后返回 `dummy.next`。

```python
def mergeTwoLists(list1, list2):
    dummy = ListNode(0)
    curr = dummy
    while list1 and list2:
        if list1.val < list2.val:
            curr.next = list1
            list1 = list1.next
        else:
            curr.next = list2
            list2 = list2.next
        curr = curr.next
    curr.next = list1 if list1 else list2
    return dummy.next
```

- 时间复杂度：O(m + n)
- 空间复杂度：O(1)
- **易错点**：循环结束后，把剩余的非空链表直接接上。不要再用 while 遍历剩余节点

---

### 13. Remove Nth Node From End（19）

**题目**：删除链表的倒数第 N 个节点，返回新的头节点。

**思路**：快慢指针。快指针先走 n 步，然后快慢指针一起走，快指针到末尾时，慢指针恰好指向倒数第 n+1 个节点（即待删除节点的前驱）。

**为什么用虚拟头节点**：如果要删除的是第一个节点（n = 链表长度），没有前驱节点。虚拟头节点解决了这个问题。

```python
def removeNthFromEnd(head, n):
    dummy = ListNode(0, head)
    slow = fast = dummy
    for _ in range(n):
        fast = fast.next
    while fast.next:
        slow = slow.next
        fast = fast.next
    slow.next = slow.next.next
    return dummy.next
```

- 时间复杂度：O(n)
- 空间复杂度：O(1)
- **易错点**：快指针先走 n 步（不是 n+1 步），因为 `dummy` 在头节点前面

---

### 14. Sort List（148）

**题目**：对链表进行排序，要求 O(n log n) 时间复杂度和 O(1) 空间复杂度。

**思路**：归并排序。链表不像数组能随机访问，找中点用快慢指针。排序后合并两个有序链表（复用 #12 的逻辑）。

**分治三步**：
1. 找中点（快慢指针）
2. 断开链表（`slow.next = None`）
3. 递归排序左右两半，然后合并

```python
def sortList(head):
    if not head or not head.next:
        return head

    # 找中点
    slow, fast = head, head.next
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    mid = slow.next
    slow.next = None

    # 递归排序
    left = sortList(head)
    right = sortList(mid)

    # 合并
    dummy = ListNode(0)
    curr = dummy
    while left and right:
        if left.val < right.val:
            curr.next = left
            left = left.next
        else:
            curr.next = right
            right = right.next
        curr = curr.next
    curr.next = left if left else right
    return dummy.next
```

- 时间复杂度：O(n log n)
- 空间复杂度：O(log n) — 递归栈深度
- **易错点**：找中点时 `fast = head.next` 而不是 `fast = head`，否则偶数长度链表找的中点偏左，可能导致无限递归

---

### 15. Intersection of Two Linked Lists（160）

**题目**：找出两个单链表相交的起始节点，如果不存在返回 None。

**思路**：双指针法。指针 A 走完链表 1 后转去走链表 2，指针 B 走完链表 2 后转去走链表 1。两指针走过的总路程相等：`A 走了 len1 + len2 - common`，`B 走了 len2 + len1 - common`。它们会在交点相遇。

**为什么不需要先算长度差**：传统方法需要先算出两条链表的长度差，让长链表的指针先走差值步。双指针法把"先走差值步"巧妙地变成了"走完自己的路再走对方的"，效果一样但代码更简洁。

```python
def getIntersectionNode(headA, headB):
    a, b = headA, headB
    while a != b:
        a = a.next if a else headB
        b = b.next if b else headA
    return a
```

- 时间复杂度：O(m + n)
- 空间复杂度：O(1)
- **易错点**：如果没有交点，两指针最终都走到 `None`，`None == None` 成立，循环正常结束，返回 `None`

---

## 第三阶段：二叉树

### 16. Binary Tree Inorder Traversal（94）

**题目**：给定二叉树的根节点，返回中序遍历（左→根→右）的节点值数组。

**递归法**：直接按左→根→右的顺序递归，最直观。

**迭代法**：用栈模拟递归过程。先把左边界全部压入栈，然后弹栈处理节点，转向右子树。

**迭代法手推**（树 `[1,null,2,3]`，即 1 的右孩子是 2，2 的左孩子是 3）：
```
stack=[], curr=1
  push 1, curr=1.left=None
  pop 1, res=[1], curr=1.right=2
  push 2, curr=2.left=3
  push 3, curr=3.left=None
  pop 3, res=[1,3], curr=3.right=None
  pop 2, res=[1,3,2], curr=2.right=None
结束
```

```python
# 递归
def inorderTraversal(root):
    res = []
    def dfs(node):
        if not node:
            return
        dfs(node.left)
        res.append(node.val)
        dfs(node.right)
    dfs(root)
    return res

# 迭代
def inorderTraversal(root):
    res, stack = [], []
    curr = root
    while curr or stack:
        while curr:
            stack.append(curr)
            curr = curr.left
        curr = stack.pop()
        res.append(curr.val)
        curr = curr.right
    return res
```

- 时间复杂度：O(n)
- 空间复杂度：O(n)
- **易错点**：迭代法的 `while curr or stack` 条件是关键，确保还有节点待处理

---

### 17. Symmetric Tree（101）

**题目**：判断一棵二叉树是否是镜像对称的。

**递归思路**：比较左子树和右子树是否互为镜像。`isMirror(a, b)` 成立的条件是：
- `a.val == b.val`
- `a.left` 和 `b.right` 互为镜像
- `a.right` 和 `b.left` 互为镜像

```python
def isSymmetric(root):
    def isMirror(a, b):
        if not a and not b:
            return True
        if not a or not b:
            return False
        return (a.val == b.val and
                isMirror(a.left, b.right) and
                isMirror(a.right, b.left))
    return isMirror(root, root)
```

- 时间复杂度：O(n)
- 空间复杂度：O(n)
- **易错点**：是 `a.left 比 b.right`，`a.right 比 b.left`——内外侧要交叉比，不是同侧比

---

### 18. Binary Tree Level Order Traversal（102）

**题目**：给定二叉树，返回层序遍历结果（逐层从左到右）。

**思路**：BFS。用队列，每次处理一层。核心技巧是 `for _ in range(len(queue))`，确保只处理当前层的节点。

```python
from collections import deque

def levelOrder(root):
    if not root:
        return []
    result = []
    queue = deque([root])
    while queue:
        level = []
        for _ in range(len(queue)):  # 只处理当前层
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)
    return result
```

- 时间复杂度：O(n)
- 空间复杂度：O(n)
- **易错点**：`for _ in range(len(queue))` 必须在循环开始时固定长度，不能在循环内动态获取，否则会把下一层的节点也处理了

---

### 19. Maximum Depth of Binary Tree（104）

**题目**：求二叉树的最大深度。

**思路**：DFS 递归最简洁。树的深度 = max(左子树深度, 右子树深度) + 1。

```python
def maxDepth(root):
    if not root:
        return 0
    return max(maxDepth(root.left), maxDepth(root.right)) + 1
```

- 时间复杂度：O(n)
- 空间复杂度：O(n)
- **易错点**：空节点的深度为 0，不是 -1。递归基线条件必须正确

---

### 20. Sorted Array to BST（108）

**题目**：将一个升序数组转换为高度平衡的二叉搜索树。

**思路**：分治。数组中间元素作为根节点，左半部分构建左子树，右半部分构建右子树。因为数组已排序，中间元素左边的都比它小，右边的都比它大，天然满足 BST 性质。

```python
def sortedArrayToBST(nums):
    def build(left, right):
        if left > right:
            return None
        mid = (left + right) // 2
        node = TreeNode(nums[mid])
        node.left = build(left, mid - 1)
        node.right = build(mid + 1, right)
        return node
    return build(0, len(nums) - 1)
```

- 时间复杂度：O(n) — 每个元素被访问一次
- 空间复杂度：O(log n) — 递归栈深度（平衡树的高度）
- **易错点**：`mid = (left + right) // 2` 是向下取整，Python 的 `//` 就是整数除法

---

### 21. Lowest Common Ancestor（236）

**题目**：给定二叉树的根节点和两个节点 p、q，返回它们的最近公共祖先。

**思路**：递归。递归函数返回以当前节点为根的子树中是否包含 p 或 q：
- 如果当前节点等于 p 或 q，返回当前节点
- 递归左右子树，得到 `left` 和 `right`
- 如果 `left` 和 `right` 都非空 → p 和 q 分别在左右子树 → 当前节点就是 LCA
- 如果只有一边非空 → 返回非空的那边（p 和 q 都在这一侧）

```python
def lowestCommonAncestor(root, p, q):
    if not root or root == p or root == q:
        return root
    left = lowestCommonAncestor(root.left, p, q)
    right = lowestCommonAncestor(root.right, p, q)
    if left and right:
        return root
    return left if left else right
```

- 时间复杂度：O(n)
- 空间复杂度：O(n)
- **易错点**：递归函数的返回值不是布尔值，而是"找到的节点"。如果左子树找到了 p，`left` 就不是 None，直接向上返回

---

### 22. Serialize and Deserialize Binary Tree（297）

**题目**：设计一个算法，将二叉树序列化为字符串，再反序列化为原树。

**思路**：用 BFS 层序遍历。序列化时用逗号分隔节点值，`null` 表示空节点。反序列化时用队列按层构建。

**序列化手推**：
```
树:     1
       / \
      2   3
         / \
        4   5

BFS 序列化: "1,2,3,null,null,4,5,null,null,null,null"
```

```python
from collections import deque

class Codec:
    def serialize(self, root):
        if not root:
            return ""
        queue = deque([root])
        res = []
        while queue:
            node = queue.popleft()
            if node:
                res.append(str(node.val))
                queue.append(node.left)
                queue.append(node.right)
            else:
                res.append("null")
        return ",".join(res)

    def deserialize(self, data):
        if not data:
            return None
        vals = data.split(",")
        root = TreeNode(int(vals[0]))
        queue = deque([root])
        i = 1
        while queue and i < len(vals):
            node = queue.popleft()
            if vals[i] != "null":
                node.left = TreeNode(int(vals[i]))
                queue.append(node.left)
            i += 1
            if i < len(vals) and vals[i] != "null":
                node.right = TreeNode(int(vals[i]))
                queue.append(node.right)
            i += 1
        return root
```

- 时间复杂度：O(n)
- 空间复杂度：O(n)
- **易错点**：序列化和反序列化必须用同一种遍历方式。序列化时即使是空节点也要入队，否则反序列化时层级对不上

---

## 第四阶段：动态规划

### 23. Climbing Stairs（70）

已在数组阶段详解，这里从 DP 角度重新梳理。

**DP 四步法应用**：
1. `dp[i]` 的含义：爬到第 i 阶楼梯的方法数
2. 状态转移方程：`dp[i] = dp[i-1] + dp[i-2]`（最后一步爬 1 阶或 2 阶）
3. 初始值：`dp[1] = 1, dp[2] = 2`
4. 遍历顺序：从小到大，因为 dp[i] 依赖前面的值

---

### 24. House Robber（198）

**题目**：给定一个非负整数数组，每个元素代表 houses[i] 的金额。不能偷相邻的两家，求最大偷窃金额。

**DP 四步法**：
1. `dp[i]` = 前 i 个房子能偷到的最大金额
2. `dp[i] = max(dp[i-1], dp[i-2] + nums[i])` — 不偷第 i 家（取 `dp[i-1]`）或偷第 i 家（`dp[i-2] + nums[i]`）
3. `dp[0] = nums[0], dp[1] = max(nums[0], nums[1])`
4. 从左到右遍历

**手推示例**：
```
nums = [2,7,9,3,1]

dp[0] = 2
dp[1] = max(2, 7) = 7
dp[2] = max(7, 2+9) = max(7, 11) = 11
dp[3] = max(11, 7+3) = max(11, 10) = 11
dp[4] = max(11, 11+1) = max(11, 12) = 12
结果: 12（偷第0、2、4家：2+9+1）
```

```python
def rob(nums):
    if not nums:
        return 0
    if len(nums) <= 2:
        return max(nums)
    a, b = nums[0], max(nums[0], nums[1])
    for i in range(2, len(nums)):
        a, b = b, max(b, a + nums[i])
    return b
```

- 时间复杂度：O(n)
- 空间复杂度：O(1)
- **易错点**：`dp[1]` 不是 `nums[1]`，而是 `max(nums[0], nums[1])`。边界条件容易写错

---

### 25. Longest Increasing Subsequence（300）

**题目**：给定一个整数数组，找到最长的严格递增子序列的长度。

**O(n²) DP 解法**：`dp[i]` = 以 `nums[i]` 结尾的最长递增子序列长度。对每个 `i`，遍历所有 `j < i`，如果 `nums[j] < nums[i]`，`dp[i] = max(dp[i], dp[j] + 1)`。

**O(n log n) 优化解法**：维护一个 `tails` 数组，`tails[k]` 存储长度为 `k+1` 的所有递增子序列中**最小的尾元素**。对每个 `num`，用二分查找找到它在 `tails` 中的位置：
- 如果 `num` 比所有元素都大 → 追加到末尾
- 否则 → 替换第一个 >= `num` 的元素

```python
def lengthOfLIS(nums):
    tails = []
    for num in nums:
        left, right = 0, len(tails)
        while left < right:
            mid = (left + right) // 2
            if tails[mid] < num:
                left = mid + 1
            else:
                right = mid
        if left == len(tails):
            tails.append(num)
        else:
            tails[left] = num
    return len(tails)
```

- 时间复杂度：O(n log n)
- 空间复杂度：O(n)
- **易错点**：`tails` 数组的长度就是 LIS 的长度，但 `tails` 本身不是 LIS。二分查找的边界条件最容易写错（是 `< num` 还是 `<=`）

---

### 26. Coin Change（322）

**题目**：给定不同面额的硬币 `coins` 和一个总金额 `amount`，返回凑成该金额所需的最少硬币个数。

**思路**：完全背包问题。`dp[i]` = 凑出金额 i 所需的最少硬币数。对每个金额 i，尝试每种硬币：`dp[i] = min(dp[i], dp[i-coin] + 1)`。

```python
def coinChange(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for coin in coins:
        for i in range(coin, amount + 1):
            dp[i] = min(dp[i], dp[i - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1
```

- 时间复杂度：O(amount × len(coins))
- 空间复杂度：O(amount)
- **易错点**：`dp[0] = 0` 是基准，其余初始化为无穷大。外层循环是 coins 内层是 amount（完全背包），如果是 0/1 背包则反过来

---

### 27. Longest Common Subsequence（1143）

**题目**：给定两个字符串，找到它们的最长公共子序列（LCS）的长度。

**DP 四步法**：
1. `dp[i][j]` = `text1[0:i]` 和 `text2[0:j]` 的 LCS 长度
2. 如果 `text1[i-1] == text2[j-1]`：`dp[i][j] = dp[i-1][j-1] + 1`；否则 `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`
3. `dp[0][*] = 0, dp[*][0] = 0`（空串的 LCS 为 0）
4. 两层循环，从左到右、从上到下

```python
def longestCommonSubsequence(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[m][n]
```

- 时间复杂度：O(m × n)
- 空间复杂度：O(m × n)
- **易错点**：字符串下标从 0 开始，但 dp 数组多开了一位，所以比较的是 `text1[i-1]` 和 `text2[j-1]`

---

### 28. Edit Distance（72）

**题目**：给定两个单词 `word1` 和 `word2`，返回把 `word1` 变成 `word2` 所需的最少操作次数（插入、删除、替换各算 1 次）。

**DP 四步法**：
1. `dp[i][j]` = 把 `word1[0:i]` 变成 `word2[0:j]` 的最少操作次数
2. 如果 `word1[i-1] == word2[j-1]`：`dp[i][j] = dp[i-1][j-1]`（不需要操作）；否则 `dp[i][j] = min(dp[i-1][j]+1, dp[i][j-1]+1, dp[i-1][j-1]+1)`（删除/插入/替换）
3. `dp[i][0] = i`（删除 i 个字符），`dp[0][j] = j`（插入 j 个字符）
4. 两层循环

```python
def minDistance(word1, word2):
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i - 1] == word2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = min(
                    dp[i - 1][j] + 1,      # 删除 word1[i-1]
                    dp[i][j - 1] + 1,      # 插入 word2[j-1]
                    dp[i - 1][j - 1] + 1   # 替换
                )
    return dp[m][n]
```

- 时间复杂度：O(m × n)
- 空间复杂度：O(m × n)
- **易错点**：三种操作的对应关系容易搞混。删除是去掉 `word1` 的最后一个字符（`i-1`），插入是给 `word1` 加一个字符匹配 `word2`（`j-1`）

---

### 29. Longest Palindromic Substring（5）

**题目**：找出给定字符串中最长的回文子串。

**中心扩展法**：从每个字符（奇数长度回文）或每对相邻字符（偶数长度回文）出发，向两边扩展。总共 `2n-1` 个中心。

**手推示例**（`s = "babad"`）：
```
中心 i=0('b'): 扩展 → "b", 长度1
中心 i=1('a'): 扩展 → "aba", 长度3 ✓
中心 i=1-2('a','b'): 扩展 → "", 长度0
中心 i=2('b'): 扩展 → "bab", 长度3 ✓
...
最长: "bab" 或 "aba"，长度3
```

```python
def longestPalindrome(s):
    if not s or len(s) < 2:
        return s
    start, max_len = 0, 1

    def expand(left, right):
        while left >= 0 and right < len(s) and s[left] == s[right]:
            left -= 1
            right += 1
        return left + 1, right - left - 1

    for i in range(len(s)):
        l1, len1 = expand(i, i)       # 奇数
        l2, len2 = expand(i, i + 1)   # 偶数
        if len1 > max_len:
            start, max_len = l1, len1
        if len2 > max_len:
            start, max_len = l2, len2

    return s[start:start + max_len]
```

- 时间复杂度：O(n²)
- 空间复杂度：O(1)
- **易错点**：必须同时检查奇数中心和偶数中心（`expand(i, i)` 和 `expand(i, i+1)`），否则会漏掉偶数长度回文

---

## 第五阶段：回溯与贪心

### 30. Permutations（46）

**题目**：给定一个不含重复数字的数组，返回所有可能的全排列。

**思路**：回溯法。每个元素都有"选"和"不选"两种选择，但这里是全排列，每个元素必须恰好选一次。用 `visited` 数组记录哪些元素已经被用过了。

**回溯模板**（通用）：
```
选择 → 递归 → 撤销选择
```

```python
def permute(nums):
    res = []
    visited = [False] * len(nums)

    def backtrack(path):
        if len(path) == len(nums):
            res.append(path[:])
            return
        for i in range(len(nums)):
            if visited[i]:
                continue
            visited[i] = True
            path.append(nums[i])
            backtrack(path)
            path.pop()
            visited[i] = False

    backtrack([])
    return res
```

- 时间复杂度：O(n × n!) — n! 种排列，每种需要 O(n) 复制
- 空间复杂度：O(n)
- **易错点**：`path[:]` 必须复制，否则加入的是同一个列表的引用。`visited` 数组必须正确回退（撤销选择）

---

### 31. Subsets（78）

**题目**：给定一个不含重复元素的数组，返回所有可能的子集。

**思路**：回溯法。每个元素有"选"和"不选"两种选择。关键参数 `start` 控制下一轮从哪个位置开始选，避免重复。

```python
def subsets(nums):
    res = []

    def backtrack(start, path):
        res.append(path[:])  # 每层的路径都是一个有效子集
        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1, path)  # i+1，后面的元素只能往后选
            path.pop()

    backtrack(0, [])
    return res
```

- 时间复杂度：O(2^n)
- 空间复杂度：O(n)
- **易错点**：`res.append(path[:])` 在递归入口处，因为空集 `[]` 也是一个有效子集。`start` 参数防止重复（`[1,2]` 和 `[2,1]` 是同一个子集）

---

### 32. Combination Sum（39）

**题目**：给定一个无重复元素的正整数数组 `candidates` 和一个目标值 `target`，找出所有使数字和为目标值的组合，同一个数字可以无限次使用。

**与 Subsets 的区别**：Subsets 每个元素只能选一次（`i+1`），Combination Sum 允许重复使用（`i` 不递增），并且只收集和等于 target 的组合。

```python
def combinationSum(candidates, target):
    res = []
    candidates.sort()  # 排序方便剪枝

    def backtrack(start, path, remain):
        if remain == 0:
            res.append(path[:])
            return
        for i in range(start, len(candidates)):
            if candidates[i] > remain:
                break  # 剪枝
            path.append(candidates[i])
            backtrack(i, path, remain - candidates[i])  # i 不+1，可重复选
            path.pop()

    backtrack(0, [], target)
    return res
```

- 时间复杂度：O(2^n)
- 空间复杂度：O(target / min(candidates))
- **易错点**：排序后 `break` 剪枝很关键，因为后面的数更大，不可能凑出 target。`i` 不递增实现重复使用

---

### 33. Number of Islands（200）

**题目**：给定一个由 `'1'`（陆地）和 `'0'`（水）组成的二维网格，计算岛屿的数量。

**思路**：DFS/BFS 遍历网格。遇到 `'1'` 就把它及其相连的所有 `'1'` 标记为 `'0'`（沉岛），计数器 +1。

**沉岛法**：直接修改原网格标记已访问，不需要额外的 `visited` 数组。四个方向遍历：上下左右。

```python
def numIslands(grid):
    if not grid:
        return 0
    m, n = len(grid), len(grid[0])
    count = 0

    def dfs(i, j):
        if i < 0 or i >= m or j < 0 or j >= n or grid[i][j] == '0':
            return
        grid[i][j] = '0'
        dfs(i + 1, j)
        dfs(i - 1, j)
        dfs(i, j + 1)
        dfs(i, j - 1)

    for i in range(m):
        for j in range(n):
            if grid[i][j] == '1':
                count += 1
                dfs(i, j)
    return count
```

- 时间复杂度：O(m × n) — 每个格子最多访问一次
- 空间复杂度：O(m × n) — 递归栈最坏情况（全部是陆地）
- **易错点**：边界条件 `i < 0 or i >= m or j < 0 or j >= n` 必须写在访问 `grid[i][j]` 之前，否则会数组越界

---

### 34. Jump Game（55）

**题目**：给定一个非负整数数组 `nums`，你最初位于数组的第一个下标。每个元素表示你在该位置可以跳跃的最大长度。判断你是否能够到达最后一个下标。

**思路**：贪心。维护 `max_reach`（当前能跳到的最远位置）。遍历数组，如果当前下标超过了 `max_reach`，说明到达不了，返回 False。

**为什么贪心是对的**：我们不需要知道具体怎么跳，只需要知道"最远能到哪"。如果最远能到或超过最后一个位置，就一定可以到达。

**手推示例**：
```
nums = [2,3,1,1,4]

i=0, num=2: max_reach = max(0, 0+2) = 2
i=1, num=3: max_reach = max(2, 1+3) = 4 ≥ 4 → 可达终点 ✓
i=2, num=1: max_reach = max(4, 2+1) = 4
i=3, num=1: max_reach = max(4, 3+1) = 4
i=4: 到达终点
```

```python
def canJump(nums):
    max_reach = 0
    for i, num in enumerate(nums):
        if i > max_reach:
            return False
        max_reach = max(max_reach, i + num)
    return True
```

- 时间复杂度：O(n)
- 空间复杂度：O(1)
- **易错点**：`if i > max_reach` 这个判断必须在更新 `max_reach` 之前，否则会漏掉某些不可达的情况

---

### 35. Non-overlapping Intervals（435）

**题目**：给定一个区间数组，返回需要移除的最少区间数，使剩余区间互不重叠。

**思路**：贪心。按区间终点排序，每次选择终点最早且不与上一个选中的区间重叠的区间。要移除的最少区间数 = 总区间数 - 最多能保留的不重叠区间数。

**为什么按终点排序**：终点越早的区间留给后面的空间越大。先选终点早的，能最大化保留的区间数量。

```python
def eraseOverlapIntervals(intervals):
    if not intervals:
        return 0
    intervals.sort(key=lambda x: x[1])
    count = 1
    end = intervals[0][1]
    for i in range(1, len(intervals)):
        if intervals[i][0] >= end:
            count += 1
            end = intervals[i][1]
    return len(intervals) - count
```

- 时间复杂度：O(n log n)
- 空间复杂度：O(1)
- **易错点**：排序关键字是 `x[1]`（终点），不是 `x[0]`（起点）。`>=` 而不是 `>`，因为终点相同时不视为重叠

---

## 六、总结

34 道题的共同规律：

| 题型 | 核心思路 | 时间复杂度 |
|------|----------|------------|
| 哈希表 | 空间换时间，O(1) 查找 | O(n) |
| 双指针 | 两端向中间收，移动较矮端 | O(n) |
| 滑动窗口 | 维护可变窗口，left 只增不减 | O(n) |
| 快慢指针 | 一快一慢，差值有数学意义 | O(n) |
| 二分查找 | 缩小搜索范围，每次砍一半 | O(log n) |
| DFS/BFS | 递归/队列遍历树和图 | O(n) |
| DP | 定义子问题，找转移方程 | 视问题而定 |
| 贪心 | 局部最优 → 全局最优 | O(n log n) |
| 回溯 | 选择 → 递归 → 撤销 | O(2^n) |

**刷题建议**：
1. 每道题至少独立写两遍，第二遍不看答案
2. 同类型题连续刷 3-5 道，形成条件反射
3. 总结自己的模板：DP 四步法、回溯三步曲、双指针套路
4. 面试时先讲思路再写代码，边写边解释

---

- **LeetCode 热题 100**：https://leetcode.cn/problem-list/top100/
- **代码随想录**：https://programmercarl.com/
- **Labuladong 算法小抄**：https://labuladong.github.io/algo/
