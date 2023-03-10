import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentedBookTableComponent } from './rented-book-table.component';

describe('RentedBookTableComponent', () => {
  let component: RentedBookTableComponent;
  let fixture: ComponentFixture<RentedBookTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentedBookTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentedBookTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
