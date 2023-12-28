import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-station-control',
  templateUrl: './station-control.component.html',
  styleUrls: ['./station-control.component.css']
})
export class StationControlComponent {
    scheduleFormGroup = new FormGroup({
      chargePercent: new FormControl(),
      maxChargeCurrent: new FormControl(),
      maxTemperature: new FormControl(),
      maxVoltage: new FormControl(),
      startTime: new FormControl(),
      endTime: new FormControl(),
    })

    chargePercent: number = 0;
    chargeCurrent: number = 0;
    maxTemperature: number = 0;
    maxVoltage: number = 0;

    schedule: any = [{
      chargePercent: 60,
      maxChargeCurrent: 100,
      maxTemperature: 100,
      maxVoltage: 100,
      startTime: '00:00',
      endTime: '08:00',
    },];

    onChargePercentChange(event: any) {
      this.chargePercent = event.target.value;
    }

    onChargeCurrentChange(event: any){
      this.chargeCurrent = event.target.value;
    }

    onTemperatureChange(event: any) {
      this.maxTemperature = event.target.value;
    }

    onVoltageChange(event: any) {
      this.maxVoltage = event.target.value;
    }

    submit() {
      this.schedule.push(this.scheduleFormGroup.value);
      console.log(this.schedule)
    }
}
