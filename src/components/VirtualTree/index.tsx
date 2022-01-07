import {defineComponent, watch, ref, shallowRef, PropType, h} from 'vue';
import { cloneDeep } from 'lodash-es';
import {NodeKey, TreeNodeInstance, TreeNodeOptions, TypeWithNull, TypeWithUndefined} from "./types";
import {flattenTree, updateDownwards, updateUpwards} from "./uses";
import VirTreeNode from './node';
import VirtualList from '../VirtualList';
import './index.scss';
import {SelectionModel} from "../selections";

export default defineComponent({
  name: 'VirTree',
  props: {
    source: {
      type: Array as PropType<TreeNodeOptions[]>,
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


    const selectedNodes = ref(new SelectionModel<Required<TreeNodeOptions>>());
    const loading = shallowRef(false);
    const flatList = ref<Required<TreeNodeOptions>[]>([]);
    watch(() => props.source, newVal => {
      flatList.value = flattenTree(newVal);
      // console.log(selectedNodes.value);
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
      node.checked = checked;
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
        item.disabled = item.disabled || false;
        item.expanded = item.expanded || false;
        item.checked = item.checked ?? node.checked;
        item.children = item.children || [];
        item.hasChildren = item.hasChildren || false;
        item.parentKey = node.nodeKey || null;
        return item;
      });
      const targetIndex = flatList.value.findIndex(item => item.nodeKey === node.nodeKey);
      flatList.value.splice(targetIndex + 1, 0, ...(node.children as Required<TreeNodeOptions>[]));
    }

    const collapseNode = (targetNode: Required<TreeNodeOptions>) => {
      const delKeys: NodeKey[] = [];
      const recursion = (node: Required<TreeNodeOptions>) => {
        if (node.children?.length) {
          node.children.forEach(item => {
            delKeys.push(item.nodeKey);
            if (item.expanded) {
              item.expanded = false;
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
      // console.log('expand node');
      node.expanded = !node.expanded;
      if (node.expanded) {
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
      emit('toggleExpand', {status: node.expanded, node});
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
        return flatList.value.filter(item => item.checked);
      },
      getHalfCheckedNodes: (): TreeNodeOptions[] => {
        return nodeRefs.value.filter(item => item.halfChecked()).map(item => item.rawNode);
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
