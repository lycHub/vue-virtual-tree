import { getCurrentInstance } from "vue";
import {TreeNodeOptions} from "./types";

function flattenTree(source: TreeNodeOptions[]): Required<TreeNodeOptions>[] {
  const result: Required<TreeNodeOptions>[] = [];
  function recursion (list: TreeNodeOptions[], level = 0, parent: Required<TreeNodeOptions> | null = null) {
    return list.map(item => {
      const flatNode: Required<TreeNodeOptions> = {
        ...item,
        level,
        loading: false,
        disabled: item.disabled || false,
        expanded: item.expanded || false,
        selected: item.selected || false,
        checked: item.checked || parent?.checked || false,
        hasChildren: item.hasChildren || false,
        parentKey: parent?.nodeKey || null,
        children: item.children || []
      };
      result.push(flatNode);
      if (item.expanded && item.children?.length) {
        flatNode.children = recursion(item.children, level + 1, flatNode);
      }
      return flatNode;
    });
  }

  recursion(source);
  return result;
}


function updateDownwards(checked: boolean, node: Required<TreeNodeOptions>) {
  const update = (children: Required<TreeNodeOptions>[]) => {
    if (children.length) {
      children.forEach(child => {
        child.checked = checked;
        if (child.children?.length) {
          update(child.children as Required<TreeNodeOptions>[]);
        }
      });
    }
  }
  update(node.children as Required<TreeNodeOptions>[]);
}

function updateUpwards(targetNode: Required<TreeNodeOptions>, flatList: Required<TreeNodeOptions>[]) {
  const update = (node: Required<TreeNodeOptions>) => {
    if (node.parentKey != null) { // 说明是子节点
      const parentNode = flatList.find(item => item.nodeKey == node.parentKey)!;
      // console.log('parentNode', parentNode);
      const parentChecked = !parentNode.children!.some(child => !child.checked);
      if (parentChecked !== parentNode.checked) { // 父节点变了的话，就还要继续向上更新
        parentNode.checked = parentChecked;
        update(parentNode);
      }
    }
  }
  update(targetNode);
}

export { flattenTree, updateUpwards, updateDownwards };
