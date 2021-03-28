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
    [key: string]: any;
}
interface TreeInstance {
    getSelectedNode: () => TreeNodeOptions | undefined;
    getCheckedNodes: () => TreeNodeOptions[];
}
export { TreeNodeOptions, nodeKey, TreeInstance };
