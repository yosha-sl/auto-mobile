import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleService } from '../vehicle.service';


@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehiclesData: any[];

  hasNextPage = false;
  hasPreviousPage = false;
  endCursor = null;
  startCursor = null;

  constructor(
    private router: Router,
    private vehicleService: VehicleService
  ) { }

  ngOnInit(): void {
    // this.apollo
    //   .query<any>({
    //     query: gql`
    //       {
    //         vehicles{
    //           id,
    //           firstName,
    //           lastName
    //         }
    //       }
    //     `
    //   })
    //   .subscribe(
    //     ({ data, loading }) => {
    //      this.vehiclesData = data.vehicles;
    //     }
    //   );
    this.fetchDataFromGateway(false, false);

  }

  fetchDataFromGateway(isNext: boolean, isPrevious: boolean) {
    return this.vehicleService.findAll(
      {
        isNext: isNext,
        isPrevious: isNext,
        hasNextPage: this.hasNextPage,
        endCursor: this.endCursor,
        hasPreviousPage: this.hasPreviousPage,
        startCursor: this.startCursor
      }
    ).subscribe((res: any) => {
      this.vehiclesData = res.data.allVehiclesByLimitAndOrder.nodes;
      this.hasNextPage = res.data.allVehiclesByLimitAndOrder.pageInfo.hasNextPage;
      this.hasPreviousPage = res.data.allVehiclesByLimitAndOrder.pageInfo.hasPreviousPage;
      this.endCursor = res.data.allVehiclesByLimitAndOrder.pageInfo.endCursor;
      this.startCursor = res.data.allVehiclesByLimitAndOrder.pageInfo.startCursor;
    });
  }

  onView(id) {
    this.router.navigate(['/view', id]);
  }

  onDelete(id) {
    return this.vehicleService.delete(id).subscribe((res: any) => {
      this.fetchDataFromGateway(false, false);
    });
  }

  download(){
    this.vehicleService.download();
  }
}
