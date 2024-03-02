import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/services/auth/auth.service';
import { DepartmentService } from 'src/app/core/services/module/department.service';
import { RoleService } from 'src/app/core/services/module/role.service';
import { UserService } from 'src/app/core/services/module/user.service';
import { ShareDataService } from 'src/app/share-data.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  breadCrumbItems: Array<{}>;

  currenLang: any
  loading = false;
  userList: any;


  constructor(
    private userSerivice: UserService,
    private modalService: NgbModal,
    private departmentService: DepartmentService,
    private roleSevice: RoleService,
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private shareDataService: ShareDataService,
    private router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.currenLang = window.localStorage.getItem('language');
    this.shareDataService.shareLangMethod$.subscribe((data) => {
      if (data) {
        this.currenLang = data;
      }
    });
    this.breadCrumbItems = [{ label: this.currenLang=='vi'?'Trang chủ':'Home page', path: '/' },
    { label: this.currenLang=='vi'?'Tài khoản của tôi':'My Account', path: '/', active: true }];
    
    this.getUserDetail();
    // this.getDataCbb();
  }

  getUserDetail() {
    const json = {
        userCode: this.authService.user.userCode,
    };
    this.loading = true;
    this.userSerivice.getUserList(json).subscribe(res => {
        if (res) {
            this.userList = res.data[0];
            console.log(this.userList)
        }
        this.loading = false;
    }, err => {
        this.loading = false;
    });
  }

  openCreateModal() {
    const modalRef = this.modalService.open(ChangePasswordComponent, { centered: true, size: 'lg', backdrop: 'static' });

    modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {
        this.modalService.dismissAll();
    });
}

}
