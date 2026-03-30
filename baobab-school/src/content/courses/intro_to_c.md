---
title: "The Architecture of C: Memory & Logic"
slug: "intro-to-c"
video_id: "dQw4w9WgXcQ" # YouTube Video ID
resources:
  - title: "The C Programming Language (K&R)"
    link: "https://example.com/kr-book"
  - title: "Understanding Pointers in C"
    link: "https://example.com/pointers-article"
objectives:
  - Master Stack vs Heap allocation
  - Implement a Linked List from scratch
  - Understand the role of the Linter in code quality
quiz:
  - question: "Which function is used to deallocate memory in C?"
    options: ["alloc()", "free()", "delete()", "remove()"]
    answer: "free()"
  - question: "A pointer stores the _______ of a variable."
    options: ["Value", "Size", "Memory Address", "Type"]
    answer: "Memory Address"
---

# Overview
In this course, we strip away the abstractions of high-level languages. 
As a Baobab student, you aren't just a coder; you are a systems architect.

## Practice Exercise
Download the `linked_list.c` template and implement the `reverse_list` function.
Ensure you handle the 'head' pointer correctly to avoid memory leaks.