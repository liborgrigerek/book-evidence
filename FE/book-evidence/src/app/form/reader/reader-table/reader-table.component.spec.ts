import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderTableComponent } from './reader-table.component';

describe('ReaderTableComponent', () => {
  let component: ReaderTableComponent;
  let fixture: ComponentFixture<ReaderTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReaderTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReaderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
