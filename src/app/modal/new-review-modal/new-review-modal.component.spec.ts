import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReviewModalComponent } from './new-review-modal.component';

describe('NewReviewModalComponent', () => {
  let component: NewReviewModalComponent;
  let fixture: ComponentFixture<NewReviewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewReviewModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewReviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
