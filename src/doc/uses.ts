import { message } from 'ant-design-vue';
import {TreeInstance, TreeNodeOptions} from "@/components/VirtualTree/types";

function getCheckNodes(tree: TreeInstance) {
  const checks = tree.getCheckedNodes();
  console.log('checks', checks);
  message.info(`选中了${checks.length}条数据`);
}


function recursion(path = '0', level = 3): TreeNodeOptions[] {
  const list = [];
  for (let i = 0; i < 10; i += 1) {
    const nodeKey = `${path}-${i}`;
    const treeNode: TreeNodeOptions  = {
      nodeKey,
      name: nodeKey,
      expanded: true,
      children: [],
      hasChildren: true,
      disabled: i % 2 === 0
    };

    if (level > 0) {
      treeNode.children = recursion(nodeKey, level - 1);
    } else {
      treeNode.hasChildren = false;
    }

    list.push(treeNode);
  }
  return list;
}

export { getCheckNodes, recursion }
