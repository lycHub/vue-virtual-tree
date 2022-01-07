import {defineComponent, watch, ref, shallowRef, PropType, h} from 'vue';
import { cloneDeep } from 'lodash-es';
import {NodeKey, TreeNodeInstance, TreeNodeOptions, TypeWithNull, TypeWithUndefined} from "./types";
import {
  checkedNodes,
  disabledKeys,
  expandedKeys,
  flattenTree,
  selectedNodes,
  updateDownwards,
  updateUpwards
} from "./uses";
import VirTreeNode from './node';
import VirtualList from '../VirtualList';
import './index.scss';

export default defineComponent({
  name: 'VirTree',
  props: {
    source: {
      type: Array as PropType<TreeNodeOptions[]>,
      default: () => []
    },
    defaultExpandedKeys: {
      type: Array as PropType<NodeKey[]>,
      default: () => []
    },
    defaultCheckedKeys: {
      type: Array as PropType<NodeKey[]>,
      default: () => []
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    checkStrictly: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: 27
    },
    remain: {
      type: Number,
      default: 8
    },
    loadData: Function as PropType<(node: TreeNodeOptions, callback: (children: TreeNodeOptions[]) => void) => void>,
    render: Function
  },
  emits: ['selectChange', 'checkChange', 'toggleExpand'],
  setup: function (props, {emit, slots, expose}) {
    const loading = shallowRef(false);
    const flatList = ref<Required<TreeNodeOptions>[]>([]);
    watch(() => props.source, newVal => {
      flatList.value = flattenTree(newVal, props.defaultCheckedKeys, props.defaultExpandedKeys);
      console.log('expandedKeys>>', expandedKeys.value.selected);
    }, {immediate: true});
    const selectChange = (node: Required<TreeNodeOptions>) => {
      const preSelectedNode = selectedNodes.value.selected[0];
      let currentNode: TypeWithNull<TreeNodeOptions> = node;
      if (selectedNodes.value.isSelected(node)) {
        selectedNodes.value.clear();
        currentNode = null;
      } else {
        selectedNodes.value.select(node);
      }
      emit('selectChange', {
        preSelectedNode,
        node: currentNode
      });
    }


    const checkChange = ([checked, node]: [boolean, Required<TreeNodeOptions>]) => {
      checkedNodes.value.toggle(node);
      if (!props.checkStrictly) {
        updateDownwards(checked, node);
        updateUpwards(node, flatList.value);
      }
      emit('checkChange', {checked, node});
    }

    const expandNode = (node: Required<TreeNodeOptions>, children: TreeNodeOptions[] = []) => {
      const trueChildren = children.length ? children : cloneDeep(node.children)!;
      node.children = trueChildren.map(item => {
        item.loading = false;
        item.level = item.level || node.level! + 1;
        item.children = item.children || [];
        item.hasChildren = item.hasChildren || false;
        item.parentKey = node.nodeKey || null;
        if (props.defaultCheckedKeys.includes(item.nodeKey)) {
          checkedNodes.value.select(item as Required<TreeNodeOptions>);
        }
        if (props.defaultExpandedKeys.includes(item.nodeKey)) {
          expandedKeys.value.select(item.nodeKey);
        }
        return item;
      });
      const targetIndex = flatList.value.findIndex(item => item.nodeKey === node.nodeKey);
      flatList.value.splice(targetIndex + 1, 0, ...(node.children as Required<TreeNodeOptions>[]));
    }

    const collapseNode = (targetNode: Required<TreeNodeOptions>) => {
      const delKeys: NodeKey[] = [];
      const recursion = (node: Required<TreeNodeOptions>) => {
        if (node.children?.length) {
          (node.children as Required<TreeNodeOptions>[]).forEach(item => {
            delKeys.push(item.nodeKey);
            if (expandedKeys.value.isSelected(item.nodeKey)) {
              expandedKeys.value.deselect(item.nodeKey);
              recursion(item as Required<TreeNodeOptions>);
            }
          });
        }
      }
      recursion(targetNode);
      if (delKeys.length) {
        flatList.value = flatList.value.filter(item => !delKeys.includes(item.nodeKey));
      }
    }

    const toggleExpand = (node: Required<TreeNodeOptions>) => {
      if (loading.value) return;
      expandedKeys.value.toggle(node.nodeKey);
      if (expandedKeys.value.isSelected(node.nodeKey)) {
        if (node.children?.length) {
          expandNode(node);
        } else {
          if (props.loadData) {
            node.loading = true;
            loading.value = true;
            // this.$forceUpdate();
            props.loadData(node, children => {
              node.loading = false;
              loading.value = false;
              if (children.length) {
                expandNode(node, children);
              }
            });
          }
        }
      } else {
        collapseNode(node);
      }
      emit('toggleExpand', { status: expandedKeys.value.isSelected(node.nodeKey), node });
    }
    const nodeRefs = ref<TreeNodeInstance[]>([]);
    const setRef = (index: number, node: any) => {
      if (node) {
        nodeRefs.value[index] = node as TreeNodeInstance;
      }
    }
    expose({
      getSelectedNode: (): TypeWithUndefined<TreeNodeOptions> => {
        return selectedNodes.value.selected[0];
      },
      getCheckedNodes: (): TreeNodeOptions[] => {
        return checkedNodes.value.selected;
      },
      getHalfCheckedNodes: (): TreeNodeOptions[] => {
        return nodeRefs.value.filter(item => item.halfChecked()).map(item => item.rawNode);
      },
      getExpandedKeys: (): NodeKey[] => {
        return expandedKeys.value.selected;
      }
    });

    return () => {
      return (
        <div class="vir-tree">
          {
            h(VirtualList, {
              class: ['vir-tree-wrap'],
              size: props.size,
              remain: props.remain,
              list: flatList.value,
              dataKey: 'nodeKey',
            }, {
              // @ts-ignore
              default: (data: { item: Required<TreeNodeOptions>, index: number }) => h(VirTreeNode, {
                ref: setRef.bind(null, data.index),
                node: data.item,
                selectedNodes: selectedNodes.value,
                checkedNodes: checkedNodes.value,
                expandedKeys: expandedKeys.value,
                disabledKeys: disabledKeys.value,
                showCheckbox: props.showCheckbox,
                checkStrictly: props.checkStrictly,
                iconSlot: slots.icon,
                render: props.render,
                onSelectChange: selectChange,
                onToggleExpand: toggleExpand,
                onCheckChange: checkChange
              })
            })
          }
        </div>
      );
    }
  }
});
