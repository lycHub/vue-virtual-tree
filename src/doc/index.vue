<template>
  <div class="doc-container">
    <h3>代码演示</h3>
    <a-row :gutter="16" class="demo-boxes">
      <a-col :span="12">
        <demo-box
          title="基本用法"
          desc="展开、选中、禁用的基本功能aa"
          code-type="base">
          <base-demo />
        </demo-box>
      </a-col>
      <a-col :span="12">
        <demo-box
          title="可勾选"
          desc="showCheckbox属性开启勾选，默认父子节点联动，设置checkStrictly属性，可让父子节点不做联动"
          code-type="checkbox">
          <checkbox-demo />
        </demo-box>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="tsx">
  import {defineComponent} from 'vue';
  import DemoBox from './DemoBox.vue';
  import BaseDemo from './BaseDemo.vue';
  import CheckboxDemo from './CheckboxDemo.vue';
  export default defineComponent({
    name: 'DocContainer',
    components: { DemoBox, BaseDemo, CheckboxDemo },
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
