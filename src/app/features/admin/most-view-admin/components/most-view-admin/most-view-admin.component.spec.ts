import { ComponentFixture, TestBed } from '@angular/core/testing';
import { adminMock } from 'src/app/features/admin/most-view-admin/service/admin.service.mock';
import { MostViewService } from 'src/app/service/most-view.service';
import { MostViewMockService } from 'src/app/service/mostViewMock.service.mock';
import { MostViewAdminService } from '../../service/most-view-admin.service';

import { MostViewAdminComponent } from './most-view-admin.component';

fdescribe('MostViewAdminComponent', () => {
  let component: MostViewAdminComponent;
  let fixture: ComponentFixture<MostViewAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostViewAdminComponent ],
      //conexion con mock
      providers: [
        {
        provide: MostViewAdminService,
        useValue: adminMock
        },
        {
          provide: MostViewService,
          useValue: MostViewMockService
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostViewAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //Realizamos un test unitario de creacion de componente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Realizamos test unitario sobre titulo
  it('should updateTitle property be "You can modify any movie providing its id and replacing the inputs content"', () => {
    expect(component.updateTitle).toBe("You can modify any movie providing its id and replacing the inputs content");
  });

  //realizamos un test unitario sobre renderizacion de titulo
  it('should render updateTitle', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.update-title').textContent).toContain('You can modify any movie providing its id and replacing the inputs content')
  });


});
