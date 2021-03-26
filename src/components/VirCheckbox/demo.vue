<template>
  <div class="demo-box">
    <button @click="reset">reset</button>
    <div class="form-item" style="width: 206px;">
      value: {{ value }}
      <vir-checkbox v-model="value" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import VirCheckbox from './VirCheckbox';

  export default defineComponent({
    name: 'CheckboxDemo',
    components: { VirCheckbox },
    setup(props, context) {
      const value = ref(false);
      return {
        value
      }
    }
  });
</script>
