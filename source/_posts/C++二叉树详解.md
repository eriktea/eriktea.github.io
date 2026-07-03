---
title: C++二叉树详解
tag:
  - C++
  - 数据结构
  - 二叉树
categories:
  - C++
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/temp01_89703294_p0.png
top_img: https://eriktea.oss-cn-hongkong.aliyuncs.com/title_logo.jpg

swiper_index: 1 #置顶轮播图顺序，非负整数，数字越大越靠前
sticky: 2 #  文章置顶，ux填的值越大，置顶的优先级也会越大
---

# C++ 二叉树详解

## 一、什么是二叉树

二叉树（Binary Tree）是每个节点**最多有两个子树**的树结构，通常称为左子树和右子树。它是很多高级数据结构（如二叉搜索树、AVL树、红黑树、堆等）的基础，也是算法面试中最高频的考点之一。

### 1.1 常见术语

| 术语 | 说明 |
|------|------|
| 节点的度 | 该节点子树的个数 |
| 叶子节点 | 度为 0 的节点 |
| 根节点 | 没有父节点的节点 |
| 子树 | 任意节点及其所有后代构成子树 |
| 节点的层次 | 从根开始定义，根为第 1 层 |
| 树的高度/深度 | 树中节点的最大层次 |
| 满二叉树 | 所有叶子节点都在同一层，且每个节点都有左右子节点 |
| 完全二叉树 | 除了最后一层，其他层都是满的，最后一层从左到右连续 |
| 平衡二叉树 | 左右子树高度差不超过 1 |

## 二、基本结构定义

### 2.1 递归定义

```cpp
#include <iostream>
#include <queue>
#include <stack>
#include <algorithm>
#include <climits>

using namespace std;

// 二叉树节点定义（裸指针版）
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;

    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode* l, TreeNode* r) : val(x), left(l), right(r) {}
};
```

### 2.2 使用智能指针（C++11+）

```cpp
#include <memory>

struct TreeNodeSmart {
    int val;
    shared_ptr<TreeNodeSmart> left;
    shared_ptr<TreeNodeSmart> right;

    TreeNodeSmart(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNodeSmart(int x, shared_ptr<TreeNodeSmart> l, shared_ptr<TreeNodeSmart> r)
        : val(x), left(l), right(r) {}
};
```

### 2.3 辅助函数：层序建树

LeetCode 上经常给出 `[1,2,3,null,4]` 这种层序输入，可以写一个辅助函数来建树：

```cpp
TreeNode* buildTreeLevelOrder(const vector<int*>& vals) {
    if (vals.empty() || vals[0] == nullptr) return nullptr;

    TreeNode* root = new TreeNode(*vals[0]);
    queue<TreeNode*> q;
    q.push(root);

    int i = 1;
    while (i < vals.size()) {
        TreeNode* cur = q.front(); q.pop();

        // 左子节点
        if (i < vals.size() && vals[i] != nullptr) {
            cur->left = new TreeNode(*vals[i]);
            q.push(cur->left);
        }
        i++;

        // 右子节点
        if (i < vals.size() && vals[i] != nullptr) {
            cur->right = new TreeNode(*vals[i]);
            q.push(cur->right);
        }
        i++;
    }
    return root;
}
```

> **注意**：实际面试中通常不需要手写建树，直接给出 `TreeNode* root` 即可。但在本地测试时，这个函数非常有用。

## 三、四种遍历方式

### 3.1 递归遍历（DFS）

递归遍历是最直观的实现，核心是 **"访问当前节点 → 递归左子树 → 递归右子树"**。

#### 前序遍历（根 → 左 → 右）

```cpp
void preorderRecursive(TreeNode* root) {
    if (!root) return;
    cout << root->val << " ";
    preorderRecursive(root->left);
    preorderRecursive(root->right);
}
```

#### 中序遍历（左 → 根 → 右）

```cpp
void inorderRecursive(TreeNode* root) {
    if (!root) return;
    inorderRecursive(root->left);
    cout << root->val << " ";
    inorderRecursive(root->right);
}
```

#### 后序遍历（左 → 右 → 根）

```cpp
void postorderRecursive(TreeNode* root) {
    if (!root) return;
    postorderRecursive(root->left);
    postorderRecursive(root->right);
    cout << root->val << " ";
}
```

### 3.2 迭代遍历（使用栈）

有些面试题明确要求**不能使用递归**，这时就需要用迭代写法。

#### 前序遍历（迭代）

```cpp
void preorderIterative(TreeNode* root) {
    if (!root) return;
    stack<TreeNode*> st;
    st.push(root);

    while (!st.empty()) {
        TreeNode* node = st.top(); st.pop();
        cout << node->val << " ";

        // 注意：先压右，后压左，这样弹出时才是先左后右
        if (node->right) st.push(node->right);
        if (node->left) st.push(node->left);
    }
}
```

#### 中序遍历（迭代）

```cpp
void inorderIterative(TreeNode* root) {
    stack<TreeNode*> st;
    TreeNode* cur = root;

    while (cur || !st.empty()) {
        // 一路往左走到底，全部压栈
        while (cur) {
            st.push(cur);
            cur = cur->left;
        }
        // 弹出最左节点，访问
        cur = st.top(); st.pop();
        cout << cur->val << " ";
        // 转向右子树
        cur = cur->right;
    }
}
```

#### 后序遍历（迭代）

```cpp
void postorderIterative(TreeNode* root) {
    if (!root) return;
    stack<TreeNode*> st1, st2;
    st1.push(root);

    while (!st1.empty()) {
        TreeNode* node = st1.top(); st1.pop();
        st2.push(node);
        if (node->left) st1.push(node->left);
        if (node->right) st1.push(node->right);
    }

    while (!st2.empty()) {
        cout << st2.top()->val << " ";
        st2.pop();
    }
}
```

> **记忆技巧**：前序是 "根左右"，后续是 "左右根"，逆过来就是前序的变种。可以用双栈法，第一遍按前序遍历压入第二个栈，然后依次弹出就是后序。

### 3.3 层序遍历（BFS）

```cpp
vector<vector<int>> levelorder(TreeNode* root) {
    vector<vector<int>> res;
    if (!root) return res;

    queue<TreeNode*> q;
    q.push(root);

    while (!q.empty()) {
        int sz = q.size();  // 当前层的节点数
        vector<int> level;
        for (int i = 0; i < sz; ++i) {
            TreeNode* node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}
```

> 层序遍历是 **BFS（广度优先搜索）** 的典型应用，每层之间用 `sz = q.size()` 来分隔。几乎所有**层次相关的题目**（如层平均值、层最宽、锯齿形遍历）都是在这个基础上变形。

## 四、常见算法题

### 4.1 求二叉树的最大深度

```cpp
int maxDepth(TreeNode* root) {
    if (!root) return 0;
    return 1 + max(maxDepth(root->left), maxDepth(root->right));
}
```

### 4.2 翻转二叉树

```cpp
TreeNode* invertTree(TreeNode* root) {
    if (!root) return nullptr;
    swap(root->left, root->right);
    invertTree(root->left);
    invertTree(root->right);
    return root;
}
```

### 4.3 验证二叉搜索树（BST）

```cpp
bool isValidBST(TreeNode* root, long long minVal = LLONG_MIN, long long maxVal = LLONG_MAX) {
    if (!root) return true;
    if (root->val <= minVal || root->val >= maxVal) return false;
    return isValidBST(root->left, minVal, root->val)
        && isValidBST(root->right, root->val, maxVal);
}
```

> 为什么用 `long long`？考虑节点值刚好是 `INT_MIN` 或 `INT_MAX` 的边界情况。

### 4.4 路径总和

```cpp
// LeetCode 112: 路径总和
bool hasPathSum(TreeNode* root, int targetSum) {
    if (!root) return false;
    // 叶子节点：检查路径和
    if (!root->left && !root->right)
        return targetSum == root->val;
    return hasPathSum(root->left, targetSum - root->val)
        || hasPathSum(root->right, targetSum - root->val);
}

// LeetCode 113: 路径总和 II（返回所有路径）
vector<vector<int>> pathSum(TreeNode* root, int targetSum) {
    vector<vector<int>> res;
    vector<int> path;
    dfs(root, targetSum, path, res);
    return res;
}

void dfs(TreeNode* root, int remain, vector<int>& path, vector<vector<int>>& res) {
    if (!root) return;
    path.push_back(root->val);
    remain -= root->val;

    if (!root->left && !root->right && remain == 0)
        res.push_back(path);

    dfs(root->left, remain, path, res);
    dfs(root->right, remain, path, res);
    path.pop_back(); // 回溯
}
```

### 4.5 最近公共祖先（LCA）

```cpp
TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (!root || root == p || root == q) return root;

    TreeNode* left = lowestCommonAncestor(root->left, p, q);
    TreeNode* right = lowestCommonAncestor(root->right, p, q);

    if (left && right) return root;  // 左右都有 → 当前节点是 LCA
    return left ? left : right;       // 只在一侧 → 返回非空的那个
}
```

### 4.6 二叉树转有序数组（Morris 中序遍历）

中序遍历二叉搜索树的结果是有序的，Morris 遍历可以做到 **O(1) 空间复杂度**：

```cpp
vector<int> inorderMorris(TreeNode* root) {
    vector<int> res;
    TreeNode* cur = root;

    while (cur) {
        if (!cur->left) {
            res.push_back(cur->val);
            cur = cur->right;
        } else {
            // 找到前驱节点
            TreeNode* pre = cur->left;
            while (pre->right && pre->right != cur)
                pre = pre->right;

            if (!pre->right) {
                pre->right = cur;  // 建立临时链接
                cur = cur->left;
            } else {
                pre->right = nullptr;  // 恢复原树
                res.push_back(cur->val);
                cur = cur->right;
            }
        }
    }
    return res;
}
```

## 五、递归的通用思路

> 二叉树题目的核心在于 **"思考当前节点要做什么，然后交给递归处理子节点"**。

模板如下：

```cpp
// 1. 递归函数的返回值是什么？（void / int / TreeNode* / bool）
// 2. 递归的终止条件是什么？（空节点？叶子节点？）
// 3. 当前层要做什么？（访问？修改？比较？）
// 4. 返回值怎么用？（父节点是否需要用到子节点的结果？）

ReturnType recursion(TreeNode* root) {
    // 终止条件
    if (!root) return base;

    // 递归处理左右子树
    LeftResult left = recursion(root->left);
    RightResult right = recursion(root->right);

    // 当前层逻辑
    // 使用 left 和 right 的结果计算当前层的结果
    return currentResult;
}
```

**关键**：每个递归函数要明确它**返回值代表什么含义**。是返回子树的和？还是返回子树的高度？还是返回一个布尔值？想清楚这一点，代码自然就写出来了。

## 六、面试技巧总结

1. **先问清题目**：节点值范围？树的高度最大是多少？是否需要考虑空树？
2. **从暴力递归开始**：先把最直观的递归解法写出来，再优化
3. **注意递归终止条件**：空指针是最大的坑，每个递归函数第一件事就是判断 `if (!root)`
4. **复杂度分析**：时间复杂度通常是 O(n)（每个节点访问一次），空间复杂度递归栈平均 O(logn)，最坏 O(n)（退化为链表）
5. **举个小例子走一遍**：面试时在白板上画个简单的树，模拟一遍递归过程，既验证了代码，也展示了解题思路

## 七、总结

二叉树看似简单，但能演变出极多的题目。核心思想是**递归**，配合**栈（迭代 DFS）** 和 **队列（BFS）** 两种数据结构。

- **递归**：最简洁，最常用
- **栈 + 迭代**：面试要求非递归时使用
- **队列 + BFS**：解决层次/距离相关问题
- **Morris 遍历**：追求 O(1) 空间时使用

掌握这些，再通过 LeetCode 的热门二叉树题目（100、101、102、104、105、112、113、236、297 等）反复练习，就能从容应对面试。
