import { App } from "vue";
import Virtree from './VirTree';

export default function (app: App): void {
  app.component(Virtree.name, Virtree);
}
