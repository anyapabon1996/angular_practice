import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from '../service/movies.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MostViewAdminService } from '../features/admin/most-view-admin/service/most-view-admin.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [
    MoviesService,
    MatIconModule,
    MatButtonModule,
  ]
})
export class MaterialModule { }
