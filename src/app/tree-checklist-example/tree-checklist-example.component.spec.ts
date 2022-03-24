import { AnalysisTemplate } from '../model/AnalysisTemplate';

interface TreeNode {
  item: TemplateItem;
  children?: TreeNode[];
}

interface TemplateItem {
  key: string;
  value: string;
}

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
                    },
                    {
                      analysisDepartment: 'SCQA-Physico',
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

export class KeySelector {
  backEndArrayKey: string;
  backEndObjectKey: string;
  nodeKey: string;
  next?: KeySelector;
}

const keySelector: KeySelector = {
  backEndArrayKey: 'conditions',
  backEndObjectKey: 'condition',
  nodeKey: 'Condition',
  next: {
    backEndArrayKey: 'intervals',
    backEndObjectKey: 'interval',
    nodeKey: 'Interval',
    next: {
      backEndArrayKey: 'packagings',
      backEndObjectKey: 'packaging',
      nodeKey: 'Packaging',
      next: {
        backEndArrayKey: 'applications',
        backEndObjectKey: 'application',
        nodeKey: 'Application',
        next: {
          backEndArrayKey: 'analysisDepartments',
          backEndObjectKey: 'analysisDepartment',
          nodeKey: 'AnalysisDepartment',
        },
      },
    },
  },
};

const output: TreeNode[] = [
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

const mapObjectToTree = (object: any, keySelector?: KeySelector) => {
  if (!keySelector) {
    return [];
  }

  const currentLevel = object[keySelector.backEndArrayKey];

  const mappedLevel = currentLevel.map((element: any) => ({
    item: {
      key: keySelector.nodeKey,
      value: element[keySelector.backEndObjectKey],
    },
    children: mapObjectToTree(element, keySelector.next),
  }));

  return mappedLevel;
};

describe('TreeChecklistExampleComponent', () => {
  fit('should create', () => {
    // expect(mapAnalysisTemplate(input)).toEqual(output);
    expect(mapObjectToTree(input, keySelector)).toEqual(output);
  });
});
