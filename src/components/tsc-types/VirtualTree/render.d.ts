import { PropType } from "vue";
import { TreeNodeOptions } from "./types";
declare const _default: import("vue").DefineComponent<{
    node: {
        type: PropType<TreeNodeOptions>;
        required: true;
    };
    render: {
        type: FunctionConstructor;
        required: true;
    };
}, () => any, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    node: TreeNodeOptions;
    render: Function;
} & {}>, {}>;
export default _default;
