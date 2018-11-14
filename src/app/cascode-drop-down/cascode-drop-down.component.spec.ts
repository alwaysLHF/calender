import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CascodeDropDownComponent } from './cascode-drop-down.component';

describe('CascodeDropDownComponent', () => {
  let component: CascodeDropDownComponent;
  let fixture: ComponentFixture<CascodeDropDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CascodeDropDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CascodeDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
