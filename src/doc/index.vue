<template>
  <div class="doc-container">
    <h3>代码演示</h3>
    <a-row :gutter="16" class="demo-boxes">
      <a-col :span="12" id="base-demo">
        <demo-box
          title="基本用法"
          desc="展开、选中、禁用的基本功能aa"
          code-type="base">
          <base-demo />
        </demo-box>
      </a-col>
      <a-col :span="12" id="checkbox-demo">
        <demo-box
          title="可勾选"
          desc="showCheckbox属性开启勾选，默认父子节点联动，设置checkStrictly属性，可让父子节点不做联动"
          code-type="checkbox">
          <checkbox-demo />
        </demo-box>
      </a-col>
      <a-col :span="12" id="async-dada-demo">
        <demo-box
          title="异步加载数据"
          desc="点击展开节点，动态加载数据。"
          code-type="asyncData">
          <async-data-demo />
        </demo-box>
      </a-col>
      <a-col :span="12" id="custom-node-demo">
        <demo-box
          title="自定义渲染节点"
          desc="绑定render函数自定义节点，参数data为当前node数据。注意：如果改变了默认的高度(size), 需要传入size属性"
          code-type="customNode">
          <custom-node-demo />
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
  import AsyncDataDemo from './AsyncDataDemo.vue';
  import CustomNodeDemo from './CustomNodeDemo.vue';
  export default defineComponent({
    name: 'DocContainer',
    components: { DemoBox, BaseDemo, CheckboxDemo, AsyncDataDemo, CustomNodeDemo },
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
