import { CardCreateModal } from './card-create-modal/card-create-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '@shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, TranslateModule, ReactiveFormsModule, SharedModule, IonicModule, HomeRoutingModule],
  declarations: [HomeComponent, CardCreateModal],
})
export class HomeModule {}
