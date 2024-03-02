import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/services/auth/auth.service';
import { CategoryService } from 'src/app/core/services/module/category.service';
import { ShareDataService } from 'src/app/share-data.service';
import {getBreadCrumbItems, getBreadCrumbItemsWithLanguage, LISTPAGE} from 'src/app/shared/utils/app.util';
import { MenuModalComponent } from '../menu-modal/menu-modal.component';
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu-management',
  templateUrl: './menu-management.component.html',
  styleUrls: ['./menu-management.component.scss']
})
export class MenuManagementComponent implements OnInit {

  breadCrumbItemsData: Array<any>;
  breadCrumbItems: Array<any>;
  isCollapsed = true;
  loading = false;
  page = 1;
  limit = 10;
  maxSize = 5;
  totalRecords = 0;
  list: Array<any> = [];
  departmentList: Array<any> = [];
  groupList: Array<any> = [];
  listMenu: Array<any> = [];
  listMenuParent: Array<any> = [];
  searchForm: FormGroup;
  listPage: Array<any> = LISTPAGE;
  language: string;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private shareDataService: ShareDataService,
    private toastService: ToastrService,
    private categoryService: CategoryService,
    private router: Router,
    private translate: TranslateService
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
    this.initFormSearch();
    this.findAll();
  }


  search() {
    this.limit = 10;
    this.page = 1;
    this.getAllByCondition();

  }

  getAllByCondition() {
    this.loading = true;
    const json = {
      limit: this.limit,
      page: this.page,
      name: this.searchForm.value.name,
      parentId: this.searchForm.value.parentId,
      status: this.searchForm.value.status === 'ALL' ? null : this.searchForm.value.status,
    }
    this.loading = true;
    this.categoryService.getByCondition(json).subscribe(res => {
      this.loading = false;
      if (res.errorCode === '0') {
        this.list = res.data;
        this.totalRecords = res.totalRecord;
      } else if (res.errorCode === '1') {
        this.toastService.error(res.errorDesc, '');
      } else {
        this.toastService.error('Get data failed', '');
      }
    }, error => {
      this.toastService.error('Get data failed', '');
      this.loading = false;
    });
  }

  findAll() {
    this.loading = true;
    this.categoryService.findAllMenu().subscribe(res => {
      this.loading = false;
      this.listMenu = res.data;
      this.listMenuParent = this.listMenu.filter(h => !h.parentId);
    }, _error => {
      this.loading = false;
    });
  }
  
  onPageChange(pageNum: number) {
    this.page = pageNum;
    this.getAllByCondition();
  }

  changeLimit() {
    this.getAllByCondition();
  }

  openCreateModal(item: any) {
    const modalRef = this.modalService.open(MenuModalComponent, { centered: true, size: 'lg', backdrop: 'static'});
    if (item) {
      modalRef.componentInstance.item = item;
    }
    modalRef.componentInstance.title = item ? 'Edit' : 'Create';
    modalRef.componentInstance.listMenu = this.listMenu ;
    modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {
      this.getAllByCondition();
      this.findAll();
      this.modalService.dismissAll();
    });
  }

  initFormSearch() {
    this.searchForm = this.formBuilder.group({
      id: [''],
      parentId: [null],
      name: [''],
      status: ['ALL']
    });
    this.getAllByCondition();
  }
}
