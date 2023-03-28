import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { SideMeenuComponent } from './shared/side-meenu/side-meenu.component';
import { TokenService } from 'src/services/interceptors/token/token.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
  ],
  declarations: [DashboardPage],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenService, multi: true}]
})
export class DashboardPageModule {}
