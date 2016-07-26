---
layout: post
title: Next and previous posts in Jekyll
category: webdev
intro:
tags:
---

You should always consider offering additional content to your users. You just might keep that user on your site!

There's a fairly simple way to do this with [Jekyll Variables](http://jekyllrb.com/docs/variables/).

## The markup

```html
<div class="prev-next-container">
  <ul>
    <li>
      {{ "{% if page.previous " }}%}
        <a href="{{ page.previous.url }}">
          <div class="eyebrow">Previous</div>
          <h2>{{ page.previous.title }}</h2>
          <p>{{ page.previous.intro | truncate: 90 }}</p>
          <div class="ion ion-ios-arrow-thin-left"></div>
        </a>
      {{ "{% endif "  }}%}
    </li>
    <li>
      {% if page.next %}
        <a href="{{ page.next.url }}">
          <div class="eyebrow">Up next</div>
          <h2>{{ page.next.title }}</h2>
          <p>{{ page.next.intro | truncate: 90 }}</p>
          <div class="ion ion-ios-arrow-thin-right"></div>
        </a>
      {% endif %}
    </li>
  </ul>
</div>
```
