import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListfavorieComponent } from './listfavorie.component';

describe('ListfavorieComponent', () => {
  let component: ListfavorieComponent;
  let fixture: ComponentFixture<ListfavorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListfavorieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListfavorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
