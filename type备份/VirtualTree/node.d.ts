import { PropType } from "vue";
import { TreeNodeOptions } from "./types";
declare const _default: import("vue").DefineComponent<{
    node: {
        type: PropType<TreeNodeOptions>;
        required: true;
    };
    showCheckbox: {
        type: BooleanConstructor;
        default: boolean;
    };
    render: FunctionConstructor;
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("select-change" | "toggle-expand" | "check-change")[], "select-change" | "toggle-expand" | "check-change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    showCheckbox: boolean;
    node: TreeNodeOptions;
} & {
    render?: Function | undefined;
}>, {
    showCheckbox: boolean;
}>;
export default _default;
