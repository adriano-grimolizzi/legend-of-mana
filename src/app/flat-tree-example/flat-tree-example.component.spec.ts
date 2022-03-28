import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatTreeExampleComponent } from './flat-tree-example.component';

describe('FlatTreeExampleComponent', () => {
  let component: FlatTreeExampleComponent;
  let fixture: ComponentFixture<FlatTreeExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlatTreeExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlatTreeExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
