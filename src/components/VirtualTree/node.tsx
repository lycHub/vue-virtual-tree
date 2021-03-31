import {computed, defineComponent, PropType} from "vue";
import {TreeNodeInstance, TreeNodeOptions} from "./types";
import VirtualCheckbox from '../VirtualCheckbox';
import RenderNode from './render';
import {useExpose} from "@/components/VirtualTree/uses";

export default defineComponent({
  name: 'VirTreeNode',
  props: {
    node: {
      type: Object as PropType<TreeNodeOptions>,
      required: true
    },
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
  emits: ['select-change', 'toggle-expand', 'check-change'],
  setup(props, { emit }) {
    const halfChecked = computed(() => {
      let result = false;
      if (!props.checkStrictly && props.node.hasChildren) {
        const { children } = props.node;
        const checkedChildren = children!.filter(item => item.checked);
        result = checkedChildren.length > 0 && checkedChildren.length < children!.length;
      }
      return result;
    });
    const textCls = computed(() => {
      let result = 'node-title';
      if (props.node.selected) {
        result += ' selected';
      }
      if (props.node.disabled) {
        result += ' disabled';
      }
      return result;
    });
    const handleSelect = () => {
      if (!props.node.disabled) {
        emit('select-change', props.node);
      }
    }
    const handleExpand = () => {
      emit('toggle-expand', props.node);
    }
    const handleCheckChange = (checked: boolean) => {
      emit('check-change', [checked, props.node])
    }
    const renderArrow = (): JSX.Element | null => {
      return <div class={ ['node-arrow', props.node.expanded ? 'expanded' : ''] }>
        {
          props.node.hasChildren ? props.node.loading ? <i class="iconfont iconloading" /> : <i class="iconfont iconExpand" onClick={ handleExpand } /> : null
        }
      </div>
    }

    const renderContent = () => {
      if (props.showCheckbox) {
        return <VirtualCheckbox
          class="node-content node-check-box"
          disabled={ props.node.disabled }
          modelValue={ props.node.checked }
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
    useExpose<TreeNodeInstance>({
      rawNode: props.node,
      halfChecked: () => halfChecked.value
    });
    return () => {
      return (
        <div class="vir-tree-node" style={{ paddingLeft: props.node.level! * 18 + 'px' }}>
          { renderArrow() }
          { renderContent() }
        </div>
    );
    }
  }
});
