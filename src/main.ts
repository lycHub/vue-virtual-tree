import { createApp } from 'vue'
import App from './App.vue'
import VirTree from './components'
// import VirTree from '../lib/vue-virtual-tree.common';
// import '../lib/vue-virtual-tree.css';
createApp(App).use(VirTree).mount('#app')
