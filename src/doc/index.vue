<template>
  <div class="doc-container">
    <section class="sec" id="usage">
      <a-typography-title :level="3">使用说明</a-typography-title>
      <a-card>
        <div class="install">
          <a-typography-title :level="4">安装</a-typography-title>
          <a-typography-paragraph>
            <pre>npm i vue-virtual-tree</pre>
          </a-typography-paragraph>
        </div>
        <div class="notice">
          <a-typography-title :level="4">必须要传size属性</a-typography-title>
          <a-typography-paragraph>
            由于虚拟组件要监听滚动事件，动态替换node节点，所以需要知道每个节点的高度，
            默认size=27，如果您要自定义渲染node或图标，那么务必将真实的size传进来，
            另外还有remain属性，控制高度，超出隐藏，默认remain = 8
            所以默认的tree.maxHeight = 27 * 8
          </a-typography-paragraph>
          <img src="./principle.png" alt="原理" />
        </div>
        <div class="custom-view">
          <a-typography-title :level="4">关于自定义样式</a-typography-title>
          <a-typography-paragraph>
            组件已经提供自定义node节点和图标的功能(见下面示例)，
            如果还有些样式需要更细致的修改，请自行用css覆盖
          </a-typography-paragraph>
        </div>
        <div class="custom-view">
          <a-typography-title :level="4">关于刷新整个tree</a-typography-title>
          <a-typography-paragraph>
            处于性能考虑，tree内部监听 source时，并没有开启 <b>deep</b>
            当你只改变source中的某个属性而view并未更新时，<b>可能需要改变source的引用，比如 list.value = list.value.slice()</b>
          </a-typography-paragraph>
        </div>
      </a-card>
    </section>
    <section class="sec mid">
      <a-typography-title :level="3">代码演示</a-typography-title>
      <a-row :gutter="16" class="demo-boxes">
        <a-col :span="12">
          <demo-box
            id="base-demo"
            title="基本用法"
            desc="展开、选中、禁用的基本功能aa"
            code-type="base">
            <base-demo />
          </demo-box>
          <demo-box
            id="async-dada-demo"
            title="异步加载数据"
            desc="点击展开节点，动态加载数据。"
            code-type="asyncData">
            <async-data-demo />
          </demo-box>
          <demo-box
            id="custom-icon-demo"
            title="自定义图标"
            desc="自定义展开、收起图标"
            code-type="customIcon">
            <custom-icon-demo />
          </demo-box>
        </a-col>
        <a-col :span="12">
          <demo-box
            id="checkbox-demo"
            title="可勾选"
            desc="showCheckbox属性开启勾选，默认父子节点联动，设置checkStrictly属性，可让父子节点不做联动"
            code-type="checkbox">
            <checkbox-demo />
          </demo-box>
          <demo-box
            id="custom-node-demo"
            title="自定义渲染节点"
            desc="绑定render函数自定义节点，参数data为当前node数据。注意：如果改变了默认的高度(size), 需要传入size属性"
            code-type="customNode">
            <custom-node-demo />
          </demo-box>
          <demo-box
            id="search-node-demo"
            title="搜索树"
            desc="虽然组件内部没有直接提供，但可以配合render自行实现"
            code-type="searchNode">
            <search-node-demo />
          </demo-box>
        </a-col>
      </a-row>
    </section>
    <section class="sec" id="api">
      <a-typography-title :level="3">API</a-typography-title>
      <a-typography-title :level="4">Props</a-typography-title>
      <a-table :columns="columns" :data-source="propData" rowKey="argument" :pagination="false" />
      <br />
      <a-typography-title :level="4">事件</a-typography-title>
      <a-table :columns="methodColumns" :data-source="eventData" rowKey="argument" :pagination="false" />
      <br />
      <a-typography-title :level="4">方法</a-typography-title>
      <a-table :columns="methodColumns" :data-source="methodData" rowKey="argument" :pagination="false" />
      <br />
      <a-typography-title :level="4">TreeNodeOptions</a-typography-title>
      <a-table :columns="columns" :data-source="nodeOptionData" rowKey="argument" :pagination="false" />
    </section>
  </div>
</template>

<script lang="tsx">
  import {defineComponent} from 'vue';
  import DemoBox from './DemoBox.vue';
  import BaseDemo from './BaseDemo.vue';
  import CheckboxDemo from './CheckboxDemo.vue';
  import AsyncDataDemo from './AsyncDataDemo.vue';
  import CustomNodeDemo from './CustomNodeDemo.vue';
  import CustomIconDemo from './CustomIconDemo.vue';
  import SearchNodeDemo from './SearchNodeDemo.vue';
  import { columns, eventData, methodColumns, methodData, nodeOptionData, propData } from './tableData';

  export default defineComponent({
    name: 'DocContainer',
    components: { DemoBox, BaseDemo, CheckboxDemo, AsyncDataDemo, CustomNodeDemo, CustomIconDemo, SearchNodeDemo },
    setup(prop, {emit}) {
      return {
        propData,
        eventData,
        methodData,
        nodeOptionData,
        columns,
        methodColumns
      }
    }
  });
</script>

<style scoped lang="scss">
  .doc-container {
    width: 1300px;
    margin: 0 auto;
    padding: 30px 20px;
    border: 1px solid $border-color;
    .sec {
      margin-bottom: 10px;
      &.mid {
        margin: 10px 0;
      }
      h3 {
        font-size: $font-size-huge;
      }
      .demo-boxes {

      }
    }
  }
</style>
