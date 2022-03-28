import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';

interface CourseNode {
  name: string;
  children?: CourseNode[];
}

const TREE_DATA: CourseNode[] = [
  {
    name: 'father 1',
    children: [
      {
        name: 'son 1',
        children: [
          {
            name: 'grandson 11',
          },
          {
            name: 'grandson 12',
          },
          {
            name: 'grandson 13',
          },
        ],
      },
      { name: 'son 12' },
      {
        name: 'son 13',
      },
    ],
  },
  {
    name: 'mother 1',
    children: [
      {
        name: 'daughter 11',
      },
      {
        name: 'daughter 12',
      },
      {
        name: 'daughter 13',
      },
    ],
  },
];

@Component({
  selector: 'app-tree-example',
  templateUrl: './tree-example.component.html',
  styleUrls: ['./tree-example.component.css'],
})
export class TreeExampleComponent implements OnInit {
  nestedDataSource = new MatTreeNestedDataSource<CourseNode>();

  nestedTreeControl = new NestedTreeControl<CourseNode>(
    (node) => node.children
  );

  hasNestedChild = (_index: number, node: CourseNode) =>
    !!node.children && node.children.length > 0;

  constructor() {}

  ngOnInit(): void {
    this.nestedDataSource.data = TREE_DATA;
  }
}
