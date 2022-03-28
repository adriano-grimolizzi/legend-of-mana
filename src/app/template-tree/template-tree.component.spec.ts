import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateTreeComponent } from './template-tree.component';

describe('TemplateTreeComponent', () => {
  let component: TemplateTreeComponent;
  let fixture: ComponentFixture<TemplateTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
