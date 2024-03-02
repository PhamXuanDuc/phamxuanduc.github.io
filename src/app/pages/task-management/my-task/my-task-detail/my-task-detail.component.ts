import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/auth/auth.service';
import { StatusCommonService } from 'src/app/core/services/module/common/status-common.service';
import { DepartmentService } from 'src/app/core/services/module/department.service';
import { TaskService } from 'src/app/core/services/module/task-management/task.service';
import { UserService } from 'src/app/core/services/module/user.service';
import { ShareDataService } from 'src/app/share-data.service';
import Swal from 'sweetalert2';
import { MyTaskCommentModalComponent } from '../my-task-comment-modal/my-task-comment-modal.component';
import { MyTaskModalComponent } from '../my-task-modal/my-task-modal.component';

@Component({
  selector: 'app-my-task-detail',
  templateUrl: './my-task-detail.component.html',
  styleUrls: ['./my-task-detail.component.scss']
})
export class MyTaskDetailComponent implements OnInit {
  ngUnsubscribe = new Subject<void>();

  breadCrumbItems: Array<{}>;

  itemToggles = [];

  isCollapsed = true;
  isCollapsed1 = true;
  isCollapsed2 = true;
  isCollapsed3 = true;
  isCollapsed4 = true;

  //Param
  code: string;
  description: any;
  comment: any;

  loading = false;
  taskList: Array<any> = [];
  language: string;

  myFiles :Array<any> = [];

  listDepartment: Array<any> = [];
  listReporter: Array<any> = [];
  listAssignee: Array<any> = [];
  listStatus: Array<any> = [];
  listPriortity: Array<any> = [];
  listComment: Array<any> = [];
  listTaskLink : Array<any> = [];
 
  form: FormGroup;


  constructor(
    private toastService: ToastrService,
    private activeRoute: ActivatedRoute,
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private departmentSerivice: DepartmentService,
    private userSerivice: UserService,
    private statusCommonService: StatusCommonService,
    private shareDataService: ShareDataService,    
    private modalService: NgbModal,
    private toastr: ToastrService,


  ) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Home page', path: '/' },
    { label: 'My task', path: '/task/my-task' },
    { label: 'My task detail', path: '/', active: true }];

    this.language = window.localStorage.getItem('language');
    this.shareDataService.shareLangMethod$.subscribe((data) => {
      if (data) {
        this.language = data;
      }
    });
    this.activeRoute.params.subscribe(params => {
      this.code = params['code']; // (+) converts string 'id' to a number
    });
    this.initForm()
    this.getTaskList();
    this.getTaskAttachmentsList(this.code);
    this.getValueCP();
  }


  get f() {
    return this.form.controls;
  }

  initForm() {
    this.form = this.formBuilder.group({
      taskCode: [this.code],
      dataComment: [null],
      creater: [this.authService.user.userCode],
      editer: [null],
    });
  }

  getTaskList() {
    const json = {
      code: this.code
    }
    this.loading = true;
    this.taskService.searchTask(json).subscribe(res => {
      if (res) {
        this.taskList = res.data[0];
        this.description = res.data[0].description ;
        console.log(this.taskList);
      } else {
        this.taskList = [];
      }
      this.loading = false;
    }, err => {
      this.loading = false;
    })
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

  getValueCP() {
    this.departmentSerivice.getDepartmentList({}).subscribe(res => {
      if (res) {
        this.listDepartment = res.data;
        console.log(res.data)
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
    this.taskService.findCommentByTaskCode({ taskCode: this.code }).subscribe(res => {
      if (res) {
        this.listComment = res.data;
        console.log(this.listComment)
      }
    })
  }


  downloadFile(id,fileName){
    this.taskService.exportTaskAttachments({ "id":id,"fileType": "xlsx" }).subscribe(res => {
      if (res) {
      const blob = new Blob([res]);
      console.log(blob)
      const a = document.createElement('a');
      a.href = window.URL.createObjectURL(blob);
      a.download = fileName ;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      }
    })
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
            this.getTaskAttachmentsList(this.code)
          } else {
            this.toastService.error("Xóa File thất bại", 'Thông báo');
          }
          this.loading = false;
        });
      }
    });
  }

  toggleCollapse(index: any) {
    if (this.itemToggles.includes(index)) {
      this.itemToggles.splice(this.itemToggles.indexOf(index), 1);
    } else {
      this.itemToggles.push(index);
    }
  }

  openCreateModal(item: any) {
    const modalRef = this.modalService.open(MyTaskModalComponent, { centered: true, size: 'xl', scrollable: true, backdrop: 'static' });
    if (item) {
      modalRef.componentInstance.item = item;
    }
    modalRef.componentInstance.title = item ? 'Edit' : 'Create';
    modalRef.componentInstance.taskList = this.taskList;
    modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {
      this.modalService.dismissAll();
      this.getTaskList();
      this.getTaskAttachmentsList(this.code);
    });
    
  }


  createComment() {
    console.log(this.form.value)
    this.taskService.createTaskComment(this.form.value).subscribe(res => {
      if (res.errorCode == '0') {
        this.toastService.success('Created success', '');    
        this.getValueCP();
        this.form.value.dataComment = null;
        this.f.dataComment.setValue(null);

      } else {
        this.toastService.error('Create failed', '');
      }
      this.loading = false;
    }, error => {
      this.toastService.error('Create failed', '');
      this.loading = false;
    });
  }

  openCommentModal(item: any) {
    const modalRef = this.modalService.open(MyTaskCommentModalComponent, { centered: true, size: 'xl', scrollable: true, backdrop: 'static' });
    if (item) {
      modalRef.componentInstance.item = item;
    }
    modalRef.componentInstance.title = item ? 'Edit' : 'Create';
    modalRef.componentInstance.taskList = this.taskList;
    modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {
      this.modalService.dismissAll();
      this.getTaskList();
      this.getTaskAttachmentsList(this.code);
      this.getValueCP();

    });
    
  }

  deletedComment(item: any) {
    Swal.fire({
        // tslint:disable-next-line: max-line-length
        title: 'Dữ liệu bị xóa sẽ không thể khôi phục!',
        html: 'Xác nhận xóa bình luận này?',
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
            const json = { id: item.id };
            this.loading = true;
            this.taskService.deleteTaskComment(json).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
                if (res && res.errorCode === '0') {
                    this.toastr.success('Xóa bình luận thành công');
                    this.getValueCP();
                } else {
                    this.toastr.error(res.errorDesc, 'Thông báo');
                }
                this.loading = false;

            }, err => {
                this.loading = false;
            });

        }
    });
}

}
