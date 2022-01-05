<template>
  <div class="demo">
    <vir-tree :source="list" show-checkbox :render="renderNode" />
  </div>
</template>

<script lang="tsx">
  import {defineComponent, onMounted, ref} from 'vue';
  import {TreeNodeOptions} from "../components";

  function recursion(path = '0', level = 3): TreeNodeOptions[] {
    const list = [];
    for (let i = 0; i < 10; i++) {
      const nodeKey = `${path}-${i}`;
      const treeNode: TreeNodeOptions = {
        nodeKey,
        name: nodeKey,
        children: [],
        hasChildren: true
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
    name: 'CustomNodeDemo',
    setup(prop, {emit}) {
      const list = ref<TreeNodeOptions[]>([]);
      onMounted(() => {
        list.value = recursion();
      });
      const renderNode = (node: TreeNodeOptions) => {
        return <div style="padding: 0 4px;"><b style="color: #f60;">{ node.name }</b></div>
      }
      return {
        list,
        renderNode
      }
    }
  });
</script>
