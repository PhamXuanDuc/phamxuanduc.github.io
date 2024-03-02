import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-import-error-admin-modal',
  templateUrl: './import-error-admin-modal.component.html',
  styleUrls: ['./import-error-admin-modal.component.scss']
})
export class ImportErrorAdminModalComponent implements OnInit {
  @Input() listError: Array<any> = [];
  constructor(public activeModal: NgbActiveModal,
    private modalService: NgbModal) { }

  ngOnInit(): void {
  }

}
