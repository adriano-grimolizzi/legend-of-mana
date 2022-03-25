import { Component, Input } from '@angular/core';
import { TemplateItem } from '../model/TemplateItem';

@Component({
  selector: 'app-tree-element',
  templateUrl: './tree-element.component.html',
  styleUrls: ['./tree-element.component.css']
})
export class TreeElementComponent {

  @Input()
  templateItem?: TemplateItem;
}
