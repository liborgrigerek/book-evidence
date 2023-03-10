import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRentedBookComponent } from './delete-rented-book.component';

describe('DeleteRentedBookComponent', () => {
  let component: DeleteRentedBookComponent;
  let fixture: ComponentFixture<DeleteRentedBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRentedBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteRentedBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
