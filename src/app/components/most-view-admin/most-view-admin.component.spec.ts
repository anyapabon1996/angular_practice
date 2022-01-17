import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostViewAdminComponent } from './most-view-admin.component';

describe('MostViewAdminComponent', () => {
  let component: MostViewAdminComponent;
  let fixture: ComponentFixture<MostViewAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostViewAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostViewAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
