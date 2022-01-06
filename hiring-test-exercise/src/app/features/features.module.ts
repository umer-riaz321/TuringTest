import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from 'ngx-bootstrap/modal'

import { FeaturesRoutingModule } from './features-routing.module';
import { ListComponent } from './list/list.component';
import { CallDetailComponent } from './call-detail/call-detail.component';


@NgModule({
  declarations: [
    ListComponent,
    CallDetailComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    ModalModule.forRoot(),
  ]
})
export class FeaturesModule { }
