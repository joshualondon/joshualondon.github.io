---
layout: post
title: Adding classes to HTML elements using Markdown
category: markup
intro: Sure, kramdown will render HTML -- but where's the fun in that?
tags: [markdown, jekyll]
---

```markdown
[This is link text](https://google.com/){: .button .primary}
```

1.  First are the brackets which render to the `alt` information
1.  Second are the parens that contain the url of the link
1.  Third are the curly braces -- this is where you want to add your classes

## Result {: .result}
The 3 sections result in the following:

[This is link text](https://google.com/){: .button .primary}
