<template>
  <div class="demo-box">
    <button @click="getCheckNodes">get Checked nodes</button>
    <div class="form-item" style="width: 206px;">
      <vir-tree :source="nodes" :render="renderContent" ref="treeInstance" />
    </div>
  </div>
</template>

<script lang="tsx">
import { defineComponent, ref, onMounted } from 'vue';
import {TreeInstance, TreeNodeOptions} from "./types";
import VirTree from './index';

const treeData: TreeNodeOptions[] = [
  {
    name: '0-0',
    nodeKey: '0-0',
    expanded: true,
    hasChildren: true,
    children: [
      {
        name: '0-0-0',
        nodeKey: '0-0-0',
        hasChildren: true,
        children: [
          { name: '0-0-0-0', nodeKey: '0-0-0-0' },
          { name: '0-0-0-1', nodeKey: '0-0-0-1' },
          { name: '0-0-0-2', nodeKey: '0-0-0-2' }
        ]
      },
      {
        name: '0-0-1',
        nodeKey: '0-0-1',
        hasChildren: true,
        children: [
          { name: '0-0-1-0', nodeKey: '0-0-1-0' },
          { name: '0-0-1-1', nodeKey: '0-0-1-1' },
          { name: '0-0-1-2', nodeKey: '0-0-1-2' }
        ]
      },
      {
        name: '0-0-2',
        nodeKey: '0-0-2'
      }
    ]
  },
  {
    name: '0-1',
    nodeKey: '0-1',
    hasChildren: true,
    children: [
      { name: '0-1-0-0', nodeKey: '0-1-0-0', isLeaf: true },
      { name: '0-1-0-1', nodeKey: '0-1-0-1', isLeaf: true },
      { name: '0-1-0-2', nodeKey: '0-1-0-2', isLeaf: true }
    ]
  },
  {
    name: '0-2',
    nodeKey: '0-2',
    isLeaf: true
  }
];

export default defineComponent({
  name: 'TreeDemo',
  components: { VirTree },
  setup(props, context) {
    const value = ref('');
    const nodes = ref<TreeNodeOptions[]>(treeData);
    const treeInstance = ref<TreeInstance | null>(null);
    onMounted(() => {
      const dig = (path = '0', level = 3): TreeNodeOptions[] => {
        const list = [];
        for (let i = 0; i < 10; i += 1) {
          const nodeKey = `${path}-${i}`;
          const treeNode: TreeNodeOptions  = {
            nodeKey,
            name: nodeKey,
            expanded: true,
            children: [],
            hasChildren: true
          };

          if (level > 0) {
            treeNode.children = dig(nodeKey, level - 1);
          } else {
            treeNode.hasChildren = false;
          }

          list.push(treeNode);
        }
        return list;
      };
      // nodes.value = dig();
    });
    const getCheckNodes = () => {
      const checks = treeInstance.value!.getCheckedNodes();
      console.log('checks', checks[0].name);
    }
    const renderContent = (node: TreeNodeOptions) => {
      return (<b>{ node.name }</b>);
    }
    return {
      value,
      nodes,
      treeInstance,
      getCheckNodes,
      renderContent
    }
  }
});
</script>
