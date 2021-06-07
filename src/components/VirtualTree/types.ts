type nodeKey = string | number;

/*
* 用户传入的source必须要有 key, name, hasChildren
* */

interface TreeNodeOptions {
  nodeKey: nodeKey;
  name: string;
  level?: number;
  loading?: boolean;
  disabled?: boolean;
  expanded?: boolean;
  selected?: boolean;
  checked?: boolean;
  hasChildren?: boolean;
  children?: TreeNodeOptions[];
  parentKey?: nodeKey | null;
  // [key: string]: any;
}

interface TreeInstance {
  getSelectedNode: () => TreeNodeOptions | undefined;
  getCheckedNodes: () => TreeNodeOptions[];
  getHalfCheckedNodes: () => TreeNodeOptions[];
}

interface TreeNodeInstance {
  rawNode: TreeNodeOptions;
  halfChecked: () => boolean;
}

export { TreeNodeOptions, nodeKey, TreeInstance, TreeNodeInstance };
