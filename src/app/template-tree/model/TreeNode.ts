export interface Item {
  key: string;
  value: string;
}

export class TreeNode {
  items: Item[];
  children?: TreeNode[];
}

export class FlatTreeNode {
  items: Item[];
  level: number;
  expandable: boolean;
}