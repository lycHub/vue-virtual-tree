import { PropType, Slot } from "vue";
import { TreeNodeOptions } from "./types";
declare const _default: import("vue").DefineComponent<{
    node: {
        type: PropType<Required<TreeNodeOptions>>;
        required: true;
    };
    iconSlot: PropType<Slot>;
    showCheckbox: {
        type: BooleanConstructor;
        default: boolean;
    };
    checkStrictly: {
        type: BooleanConstructor;
        default: boolean;
    };
    render: FunctionConstructor;
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("select-change" | "toggle-expand" | "check-change")[], "select-change" | "toggle-expand" | "check-change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    node: Required<TreeNodeOptions>;
    showCheckbox: boolean;
    checkStrictly: boolean;
} & {
    render?: Function | undefined;
    iconSlot?: Slot | undefined;
}>, {
    showCheckbox: boolean;
    checkStrictly: boolean;
}>;
export default _default;
