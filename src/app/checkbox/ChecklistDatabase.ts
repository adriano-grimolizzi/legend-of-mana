import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoNode } from './checkbox.component';

const TREE_DATA = {
  Groceries: {
    'Almond Meal flour': null,
    'Organic eggs': null,
    'Protein Powder': null,
    Fruits: {
      Apple: null,
      Berries: ['Blueberry', 'Raspberry'],
      Orange: null,
    },
  },
  Reminders: [
    'Cook dinner',
    'Read the Material Design spec',
    'Upgrade Application to Angular',
  ],
};

@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<TodoNode[]>([]);

  get data(): TodoNode[] {
    return this.dataChange.value;
  }

  constructor() {
    this.initialize();
  }

  initialize() {
    // Builds the tree nodes from Json object.
    const data = this.buildFileTree(TREE_DATA, 0);

    // Notify the change
    this.dataChange.next(data);
  }

  buildFileTree = (obj: { [key: string]: any }, level: number): TodoNode[] =>
    Object.keys(obj).reduce<TodoNode[]>((accumulator, key) => {
      const value = obj[key]; // the Json object, or a sub-tree of a Json object
      const node = new TodoNode();
      node.item = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.item = value;
        }
      }

      return accumulator.concat(node);
    }, []);

  insertItem(parent: TodoNode, name: string) {
    if (parent.children) {
      parent.children.push({item: name} as TodoNode);
      this.dataChange.next(this.data)
    }
  }

  updateItem(node: TodoNode, name: string) {
    node.item = name;
    this.dataChange.next(this.data);
  }
}
