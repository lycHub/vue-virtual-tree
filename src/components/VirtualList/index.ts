import { App } from "vue";
import VirtualList from './VirtualList';

export default function (app: App): void {
  app.component(VirtualList.name, VirtualList);
}
