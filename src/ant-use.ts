import { App } from 'vue';
import { Button, Layout, Menu, Row, Col, Tooltip } from "ant-design-vue";
const components = [
  Button,
  Layout,
  Menu,
  Row,
  Col,
  Tooltip
]
export default function(app: App) {
  components.forEach(item => app.use(item));
}
