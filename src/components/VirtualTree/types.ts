type NodeKey = string | number;

/*
* 用户传入的source必须要有 key, name, hasChildren
* */

interface TreeNodeOptions {
  nodeKey: NodeKey;
  name: string;
  level?: number;
  loading?: boolean;
  hasChildren?: boolean;
  children?: TreeNodeOptions[];
  parentKey?: NodeKey | null;
  // [key: string]: any;
}

interface TreeInstance {
  getSelectedNode: () => TreeNodeOptions | undefined;
  getCheckedNodes: () => TreeNodeOptions[];
  getHalfCheckedNodes: () => TreeNodeOptions[];
  getExpandedKeys: () => NodeKey[];
}

interface TreeNodeInstance {
  rawNode: TreeNodeOptions;
  halfChecked: () => boolean;
}

type TypeWithNull<T> = T | null;
type TypeWithUndefined<T> = T | undefined;

export { TreeNodeOptions, NodeKey, TreeInstance, TreeNodeInstance, TypeWithUndefined, TypeWithNull };
