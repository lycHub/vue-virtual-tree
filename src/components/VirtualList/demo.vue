<template>
  <div class="demo-box">
    <button @click="add">add items</button> |
    <button @click="cut">cut items</button> |
    <button @click="reset">reset items</button> |
    <button @click="clear">clear items</button>
    <div class="form-item">
      <virtual-list v-slot="{ item }" :size="42" :remain="8" :list="list">
        <div class="item">{{ item }}</div>
      </virtual-list>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import VirtualList from './VirtualList';

export default defineComponent({
  name: 'FieldDemo',
  components: { VirtualList },
  setup(props, context) {
    const list = ref<string[]>([]);
    const addList = (count: number) => {
      for (let a = 0; a < count; a++) {
        list.value.push('item-' + a);
      }
    }
    onMounted(() => {
      addList(300);
    });
    const add =() => {
      addList(200);
    }
    const cut =() => {
      list.value.splice(3, 150);
    }
    const reset =() => {
      list.value = [];
      addList(100);
    }
    const clear =() => {
      list.value = [];
    }
    return {
      list,
      add,
      cut,
      reset,
      clear
    }
  }
});
</script>
<style scoped lang="scss">
  .item {
    padding: 10px 0;
    background-color: #91d5ff;
    color: #ed4014;
    border-bottom: 1px solid #dcdee2;
    &:last-child {
      border-bottom: none;
    }
  }
</style>
