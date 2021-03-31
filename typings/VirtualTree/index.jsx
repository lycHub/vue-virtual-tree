import { defineComponent, watch, ref, shallowRef, h } from 'vue';
import cloneDeep from 'lodash.clonedeep';
import { flattenTree, updateDownwards, updateUpwards, useExpose } from "./uses";
import VirTreeNode from './node';
import VirtualList from '../VirtualList';
import './index.scss';
export default defineComponent({
    name: 'VirTree',
    props: {
        source: {
            type: Array,
            default: () => []
        },
        readonly: {
            type: Boolean,
            default: false
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
        loadData: Function,
        render: Function
    },
    emits: ['selectChange', 'checkChange'],
    setup(props, { emit }) {
        const loading = shallowRef(false);
        const selectedKey = ref('');
        const flatList = ref([]);
        watch(() => props.source, newVal => {
            flatList.value = flattenTree(newVal);
        }, { immediate: true });
        const selectChange = (node) => {
            node.selected = !node.selected;
            if (selectedKey.value !== node.nodeKey) {
                const preSelectedIndex = flatList.value.findIndex(item => item.nodeKey === selectedKey.value);
                if (preSelectedIndex > -1) {
                    flatList.value[preSelectedIndex].selected = false;
                }
                node.selected = true;
                selectedKey.value = node.nodeKey;
                emit('selectChange', node);
            }
        };
        const checkChange = ([checked, node]) => {
            node.checked = checked;
            if (!props.checkStrictly) {
                updateDownwards(checked, node);
                updateUpwards(node, flatList.value);
            }
            emit('checkChange', node);
        };
        const expandNode = (node, children = []) => {
            const trueChildren = children.length ? children : cloneDeep(node.children);
            node.children = trueChildren.map(item => {
                item.loading = false;
                item.level = item.level || node.level + 1;
                item.disabled = item.disabled || false;
                item.selected = item.selected || false;
                item.expanded = item.expanded || false;
                item.checked = item.checked || node.checked;
                item.children = item.children || [];
                item.hasChildren = item.hasChildren || false;
                item.parentKey = node.nodeKey || null;
                return item;
            });
            const targetIndex = flatList.value.findIndex(item => item.nodeKey === node.nodeKey);
            flatList.value.splice(targetIndex + 1, 0, ...node.children);
        };
        const collapseNode = (targetNode) => {
            const delKeys = [];
            const recursion = (node) => {
                if (node.children?.length) {
                    node.children.forEach(item => {
                        delKeys.push(item.nodeKey);
                        if (item.expanded) {
                            item.expanded = false;
                            recursion(item);
                        }
                    });
                }
            };
            recursion(targetNode);
            if (delKeys.length) {
                flatList.value = flatList.value.filter(item => !delKeys.includes(item.nodeKey));
            }
        };
        const toggleExpand = (node) => {
            if (loading.value)
                return;
            node.expanded = !node.expanded;
            if (node.expanded) {
                if (node.children?.length) {
                    expandNode(node);
                }
                else {
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
            }
            else {
                collapseNode(node);
            }
        };
        /*const renderNodes = () => { // 普通变量没有响应式
          return flatList.value.map(node => {
            return <VirTreeNode
              key={ node.nodeKey }
              node={ node }
              show-checkbox={ props.showCheckbox }
              render={ props.render }
              // @ts-ignore
              onSelectChange={ selectChange }
              onToggleExpand={ toggleExpand }
              onCheckChange={ checkChange }
            />
          });
        }*/
        useExpose({
            getSelectedNode: () => {
                return flatList.value.find(item => item.selected);
            },
            getCheckedNodes: () => {
                return flatList.value.filter(item => item.checked);
            }
        });
        return () => {
            return (<div class="vir-tree">
          {h(VirtualList, {
                class: ['vir-tree-wrap'],
                size: props.size,
                remain: props.remain,
                list: flatList.value,
                dataKey: 'nodeKey',
            }, {
                default: (data) => h(VirTreeNode, {
                    node: data.item,
                    showCheckbox: props.showCheckbox,
                    render: props.render,
                    onSelectChange: selectChange,
                    onToggleExpand: toggleExpand,
                    onCheckChange: checkChange
                })
            })}
        </div>);
        };
    }
});
