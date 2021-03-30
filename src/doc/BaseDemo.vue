<template>
  <div class="demo">
    <vir-tree :source="list" />
  </div>
</template>

<script lang="tsx">
  import {defineComponent, onMounted, ref} from 'vue';
  import {TreeNodeOptions} from "@/components/VirtualTree/types";
  import {recursion} from "./uses/tree";

  export default defineComponent({
    name: 'BaseDemo',
    setup(prop, {emit}) {
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
