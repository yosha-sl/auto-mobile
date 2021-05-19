import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-vehicle-search',
  templateUrl: './vehicle-search.component.html',
  styleUrls: ['./vehicle-search.component.css']
})
export class VehicleSearchComponent implements OnInit {

  result;

  constructor(
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
  }

  onSearch(val) {
    console.log(val);
    // this.result = []
    // this.vehicleService.filter({ carMake: val }).subscribe((res: any) => {
    //   this.result = res.data.allVehicles;
    // });
  }

}
