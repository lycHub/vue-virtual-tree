import { App } from 'vue';
import { Button, Layout, Menu } from "ant-design-vue";
const components = [
  Button,
  Layout,
  Menu
]
export default function(app: App) {
  components.forEach(item => app.use(item));
}
