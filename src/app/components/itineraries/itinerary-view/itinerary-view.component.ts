import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { User, ItineraryDayPlan, ItineraryOverview, Destination } from './../../../objects';

import { ItineraryService } from './../../../services/itinerary.service';
import { FirebaseService } from './../../../services/firebase.service';

@Component({
  selector: 'app-itinerary-view',
  templateUrl: './itinerary-view.component.html',
  styleUrls: ['./itinerary-view.component.css']
})
export class ItineraryViewComponent {

  planToView: ItineraryOverview;
  itineraryToView: ItineraryDayPlan[];
  dayPlanToView: ItineraryDayPlan;
  destinationsToView: Destination[];
  
  constructor(
    private itineraryService: ItineraryService,
    private firebaseService: FirebaseService
  ) {
    this.itineraryService.itineraryPlanSubject.subscribe((data) => {
      this.planToView = data;
      this.itineraryToView = data.itinerary;
      this.dayPlanToView = data.itinerary[0];
      this.destinationsToView = this.dayPlanToView.destinations;
    })
  }

  pushToView(idx: number): void {
    this.dayPlanToView = this.itineraryToView[idx];
    this.destinationsToView = this.dayPlanToView.destinations;
  }

  delete(itinerary): void {
    this.firebaseService.deleteItinerary(itinerary.$key);
    this.planToView = null;
    this.itineraryToView = null;
    this.dayPlanToView = null;
    this.destinationsToView = null;
  }
}
