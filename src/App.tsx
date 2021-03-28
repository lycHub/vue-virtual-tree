// import { VirTree } from "./components";
// @ts-ignore
import { VirTree } from "../lib/index";
import {onMounted, ref} from "vue";
import {TreeInstance, TreeNodeOptions} from "./components/VirtualTree/types";
export default {
  name: 'App',
  components: {VirTree},
  setup() {
    const value = ref('');
    const nodes = ref<TreeNodeOptions[]>([]);
    const treeInstance = ref<TreeInstance | null>(null);
    onMounted(() => {
      const dig = (path = '0', level = 3): TreeNodeOptions[] => {
        const list = [];
        for (let i = 0; i < 10; i += 1) {
          const nodeKey = `${path}-${i}`;
          const treeNode: TreeNodeOptions  = {
            nodeKey,
            name: nodeKey,
            expanded: true,
            children: [],
            hasChildren: true
          };

          if (level > 0) {
            treeNode.children = dig(nodeKey, level - 1);
          } else {
            treeNode.hasChildren = false;
          }

          list.push(treeNode);
        }
        return list;
      };
      nodes.value = dig();
    });
    const getCheckNodes = () => {
      const checks = treeInstance.value!.getCheckedNodes();
      console.log('checks', checks[0].name);
    }
    const renderContent = (node: TreeNodeOptions) => {
      return (<b>{ node.name }</b>);
    }
    return () => {
      return (
        <div id="app">
          <section class="demo-sec">
            <p>tree demo:</p>
            <VirTree source={ nodes.value } showCheckbox ref="treeInstance" />
          </section>
        </div>
      );
    }
  }
}
