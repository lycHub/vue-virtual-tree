<template>
  <div class="demo">
    <a-input placeholder="回车搜索" @pressEnter="search" />
    <section>
      <vir-tree show-checkbox :source="list" :render="renderNode" />
    </section>
  </div>
</template>

<script lang="tsx">
  import {defineComponent, onMounted, ref} from 'vue';
  import {TreeNodeOptions} from "../components/VirtualTree/types";

  interface TreeNodeOptionsWithParentPath extends TreeNodeOptions {
    parentPath: Array<string | number>;
  }

  const UNIQUE_WRAPPERS = ['##==-open_tag-==##', '##==-close_tag-==##'];
  let expandKeys: Array<string | number> = [];
  function getParentPath (parent: TreeNodeOptionsWithParentPath | null): Array<string | number> {
    let result: Array<string | number> = [];
    if (parent) {
      const base = parent.parentPath || [];
      result = base.concat(parent.nodeKey);
    }
    return result;
  }
  function recursion(path = '0', level = 3, parent: TreeNodeOptionsWithParentPath | null = null): TreeNodeOptionsWithParentPath[] {
    const list = [];
    for (let i = 0; i < 10; i++) {
      const nodeKey = `${path}-${i}`;
      const treeNode: TreeNodeOptionsWithParentPath = {
        nodeKey,
        name: nodeKey,
        children: [],
        hasChildren: true,
        expanded: expandKeys.includes(nodeKey),
        parentPath: getParentPath(parent)
      };

      if (level > 0) {
        treeNode.children = recursion(nodeKey, level - 1, treeNode);
      } else {
        treeNode.hasChildren = false;
      }

      list.push(treeNode);
    }
    return list;
  }

  export default defineComponent({
    name: 'SearchNodeDemo',
    setup(prop, {emit}) {
      const keywords = ref('');
      const list = ref<TreeNodeOptionsWithParentPath[]>([]);

      onMounted(() => {
        list.value = recursion();
        // console.log('list', list.value);
      });
      const formatSearchValue = (value: string) => {
        return new RegExp(value.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$&'), 'i');
      }
      const findMatchedNodes = (keywords: string): TreeNodeOptionsWithParentPath[] => {
        const result: TreeNodeOptionsWithParentPath[] = [];
        const recursion = (list: TreeNodeOptionsWithParentPath[], parent: TreeNodeOptionsWithParentPath | null = null) => {
          for (const item of list) {
            const matched = formatSearchValue(keywords).test(item.name);
            if (matched) {
              result.push(item);
            }
            if (parent) {
              parent.expanded = matched;
            }
            if (item.children?.length) {
              recursion(item.children as TreeNodeOptionsWithParentPath[], item);
            }
          }
        }
        if (keywords) {
          recursion(list.value);
        }
        return result;
      }
      const search = (event: KeyboardEvent) => {
        keywords.value = (event.target as HTMLInputElement).value;
        const matchedNodes = findMatchedNodes(keywords.value);
        if (matchedNodes.length) {
          // 取出parentPath > 拍扁 > 去重
          expandKeys = [...new Set(matchedNodes.map(item => item.parentPath).flat())];
          list.value = recursion();
        }
      }

      const transform = (value: string, matchValue: string) => {
        if (matchValue) {
          const wrapValue = value.replace(formatSearchValue(matchValue), `${UNIQUE_WRAPPERS[0]}$&${UNIQUE_WRAPPERS[1]}`);
          return wrapValue
            .replace(new RegExp(UNIQUE_WRAPPERS[0], 'g'), '<span style="color: #ff2041;">')
            .replace(new RegExp(UNIQUE_WRAPPERS[1], 'g'), '</span>');
        }
        return value;
      }
      const renderNode = (node: TreeNodeOptions) => {
        const content = transform(node.name, keywords.value);
        return <div style="padding: 0 4px;" innerHTML={ content } />;
      }
      return {
        list,
        search,
        renderNode
      }
    }
  });
</script>
