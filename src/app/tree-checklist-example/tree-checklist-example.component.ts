import { Component, OnInit } from '@angular/core';

export class TemplateItem {
  key: string;
  value: string;
}

export class TemplateNode {
  item: TemplateItem;
  children: TemplateNode[];
}

const testTemplate: any = {
  id: 1,
  name: 'AnalysisTemplate1',
  description: 'descr 1',
  conditions: [
    {
      condition: 'Condition1',
      intervals: [{ interval: 1, intervalUnit: 'DAY', packagings: [] }],
    },
    {
      condition: 'Condition2',
      intervals: [{ interval: 2, intervalUnit: 'DAY', packagings: [] }],
    },
  ],
};

const TREE_DATA = {};

@Component({
  selector: 'app-tree-checklist-example',
  templateUrl: './tree-checklist-example.component.html',
  styleUrls: ['./tree-checklist-example.component.css'],
})
export class TreeChecklistExampleComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
