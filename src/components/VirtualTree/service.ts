import {NodeKey, TreeNodeOptions} from "./types";
import {ref} from "vue";
import {SelectionModel} from "../selections";

class TreeService {
  selectedNodes = ref(new SelectionModel<Required<TreeNodeOptions>>());
  checkedNodes = ref(new SelectionModel<Required<TreeNodeOptions>>(true));
  expandedKeys = ref(new SelectionModel<NodeKey>(true));
  disabledKeys = ref(new SelectionModel<NodeKey>(true));

  defaultSelectedKey: NodeKey = '';
  defaultCheckedKeys: NodeKey[] = [];
  defaultExpandedKeys: NodeKey[] = [];
  defaultDisabledKeys: NodeKey[] = [];

  flatTree: Required<TreeNodeOptions>[] = [];

  constructor() {}

  flattenTree(
    source: TreeNodeOptions[],
    defaultSelectedKey: NodeKey,
    defaultCheckedKeys: NodeKey[],
    defaultExpandedKeys: NodeKey[],
    defaultDisabledKeys: NodeKey[],
  ): Required<TreeNodeOptions>[] {
    this.defaultSelectedKey = defaultSelectedKey;
    this.defaultCheckedKeys = defaultCheckedKeys;
    this.defaultExpandedKeys = defaultExpandedKeys;
    this.defaultDisabledKeys = defaultDisabledKeys;
    const result: Required<TreeNodeOptions>[] = [];
    const recursion = (list: TreeNodeOptions[], level = 0, parent: Required<TreeNodeOptions> | null = null) => {
      return list.map(item => {
        const flatNode: Required<TreeNodeOptions> = {
          ...item,
          level,
          loading: false,
          hasChildren: item.hasChildren || false,
          parentKey: parent?.nodeKey || null,
          children: item.children || []
        };
        result.push(flatNode);
        if (defaultDisabledKeys.includes(item.nodeKey)) {
          this.disabledKeys.value.select(item.nodeKey);
        }
        if (defaultSelectedKey === item.nodeKey) {
          this.selectedNodes.value.select(flatNode);
        }
        if (defaultCheckedKeys.includes(item.nodeKey)) {
          this.checkedNodes.value.select(flatNode);
        }
        if (defaultExpandedKeys.includes(item.nodeKey) && item.children?.length) {
          this.expandedKeys.value.select(item.nodeKey);
          flatNode.children = recursion(item.children, level + 1, flatNode);
        }
        return flatNode;
      });
    }

    recursion(source);
    return result;
  }

  updateDownwards(checked: boolean, node: Required<TreeNodeOptions>) {
    const update = (children: Required<TreeNodeOptions>[]) => {
      if (children.length) {
        children.forEach(child => {
          const checkFunc = checked ? 'select' : 'deselect';
          this.checkedNodes.value[checkFunc](child);
          if (!checked) {
            this.removeDefaultCheckedKeys(child);
          }
          if (child.children?.length) {
            update(child.children as Required<TreeNodeOptions>[]);
          }
        });
      }
    }
    update(node.children as Required<TreeNodeOptions>[]);
  }

  updateUpwards(targetNode: Required<TreeNodeOptions>, flatList: Required<TreeNodeOptions>[]) {
    const update = (node: Required<TreeNodeOptions>) => {
      if (node.parentKey != null) { // 说明是子节点
        const parentNode = flatList.find(item => item.nodeKey == node.parentKey)!;
        // console.log('parentNode', parentNode);
        const parentChecked = (parentNode.children as Required<TreeNodeOptions>[]).every((child) => this.checkedNodes.value.isSelected(child));
        if (parentChecked !== this.checkedNodes.value.isSelected(parentNode)) { // 父节点变了的话，就还要继续向上更新
          this.checkedNodes.value.toggle(parentNode);
          if (!parentChecked) {
            this.removeDefaultCheckedKeys(parentNode);
          }
          update(parentNode);
        }
      }
    }
    update(targetNode);
  }

  removeDefaultCheckedKeys(node: TreeNodeOptions) {
    const inDefaultIndex = this.defaultCheckedKeys.findIndex(item => item === node.nodeKey);
    if (inDefaultIndex > -1) {
      this.defaultCheckedKeys.splice(inDefaultIndex, 1);
    }
  }

  removeDefaultExpandedKeys(key: NodeKey) {
    const inDefaultIndex = this.defaultExpandedKeys.findIndex(item => item === key);
    if (inDefaultIndex > -1) {
      this.defaultExpandedKeys.splice(inDefaultIndex, 1);
    }
  }

}




export { TreeService };