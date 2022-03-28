import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TreeComponent } from './tree/tree.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { TreeChecklistExampleComponent } from './tree-checklist-example/tree-checklist-example.component';
import { TreeElementComponent } from './tree-element/tree-element.component';
import { TreeElementListComponent } from './tree-element-list/tree-element-list.component';
import { TreeExampleComponent } from './nested-tree-example/tree-example.component';
import { FlatTreeExampleComponent } from './flat-tree-example/flat-tree-example.component';
import { CheckboxComponent } from './checkbox/checkbox.component';

@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
    TreeChecklistExampleComponent,
    TreeElementComponent,
    TreeElementListComponent,
    TreeExampleComponent,
    FlatTreeExampleComponent,
    CheckboxComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTreeModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
