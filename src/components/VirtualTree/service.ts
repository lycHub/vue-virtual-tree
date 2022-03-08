import {NodeKey, TreeNodeOptions, TypeWithNull} from "./types";
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
    parent: TypeWithNull<Required<TreeNodeOptions>> = null
  ): Required<TreeNodeOptions>[] {
    this.defaultSelectedKey = defaultSelectedKey;
    this.defaultCheckedKeys = defaultCheckedKeys;
    this.defaultExpandedKeys = defaultExpandedKeys;
    this.defaultDisabledKeys = defaultDisabledKeys;
    const result: Required<TreeNodeOptions>[] = [];

    const recursion = (list: TreeNodeOptions[], parent: TypeWithNull<Required<TreeNodeOptions>> = null) => {
      return list.map(item => {
        const childrenSize = item.children?.length || 0;
        const flatNode: Required<TreeNodeOptions> = {
          ...item,
          level: parent ? parent.level + 1 : item.level || 0,
          loading: false,
          hasChildren: item.hasChildren || childrenSize > 0,
          parentKey: parent?.nodeKey || null,
          children: item.children || []
        };
        let goon = true;
        if (parent) {
          if (defaultExpandedKeys.includes(parent.nodeKey)) {
            if (defaultCheckedKeys.includes(parent.nodeKey)) { // 默认展开并选中了
              defaultCheckedKeys.push(flatNode.nodeKey);
              this.checkedNodes.value.select(flatNode.nodeKey);
            }
            result.push(flatNode);
          } else {
            goon = false;
          }
        } else {
          result.push(flatNode);
        }
      
        if (defaultDisabledKeys.includes(flatNode.nodeKey)) {
          this.disabledKeys.value.select(flatNode.nodeKey);
        }
        if (defaultSelectedKey === flatNode.nodeKey) {
          this.selectedNodes.value.select(flatNode);
        }
        if (defaultExpandedKeys.includes(flatNode.nodeKey)) {
          this.expandedKeys.value.select(flatNode.nodeKey);
        }
        
        if (defaultCheckedKeys.includes(flatNode.nodeKey)) {
          this.checkedNodes.value.select(flatNode.nodeKey);
        }

        if (goon && childrenSize) {
          flatNode.children = recursion(flatNode.children, flatNode);
        }
        return flatNode;
      });
    }

    recursion(source, parent);
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


  getCheckedNodes(
    source: TreeNodeOptions[],
    checkedKeys: NodeKey[]
  ): TreeNodeOptions[] {
    const result: TreeNodeOptions[] = [];
    const checkedSize = checkedKeys.length;
    // console.log('checkedSize :>> ', checkedSize);
    let count = 0;
    const recursion = (list: TreeNodeOptions[], parent: TypeWithNull<TreeNodeOptions> = null) => {
      for (const item of list) {
        let goon = true;
        if (parent) {
          if (result.map(rItem => rItem.nodeKey).includes(parent.nodeKey)) {
            result.push(item);
          } else {
            if (checkedKeys.includes(item.nodeKey)) {
              count++;
              result.push(item);
            } else {
              if (count >= checkedSize) {
                goon = false;
              }
            }
          }
        } else {
          if (checkedKeys.includes(item.nodeKey)) {
            count++;
            result.push(item);
          } else {
            if (count >= checkedSize) {
              goon = false;
            }
          }
        }
        if (goon) {
          if ( item.children?.length) {
            recursion(item.children, item);
          }
        } else {
          break;
        }
      }
    }
    if (checkedSize) {
      recursion(source);
    }
    return result;
  }
}




export { TreeService };
