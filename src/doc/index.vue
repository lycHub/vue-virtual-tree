<template>
  <div class="doc-container">
    <section class="sec">
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
      </a-card>
    </section>
    <section class="sec">
      <a-typography-title :level="3">代码演示</a-typography-title>
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
        <a-col :span="12" id="custom-icon-demo">
          <demo-box
              title="自定义图标"
              desc="自定义展开、收起图标"
              code-type="customIcon">
            <custom-icon-demo />
          </demo-box>
        </a-col>
      </a-row>
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
  export default defineComponent({
    name: 'DocContainer',
    components: { DemoBox, BaseDemo, CheckboxDemo, AsyncDataDemo, CustomNodeDemo, CustomIconDemo },
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
    .sec {
      margin-bottom: 10px;
      h3 {
        font-size: $font-size-huge;
      }
      .demo-boxes {

      }
    }
  }
</style>
