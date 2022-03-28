import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { Database } from './Database';
import { FlatTreeNode, TreeNode } from './model/TreeNode';

@Component({
  selector: 'app-template-tree',
  templateUrl: './template-tree.component.html',
  styleUrls: ['./template-tree.component.css'],
  providers: [Database],
})
export class TemplateTreeComponent {
  // Helps finding the nested node to be modified
  flatNodeMap = new Map<FlatTreeNode, TreeNode>();

  // Helps keeping the same object for selection
  nestedNodeMap = new Map<TreeNode, FlatTreeNode>();

  selectedParent: FlatTreeNode | null = null;

  newItemName = '';

  treeControl: FlatTreeControl<FlatTreeNode>;

  treeFlattener: MatTreeFlattener<TreeNode, FlatTreeNode>;

  dataSource: MatTreeFlatDataSource<TreeNode, FlatTreeNode>;

  checklistSelection = new SelectionModel<FlatTreeNode>(true /* multiple */);

  constructor(private _database: Database) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl<FlatTreeNode>(
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

  getLevel = (node: FlatTreeNode) => node.level;
  isExpandable = (node: FlatTreeNode) => node.expandable;
  getChildren = (node: TreeNode) => node.children;
  hasChild = (_index: number, nodeData: FlatTreeNode) => nodeData.expandable;
  hasNoContent = (_index: number, nodeData: FlatTreeNode) =>
    nodeData.items.length === 0;

  transformer = (node: TreeNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode?.items === node.items ? existingNode : new FlatTreeNode();
    flatNode.items = node.items;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  addNewItem(node: FlatTreeNode) {
    console.log(node);
    const parentNode = this.flatNodeMap.get(node);
    console.log(parentNode)
    this._database.insertItem(parentNode!, '');
    this.treeControl.expand(node);
  }

  saveNode(node: FlatTreeNode, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node);
    this._database.updateItem(nestedNode!, itemValue);
    console.log(node);
  }
}
