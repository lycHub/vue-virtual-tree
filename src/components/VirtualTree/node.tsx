import {computed, defineComponent, PropType, Slot, watch} from "vue";
import {NodeKey, TreeNodeOptions} from "./types";
import VirtualCheckbox from '../VirtualCheckbox';
import RenderNode from './render';
import {SelectionModel} from "../selections";

export default defineComponent({
  name: 'VirTreeNode',
  props: {
    selectedNodes: {
      type: Object as PropType<SelectionModel<Required<TreeNodeOptions>>>,
      required: true
    },
    checkedNodes: {
      type: Object as PropType<SelectionModel<NodeKey>>,
      required: true
    },
    expandedKeys: {
      type: Object as PropType<SelectionModel<NodeKey>>,
      required: true
    },
    disabledKeys: {
      type: Object as PropType<SelectionModel<NodeKey>>,
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
    /*watch(() => props.checkedNodes, newVal => {
      console.log('wat checkedNodes', newVal.selected);
    }, {
      deep: true,
      immediate: true
    });*/
    const halfChecked = computed(() => {
      let result = false;
      if (!props.checkStrictly && props.node.hasChildren) {
        const { children } = props.node;
        const checkedChildren = (children as Required<TreeNodeOptions>[])!.filter(item => props.checkedNodes.isSelected(item.nodeKey));
        result = checkedChildren.length > 0 && checkedChildren.length < children!.length;
      }
      return result;
    });
    const textCls = computed(() => {
      let result = 'node-title';
      if (props.selectedNodes.isSelected(props.node)) {
        result += ' selected';
      }
      if (props.disabledKeys.isSelected(props.node.nodeKey)) {
        result += ' disabled';
      }
      return result;
    });
    const handleSelect = (event: MouseEvent) => {
      event.stopPropagation();
      if (!props.disabledKeys.isSelected(props.node.nodeKey)) {
        emit('selectChange', props.node);
      }
    }
    const handleExpand = () => {
      emit('toggleExpand', props.node);
    }
    const handleCheckChange = (checked: boolean) => {
      emit('checkChange', [checked, props.node])
    }
    const renderArrow = (): JSX.Element | null => {
      return <div class={ ['node-arrow', props.expandedKeys.isSelected(props.node.nodeKey) ? 'expanded' : ''] }>
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
      // console.log('checkedNodes>>>>>>', props.checkedNodes);
      if (props.showCheckbox) {
        return <VirtualCheckbox
          class="node-content node-check-box"
          disabled={ props.disabledKeys.isSelected(props.node.nodeKey) }
          modelValue={ props.checkedNodes.isSelected(props.node.nodeKey) }
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
