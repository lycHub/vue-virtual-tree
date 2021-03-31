<template>
  <div class="demo">
    <section>
      <h5>默认父子节点联动</h5>
      <a-button @click="halfNodes">获取半选节点</a-button>
      <vir-tree ref="virTreeOne" show-checkbox :source="list" />
    </section>
    <section>
      <h5>父子节点不联动</h5>
      <a-button @click="checkedNodes">获取勾选节点</a-button>
      <vir-tree ref="virTreeTwo" show-checkbox check-strictly :source="list" />
    </section>
  </div>
</template>

<script lang="tsx">
  import {defineComponent, onMounted, ref} from 'vue';
  import {TreeInstance, TreeNodeOptions} from "@/components/VirtualTree/types";
  import {getCheckNodes, getHalfCheckNodes} from "./uses";

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
    name: 'CheckboxDemo',
    setup(prop, {emit}) {
      const list = ref<TreeNodeOptions[]>([]);
      const virTreeOne = ref<TreeInstance | null>(null);
      const virTreeTwo = ref<TreeInstance | null>(null);
      onMounted(() => {
        list.value = recursion();
      });
      const halfNodes = () => {
        getHalfCheckNodes(virTreeOne.value!);
      }
      const checkedNodes = () => {
        getCheckNodes(virTreeTwo.value!);
      }
      return {
        list,
        virTreeOne,
        virTreeTwo,
        halfNodes,
        checkedNodes
      }
    }
  });
</script>
<style scoped lang="scss">
  .demo {
    display: flex;
    justify-content: space-between;
    section {
      width: 45%;
    }
  }
</style>
