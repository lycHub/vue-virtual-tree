import {NodeKey, TreeNodeOptions} from "./types";
import {ref} from "vue";
import {SelectionModel} from "../selections";

class TreeService {
  selectedNodes = ref(new SelectionModel<Required<TreeNodeOptions>>());
  checkedNodes = ref(new SelectionModel<NodeKey>(true));
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
    parent: Required<TreeNodeOptions> | null = null
  ): Required<TreeNodeOptions>[] {
  
    this.defaultSelectedKey = defaultSelectedKey;
    this.defaultCheckedKeys = defaultCheckedKeys;
    this.defaultExpandedKeys = defaultExpandedKeys;
    this.defaultDisabledKeys = defaultDisabledKeys;
    console.log('defaultCheckedKeys 22 :>> ', defaultCheckedKeys);
    const result: Required<TreeNodeOptions>[] = [];
    const recursion = (list: TreeNodeOptions[], level = 0, parent: Required<TreeNodeOptions> | null = null) => {
      return list.map(item => {
        const flatNode: Required<TreeNodeOptions> = {
          ...item,
          level: item.level || level + 1,
          loading: false,
          hasChildren: item.hasChildren || false,
          parentKey: parent?.nodeKey || null,
          children: item.children || []
        };
        let goon = true;
        if (parent) {
          if (defaultExpandedKeys.includes(parent.nodeKey)) {
            this.expandedKeys.value.select(parent.nodeKey);
            if (defaultCheckedKeys.includes(parent.nodeKey)) { // 默认展开并选中了
              defaultCheckedKeys.push(flatNode.nodeKey);
            }
            result.push(flatNode);
          } else {
            goon = false;
          }
        } else {
          result.push(flatNode);
        }
        if (goon) {
          if (defaultDisabledKeys.includes(item.nodeKey)) {
            this.disabledKeys.value.select(item.nodeKey);
          }
          if (defaultSelectedKey === item.nodeKey) {
            this.selectedNodes.value.select(flatNode);
          }
          if (item.children?.length) {
            flatNode.children = recursion(item.children, level + 1, flatNode);
          }
        }

        if (defaultCheckedKeys.includes(flatNode.nodeKey)) {
          this.checkedNodes.value.select(flatNode.nodeKey);
        }
        return flatNode;
      });
    }

    recursion(source, parent?.level);
    return result;
  }

  updateDownwards(checked: boolean, node: Required<TreeNodeOptions>) {
    const update = (children: Required<TreeNodeOptions>[]) => {
      if (children.length) {
        children.forEach(child => {
          const checkFunc = checked ? 'select' : 'deselect';
          this.checkedNodes.value[checkFunc](child.nodeKey);
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
        const parentChecked = (parentNode.children as Required<TreeNodeOptions>[]).every((child) => this.checkedNodes.value.isSelected(child.nodeKey));
        if (parentChecked !== this.checkedNodes.value.isSelected(parentNode.nodeKey)) { // 父节点变了的话，就还要继续向上更新
          this.checkedNodes.value.toggle(parentNode.nodeKey);
          if (!parentChecked) {
            this.removeDefaultCheckedKeys(parentNode);
          }
          update(parentNode);
        }
      }
    }
    update(targetNode);
  }

  resetDefaultSelectedKey(key: NodeKey = '') {
    this.defaultSelectedKey = key;
  }

  resetDefaultDisabledKeys(keys: NodeKey[]) {
    this.defaultDisabledKeys = keys;
  }

  resetDefaultCheckedKeys(keys: NodeKey[]) {
    this.defaultCheckedKeys = keys;
  }

  removeDefaultCheckedKeys(node: TreeNodeOptions) {
    const inDefaultIndex = this.defaultCheckedKeys.findIndex(item => item === node.nodeKey);
    if (inDefaultIndex > -1) {
      this.defaultCheckedKeys.splice(inDefaultIndex, 1);
    }
  }

  resetDefaultExpandedKeys(keys: NodeKey[]) {
    this.defaultExpandedKeys = keys;
  }

  removeDefaultExpandedKeys(key: NodeKey) {
    const inDefaultIndex = this.defaultExpandedKeys.findIndex(item => item === key);
    if (inDefaultIndex > -1) {
      this.defaultExpandedKeys.splice(inDefaultIndex, 1);
    }
  }
}




export { TreeService };
