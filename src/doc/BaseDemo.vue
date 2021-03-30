<template>
  <div class="demo">
    <vir-tree :source="list" ref="virTree" />
  </div>
</template>

<script lang="tsx">
  import {defineComponent, onMounted, ref} from 'vue';
  import {TreeInstance, TreeNodeOptions} from "@/components/VirtualTree/types";
  import {recursion} from "@/doc/uses";

  export default defineComponent({
    name: 'BaseDemo',
    setup(prop, {emit}) {
      const list = ref<TreeNodeOptions[]>([]);
      const virTree = ref<TreeInstance | null>(null);
      onMounted(() => {
        list.value = recursion();
      });
      return {
        list
      }
    }
  });
</script>
