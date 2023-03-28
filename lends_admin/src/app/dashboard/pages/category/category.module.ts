import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryPageRoutingModule } from './category-routing.module';

import { CategoryPage } from './category.page';
import { DashboardPageRoutingModule } from '../../dashboard-routing.module';
import { DashboardPageModule } from '../../dashboard.module';
import { TableCategoryComponent } from './table-category/table-category.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenService } from 'src/services/interceptors/token/token.service';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryPageRoutingModule,
    DashboardPageRoutingModule,
    DashboardPageModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [CategoryPage, TableCategoryComponent],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenService, multi: true}, CookieService]
})
export class CategoryPageModule {}
