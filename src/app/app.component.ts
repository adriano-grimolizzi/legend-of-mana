import { Component } from '@angular/core';
import { TemplateItem } from './model/TemplateItem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  testTemplateItem: TemplateItem = {
    key: 'Condition',
    value: '40 C-30 HR+',
  };

  items: TemplateItem[] = [
    { key: 'Application', value: 'None' },
    { key: 'AnalysisDepartment', value: 'LDT' },
  ];

  title = 'legend-of-mane';
}
