import { App } from 'vue';
import { Button, Layout, Menu, Row, Col, Tooltip, Typography, Anchor, Card, Input, Table } from "ant-design-vue";

const components = [
  Button,
  Layout,
  Menu,
  Row,
  Col,
  Tooltip,
  Typography,
  Anchor,
  Card,
  Input,
  Table
]
export default function(app: App) {
  components.forEach(item => app.use(item));
}
