import { AnalysisTemplate } from '../model/AnalysisTemplate';
import { TreeNode } from '../model/TreeNode';

const input: AnalysisTemplate = {
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

export class KeySelectorLabel {
  beLabel: string;
  treeLabel: string;
}

export class KeySelector {
  beParentSelector: string;
  properties: KeySelectorLabel[];
  next?: KeySelector;
}

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

const output: TreeNode[] = [
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

const mapBeToTree = (input: any, selector?: KeySelector) => !selector ? [] :
    input[selector.beParentSelector].map((element: any) => ({
        items: selector.properties.map(selector => ({
            key: selector.treeLabel,
            value: element[selector.beLabel]
        })),
        children: mapBeToTree(element, selector.next)
    }))

describe('TreeChecklistExampleComponent', () => {
  fit('should map from BE to FE Tree', () => {
    // expect(mapAnalysisTemplate(input)).toEqual(output);
    expect(mapBeToTree(input, keySelector)).toEqual(output);
  });
});
