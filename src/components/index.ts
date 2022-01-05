import { App } from 'vue';
import VirTree from './VirtualTree';
export { VirTree };
export * from './VirtualTree/types';
export default function (app: App) {
  app.component(VirTree.name, VirTree);
}
