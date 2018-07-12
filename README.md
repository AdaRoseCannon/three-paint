# Using THREE.js in a Houdini Paint

This is weird and terrible.

We use a THREE.js Canvas Renderer in a paint worklet!!

The worklet code is in [main.js](https://github.com/AdaRoseCannon/three-paint/blob/master/src/main.js)

Use `npm run start` to build it.

Use it in HTML like so:


```html

<style>
  .some-el {
    --rotate-x: 0;
    --rotate-y: 0;
    --rotate-z: 0;
  
    background-color: lavenderblush;
    background-image: paint(three);
  }
</style>

<script>
  CSS.paintWorklet.addModule('./dist/bundle.js');
<script>
```

![Preview](https://pbs.twimg.com/media/Dh1Zk_qX0AAf10P.jpg)
