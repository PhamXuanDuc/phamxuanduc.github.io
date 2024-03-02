import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/core/services/module/user.service';

@Component({
  selector: 'app-permission-modal',
  templateUrl: './permission-modal.component.html',
  styleUrls: ['./permission-modal.component.scss']
})
export class PermissionModalComponent implements OnInit {

  @Input() title: any;
  @Input() item: any;
  @Input() listCate: any;
  @Input() listRole: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  ngUnsubscribe = new Subject<void>();

  @Input() departmentList: Array<any> = [];
  @Input() groupList: Array<any> = [];

  form: FormGroup;
  isSubmit: boolean;
  loading: boolean = false;
  newitem: any;
  userCodeHasUse = null;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.initForm();
    if (this.item) {
      this.form.patchValue(this.item);
      this.form.value.stastus = this.form.value.stastus === 1 ? true : false;
    }
    console.log("item", this.item);
    console.log("cate", this.form.value);
  }


  initForm() {
    this.form = this.formBuilder.group({
      id: [null],
      action: [null, [Validators.required]],
      menuCode: [null, [Validators.required]],
      roleCode:[null],
      creater: [null],
      createdDate: [null],
      status: [true]
    });
  }
  
  get f() {
    return this.form.controls;
  }

  submit() {
    this.isSubmit = true;
    if (this.form.invalid) {
      console.log('Lỗi form', this.form.value);
      return;
    }
    if (this.item) {
    //  this.update();
    } else {
     // this.create();
    }

  }
}
