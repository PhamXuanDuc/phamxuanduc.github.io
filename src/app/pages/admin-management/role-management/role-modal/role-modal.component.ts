import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { RoleService } from 'src/app/core/services/module/role.service';
import { UserService } from 'src/app/core/services/module/user.service';

@Component({
  selector: 'app-role-modal',
  templateUrl: './role-modal.component.html',
  styleUrls: ['./role-modal.component.scss']
})
export class RoleModalComponent implements OnInit {

  @Input() title: any;
  @Input() item: any;

  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  ngUnsubscribe = new Subject<void>();

  form: FormGroup;
  isSubmit: boolean;
  loading: boolean = false;
  newitem: any;
  userCodeHasUse = null;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private roleService: RoleService,
  ) {
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit() {
    this.initForm();
    if (this.item) {
      this.form.patchValue(this.item);
      this.f.code.disable();
    }
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: [null],
      code: [null, [Validators.required, Validators.maxLength(255)]],
      name: [null, [Validators.required, Validators.maxLength(255)]],
      creater: [null],
      createdDate: [null],
      editer: [null],
      editedDate: [null],
      // status: [true]
    });
  }

  submit() {
    this.isSubmit = true;
    if (this.form.invalid) {
      console.log('Lỗi form', this.form.value);
      return;
    }
    if (this.item) {
      this.update();
    } else {
      this.create();
    }

  }

  create() {
    this.loading = true;

    this.roleService.create(this.form.value).subscribe(res => {
      if(res && res.data) {
        this.toastService.success('Created success');
        this.passEntry.emit(res);
        this.reset();
      } else {
        this.toastService.error(res.errorDesc);
      }
      this.isSubmit = false;
      this.loading = false;
    }, error => {
      this.toastService.error('Create failed');
      this.isSubmit = false;
      this.loading = false;
    });
  }


  update() {
    this.loading = true;
    this.roleService.update(this.form.value).subscribe(res => {
      if(res && res.data) {
        this.toastService.success('Update success');
        this.passEntry.emit(res);
        this.reset();
      } else {
        this.toastService.error(res.errorDesc);
      }
      this.isSubmit = false;
      this.loading = false;
    }, error => {
      this.toastService.error('Update failed');
      this.isSubmit = false;
      this.loading = false;
    });

  }

  reset() {
    this.isSubmit = false;
    this.form.reset();
  }

}
