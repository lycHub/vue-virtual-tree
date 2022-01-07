<template>
  <div class="demo">
    <a-button @click="selectedNode">获取选中节点</a-button>
    <vir-tree
      ref="virTree"
      :source="list"
      :default-disabled-keys="defaultDisabledKeys"
      :default-selected-key="defaultSelectedKey"
      :default-expanded-keys="defaultExpandedKeys"
    />
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
    name: 'BaseDemo',
    setup() {
      const list = ref<TreeNodeOptions[]>([]);
      const virTree = ref<TreeInstance | null>(null);
      const defaultExpandedKeys = ['0-0', '0-1', '0-1-0'];
      const defaultSelectedKey = '0-0-1-0';
      const defaultDisabledKeys = ['0-0-1'];
      onMounted(() => {
        list.value = recursion();
      });
      const selectedNode = () => {
        getSelectedNode(virTree.value!);
      }
      return {
        list,
        virTree,
        selectedNode,
        defaultExpandedKeys,
        defaultSelectedKey,
        defaultDisabledKeys
      }
    }
  });
</script>
