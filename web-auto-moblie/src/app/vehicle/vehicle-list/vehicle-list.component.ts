import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/shared/component/modal/modal.component';
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

  readyToDownload = false;

  constructor(
    private router: Router,
    private vehicleService: VehicleService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.fetchDataFromGateway(false, false);
    this.onSearch("", false, false);
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

  download(filterVal) {
    this.readyToDownload = false;
    this.vehicleService.download(filterVal);
  }

  onOpenConfirmationModal(vehicleID, vehicleName) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.vehicleDetails = `${vehicleID} | ${vehicleName}`;
    modalRef.componentInstance.passStatus.subscribe((result: boolean) => {
      if (result) {
        this.onDelete(vehicleID);
      }
    });
  }

  onSearch(val, isNext, isPrevious) {
    this.vehicleService.filter({
      isNext: isNext,
      isPrevious: isPrevious,
      hasNextPage: this.hasNextPage,
      hasPreviousPage: this.hasPreviousPage,
      carMake: val,
      endCursor: this.endCursor,
      startCursor: this.startCursor
    }).subscribe((res: any) => {
      this.vehiclesData = res.data.allVehicles.nodes;
      this.hasNextPage = res.data.allVehicles.pageInfo.hasNextPage;
      this.hasPreviousPage = res.data.allVehicles.pageInfo.hasPreviousPage;
      this.endCursor = res.data.allVehicles.pageInfo.endCursor;
      this.startCursor = res.data.allVehicles.pageInfo.startCursor;
    });
  }
}
