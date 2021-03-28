import { TreeNodeOptions } from "./types";
declare function flattenTree(source: TreeNodeOptions[]): TreeNodeOptions[];
declare function updateDownwards(checked: boolean, node: TreeNodeOptions): void;
declare function updateUpwards(targetNode: TreeNodeOptions, flatList: TreeNodeOptions[]): void;
declare function useExpose<T>(apis: T): void;
export { flattenTree, updateUpwards, updateDownwards, useExpose };
