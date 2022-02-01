import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostViewAdminComponent } from './components/most-view-admin/most-view-admin.component';
import { MostViewAdminRoutingModule } from './most-view-admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MostViewAdminService } from './service/most-view-admin.service';

@NgModule({
  declarations: [
    MostViewAdminComponent,
  ],
  imports: [
    CommonModule,
    MostViewAdminRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    MostViewAdminService
  ]
})
export class MostViewAdminModule { }
