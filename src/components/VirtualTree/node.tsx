import { computed, defineComponent, PropType, Slot, watch, onMounted } from 'vue';
import {NodeKey, TreeNodeOptions} from "./types";
import VirtualCheckbox from '../VirtualCheckbox';
import RenderNode from './render';
import {SelectionModel} from "../selections";

export default defineComponent({
  name: 'VirTreeNode',
  props: {
    selectedNodes: {
      type: Array as PropType<Required<TreeNodeOptions>[]>,
      required: true
    },
    checkedNodeKeys: {
      type: Array as PropType<NodeKey[]>,
      required: true
    },
    expandedKeys: {
      type: Array as PropType<NodeKey[]>,
      required: true
    },
    disabledKeys: {
      type: Array as PropType<NodeKey[]>,
      required: true
    },
    node: {
      type: Object as PropType<Required<TreeNodeOptions>>,
      required: true
    },
    iconSlot: Function as PropType<Slot>,
    showCheckbox: {
      type: Boolean,
      default: false
    },
    checkStrictly: {
      type: Boolean,
      default: false
    },
    render: Function
  },
  emits: ['selectChange', 'toggleExpand', 'checkChange'],
  setup(props, { emit, expose }) {
    const getCheckedChildrenSize =(): number => {
      let result = 0;
      if (!props.checkStrictly && props.node.hasChildren) {
        const { children } = props.node;
        const checkedChildren = (children as Required<TreeNodeOptions>[])!.filter(item => props.checkedNodeKeys.includes(item.nodeKey));
        result = checkedChildren.length;
      }
      return result;
    }

    const setCheckedStatus = ()=> {
      const checkedChildrenSize = getCheckedChildrenSize();
      const shouldChecked = checkedChildrenSize > 0 && checkedChildrenSize === props.node.children!.length;
      if (shouldChecked && ! props.checkedNodeKeys.includes(props.node.nodeKey)) {
        handleCheckChange(shouldChecked);
      }
    }

    const handleSelect = (event: MouseEvent) => {
      event.stopPropagation();
      if (!props.disabledKeys.includes(props.node.nodeKey)) {
        emit('selectChange', props.node);
      }
    }
    const handleExpand = () => {
      emit('toggleExpand', props.node);
    }
    const handleCheckChange = (checked: boolean) => {
      emit('checkChange', [checked, props.node]);
    }

    watch(() => props.node, () => {
      setCheckedStatus();
    });

    watch(() => props.checkedNodeKeys, newVal => {
      setCheckedStatus();
    });

    onMounted(() => {
      setCheckedStatus();
    });

    const halfChecked = computed(() => {
      let result = false;
      const checkedChildrenSize = getCheckedChildrenSize();
      result = checkedChildrenSize > 0 && checkedChildrenSize < props.node.children!.length;
      return result;
    });

    const textCls = computed(() => {
      let result = 'node-title';
      if (props.selectedNodes[0].nodeKey ===  props.node.nodeKey) {
        result += ' selected';
      }
      if (props.disabledKeys.includes(props.node.nodeKey)) {
        result += ' disabled';
      }
      return result;
    });
    
    const renderArrow = (): JSX.Element | null => {
      return <div class={ ['node-arrow', props.expandedKeys.includes(props.node.nodeKey) ? 'expanded' : ''] }>
        {
          props.node.hasChildren
            ? props.iconSlot ? props.iconSlot(props.node.loading) : props.node.loading
            ? <i class="iconfont iconloading ico-loading" />
            : <i class="iconfont iconExpand" />
            : null
        }
      </div>
    }

    const renderContent = () => {
      if (props.showCheckbox) {
        return <VirtualCheckbox
          class="node-content node-check-box"
          disabled={ props.disabledKeys.includes(props.node.nodeKey) }
          modelValue={ props.checkedNodeKeys.includes(props.node.nodeKey) }
          halfChecked={ halfChecked.value }
          // @ts-ignore
          onChange={ handleCheckChange }>
          {
            props.render ? <RenderNode render={ props.render } node={ props.node } /> : <span class="node-title">{ props.node.name }</span>
          }
        </VirtualCheckbox>;
      }
      return <div class="node-content node-text" onClick={ handleSelect }>
        {
          props.render ? <RenderNode render={ props.render } node={ props.node } /> : <span class={ textCls.value }>{ props.node.name }</span>
        }
      </div>;
    }
    expose({
      rawNode: props.node,
      halfChecked: () => halfChecked.value
    });
    // console.log('iconSlot', props.iconSlot);
    return () => {
      return (
        <div class="vir-tree-node" onClick={ handleExpand } style={{ paddingLeft: props.node.level! * 18 + 'px' }}>
          { renderArrow() }
          { renderContent() }
        </div>
    );
    }
  }
});
