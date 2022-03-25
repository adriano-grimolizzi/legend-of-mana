import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeElementComponent } from './tree-element.component';
import { By } from '@angular/platform-browser';

describe('TreeElementComponent', () => {
  let component: TreeElementComponent;
  let fixture: ComponentFixture<TreeElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TreeElementComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeElementComponent);
    component = fixture.componentInstance;
    component.templateItem = { key: 'Condition', value: '25°C-60HR' };
    fixture.detectChanges();
  });

  it('should create template item and render data', () => {
    const keyElement = fixture.debugElement.query(By.css('.key-class'));
    expect(keyElement.nativeElement.textContent).toEqual('Condition');
    const valueElement = fixture.debugElement.query(By.css('.value-class'));
    expect(valueElement.nativeElement.textContent).toEqual('25°C-60HR');
  });
});
