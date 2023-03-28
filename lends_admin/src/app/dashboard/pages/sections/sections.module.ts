import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SectionsPageRoutingModule } from './sections-routing.module';

import { SectionsPage } from './sections.page';
import { TableSectionComponent } from './table-section/table-section.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenService } from 'src/services/interceptors/token/token.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SectionsPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [SectionsPage, TableSectionComponent],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenService, multi: true}]
})
export class SectionsPageModule {}
