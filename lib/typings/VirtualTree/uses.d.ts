import { TreeNodeOptions } from "./types";
declare function flattenTree(source: TreeNodeOptions[]): Required<TreeNodeOptions>[];
declare function updateDownwards(checked: boolean, node: Required<TreeNodeOptions>): void;
declare function updateUpwards(targetNode: Required<TreeNodeOptions>, flatList: Required<TreeNodeOptions>[]): void;
export { flattenTree, updateUpwards, updateDownwards };
