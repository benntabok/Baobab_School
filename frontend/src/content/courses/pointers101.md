---
title: "The Ghost in the Machine: Pointer Arithmetic"
slug: "systems-c-pointers"
video_id: "2ybLD6_2gKM"
language: "c"
objectives:
  - "Understand memory addresses vs values"
  - "Master the dereference operator (*)"
  - "Navigate arrays using pointer offsets"
resources:
  - title: "Official C Reference"
    link: "https://en.cppreference.com/w/c"
  - title: "Ngong Hub Systems Diagram"
    link: "#"
initial_code: |-
  #include <stdio.h>

  int main() {
      int secret_key = 777;
      int *ptr = &secret_key;

      printf("Address: %p\n", (void*)ptr);
      // TASK: Change the value of secret_key to 999 using only 'ptr'
      
      printf("New Value: %d\n", secret_key);
      return 0;
  }
---

## The Concept of Addressability

In the **Silicon Savannah**, we don't just write code; we manage resources. Every variable you create lives at a specific physical coordinate in your RAM. 

### Why Pointers Matter
When you pass a large struct to a function, copying the whole thing is slow. Passing a **pointer** (the address) is fast. It's the difference between sending someone a whole building versus just sending them the **GPS coordinates**.

> **Pro-Tip:** In C, the `&` operator finds the address, and the `*` operator "goes to" that address.

### Exercise Instructions
Look at the editor on the right. You have a variable called `secret_key`. 
1. Use the dereference operator `*ptr` to reassign the value.
2. Click the **Launch Full Lab** button once you've tested your logic mentally to see it execute on the Judge0 engine.