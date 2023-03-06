import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilcvComponent } from './profilcv.component';

describe('ProfilcvComponent', () => {
  let component: ProfilcvComponent;
  let fixture: ComponentFixture<ProfilcvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilcvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilcvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
