import { App } from 'vue';
import { Button, Layout, Menu, Row, Col, Tooltip, Typography } from "ant-design-vue";
const components = [
  Button,
  Layout,
  Menu,
  Row,
  Col,
  Tooltip,
  Typography
]
export default function(app: App) {
  components.forEach(item => app.use(item));
}
