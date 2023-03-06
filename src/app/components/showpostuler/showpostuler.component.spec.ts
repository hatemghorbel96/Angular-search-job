import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowpostulerComponent } from './showpostuler.component';

describe('ShowpostulerComponent', () => {
  let component: ShowpostulerComponent;
  let fixture: ComponentFixture<ShowpostulerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowpostulerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowpostulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
