import { createApp } from 'vue';
import App from './App.vue';
import AntUse from './ant-use';
import './assets/styles/index.scss';
createApp(App)
  .use(AntUse)
  .mount('#app');
