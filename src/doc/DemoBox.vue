<template>
  <div class="demo-box">
    <div class="show">
      <slot />
    </div>
    <div class="meta">
      <div class="title">{{ title }}</div>
      <div class="desc">
        <p>{{ desc }}</p>
      </div>
      <div class="actions">
        <a-tooltip>
          <template #title>{{ toggleBtnLabel }}</template>
          <span class="act" @click="toggleExpand">
            <a>{{ toggleBtnLabel }}</a>
          </span>
        </a-tooltip>
        <a-typography-paragraph class="act" style="display: inline-block" :copyable="{ text: preCode.source }" />
      </div>
    </div>
    <div class="highlight-wrap" v-show="toggleBtnLabel === '收起'">
      <div class="highlight" v-html="preCode.highlight"></div>
    </div>
  </div>
</template>

<script lang="tsx">
import {defineComponent, ref} from 'vue';
  interface PreCode {
    source: string;
    highlight: string;
  }

  const code = require('./HighlightCodes.json');
  export default defineComponent({
    name: 'DemoBox',
    props: {
      title: {
        type: String,
        default: ''
      },
      desc: {
        type: String,
        default: ''
      },
      codeType: {
        type: String,
        default: ''
      }
    },
    emits: [],
    setup(props, {emit}) {
      const toggleBtnLabel = ref<'展开' | '收起'>('展开');
      const preCode = ref<PreCode | null>(null);
      const toggleExpand = () => {
        toggleBtnLabel.value = toggleBtnLabel.value === '展开' ? '收起' : '展开';
      }
      preCode.value = code[props.codeType];
      return {
        toggleBtnLabel,
        toggleExpand,
        preCode
      }
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
        user-select: none;
        &:hover {
          opacity: 1;
        }
        .act {
          margin-right: 8px;
        }
      }
    }
    .highlight-wrap {
      border-radius: 0 0 2px 2px;
      .highlight {
        padding: 16px 32px;
      }
    }
  }
</style>
