import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReaderComponent } from './delete-reader.component';

describe('DeleteReaderComponent', () => {
  let component: DeleteReaderComponent;
  let fixture: ComponentFixture<DeleteReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteReaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
