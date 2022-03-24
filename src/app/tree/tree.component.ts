import { Component } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

@Component({
  selector: 'app-tree-component',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
})
export class TreeComponent {
  treeControl = new NestedTreeControl<TreeNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<TreeNode>();

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: TreeNode) =>
    !!node.children && node.children.length > 0;
}

/**
 * Food data with nested structure.
 * Each node has a key, a value and an optional list of children.
 */
interface TreeNode {
  item: TemplateItem;
  children?: TreeNode[];
}

interface TemplateItem {
  key: string;
  value: string;
}

const TREE_DATA: TreeNode[] = [
  {
    item: { key: 'Condition', value: '25°C-60HR' },
    children: [
      {
        item: { key: 'Interval', value: '1 month' },
        children: [
          {
            item: { key: 'Packaging', value: 'Pilulier' },
            children: [
              {
                item: { key: 'Application', value: 'None' },
                children: [
                  {
                    item: { key: 'AnalysisDepartment', value: 'LDT' },
                    children: [],
                  },
                  {
                    item: { key: 'AnalysisDepartment', value: 'SCQA-Physico' },
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    item: { key: 'Condition', value: '40°C-30HR' },
    children: [{ item: { key: 'Interval', value: '2 month' }, children: [] }],
  },
];
