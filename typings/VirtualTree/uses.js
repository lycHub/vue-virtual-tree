import { getCurrentInstance } from "vue";
function flattenTree(source) {
    const result = [];
    function recursion(list, level = 0, parent = null) {
        return list.map(item => {
            const flatNode = {
                ...item,
                level,
                loading: false,
                disabled: item.disabled || false,
                expand: item.expanded || false,
                selected: item.selected || false,
                checked: item.checked || parent?.checked || false,
                hasChildren: item.hasChildren || false,
                parentKey: parent?.nodeKey || null
            };
            result.push(flatNode);
            if (item.expanded && item.children?.length) {
                flatNode.children = recursion(item.children, level + 1, flatNode);
            }
            else {
                flatNode.children = flatNode.children || [];
            }
            return flatNode;
        });
    }
    recursion(source);
    return result;
}
function updateDownwards(checked, node) {
    const update = (children) => {
        if (children.length) {
            children.forEach(child => {
                child.checked = checked;
                if (child.children?.length) {
                    update(child.children);
                }
            });
        }
    };
    update(node.children);
}
function updateUpwards(targetNode, flatList) {
    const update = (node) => {
        if (node.parentKey != null) { // 说明是子节点
            const parentNode = flatList.find(item => item.nodeKey == node.parentKey);
            // console.log('parentNode', parentNode);
            const parentChecked = !parentNode.children.some(child => !child.checked);
            if (parentChecked !== parentNode.checked) { // 父节点变了的话，就还要继续向上更新
                parentNode.checked = parentChecked;
                update(parentNode);
            }
        }
    };
    update(targetNode);
}
function useExpose(apis) {
    const instance = getCurrentInstance();
    if (instance) {
        Object.assign(instance.proxy, apis);
    }
}
export { flattenTree, updateUpwards, updateDownwards, useExpose };
