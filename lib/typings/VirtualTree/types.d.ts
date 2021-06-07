declare type nodeKey = string | number;
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
