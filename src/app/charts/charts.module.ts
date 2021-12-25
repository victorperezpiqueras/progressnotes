import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  imports: [CommonModule, TranslateModule, IonicModule, ChartsRoutingModule, NgChartsModule],
  declarations: [ChartsComponent],
})
export class ChartsModule {}
