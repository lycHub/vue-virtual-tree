const columns = [
  {
    title: '参数',
    dataIndex: 'argument'
  },
  {
    title: '说明',
    dataIndex: 'description'
  },
  {
    title: '类型',
    dataIndex: 'type'
  },
  {
    title: '默认值',
    dataIndex: 'defaultValue'
  },
  {
    title: '版本号',
    dataIndex: 'version'
  }
];
const methodColumns = [
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '说明',
    dataIndex: 'description'
  },
  {
    title: '参数',
    dataIndex: 'type'
  },
  {
    title: '版本号',
    dataIndex: 'version'
  }
];

const propData = [
  {
    argument: 'size',
    description: '用于虚拟计算，每个节点的高度',
    type: 'number',
    defaultValue: 27
  },
  {
    argument: 'remain',
    description: '用于虚拟计算，可视区内显示多少个节点',
    type: 'number',
    defaultValue: 8
  },
  {
    argument: 'source',
    description: '数据源',
    type: 'TreeNodeOptions[]',
    defaultValue: '[]'
  },
  {
    argument: 'showCheckbox',
    description: '勾选模式',
    type: 'boolean',
    defaultValue: 'false'
  },
  {
    argument: 'checkStrictly',
    description: '勾选时，父子不联动',
    type: 'boolean',
    defaultValue: 'false'
  },
  {
    argument: 'loadData',
    description: '异步加载',
    type: '(node: TreeNodeOptions, callback: (children: TreeNodeOptions[]) => void) => void',
    defaultValue: 'undefined'
  },
  {
    argument: 'render',
    description: '自定义渲染节点',
    type: '() => JSX.Element',
    defaultValue: 'undefined'
  },
  {
    argument: 'defaultExpandedKeys',
    description: '默认展开的nodeKey数组',
    type: 'Array<string | number>',
    defaultValue: '[]',
    version: '4.0.0'
  },
  {
    argument: 'defaultDisabledKeys',
    description: '默认禁用的nodeKey数组',
    type: 'Array<string | number>',
    defaultValue: '[]',
    version: '4.0.0'
  },
  {
    argument: 'defaultCheckedKeys',
    description: '默认勾选的nodeKey数组',
    type: 'Array<string | number>',
    defaultValue: '[]',
    version: '4.0.0'
  },
  {
    argument: 'defaultSelectedKey',
    description: '默认选中的nodeKey',
    type: 'string | number',
    defaultValue: '',
    version: '4.0.0'
  },
];
const eventData = [
  {
    name: 'selectChange',
    description: '选择节点时触发',
    type: '{ preSelectedNode: TreeNodeOptions; node: TreeNodeOptions; }，preSelectedNode和node分别是之前选中和当前选中的节点'
  },
  {
    name: 'checkChange',
    description: '勾选节点时触发',
    type: '{ checked: boolean; node: TreeNodeOptions }'
  },
  {
    name: 'toggleExpand',
    description: '展开收起时触发',
    type: '{ status: boolean; node: TreeNodeOptions; }，status是当前的展开状态'
  }
];
const methodData = [
  {
    name: 'getSelectedNode',
    description: '获取选中的节点',
    type: '() => TreeNodeOptions | undefined'
  },
  {
    name: 'getCheckedNodes',
    description: '获取已勾选的节点',
    type: '() => TreeNodeOptions'
  },
  {
    name: 'getHalfCheckedNodes',
    description: '获取半勾选的节点',
    type: '() => TreeNodeOptions'
  },
  {
    name: 'getExpandedKeys',
    description: '获取已展开的nodeKeys',
    type: '() => Array<string | number>',
    version: '4.0.0'
  }
];
const nodeOptionData = [
  {
    argument: 'nodeKey',
    description: '必传，节点的唯一标识',
    type: 'string | number'
  },
  {
    argument: 'name',
    description: '必传，显示的节点名称',
    type: 'string'
  },
  {
    argument: 'hasChildren',
    description: '必传，用于判断是否还有children，控制展开图标的显示',
    type: 'boolean'
  },
  {
    argument: 'level',
    description: '层级，内部计算',
    type: 'number'
  },
  {
    argument: 'loading',
    description: '是否正在加载数据',
    type: 'boolean',
    defaultValue: 'false'
  },
  {
    argument: 'disabled',
    description: '是否禁用',
    type: 'boolean',
    defaultValue: 'false',
    version: '4.0.0已废弃'
  },
  {
    argument: 'expanded',
    description: '是否展开',
    type: 'boolean',
    defaultValue: 'false',
    version: '4.0.0已废弃'
  },
  {
    argument: 'selected',
    description: '是否选中',
    type: 'boolean',
    defaultValue: 'false',
    version: '4.0.0已废弃'
  },
  {
    argument: 'checked',
    description: '是否勾选',
    type: 'boolean',
    defaultValue: 'false',
    version: '4.0.0已废弃'
  },
  {
    argument: 'children',
    description: '子集',
    type: 'TreeNodeOptions[]',
    defaultValue: '[]'
  },
  {
    argument: 'parentKey',
    description: '父节点的nodeKey, 组件内部自动设置',
    type: 'string | number | null',
    defaultValue: 'null'
  },
];

export { columns, methodColumns, propData, eventData, methodData, nodeOptionData };
