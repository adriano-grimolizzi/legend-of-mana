import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Fruit loops' }],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
      },
      {
        name: 'Orange',
        children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
      },
    ],
  },
];

interface FlatFoodNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-flat-tree-example',
  templateUrl: './flat-tree-example.component.html',
  styleUrls: ['./flat-tree-example.component.css'],
})
export class FlatTreeExampleComponent implements OnInit {
  private _transformer = (node: FoodNode, level: number) => ({
    expandable: !!node.children && node.children.length > 0,
    name: node.name,
    level: level,
  });

  treeControl = new FlatTreeControl<FlatFoodNode>(
    node => node.level,
    node => node.expandable,
  )

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  )

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_index: number, node: FlatFoodNode) =>
    node.expandable;

  constructor() {}

  ngOnInit(): void {
    this.dataSource.data = TREE_DATA;
  }
}
