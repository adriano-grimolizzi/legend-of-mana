import { Component, Input } from '@angular/core';
import { TemplateItem } from '../model/TemplateItem';

@Component({
  selector: 'app-tree-element-list',
  templateUrl: './tree-element-list.component.html',
  styleUrls: ['./tree-element-list.component.css']
})
export class TreeElementListComponent {

  @Input()
  treeElementList: TemplateItem[]


}
