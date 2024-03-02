import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/auth/auth.service';
import { StatusCommonService } from 'src/app/core/services/module/common/status-common.service';
import { DepartmentService } from 'src/app/core/services/module/department.service';
import { TaskService } from 'src/app/core/services/module/task-management/task.service';
import { ShareDataService } from 'src/app/share-data.service';
import { getBreadCrumbItems, getBreadCrumbItemsWithLanguage } from 'src/app/shared/utils/app.util';
import { MyTaskModalComponent } from './my-task-modal/my-task-modal.component';

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.scss']
})
export class MyTaskComponent implements OnInit {
  

  ngUnsubscribe = new Subject<void>();

  isCollapsed = true;
  breadCrumbItems: Array<any>;
  breadCrumbItemsData: Array<any>;

  //Param
  code: string;
  name: string;
  accountNo: string;
  branch: string;
  status: string;


  listDepartment: Array<any> = [];
  listStatus: Array<any> = [];
  listPriortity: Array<any> = [];


  pageSizes: Array<any> = [5, 10, 20, 50];

  loading = false;
  pageNumber = 1;
  pageSize = 10;
  maxSize = 5;
  totalRecord = 0;
  taskList: Array<any> = [];
  language: string;

  constructor(
    private taskService: TaskService,
    private modalService: NgbModal,
    private toastService: ToastrService,
    private shareDataService: ShareDataService,
    private departmentSerivice: DepartmentService,
    private statusCommonService: StatusCommonService,
    private authService: AuthenticationService,
    private translate: TranslateService,
    private router: Router,
    ) {
      this.shareDataService.shareLangMethod$.subscribe((data) => {
        if (data) {
          this.language = data;
          this.breadCrumbItems = getBreadCrumbItemsWithLanguage(this.breadCrumbItemsData, this.language);
        }
      });
  }

  ngOnInit() {
    this.language = this.translate.currentLang;
    this.breadCrumbItemsData = [...getBreadCrumbItems(this.router)];
    this.breadCrumbItems = getBreadCrumbItemsWithLanguage(this.breadCrumbItemsData, this.language);

    this.getTaskList();
    this.getValueCP();
  }

  refresh() {
    this.loading = true;
    this.code = null;
    this.name = null;
    this.status = null;
    const json = {
      status: null,
      page: 1,
      limit: this.pageSize,
    }
    this.taskService.searchTask(json).subscribe(res => {
      if (res) {
        this.taskList = res.data;
        this.totalRecord = res.totalRecord;
      }
      this.loading = false;
    }, err => {
      this.loading = false;
    })
  }

  getTaskList() {
    const json = {
      code: this.code,
      name: this.name,
      branch: this.branch,
      status: this.status,
      assignee: this.authService.user.userCode,
      page: this.pageNumber,
      limit: this.pageSize,
    }
    this.loading = true;
    this.taskService.searchTask(json).subscribe(res => {
      if (res) {
        this.taskList = res.data;
        this.totalRecord = res.totalRecord;
        console.log(res);
      } else {
        this.taskList = [];
        this.totalRecord = 0;
      }
      this.loading = false;
    }, err => {
      this.loading = false;
    })
  }



  search() {
    this.pageNumber = 1;
    this.pageSize = 10;
    this.getTaskList();
  }

  onPageChange(page: any) {
    this.pageNumber = page;
    this.getTaskList();
  }
  changeLimit(event: any) {
    this.pageSize = event;
    this.getTaskList();
  }


  reset() {

  }

  export() {

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
    });
  }

  getValueCP() {
    this.departmentSerivice.getDepartmentList({}).subscribe(res => {
      if (res) {
        this.listDepartment = res.data;
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
}
