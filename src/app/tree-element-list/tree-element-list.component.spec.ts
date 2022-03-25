import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeElementListComponent } from './tree-element-list.component';

describe('TreeElementListComponent', () => {
  let component: TreeElementListComponent;
  let fixture: ComponentFixture<TreeElementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeElementListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeElementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
