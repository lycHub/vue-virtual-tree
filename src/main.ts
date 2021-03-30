import { createApp } from 'vue';
import App from './App.vue';
import AntUse from './ant-use';
import VirTree from './components';
import './assets/styles/index.scss';
createApp(App)
  .use(AntUse)
  .use(VirTree)
  .mount('#app');
