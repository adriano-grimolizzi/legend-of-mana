import { TemplateItem } from './TemplateItem';

export interface TreeNode {
  item: TemplateItem;
  children?: TreeNode[];
}
