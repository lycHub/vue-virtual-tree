<template>
  <a-layout class="app-layout">
    <a-layout-header class="header">
      <h2 class="title">Vue virtual tree</h2>
      <a class="link">github</a>
    </a-layout-header>
    <a-layout-content class="content">
      <doc-container />
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
        selectedKeys: ref<string[]>(['2']),
      };
    },
  });
</script>
<style lang="scss" scoped>
  $top-bottom-height: 64px;
  .app-layout {
    .header {
      position: fixed;
      width: 100%;
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
      min-height: calc(100vh - #{$top-bottom-height * 2});
      margin-top: $top-bottom-height;
      background-color: $white-color;
    }
    .footer {
      text-align: center;
    }
  }
</style>
