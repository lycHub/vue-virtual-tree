<template>
  <div class="demo">
    <vir-tree :source="list" show-checkbox :loadData="loadData">
      <template #icon="loading">
        <i v-if="loading" class="iconfont iconcustom-icon ico-loading"></i>
        <i v-else class="iconfont iconzhankai"></i>
      </template>
    </vir-tree>
  </div>
</template>

<script lang="tsx">
import {defineComponent, onMounted, ref} from 'vue';
import {TreeNodeOptions} from "../components";

function recursion(path = '0'): TreeNodeOptions[] {
  const list = [];
  for (let i = 0; i < 2; i += 1) {
    const nodeKey = `${path}-${i}`;
    const treeNode: TreeNodeOptions  = {
      nodeKey,
      name: nodeKey,
      children: [],
      hasChildren: true
    };
    list.push(treeNode);
  }
  return list;
}

export default defineComponent({
  name: 'CustomIcon',
  setup(prop, {emit}) {
    const list = ref<TreeNodeOptions[]>([]);
    onMounted(() => {
      list.value = recursion();
    });
    const loadData = (node: TreeNodeOptions, callback: (children: TreeNodeOptions[]) => void) => {
      console.log('loadData', node);
      const result: TreeNodeOptions[] = [];
      for (let i = 0; i < 2; i += 1) {
        const nodeKey = `${node.nodeKey}-${i}`;
        const treeNode: TreeNodeOptions  = {
          nodeKey,
          name: nodeKey,
          children: [],
          hasChildren: true
        };
        result.push(treeNode);
      }
      setTimeout(() => {
        callback(result);
      }, 500);
    }
    return {
      list,
      loadData
    }
  }
});
</script>
