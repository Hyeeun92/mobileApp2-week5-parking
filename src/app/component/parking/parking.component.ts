import { Component, OnInit } from '@angular/core';
import { ParkedCar } from 'src/app/models/parked-car';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css']
})
export class ParkingComponent implements OnInit {

  runningTotal = 0;

  minimumCharge = 2;

  listOfCharges: ParkedCar[] = [];
  selectedRegistration: string = '';
  selectedHours: number = 0;


  constructor() { }

  ngOnInit(): void {
  }

  CalculateChgarge() : void {
    if (isNaN(this.selectedHours) || this.selectedHours <= 0)  {
        return;
    }

    if (this.selectedRegistration?.length == 0) {
      return;
    }

    if (this.listOfCharges.filter(charge => charge.registration == this.selectedRegistration).length > 0 ) {
      return;
    }
    
  
    const currentCharge = this.CalculateparkingCharge(this.selectedHours);
    this.runningTotal += currentCharge;
    let newCar = {
      registration: this.selectedRegistration, 
      hoursParked: this.selectedHours, 
      parkingCharge: currentCharge, 
      runningTotal: this.runningTotal};
    
    this.listOfCharges.push(newCar);
    //this.runningTotal+= this.minimumCharge;
    //this.selectedRegistration = '';

  }

  CalculateparkingCharge(hours: number) : number {
    let partialCharge = .5;

    if (hours <= 3) return this.minimumCharge;

    let totalCharge =  ((hours-3) * partialCharge) + this.minimumCharge;

    return totalCharge <=10 ? totalCharge : 10;
  }

  ResetButton() {
    this.runningTotal = 0;
    this.listOfCharges = [];
    this.selectedRegistration = '';
    this.selectedHours = 0;
  }

}
