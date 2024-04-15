import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { WorkoutEntryPageRoutingModule } from './workout-entry-routing.module';

import { WorkoutEntryPage } from './workout-entry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkoutEntryPageRoutingModule,  IonicStorageModule.forRoot()
  ],
  declarations: [WorkoutEntryPage]
})
export class WorkoutEntryPageModule {}
