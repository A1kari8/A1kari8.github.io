---
title: "数据结构与算法"
published: 2025-9-17 10:33:00
tags: [C++,C,大学计算机]
category: 大学计算机
draft: true
---

## 单向链表

```cpp
class Node {
public:
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class LinkedList {
private:
    Node* head;
public:
    LinkedList() : head(nullptr) {}
    ~LinkedList() {
        Node* current = head;
        while (current) {
            Node* nextNode = current->next;
            delete current;
            current = nextNode;
        }
    }
    void append(int val) {
        Node* newNode = new Node(val);
        if (!head) {
            head = newNode;
        }
        Node* current = head;
        while (current->next) {
            current = current->next;
        }
        current->next = newNode;
    }
}
```
### 单向链表的插入

```cpp
class LinkedList {
    // ... 
public:
    // ... 
    bool insertBefore(int target, int val) {
        Node* newNode = new Node(val);
        if (!head) {
            head = newNode;
            return true;
        }
        if (head->data == target) {
            newNode->next = head;
            head = newNode;
            return true;
        }
        Node* current = head;
        while (current->next && current->next->data != target) {
            current = current->next;
        }
        if (current->next) {
            newNode->next = current->next;
            current->next = newNode;
            return true;
        }
        delete newNode; // Target not found, clean up
        return false;
    }
}
```

## 双向链表

```cpp
class DNode {
public:
    int data;
    std::shared_ptr<DNode> next;
    std::weak_ptr<DNode> prev;
    DNode(int val) : data(val) {}
};
class DoublyLinkedList {
private:
    std::shared_ptr<DNode> head;
    std::shared_ptr<DNode> tail;
public:
    void append(int value) {
        auto newNode = std::make_shared<Node>(value);
        if (!head) {
            head = tail = newNode;
        } else {
            tail->next = newNode;
            newNode->prev = tail;
            tail = newNode;
        }
    }
}
```

## 环形链表

```cpp
class CircularLinkedList {
private:
    std::shared_ptr<DNode> head;
public:
    void append(int value) {
        auto newNode = std::make_shared<DNode>(value);
        if (!head) {
            head = newNode;
            newNode->next = head;
            newNode->prev = head;
        } else {
            auto tail = head->prev.lock();
            tail->next = newNode;
            newNode->prev = tail;
            newNode->next = head;
            head->prev = newNode;
        }   
    }
}
```

### 环形链表典型问题： 约瑟夫环

```cpp
#include <iostream>