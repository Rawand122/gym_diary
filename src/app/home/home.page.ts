import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { MatCalendarCellClassFunction, MatCalendarCellCssClasses } from "@angular/material/datepicker";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  selectedDate!: Date | null;
  datesWithData: Date[] = [];
  dataLoaded = false;
  constructor(private router: Router, private storage: Storage) { }

  async ngOnInit() {
    this.selectedDate = null;
    await this.loadSavedWorkouts();
    this.dataLoaded = true;
  }

  async loadSavedWorkouts() {
    await this.storage.create();
    const savedWorkoutsJson = await this.storage.get('workoutEntries');
    let savedWorkouts: any[] = [];

    if (savedWorkoutsJson) {
      savedWorkouts = JSON.parse(savedWorkoutsJson);
      // Normalize dates
      this.datesWithData = savedWorkouts.map(item => new Date(item.date));
    }
  }

  dateClass(): MatCalendarCellClassFunction<any> {
    return (date: Date): MatCalendarCellCssClasses => {
      const highlight = this.datesWithData.some(d => this.sameDate(date, d));
      return highlight ? 'highlighted' : '';
    };
  }

  sameDate(date1: Date, date2: Date): boolean {
    return date1.toDateString() === date2.toDateString();
  }

  onDateSelected() {
    const selectedDate: Date | null = this.selectedDate;
    if (selectedDate != null) {
      this.selectedDate = null;
      this.router.navigate(['/day-details'], { queryParams: { date: selectedDate } });
    }
  }
}
