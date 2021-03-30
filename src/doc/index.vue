<template>
  <div class="doc-container">
    <h3>代码演示</h3>
    <a-row :gutter="16" class="demo-boxes">
      <a-col :span="12">
        <demo-box>
          <base-demo />
        </demo-box>
      </a-col>
      <a-col :span="12">
        <demo-box>
          show 2
        </demo-box>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="tsx">
  import {defineComponent} from 'vue';
  import DemoBox from './DemoBox.vue';
  import BaseDemo from './BaseDemo.vue';
  export default defineComponent({
    name: 'DocContainer',
    components: { DemoBox, BaseDemo },
    props: {},
    emits: [],
    setup(prop, {emit}) {
      return {}
    }
  });
</script>

<style scoped lang="scss">
  .doc-container {
    width: 1300px;
    margin: 0 auto;
    padding: 30px 20px;
    border: 1px solid $border-color;
    h3 {
      font-size: $font-size-huge;
    }
    .demo-boxes {

    }
  }
</style>
