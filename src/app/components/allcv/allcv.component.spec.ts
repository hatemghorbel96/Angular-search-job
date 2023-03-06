import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcvComponent } from './allcv.component';

describe('AllcvComponent', () => {
  let component: AllcvComponent;
  let fixture: ComponentFixture<AllcvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllcvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllcvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
