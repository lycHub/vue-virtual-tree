import {defineComponent, PropType} from "vue";
import {TreeNodeOptions} from "./types";

export default defineComponent({
    name: 'RenderNode',
    props: {
        node: {
            type: Object as PropType<TreeNodeOptions>,
            required: true
        },
        render: {
            type: Function,
            required: true
        }
    },
    setup(props) {
        return () => {
            return props.render(props.node);
        }
    }
});
