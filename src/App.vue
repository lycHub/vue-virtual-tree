<template>
  <a-layout class="app-layout">
  <a-alert
    style="position: fixed; width: 100%; top: 0; left: 0;z-index: 11;"
    message="该库已废弃"
    type="error"
    closable>
      <template #description>
        <b>请使用重构后的：<a href="//github.com/lycHub/ysx-library/blob/master/projects/VirtualTree/README.md" target="_blank">Virtual Tree</a></b>
      </template>
    </a-alert>
    <a-layout-header class="header">
      <h2 class="title">Vue virtual tree</h2>
      <a class="link" href="//github.com/lycHub/vue-virtual-tree" target="_blank">github</a>
    </a-layout-header>
    <a-layout-content class="content">
      <doc-container />
      <a-anchor class="anchor">
        <a-anchor-link href="#usage" title="安装使用" />
        <a-anchor-link href="#base-demo" title="基本用法" />
        <a-anchor-link href="#checkbox-demo" title="可勾选" />
        <a-anchor-link href="#async-dada-demo" title="异步加载" />
        <a-anchor-link href="#custom-node-demo" title="自定义渲染节点" />
        <a-anchor-link href="#custom-icon-demo" title="自定义图标" />
        <a-anchor-link href="#api" title="API" />
      </a-anchor>
    </a-layout-content>
    <a-layout-footer class="footer">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>
<script lang="tsx">
  import { defineComponent, ref } from 'vue';
  import DocContainer from './doc/index.vue';
  export default defineComponent({
    components: { DocContainer },
    setup() {
      return {
        selectedKeys: ref<string[]>(['2'])
      };
    },
  });
</script>
<style lang="scss" scoped>
  $top-bottom-height: 64px;
  .app-layout {
    .header {
      display: flex;
      align-items: center;
      color: $white-color;
      height: $top-bottom-height;
      .title {
        color: inherit;
        margin: 0;
      }
      .link {
        margin-left: 20px;
        font-size: $font-size-mid;
      }
    }
    .content {
      position: relative;
      min-height: calc(100vh - #{$top-bottom-height * 2});
      background-color: $white-color;
      .anchor {
        position: absolute;
        right: 50px;
        top: 30px;
      }
    }
    .footer {
      text-align: center;
    }
  }
</style>
