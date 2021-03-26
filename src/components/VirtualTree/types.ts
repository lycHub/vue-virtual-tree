export interface TreeNodeOptions {
  name: string;
  expanded: boolean;
  hasChildren: boolean;
  children: TreeNodeOptions[];
}
