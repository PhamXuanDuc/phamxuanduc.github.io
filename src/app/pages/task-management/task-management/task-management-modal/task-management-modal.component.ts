import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/auth/auth.service';
import { StatusCommonService } from 'src/app/core/services/module/common/status-common.service';
import { DepartmentService } from 'src/app/core/services/module/department.service';
import { TaskService } from 'src/app/core/services/module/task-management/task.service';
import { UserService } from 'src/app/core/services/module/user.service';
import { parseTime } from 'src/app/shared/utils/convert.util';
import { appendExtension, createFileType, downLoadFile } from 'src/app/shared/utils/export.util';
import { parseDataUpload } from 'src/app/shared/utils/upload.util';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-management-modal',
  templateUrl: './task-management-modal.component.html',
  styleUrls: ['./task-management-modal.component.scss']
})
export class TaskManagementModalComponent implements OnInit {
  @Input() title: any;
  @Input() item: any;
  @Input() departmentAll: any;

  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  ngUnsubscribe = new Subject<void>();

  form: FormGroup;
  isSubmit: boolean;
  loading: boolean;

  myFiles: Array<any> = [];
  files: any;

  listDepartment: Array<any> = [];
  listReporter: Array<any> = [];
  listAssignee: Array<any> = [];
  listStatus: Array<any> = [];
  listPriortity: Array<any> = [];

  constructor(
    private taskService: TaskService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private authService: AuthenticationService,
    private departmentSerivice: DepartmentService,
    private userSerivice: UserService,
    private statusCommonService: StatusCommonService,

  ) { }

  ngOnInit() {
    this.initForm();

    if (this.item) {
      let newitem = { ...this.item };
      const startDate = new Date(this.item.startDate);
      newitem.startDate = new NgbDate(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate());
      const dueDate = new Date(this.item.dueDate);
      newitem.dueDate = new NgbDate(dueDate.getFullYear(), dueDate.getMonth() + 1, dueDate.getDate());
      newitem.editer = this.authService.user.userId;
      newitem.reporter = this.authService.user.userCode;

      this.form.patchValue(newitem);
      this.getTaskAttachmentsList(this.item.code);

    }

    this.getValueCP();

  }

  get f() {
    return this.form.controls
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: [null],
      code: [null],
      name: [null, [Validators.required, Validators.maxLength(255)]],
      accountNo: [null, [Validators.required, Validators.maxLength(50)]],
      branch: [null],
      reporter: [null],
      assignee: [null],
      startDate: [null],
      dueDate: [null],
      priortity: [null],
      description: [null, [Validators.required]],
      creater: [this.authService.user.userId],
      editer: [null],
      status: [null]
    });
  }

  getValueCP() {
    this.departmentSerivice.getDepartmentList({}).subscribe(res => {
      if (res) {
        this.listDepartment = res.data;
      }
    })
    this.userSerivice.getUserList({}).subscribe(res => {
      if (res) {
        this.listReporter = res.data;
        this.listAssignee = res.data;
        console.log(res.data)
      }
    })
    this.statusCommonService.findStatusCommon({ varName: 'TASK_STATUS' }).subscribe(res => {
      if (res) {
        this.listStatus = res.data;
      }
    })
    this.statusCommonService.findStatusCommon({ varName: 'TASK_PRIORITY' }).subscribe(res => {
      if (res) {
        this.listPriortity = res.data;
      }
    })
  }

  submit() {
    this.isSubmit = true;
    if (this.form.invalid) {
      return;
    }
    const formValue = this.form.value;
    formValue.startDate = new Date(this.f.startDate.value.year, this.f.startDate.value.month - 1, this.f.startDate.value.day);
    formValue.dueDate = new Date(this.f.dueDate.value.year, this.f.dueDate.value.month - 1, this.f.dueDate.value.day);

    if (this.item) {
      this.update(formValue);
    } else {
      this.create(formValue);
    }
  }



  create(formValue) {
    this.loading = true;

    this.taskService.createTask(formValue).subscribe(res => {
      if (res.errorCode == '0') { //tao task thanh cong
        this.toastService.success('Created success', '');
        const formData = new FormData();
        if (this.files.target.files && this.files.target.files?.length > 0) {
          for (var i = 0; i < Object.values(this.files.target.files).length; i++) {
            const json = {
              taskCode: res.data.code,
              creater: this.authService.user.userCode,
            }
            formData.append('files', this.files.target.files[i]);
            formData.append('info', new Blob([JSON.stringify(json)], { type: 'application/json' }));
          }
          this.taskService.importFile(formData).subscribe(response => {
            if (response ? response.errorCode === '0' : false) {
              this.toastService.success(response.errorDesc, 'Thông báo');
            } else {
              this.toastService.error(response.errorDesc, 'Thông báo');
            }
            this.loading = false;
          });
        }
        this.passEntry.emit(res);
        this.reset();
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


  update(formValue) {
    this.loading = true;
    this.taskService.editTask(formValue).subscribe(res => {
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

  getFileDetails(e) {
    for (var i = 0; i < e.target.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
    }
    this.files = e;
  }

  getTaskAttachmentsList(code) {
    const json = {
      taskCode: code
    }
    this.loading = true;
    this.taskService.findTaskAttachments(json).subscribe(res => {
      console.log(res);

      if (res) {
        this.myFiles = res.data;
      } else {
        this.myFiles = [];
      }
      this.loading = false;
    }, err => {
      this.loading = false;
    })
  }

  downloadFile(id, fileName) {
    this.taskService.exportTaskAttachments({ "id": id, "fileType": "xlsx" }).subscribe(res => {
      if (res) {
        const blob = new Blob([res]);
        console.log(blob)
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = fileName;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
      }
    })
  }

  addFile(e) {
    const formData = new FormData();
    if (e.target.files && e.target.files?.length > 0) {
      for (var i = 0; i < Object.values(e.target.files).length; i++) {
        const json = {
          taskCode: this.item.code,
          creater: this.authService.user.userCode,
        }
        formData.append('files', e.target.files[i]);
        formData.append('info', new Blob([JSON.stringify(json)], { type: 'application/json' }));
      }
      this.taskService.importFile(formData).subscribe(response => {
        if (response ? response.errorCode === '0' : false) {
          this.toastService.success(response.errorDesc, 'Thông báo');
          this.getTaskAttachmentsList(this.item.code)
        } else {
          this.toastService.error(response.errorDesc, 'Thông báo');
        }
        this.loading = false;
      });
    }
  }

  deleteFile(id) {
    Swal.fire({
      // tslint:disable-next-line: max-line-length
      title: 'Dữ liệu bị xóa sẽ không thể khôi phục!',
      html: 'Xác nhận xóa File này?',
      type: 'question',
      imageHeight: 150,
      imageWidth: 320,
      imageClass: 'img-responsive',
      animation: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Đóng',
    }).then((result) => {
      if (result.value) {
        const json = {
          "id": id
        }
        this.taskService.deleteFile(json).subscribe(response => {
          if (response ? response.errorCode === '0' : false) {
            this.toastService.success("Xóa File thành công", 'Thông báo');
            this.getTaskAttachmentsList(this.item.code)
          } else {
            this.toastService.error("Xóa File thất bại", 'Thông báo');
          }
          this.loading = false;
        });
      }
    });
  }


}
