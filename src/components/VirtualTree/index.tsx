import {defineComponent, watch, ref, shallowRef, PropType, h} from 'vue';
import { cloneDeep, uniq } from 'lodash-es';
import {NodeKey, TreeNodeInstance, TreeNodeOptions, TypeWithNull, TypeWithUndefined} from "./types";

import VirTreeNode from './node';
import VirtualList from '../VirtualList';
import './index.scss';
import {TreeService} from "./service";

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
    defaultSelectedKey: {
      type: [String, Number],
      default: ''
    },
    defaultCheckedKeys: {
      type: Array as PropType<NodeKey[]>,
      default: () => []
    },
    defaultDisabledKeys: {
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

    const service = new TreeService();

    watch(() => props.source, newVal => {
      flatList.value = service.flattenTree(newVal, props.defaultSelectedKey, props.defaultCheckedKeys, props.defaultExpandedKeys, props.defaultDisabledKeys);
      // console.log('flatList :>> ', flatList.value);
    }, {immediate: true});

    watch(() => props.defaultExpandedKeys, newVal => {
      service.resetDefaultExpandedKeys(newVal);
      service.expandedKeys.value.clear();
      service.expandedKeys.value.select(...newVal);
      flatList.value = service.flattenTree(props.source, props.defaultSelectedKey, props.defaultCheckedKeys, props.defaultExpandedKeys, props.defaultDisabledKeys);
    });

    watch(() => props.defaultDisabledKeys, newVal => {
      service.resetDefaultDisabledKeys(newVal);
      service.disabledKeys.value.clear();
      service.disabledKeys.value.select(...newVal);
    });

    watch(() => props.defaultSelectedKey, newVal => {
      service.resetDefaultSelectedKey(newVal);
      const target = flatList.value.find(item => item.nodeKey === newVal);
      if (target) {
        service.selectedNodes.value.clear();
        service.selectedNodes.value.select(target);
      }
    });

    watch(() => props.defaultCheckedKeys, newVal => {
      service.resetDefaultCheckedKeys(newVal);
      if (newVal.length) {
        service.checkedNodes.value.clear();
        service.checkedNodes.value.select(...newVal);
      }
    });


    const selectChange = (node: Required<TreeNodeOptions>) => {
      const preSelectedNode = service.selectedNodes.value.selected[0];
      let currentNode: TypeWithNull<TreeNodeOptions> = node;
      if (service.selectedNodes.value.isSelected(node)) {
        service.selectedNodes.value.clear();
        currentNode = null;
        service.resetDefaultSelectedKey();
      } else {
        service.selectedNodes.value.select(node);
      }
      emit('selectChange', {
        preSelectedNode,
        node: currentNode
      });
    }


    const checkChange = ([checked, node]: [boolean, Required<TreeNodeOptions>]) => {
      service.checkedNodes.value.toggle(node.nodeKey);
      if (!checked) {
        service.removeDefaultCheckedKeys(node);
      }
      if (!props.checkStrictly) {
        service.updateDownwards(checked, node);
        service.updateUpwards(node, flatList.value);
      }
      // console.log('checkChange defaultCheckedKeys:>> ', service.defaultCheckedKeys);
      // console.log('checkChange selected:>> ', service.checkedNodes.value.selected);
      emit('checkChange', {checked, node});
    }

    const expandNode = (node: Required<TreeNodeOptions>, children: TreeNodeOptions[] = []) => {
      const trueChildren = children.length ? children : cloneDeep(node.children)!;
      const selectedKey = service.selectedNodes.value.selected[0]?.nodeKey || service.defaultSelectedKey;
      const allExpandedKeys = service.expandedKeys.value.selected.concat(service.defaultExpandedKeys);
      const allCheckedKeys = service.checkedNodes.value.selected;
      if (service.checkedNodes.value.isSelected(node.nodeKey)) {
        allCheckedKeys.push(...trueChildren.map(item => item.nodeKey));
      }
      node.children = service.flattenTree(trueChildren, selectedKey, uniq(allCheckedKeys), allExpandedKeys, props.defaultDisabledKeys, node);
      const targetIndex = flatList.value.findIndex(item => item.nodeKey === node.nodeKey);
      flatList.value.splice(targetIndex + 1, 0, ...(node.children as Required<TreeNodeOptions>[]));
    }

    const collapseNode = (targetNode: Required<TreeNodeOptions>) => {
      const delKeys: NodeKey[] = [];
      const recursion = (node: Required<TreeNodeOptions>) => {
        if (node.children?.length) {
          (node.children as Required<TreeNodeOptions>[]).forEach(item => {
            delKeys.push(item.nodeKey);
            if (service.expandedKeys.value.isSelected(item.nodeKey)) {
              service.expandedKeys.value.deselect(item.nodeKey);
              service.removeDefaultExpandedKeys(item.nodeKey);
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
      service.expandedKeys.value.toggle(node.nodeKey);
      if (service.expandedKeys.value.isSelected(node.nodeKey)) {
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
        service.removeDefaultExpandedKeys(node.nodeKey);
        collapseNode(node);
      }
      emit('toggleExpand', { status: service.expandedKeys.value.isSelected(node.nodeKey), node });
    }
    const nodeRefs = ref<TreeNodeInstance[]>([]);
    const setRef = (index: number, node: any) => {
      if (node) {
        nodeRefs.value[index] = node as TreeNodeInstance;
      }
    }
    expose({
      getSelectedNode: (): TypeWithUndefined<TreeNodeOptions> => {
        return service.selectedNodes.value.selected[0];
      },
      getCheckedNodes: (): TreeNodeOptions[] => {
        // return flatList.value.filter(item => service.checkedNodes.value.selected.includes(item.nodeKey));
        return service.getCheckedNodes(props.source, service.checkedNodes.value.selected);
      },
      getHalfCheckedNodes: (): TreeNodeOptions[] => {
        return nodeRefs.value.filter(item => item.halfChecked()).map(item => item.rawNode);
      },
      getExpandedKeys: (): NodeKey[] => {
        return service.expandedKeys.value.selected;
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
                selectedNodes: service.selectedNodes.value,
                checkedNodes: service.checkedNodes.value,
                expandedKeys: service.expandedKeys.value,
                disabledKeys: service.disabledKeys.value,
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
