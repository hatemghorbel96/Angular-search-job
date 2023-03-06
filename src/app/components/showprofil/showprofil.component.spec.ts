import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowprofilComponent } from './showprofil.component';

describe('ShowprofilComponent', () => {
  let component: ShowprofilComponent;
  let fixture: ComponentFixture<ShowprofilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowprofilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowprofilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
