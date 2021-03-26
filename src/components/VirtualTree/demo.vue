<template>
  <div class="demo-box">
    <div class="form-item" style="width: 206px;">
      <vir-tree />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import {TreeNodeOptions} from "./types";
import VirTree from './VirTree';

export default defineComponent({
  name: 'TreeDemo',
  components: { VirTree },
  setup(props, context) {
    const value = ref('');
    const nodes = ref<TreeNodeOptions[]>([]);
    onMounted(() => {
      const dig = (path = '0', level = 3): TreeNodeOptions[] => {
        const list = [];
        for (let i = 0; i < 10; i += 1) {
          const key = `${path}-${i}`;
          const treeNode: TreeNodeOptions  = {
            name: key,
            expanded: true,
            children: [],
            hasChildren: true
          };

          if (level > 0) {
            treeNode.children = dig(key, level - 1);
          } else {
            treeNode.hasChildren = false;
          }

          list.push(treeNode);
        }
        return list;
      };

      nodes.value = dig();
      console.log('nodes', nodes.value);
    });
    return {
      value,
    }
  }
});
</script>
