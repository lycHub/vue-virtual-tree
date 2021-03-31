import { defineComponent, computed } from 'vue';
import './index.scss';
export default defineComponent({
    name: 'VirCheckbox',
    props: {
        modelValue: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:modelValue', 'change'],
    setup(props, { emit, slots }) {
        const rootCls = computed(() => {
            let result = 'vir-checkbox';
            if (props.modelValue) {
                result += ' checked';
            }
            if (props.disabled) {
                result += ' disabled';
            }
            return result;
        });
        const handleClick = () => {
            if (!props.disabled) {
                emit('update:modelValue', !props.modelValue);
                emit('change', !props.modelValue);
            }
        };
        return () => {
            return (<div class={rootCls.value} onClick={handleClick}>
          <div class="inner"/>
          {slots.default && slots.default()}
        </div>);
        };
    }
});
