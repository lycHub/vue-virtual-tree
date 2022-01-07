import {TreeNodeOptions} from "./types";
import {ref} from "vue";
import {SelectionModel} from "../selections";

const selectedNodes = ref(new SelectionModel<Required<TreeNodeOptions>>());
const checkedNodes = ref(new SelectionModel<Required<TreeNodeOptions>>(true));

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
        const checkFunc = checked ? 'select' : 'deselect';
        checkedNodes.value[checkFunc](child);
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
      const parentChecked = (parentNode.children as Required<TreeNodeOptions>[]).every((child) => checkedNodes.value.isSelected(child));
      if (parentChecked !== checkedNodes.value.isSelected(parentNode)) { // 父节点变了的话，就还要继续向上更新
        checkedNodes.value.toggle(parentNode)
        update(parentNode);
      }
    }
  }
  update(targetNode);
}

export { selectedNodes, checkedNodes, flattenTree, updateUpwards, updateDownwards };
