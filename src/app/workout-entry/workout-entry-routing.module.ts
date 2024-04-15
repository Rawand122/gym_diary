import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage-angular';
import { WorkoutEntryPage } from './workout-entry.page';

const routes: Routes = [
  {
    path: '',
    component: WorkoutEntryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkoutEntryPageRoutingModule {}
