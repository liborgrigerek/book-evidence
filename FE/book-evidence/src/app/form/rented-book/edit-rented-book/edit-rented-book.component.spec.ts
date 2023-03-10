import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRentedBookComponent } from './edit-rented-book.component';

describe('EditRentedBookComponent', () => {
  let component: EditRentedBookComponent;
  let fixture: ComponentFixture<EditRentedBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRentedBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRentedBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
