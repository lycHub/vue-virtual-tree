import { computed, defineComponent } from "vue";
import VirtualCheckbox from '../VirtualCheckbox';
import RenderNode from './render';
export default defineComponent({
    name: 'VirTreeNode',
    props: {
        node: {
            type: Object,
            required: true
        },
        showCheckbox: {
            type: Boolean,
            default: false
        },
        render: Function
    },
    emits: ['select-change', 'toggle-expand', 'check-change'],
    setup(props, { emit }) {
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
        };
        const handleExpand = () => {
            emit('toggle-expand', props.node);
        };
        const handleCheckChange = (checked) => {
            emit('check-change', [checked, props.node]);
        };
        const renderArrow = () => {
            return <div class={['node-arrow', props.node.expanded ? 'expanded' : '']}>
        {props.node.hasChildren ? props.node.loading ? <i class="iconfont iconloading"/> : <i class="iconfont iconExpand" onClick={handleExpand}/> : null}
      </div>;
        };
        const renderContent = () => {
            if (props.showCheckbox) {
                // @ts-ignore
                return <VirtualCheckbox class="node-content node-check-box" disabled={props.node.disabled} modelValue={props.node.checked} onChange={handleCheckChange}>
          {props.render ? <RenderNode render={props.render} node={props.node}/> : <span class="node-title">{props.node.name}</span>}
        </VirtualCheckbox>;
            }
            return <div class="node-content node-text" onClick={handleSelect}>
        {props.render ? <RenderNode render={props.render} node={props.node}/> : <span class={textCls.value}>{props.node.name}</span>}
      </div>;
        };
        return () => {
            return (<div class="vir-tree-node" style={{ paddingLeft: props.node.level * 18 + 'px' }}>
          {renderArrow()}
          {renderContent()}
        </div>);
        };
    }
});
