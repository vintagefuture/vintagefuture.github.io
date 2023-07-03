---
layout: post
title: Migrating Gerrit plugins to new  UI - Part 1
date: 2023-06-13 10:21
category: devops tales
tags: [blog, javascript, gerrit, devops, git]
summary:
---

I have recently been tasked with migrating a bunch of custom plugins we use internally for Gerrit. We're still using an old version (2.15) and what keeps us from upgrading to the latest version is the new UI that was introduced in Gerrit 3.0.

Now the time has come to tackle this problem. As this will be an interesting adventure for me — I don't have much knowledge of Javascript or Java, or Gerrit for that matter — I decided to document it here. It will be useful for myself, and maybe for somebody else.

# Starting point

Fortunately, the plugins I inherited constist of a single javascript file with a bunch of functions. No Java involved this time!

The file starts like this:

```javascript
Gerrit.install(function () {
    function myfunction1(c) {
        // CODE
    }
    function myfunction2(c) {
        // CODE
    }
```

Checking the official documentation:

<https://gerrit.int.com/Documentation/pg-plugin-dev.html>

the only thing that's different so far is that in the official docs the starting point is slightly different:

```javascript
Gerrit.install(plugin => {
  // Your code here.
});
```

After `Gerrit.install` I have `function () {}`, instead of `plugin => {}`. I'm sure those are alternative ways to do the same — after all the docs say *"Plugins should protect the global namespace by defining their code within an anonymous function passed to Gerrit.install()"* so I assume that `plugin` and `function` are just two arbitrary names to indicate the anonymous function. But what about `=>`? I'll need to investigate that.

The second thing that puzzles me a bit is that variable `c`? Where does it come from? What does it represent? Is it arbitrary as well? Is it a Gerrit thing? This also will need a fair bit of investigation.