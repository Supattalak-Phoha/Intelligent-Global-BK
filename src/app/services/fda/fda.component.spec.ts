import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdaComponent } from './fda.component';

describe('FdaComponent', () => {
  let component: FdaComponent;
  let fixture: ComponentFixture<FdaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FdaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
