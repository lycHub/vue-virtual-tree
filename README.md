# vue-virtual-tree

> **This library is deprecated, please use the refactored [virtual-tree](https://github.com/lycHub/ysx-library/blob/master/projects/VirtualTree/README.md)**

### Based on the tree component encapsulated by vue3 and dedicated to large data volume, if the data volume is not large, using this component is a bit wasteful

English & [简体中文](README-CN.md)

## [Docs & Demo](https://lychub.github.io/vue-virtual-tree)
### [online demo](https://stackblitz.com/edit/vue-virtual-tree-demos?file=src/App.vue)
### [online demo v4](https://stackblitz.com/edit/vue-virtual-tree-demos-bvicgw?file=src/App.vue)


## How to use

```
npm i vue-virtual-tree
```

Global registration, but this will lose the type, if you use typescript, this method is not recommended
``` js
import { createApp } from 'vue';
import VirTree from 'vue-virtual-tree';

createApp(App).use(VirTree).mount('#app');

In components:
<vir-tree />
```


Partial registration, you can get a complete type
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
