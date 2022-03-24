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
  key: string;
  value: string;
  children?: TreeNode[];
}

const TREE_DATA: TreeNode[] = [
  {
    key: 'Condition',
    value: '25°C-60HR', // condition
    children: [
      {
        key: 'Interval',
        value: '1 month', // interval
        children: [
          {
            key: 'Packaging',
            value: 'Pilulier', // Packaging
            children: [
              {
                key: 'Application',
                value: 'None', // Application
                children: [
                  {
                    key: 'Analysis department',
                    value: 'LDT', // Analysis department
                  },
                  {
                    key: 'Analysis department',
                    value: 'SCQA-Physico', // Analysis department
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
    key: 'Condition',
    value: '40°C-30HR', // condition
    children: [
      {
        key: 'Interval',
        value: '1 month', // interval
        children: [
          {
            key: 'Packaging',
            value: 'Pilulier', // Packaging
            children: [
              {
                key: 'Application',
                value: 'None', // Application
                children: [
                  {
                    key: 'Analysis department',
                    value: 'LDT', // Analysis department
                  },
                  {
                    key: 'Analysis department',
                    value: 'SCQA-Physico', // Analysis department
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  // {
  //   value: '40°C-30HR', // condition
  //   children: [
  //     {
  //       value: '1 month', // interval
  //       children: [
  //         {
  //           value: 'Pilulier', // Packaging
  //           children: [
  //             {
  //               value: '0.1% Conc fabric softener', // Application
  //               children: [
  //                 {
  //                   value: 'CRP', // Analysis department
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     { value: '3 months' },
  //     { value: '18 months' },
  //   ],
  // },
];
