<template>
  <div class="demo">
    <a-button @click="checkedNodes">获取勾选节点</a-button>
    <vir-tree ref="virTree" :source="list" show-checkbox :loadData="loadData" />
  </div>
</template>

<script lang="tsx">
  import {defineComponent, onMounted, ref} from 'vue';
  import {TreeInstance, TreeNodeOptions} from "../components/VirtualTree/types";
  import {getCheckNodes} from "@/doc/uses";

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
    name: 'AsyncDataDemo',
    setup(prop, {emit}) {
      const list = ref<TreeNodeOptions[]>([]);
      const virTree = ref<TreeInstance | null>(null);
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
      const checkedNodes = () => {
        getCheckNodes(virTree.value!);
      }
      return {
        list,
        virTree,
        loadData,
        checkedNodes
      }
    }
  });
</script>
