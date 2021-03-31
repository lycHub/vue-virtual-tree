import { defineComponent } from "vue";
export default defineComponent({
    name: 'RenderNode',
    props: {
        node: {
            type: Object,
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
        };
    }
});
