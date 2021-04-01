declare const _default: import("vue").DefineComponent<{
    list: {
        type: ArrayConstructor;
        default: () => never[];
    };
    customForOf: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: NumberConstructor;
        required: true;
    };
    remain: {
        type: NumberConstructor;
        required: true;
    };
    start: {
        type: NumberConstructor;
        default: number;
    };
    offset: {
        type: NumberConstructor;
        default: number;
    };
    additional: {
        type: NumberConstructor;
        default: number;
    };
    dataKey: {
        type: StringConstructor;
        default: string;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "range")[], "update:modelValue" | "range", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    list: unknown[];
    customForOf: boolean;
    size: number;
    remain: number;
    start: number;
    offset: number;
    additional: number;
    dataKey: string;
} & {}>, {
    list: unknown[];
    customForOf: boolean;
    start: number;
    offset: number;
    additional: number;
    dataKey: string;
}>;
export default _default;
