import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import {ActivatedRoute} from "@angular/router";
@Component({
selector: 'app-workout-entry',
templateUrl: './workout-entry.page.html',
styleUrls: ['./workout-entry.page.scss'],
})
export class WorkoutEntryPage {
  selectedDate!: Date;
  selectedWorkoutType!: string;
  workoutDescription!: string;
  saveAsCustomWorkout: boolean = false;
  customWorkouts: any[] = [];
  customWorkoutTitle: string = '';
  selectedPredefinedWorkout: any = null;

  constructor(private navCtrl: NavController, private storage: Storage,private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.selectedDate = new Date(params['date']);
    });
  }
  async ngOnInit() {

    // Retrieve saved custom workouts from storage
    await this.storage.create();
    const savedCustomWorkoutsJson = await this.storage.get('customWorkouts');
    if (savedCustomWorkoutsJson) {
      this.customWorkouts = JSON.parse(savedCustomWorkoutsJson);
    }
  }

  navigateBackToDayDetails() {

    this.navCtrl.back()
  }
  async saveWorkout() {
    const workoutEntry = {
      date: this.selectedDate,
      type: this.selectedWorkoutType,
      description: this.workoutDescription,
      title:this.customWorkoutTitle
    };

    // Retrieve existing workout entries from storage
    await this.storage.create(); // Initialize storage if not already initialized
    // Retrieve existing workout entries from storage
    let savedWorkouts: any[] = [];
    const savedWorkoutsJson = await this.storage.get('workoutEntries');

    if (savedWorkoutsJson) {
      savedWorkouts = JSON.parse(savedWorkoutsJson);
    }

    if (this.saveAsCustomWorkout) {
      let customWorkouts: any[] = [];
      const savedCustomWorkoutsJson = await this.storage.get('customWorkouts');

      if (savedCustomWorkoutsJson) {
        customWorkouts = JSON.parse(savedCustomWorkoutsJson);
      }
      customWorkouts.push(workoutEntry);
      await this.storage.set('customWorkouts', JSON.stringify(customWorkouts));
    }

    // Add the new workout entry to the array
    savedWorkouts.push(workoutEntry);

    // Save the updated array back to storage
    await this.storage.set('workoutEntries', JSON.stringify(savedWorkouts));

    console.log('Workout entry saved:', workoutEntry);
    this.navCtrl.back();
  }
  onPredefinedWorkoutChange() {
    // Update input fields with details of the selected predefined workout
    if (this.selectedPredefinedWorkout) {
      this.customWorkoutTitle = this.selectedPredefinedWorkout.title;
      this.workoutDescription = this.selectedPredefinedWorkout.description;
    }}
}
