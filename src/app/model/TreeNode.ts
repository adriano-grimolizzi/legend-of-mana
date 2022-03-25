import { TemplateItem } from './TemplateItem';

export interface TreeNode {
  items: TemplateItem[];
  children?: TreeNode[];
}
