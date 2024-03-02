import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/auth/auth.service';
import { CategoryService } from 'src/app/core/services/module/category.service';
import { RoleService } from 'src/app/core/services/module/role.service';
import { UserService } from 'src/app/core/services/module/user.service';
import {dataIcon} from './data-icon';

@Component({
  selector: 'app-menu-modal',
  templateUrl: './menu-modal.component.html',
  styleUrls: ['./menu-modal.component.scss']
})
export class MenuModalComponent implements OnInit {

  @Input() title: any;
  @Input() item: any;
  @Input() listMenu: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  ngUnsubscribe = new Subject<void>();

  form: FormGroup;
  isSubmit: boolean;
  loading: boolean = false;
  newitem: any;
  userCodeHasUse = null;
  listIcon: Array<any> = dataIcon;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private categoryService: CategoryService,
    private authService: AuthenticationService,
  ) {
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit() {
    this.initForm();
    if (this.item) {
      this.form.patchValue(this.item);
      this.form.controls.code.disable();
    }
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: [null],
      code: [null, [Validators.required, Validators.maxLength(50)]],
      name: [null, [Validators.required, Validators.maxLength(255)]],
      nameEn: [null, [Validators.required, Validators.maxLength(255)]],
      icon: [null,],
      path: [null, [Validators.required, Validators.maxLength(255)]],
      parentId:[null],
      creater: [this.authService.user.userId],
      createdDate: [null],
      priority: [null],
      status: ['Y']
    });
  }

  submit() {
    this.isSubmit = true;
    if (this.form.invalid) {
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
    this.categoryService.create(this.form.value).subscribe(res => {
      if (res.errorCode === '0') {
        this.toastService.success(res.errorDesc, '');
        this.passEntry.emit(res);
        this.reset();
      } else if (res.errorCode === '1') {

        this.toastService.error(res.errorDesc, '');
      } else {
        this.toastService.error('Create failed', '');
      }
      this.isSubmit = false;
      this.loading = false;
    }, error => {
      this.toastService.error('Create failed', '');
      this.isSubmit = false;
      this.loading = false;
    });
  }


  update() {
    this.loading = true;
    const json={
      id: this.item.id,
      code: this.form.value.code,
      name: this.form.value.name,
      nameEn: this.form.value.nameEn,
      icon: this.form.value.icon,
      path: this.form.value.path,
      parentId: this.form.value.parentId,
      status: this.form.value.status,
      priority: this.form.value.priority,
    }
    this.categoryService.update(json).subscribe(res => {
      this.isSubmit = false;
      this.loading = false;
      if (res.errorCode === '0') {
        this.toastService.success('update success', '');
        this.passEntry.emit(res);
        this.reset();
      } else if (res.errorCode === '1') {

        this.toastService.error(res.errorDesc, '');
      } else {
        this.toastService.error('update failed', '');
      }
    }, error => {
      this.toastService.error('update failed', '');
      this.isSubmit = false;
      this.loading = false;
    });
  }

  reset() {
    this.isSubmit = false;
    this.form.reset();
    this.f.status.setValue(true);
  }
}
