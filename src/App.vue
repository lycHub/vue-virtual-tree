<template>
  <div class="container">
    <VirCheckbox v-model="checked">aaa</VirCheckbox>
    <VirtualList :size="42" :remain="8" :list="['a', 'b']" v-slot="{ item }">
      list--{{ item }}
    </VirtualList>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {

  },
  data () {
    return {
      checked: false
    }
  }
});
</script>
