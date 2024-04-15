import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-day-details',
  templateUrl: './day-details.page.html',
  styleUrls: ['./day-details.page.scss'],
})
export class DayDetailsPage implements OnInit {

  date!: Date | null;
  savedWorkouts: any[] = [];

  constructor(private route: ActivatedRoute,private router: Router, private storage: Storage) { }

  ngOnInit() {
    this.route.queryParams.subscribe(async params => {
      if (params && params['date']) {
        this.date = new Date(params['date']);
        await this.loadSavedWorkouts()
      } else {
        await this.router.navigate(['/home']);
      }
    });
  }

  navigateToWorkoutEntryPage() {
    this.router.navigate(['/workout-entry'], { queryParams: { date: this.date!.toISOString() } });
  }

  navigateBackHome() {
    this.date = null;
    this.router.navigate(['/']);
  }

  async loadSavedWorkouts() {
    await this.storage.create(); // Initialize storage if not already initialized
    const savedWorkoutsJson = await this.storage.get('workoutEntries');
    let savedWorkouts: any[] = [];

    if (savedWorkoutsJson) {
      savedWorkouts = JSON.parse(savedWorkoutsJson);
      // Filter workouts for the selected date
      this.savedWorkouts = savedWorkouts.filter(workout => new Date(workout.date).toDateString() === this.date!.toDateString());
    }
  }
}
