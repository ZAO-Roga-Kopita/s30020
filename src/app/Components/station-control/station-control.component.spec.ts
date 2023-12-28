import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationControlComponent } from './station-control.component';

describe('StationControlComponent', () => {
  let component: StationControlComponent;
  let fixture: ComponentFixture<StationControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StationControlComponent]
    });
    fixture = TestBed.createComponent(StationControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
