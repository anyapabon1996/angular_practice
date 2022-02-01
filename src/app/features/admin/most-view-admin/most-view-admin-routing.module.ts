import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MostViewAdminComponent } from './components/most-view-admin/most-view-admin.component';

const routes: Routes =[
  {
    path: '',
    component: MostViewAdminComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class MostViewAdminRoutingModule { }
