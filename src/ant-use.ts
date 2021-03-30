import { App } from 'vue';
import { Button, Layout, Menu, Row, Col } from "ant-design-vue";
const components = [
  Button,
  Layout,
  Menu,
  Row,
  Col
]
export default function(app: App) {
  components.forEach(item => app.use(item));
}
