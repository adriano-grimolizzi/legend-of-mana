import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AnalysisTemplate } from './model/AnalysisTemplate';
import { KeySelector } from './model/KeySelector';
import { TreeNode } from './model/TreeNode';

const TREE_DATA: AnalysisTemplate = {
  id: 1,
  name: 'AnalysisTemplate1',
  description: 'descr 1',
  conditions: [
    {
      condition: '25°C-60HR',
      intervals: [
        {
          interval: '1 month',
          intervalUnit: 'DAY',
          packagings: [
            {
              packaging: 'Pilulier',
              applications: [
                {
                  application: 'None',
                  analysisDepartments: [
                    {
                      analysisDepartment: 'LDT',
                      remark: 'Microspie',
                    },
                    {
                      analysisDepartment: 'SCQA-Physico',
                      remark: 'Microspie',
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
      condition: '40°C-30HR',
      intervals: [{ interval: '2 month', intervalUnit: 'DAY', packagings: [] }],
    },
  ],
};

const keySelector: KeySelector = {
  beParentSelector: 'conditions',
  properties: [
    {
      beLabel: 'condition',
      treeLabel: 'Condition',
    },
  ],
  next: {
    beParentSelector: 'intervals',
    properties: [
      {
        beLabel: 'interval',
        treeLabel: 'Interval',
      },
    ],
    next: {
      beParentSelector: 'packagings',
      properties: [
        {
          beLabel: 'packaging',
          treeLabel: 'Packaging',
        },
      ],
      next: {
        beParentSelector: 'applications',
        properties: [
          {
            beLabel: 'application',
            treeLabel: 'Application',
          },
        ],
        next: {
          beParentSelector: 'analysisDepartments',
          properties: [
            {
              beLabel: 'analysisDepartment',
              treeLabel: 'AnalysisDepartment',
            },
            {
              beLabel: 'remark',
              treeLabel: 'Remark',
            },
          ],
        },
      },
    },
  },
};

@Injectable()
export class Database {
  dataChange = new BehaviorSubject<TreeNode[]>([]);

  get data(): TreeNode[] {
    return this.dataChange.value;
  }

  constructor() {
    this.initialize();
  }

  initialize() {
    // Builds the tree nodes from Json object.
    const data = this.buildFileTree(TREE_DATA, keySelector);

    // Notify the change
    this.dataChange.next(data);
  }

  buildFileTree = (input: any, selector?: KeySelector) =>
    !selector
      ? []
      : input[selector.beParentSelector].map((element: any) => ({
          items: selector.properties.map((selector) => ({
            key: selector.treeLabel,
            value: element[selector.beLabel],
          })),
          children: this.buildFileTree(element, selector.next),
        }));

  insertItem(parent: TreeNode, name: string) {
    if (parent.children) {
      //   parent.children.push({ item: name } as TreeNode);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: TreeNode, name: string) {
    // node.item = name;
    this.dataChange.next(this.data);
  }
}
