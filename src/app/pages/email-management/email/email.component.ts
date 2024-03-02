import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/auth/auth.service';
import { MailService } from 'src/app/core/services/module/mail/mail.service';
import { UserService } from 'src/app/core/services/module/user.service';
import { ShareDataService } from 'src/app/share-data.service';
import { getBreadCrumbItems, getBreadCrumbItemsWithLanguage } from 'src/app/shared/utils/app.util';
import { EmailModalComponent } from './email-modal/email-modal.component';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
  ngUnsubscribe = new Subject<void>();

  breadCrumbItemsData: Array<any>;
  breadCrumbItems: Array<any>;
  isCollapsed = true;

  //Param
  subject: string;
  fromUserId: string;
  isRead: string;
  branch: string;
  status: string;


  listEmail: Array<any> = [];
  listUser: Array<any> = [];
  listStatus: Array<any> = [
    { code: false, name: 'Chưa xem' },
    { code: true, name: 'Đã xem' }
  ];
  listPriortity: Array<any> = [];


  pageSizes: Array<any> = [5, 10, 20, 50];

  loading = false;
  pageNumber = 1;
  pageSize = 10;
  maxSize = 5;
  totalRecord = 0;
  language: string;

  constructor(
    private shareDataService: ShareDataService,
    private router: Router,
    private translate: TranslateService,
    private mailService: MailService,
    private authService: AuthenticationService,
    private userSerivice: UserService,
    private modalService: NgbModal,


  ) {
    this.shareDataService.shareLangMethod$.subscribe((data) => {
      if (data) {
        this.language = data;
        this.breadCrumbItems = getBreadCrumbItemsWithLanguage(this.breadCrumbItemsData, this.language);
      }
    });
   }

  ngOnInit(): void {
    this.language = this.translate.currentLang;
    this.breadCrumbItemsData = [...getBreadCrumbItems(this.router)];
    this.breadCrumbItems = getBreadCrumbItemsWithLanguage(this.breadCrumbItemsData, this.language);
    this.getEmailList();
    this.getCP();
  }

  refresh(){
    const json = {
      status : 'S',
      toUserId: this.authService.user.userId,
      page: this.pageNumber,
      limit: this.pageSize,
    }
    this.loading = true;
    this.mailService.search(json).subscribe(res => {
      if (res) {
        this.listEmail = res.data;
        this.totalRecord = res.totalRecord;
        console.log(res);
      } else {
        this.listEmail = [];
        this.totalRecord = 0;
      }
      this.loading = false;
    }, err => {
      this.loading = false;
    })
  }

  getEmailList() {
    const json = {
      subject: this.subject,
      fromUserId: this.fromUserId,
      isRead: this.isRead,
      status : 'S',
      toUserId: this.authService.user.userId,
      page: this.pageNumber,
      limit: this.pageSize,
    }
    this.loading = true;
    this.mailService.search(json).subscribe(res => {
      if (res) {
        this.listEmail = res.data;
        this.totalRecord = res.totalRecord;
        console.log(res);
      } else {
        this.listEmail = [];
        this.totalRecord = 0;
      }
      this.loading = false;
    }, err => {
      this.loading = false;
    })
  }

  trash(){
    const json = {
      status : 'T',
      toUserId: this.authService.user.userId,
      page: this.pageNumber,
      limit: this.pageSize,
    }
    this.loading = true;
    this.mailService.search(json).subscribe(res => {
      if (res) {
        this.listEmail = res.data;
        this.totalRecord = res.totalRecord;
        console.log(res);
      } else {
        this.listEmail = [];
        this.totalRecord = 0;
      }
      this.loading = false;
    }, err => {
      this.loading = false;
    })
  }

  mailSent(){
    const json = {
      status : 'S',
      fromUserId: this.authService.user.userId,
      // toUserId: this.authService.user.userId,
      page: this.pageNumber,
      limit: this.pageSize,
    }
    this.loading = true;
    this.mailService.search(json).subscribe(res => {
      if (res) {
        this.listEmail = res.data;
        this.totalRecord = res.totalRecord;
        console.log(res);
      } else {
        this.listEmail = [];
        this.totalRecord = 0;
      }
      this.loading = false;
    }, err => {
      this.loading = false;
    })
  }

  getCP(){
    this.userSerivice.getUserList({}).subscribe(res => {
      if (res) {
        this.listUser = res.data;
      }
    })
  }

  openCreateModal(item: any) {
    const modalRef = this.modalService.open(EmailModalComponent, { centered: true, size: 'xl', scrollable: true, backdrop: 'static' });
    if (item) {
      modalRef.componentInstance.item = item;
    }
    modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {
      // this.modalService.dismissAll();
      this.getEmailList();
    });
  }

  search() {
    this.pageNumber = 1;
    this.pageSize = 10;
    this.getEmailList();
  }

  onPageChange(page: any) {
    this.pageNumber = page;
    this.getEmailList();
  }
  changeLimit(event: any) {
    this.pageSize = event;
    this.getEmailList();
  }


}
