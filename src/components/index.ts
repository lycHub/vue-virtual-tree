import { App } from 'vue';
import VirCheckbox from './VirCheckbox/VirCheckbox';
import VirtualList from './VirtualList/VirtualList';

export { default as VirCheckbox } from './VirCheckbox';
export { default as VirtualList } from './VirtualList';

const components = [
  VirCheckbox,
  VirtualList
]


export default function (app: App) {
  components.forEach(item => app.component(item.name, item));
}
