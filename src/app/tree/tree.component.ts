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
 * Each node has a name and an optional list of children.
 */
interface TreeNode {
  name: string;
  children?: TreeNode[];
}

const TREE_DATA: TreeNode[] = [
  {
    name: '25°C-60HR', // condition
    children: [
      {
        name: '1 month', // interval
        children: [
          {
            name: 'Pilulier', // Packaging
            children: [
              {
                name: 'None', // Application
                children: [
                  {
                    name: 'LDT', // Analysis department
                  },
                  {
                    name: 'SCQA-Physico', // Analysis department
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
    name: '40°C-30HR', // condition
    children: [
      {
        name: '1 month', // interval
        children: [
          {
            name: 'Pilulier', // Packaging
            children: [
              {
                name: '0.1% Conc fabric softener', // Application
                children: [
                  {
                    name: 'CRP', // Analysis department
                  },
                ],
              },
            ],
          },
        ],
      },
      { name: '3 months' },
      { name: '18 months' },
    ],
  },
];
