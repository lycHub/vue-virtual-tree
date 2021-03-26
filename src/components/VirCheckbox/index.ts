import { App } from "vue";
import VirCheckbox from './VirCheckbox';

export default function (app: App): void {
  app.component(VirCheckbox.name, VirCheckbox);
}
