import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Input() public vehicleDetails: string;
  @Output() passStatus: EventEmitter<any> = new EventEmitter();

  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  onConfirmation(status: boolean) {
    this.passStatus.emit(status);
    this.modal.dismiss('Cross click')
  }

}
