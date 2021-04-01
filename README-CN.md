# vue-virtual-tree
### 基于vue3封装的，大数据量专用的tree组件，如果数据量不大，用本组件有些让费了

[English](README.md) & 简体中文

## [文档 & 示例](https://lychub.github.io/vue-virtual-tree)


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
    <a-button @click="selectedNode">获取选中节点</a-button>
    <vir-tree ref="virTree" :source="list" />
  </div>
</template>

<script lang="tsx">
  import {defineComponent, onMounted, ref} from 'vue';
  import { VirTree } from 'vue-virtual-tree';
  import {TreeInstance, TreeNodeOptions} from "vue-virtual-tree";

  export default defineComponent({
    name: 'BaseDemo',
    components: { VirTree },
    setup(props, {emit}) {
      return {
        list
      }
    }
  });
</script>

```
