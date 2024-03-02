import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/auth/auth.service';
import { DepartmentService } from 'src/app/core/services/module/department.service';

@Component({
  selector: 'app-department-add',
  templateUrl: './department-modal.component.html',
  styleUrls: ['./department-modal.component.scss']
})
export class DepartmentModalComponent implements OnInit {

  @Input() title: any;
  @Input() item: any;
  @Input() departmentAll: any;

  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  ngUnsubscribe = new Subject<void>();

  form: FormGroup;
  isSubmit:  boolean;
  loading: boolean;
  
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private departmentService: DepartmentService,
    private toastService: ToastrService,
    private authService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.initForm();
    if(this.item) {
      this.form.patchValue(this.item);
      this.f.editer.setValue(this.authService.user.userId);
    }
  }

  get f() {
    return this.form.controls
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: [null],
      code: [null, [Validators.required, Validators.maxLength(50)]],
      name: [null, [Validators.required, Validators.maxLength(255)]],
      nameEn: [null, [Validators.required, Validators.maxLength(255)]],
      pid: [null],
      creater: [this.authService.user.userId],
      editer: [null],
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
    this.departmentService.createDepartment(this.form.value).subscribe(res => {
      if (res.errorCode == '0') {
        this.toastService.success('Created success', '');
        this.passEntry.emit(res);
        this.reset();
      } else if (res.errorCode == '-1') {
        this.toastService.error('Department code already exists', '');
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
    this.departmentService.updateDepartment(this.form.value).subscribe(res => {
      if (res.errorCode == '0') {
        this.toastService.success('Updated success', '');
        this.passEntry.emit(res);
        this.reset();
      } else {
        this.toastService.error('Update failed', '');
      }
      this.isSubmit = false;
        this.loading = false;
    }, error => {
      this.toastService.error('Update failed', '');
      this.isSubmit = false;
      this.loading = false;
    });
  }

  reset() {
    this.isSubmit = false;
    this.form.reset();
    this.item = null;
    this.f.status.setValue('Y');
  }
  
}
