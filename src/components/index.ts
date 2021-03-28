import { App } from 'vue';
import VirTree from './VirtualTree';
export { VirTree };
export default function (app: App) {
  app.component(VirTree.name, VirTree);
}
