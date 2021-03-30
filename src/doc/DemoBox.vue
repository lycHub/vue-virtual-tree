<template>
  <div class="demo-box">
    <div class="show">
      <slot />
    </div>
    <div class="meta">
      <div class="title">基本用法</div>
      <div class="desc">
        <p>选中，禁用，默认展开等基本功能。</p>
      </div>
      <div class="actions">
        <span class="act">
          <a>展开</a>
        </span>
      </div>
    </div>
    <div class="highlight-wrap">
      <div class="highlight">
        <pre>
          <code class=" language-vue">
            &lt;template&gt;
              &lt;a-card title="Default size card" style="width: 300px"&gt;
                &lt;template #extra&gt;&lt;a href="#"&gt;more&lt;/a&gt;&lt;/template&gt;
                &lt;p&gt;card content&lt;/p&gt;
                &lt;p&gt;card content&lt;/p&gt;
                &lt;p&gt;card content&lt;/p&gt;
              &lt;/a-card&gt;
              &lt;br /&gt;
              &lt;a-card size="small" title="Small size card" style="width: 300px"&gt;
                &lt;template #extra&gt;&lt;a href="#"&gt;more&lt;/a&gt;&lt;/template&gt;
                &lt;p&gt;card content&lt;/p&gt;
                &lt;p&gt;card content&lt;/p&gt;
                &lt;p&gt;card content&lt;/p&gt;
              &lt;/a-card&gt;
            &lt;/template&gt;
          </code>
        </pre>
      </div>
    </div>
  </div>
</template>

<script lang="tsx">
  import {defineComponent} from 'vue';
  export default defineComponent({
    name: 'DemoBox',
    props: {},
    emits: [],
    setup(prop, {emit}) {
      return {}
    }
  });
</script>

<style scoped lang="scss">
  .demo-box {
    display: inline-block;
    width: 100%;
    margin-bottom: 16px;
    border: 1px solid $border-color;
    border-radius: 2px;
    transition: border-color .2s ease-in-out;
    &:target {
      border-color: $primary-color;
    }
    .show {
      padding: 42px 24px 50px;
      border-bottom: 1px solid $border-color;
    }
    .meta {
      position: relative;
      border-radius: 0 0 2px 2px;
      .title {
        position: absolute;
        top: -14px;
        margin-left: 16px;
        padding: 1px 8px;
        background-color: $white-color;
        border-radius: 2px 2px 0 0;
      }
      .desc {
        padding: 18px 24px 12px;
      }
      .actions {
        padding: 12px 0;
        border-top: 1px dashed $dash-border-color;
        opacity: .7;
        text-align: center;
        transition: opacity .3s;
        &:hover {
          opacity: 1;
        }
        .act {

        }
      }
    }
    .highlight-wrap {
      display: none;
      border-radius: 0 0 2px 2px;
      .highlight {
        padding: 16px 32px;
      }
    }
  }
</style>
