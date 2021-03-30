<template>
  <div class="demo">
    <vir-tree :source="list" />
  </div>
</template>

<script lang="tsx">
  import { defineComponent, onMounted, ref } from 'vue';
  import { VirTree } from 'vue-virtual-tree';
  import { TreeNodeOptions } from 'vue-virtual-tree/VirtualTree/types';
  function recursion(path = '0', level = 3): TreeNodeOptions[] {
    const list = [];
    for (let i = 0; i < 10; i += 1) {
      const nodeKey = `${path}-${i}`;
      const treeNode: TreeNodeOptions  = {
        nodeKey,
        name: nodeKey,
        expanded: true,
        children: [],
        hasChildren: true,
        disabled: i % 2 === 0
      };

      if (level > 0) {
        treeNode.children = recursion(nodeKey, level - 1);
      } else {
        treeNode.hasChildren = false;
      }

      list.push(treeNode);
    }
    return list;
  }

  export default defineComponent({
    name: 'BaseDemo',
    components: { VirTree },
    setup(prop, { emit }) {
      const list = ref<TreeNodeOptions[]>([]);
      onMounted(() => {
        list.value = recursion();
      });
      return {
        list
      }
    }
  });
</script>
