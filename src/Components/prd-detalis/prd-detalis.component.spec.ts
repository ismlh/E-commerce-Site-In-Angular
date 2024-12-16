import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrdDetalisComponent } from './prd-detalis.component';

describe('PrdDetalisComponent', () => {
  let component: PrdDetalisComponent;
  let fixture: ComponentFixture<PrdDetalisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrdDetalisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrdDetalisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
