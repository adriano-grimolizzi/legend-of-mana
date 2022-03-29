import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { ChecklistDatabase } from './ChecklistDatabase';

export class TodoNode {
  item: string;
  children: TodoNode[];
}

export class FlatTodoNode {
  item: string;
  level: number;
  expandable: boolean;
}

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  providers: [ChecklistDatabase],
})
export class CheckboxComponent {
  // Helps finding the nested node to be modified
  flatNodeMap = new Map<FlatTodoNode, TodoNode>();

  // Helps keeping the same object for selection
  nestedNodeMap = new Map<TodoNode, FlatTodoNode>();

  selectedParent: FlatTodoNode | null = null;

  newItemName = '';

  treeControl: FlatTreeControl<FlatTodoNode>;

  treeFlattener: MatTreeFlattener<TodoNode, FlatTodoNode>;

  dataSource: MatTreeFlatDataSource<TodoNode, FlatTodoNode>;

  checklistSelection = new SelectionModel<FlatTodoNode>(true /* multiple */);

  constructor(private _database: ChecklistDatabase) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl<FlatTodoNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );

    _database.dataChange.subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  getLevel = (node: FlatTodoNode) => node.level;
  isExpandable = (node: FlatTodoNode) => node.expandable;
  getChildren = (node: TodoNode): TodoNode[] => node.children;
  hasChild = (_index: number, nodeData: FlatTodoNode) => nodeData.expandable;
  hasNoContent = (_index: number, nodeData: FlatTodoNode) =>
    nodeData.item === '';

  transformer = (node: TodoNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode?.item === node.item ? existingNode : new FlatTodoNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  addNewItem(node: FlatTodoNode) {
    const parentNode = this.flatNodeMap.get(node)
    this._database.insertItem(parentNode!, '')
    this.treeControl.expand(node)
  }

  saveNode(node: FlatTodoNode, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node)
    this._database.updateItem(nestedNode!, itemValue)
  }
  
}
