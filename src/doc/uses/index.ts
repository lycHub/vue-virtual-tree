import { message } from 'ant-design-vue';
import {TreeInstance, TreeNodeOptions} from '../../components';


function getSelectedNode(tree: TreeInstance) {
  const node = tree.getSelectedNode();
  console.log('selected node', node);
  if (node) {
    message.info(`选中了${node.name}`);
  } else {
    message.info('未选中节点');
  }
}


function getHalfCheckNodes(tree: TreeInstance) {
  const checks = tree.getHalfCheckedNodes();
  console.log('checks', checks);
  message.info(`${checks.length}个半选节点`);
}

function getCheckNodes(tree: TreeInstance) {
  const checks = tree.getCheckedNodes();
  console.log('checks', checks);
  message.info(`选中了${checks.length}条数据`);
}


export { getCheckNodes, getSelectedNode, getHalfCheckNodes }
