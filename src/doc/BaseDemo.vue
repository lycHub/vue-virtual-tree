<template>
  <div class="demo">
    <a-button @click="selectedNode">获取选中节点</a-button>
    <vir-tree ref="virTree" :source="list" />
  </div>
</template>

<script lang="tsx">
  import {defineComponent, onMounted, ref} from 'vue';
  import {TreeInstance, TreeNodeOptions} from "../components";
  import {getSelectedNode} from "./uses";

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
        // selected: nodeKey === '0-0-0-0-1',
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
    setup() {
      const list = ref<TreeNodeOptions[]>([]);
      const virTree = ref<TreeInstance | null>(null);
      onMounted(() => {
        list.value = recursion();
      });
      const selectedNode = () => {
        getSelectedNode(virTree.value!);
      }
      return {
        list,
        virTree,
        selectedNode
      }
    }
  });
</script>
