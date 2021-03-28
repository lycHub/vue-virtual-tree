import { getCurrentInstance } from "vue";
import {TreeNodeOptions} from "./types";

function flattenTree(source: TreeNodeOptions[]): TreeNodeOptions[] {
  const result: TreeNodeOptions[] = [];
  function recursion (list: TreeNodeOptions[], level = 0, parent: TreeNodeOptions | null = null) {
    return list.map(item => {
      const flatNode = {
        ...item,
        level,
        loading: false,
        disabled: item.disabled || false,
        expand: item.expanded || false,
        selected: item.selected || false,
        checked: item.checked || parent?.checked || false,
        hasChildren: item.hasChildren || false,
        parentKey: parent?.nodeKey || null
      };
      result.push(flatNode);
      if (item.expanded && item.children?.length) {
        flatNode.children = recursion(item.children, level + 1, flatNode);
      } else {
        flatNode.children = flatNode.children || [];
      }
      return flatNode;
    });
  }

  recursion(source);
  return result;
}


function updateDownwards(checked: boolean, node: TreeNodeOptions) {
  const update = (children: TreeNodeOptions[]) => {
    if (children.length) {
      children.forEach(child => {
        child.checked = checked;
        if (child.children?.length) {
          update(child.children);
        }
      });
    }
  }
  update(node.children!);
}

function updateUpwards(targetNode: TreeNodeOptions, flatList: TreeNodeOptions[]) {
  const update = (node: TreeNodeOptions) => {
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


function useExpose<T>(apis: T) {
  const instance = getCurrentInstance();
  if (instance) {
    Object.assign(instance.proxy, apis);
  }
}

export { flattenTree, updateUpwards, updateDownwards, useExpose };
