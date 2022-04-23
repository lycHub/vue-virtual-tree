# vue-virtual-tree

> **该库已经废弃，请使用重构后的[virtual-tree](https://github.com/lycHub/ysx-library/blob/master/projects/VirtualTree/README.md)**


### 基于vue3封装的，大数据量专用的tree组件，如果数据量不大，用本组件有些浪费了

[English](README.md) & 简体中文

## [文档 & 示例](https://lychub.github.io/vue-virtual-tree)
### [在线demo](https://stackblitz.com/edit/vue-virtual-tree-demos?file=src/App.vue)
### [在线demo v4](https://stackblitz.com/edit/vue-virtual-tree-demos-bvicgw?file=src/App.vue)

## 基本使用

```
npm i vue-virtual-tree
```

全局注册, 但这会丢失类型，如果你用了typescript, 不推荐这种方式
``` js
import { createApp } from 'vue';
import VirTree from 'vue-virtual-tree';

createApp(App).use(VirTree).mount('#app');

In components:
<vir-tree />
```


局部注册, 可以获得完整的类型
``` js
<template>
  <div class="demo">
    <vir-tree" :source="list" />
  </div>
</template>

<script lang="tsx">
  import {defineComponent, onMounted, ref} from 'vue';
  import { VirTree, TreeNodeOptions } from 'vue-virtual-tree';

  export default defineComponent({
    name: 'BaseDemo',
    components: { VirTree },
    setup(props, {emit}) {
      const list = ref<TreeNodeOptions[]>([]);
      return {
        list
      }
    }
  });
</script>

```
