import { Component } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { TreeNode } from '../model/TreeNode';

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

const TREE_DATA: TreeNode[] = [
  {
    items: [{ key: 'Condition', value: '25°C-60HR' }],
    children: [
      {
        items: [{ key: 'Interval', value: '1 month' }],
        children: [
          {
            items: [{ key: 'Packaging', value: 'Pilulier' }],
            children: [
              {
                items: [{ key: 'Application', value: 'None' }],
                children: [
                  {
                    items: [
                      { key: 'AnalysisDepartment', value: 'LDT' },
                      { key: 'Remark', value: 'Microspie' },
                    ],
                    children: [],
                  },
                  {
                    items: [
                      { key: 'AnalysisDepartment', value: 'SCQA-Physico' },
                      { key: 'Remark', value: 'Microspie' },
                    ],
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
    items: [{ key: 'Condition', value: '40°C-30HR' }],
    children: [
      { items: [{ key: 'Interval', value: '2 month' }], children: [] },
    ],
  },
];
