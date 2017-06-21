﻿import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../shared/shared.module';
import { TravelsRoutingModule } from './travels-routing.module';

import { TravelsComponent } from './travels.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    TranslateModule.forChild(),
    SharedModule,
    TravelsRoutingModule
  ],
  exports: [
    TravelsComponent
  ],
  declarations: [
    TravelsComponent
  ],
  providers: []
})
export class TravelsModule {
}