import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Learn2Component } from './learn2.component';

describe('Learn2Component', () => {
  let component: Learn2Component;
  let fixture: ComponentFixture<Learn2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Learn2Component]
    });
    fixture = TestBed.createComponent(Learn2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
