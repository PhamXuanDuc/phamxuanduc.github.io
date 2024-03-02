import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/services/auth/auth.service';
import { DepartmentService } from 'src/app/core/services/module/department.service';
import { MailService } from 'src/app/core/services/module/mail/mail.service';
import { RoleService } from 'src/app/core/services/module/role.service';
import { UserService } from 'src/app/core/services/module/user.service';
import { ShareDataService } from 'src/app/share-data.service';
import { getBreadCrumbItems, getBreadCrumbItemsWithLanguage } from 'src/app/shared/utils/app.util';

@Component({
  selector: 'app-email-compose',
  templateUrl: './email-compose.component.html',
  styleUrls: ['./email-compose.component.scss']
})
export class EmailComposeComponent implements OnInit {
  breadCrumbItems: Array<any>;
  language: string;
  breadCrumbItemsData: Array<any>;


  form: FormGroup;
  isSubmit: boolean;
  loading: boolean;


  types = [
    { code: "U", name: 'Người dùng' },
    { code: "R", name: 'Vai trò' },
    { code: "D", name: 'Phòng ban' },
  ];
  listUser: Array<any> = [];
  listRole: Array<any> = [];
  listDepartment: Array<any> = [];


  constructor(
    private shareDataService: ShareDataService,
    private router: Router,
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    private departmentSerivice: DepartmentService,
    private userService: UserService,
    private roleService: RoleService,
    private authService: AuthenticationService,
    private mailService: MailService,
    private toastService: ToastrService,

  ) {
    this.shareDataService.shareLangMethod$.subscribe((data) => {
      if (data) {
        this.language = data;
        this.breadCrumbItems = getBreadCrumbItemsWithLanguage(this.breadCrumbItemsData, this.language);
      }
    });
   }

  ngOnInit(): void {
    this.initForm();
    this.language = this.translate.currentLang;
    this.breadCrumbItemsData = [...getBreadCrumbItems(this.router)];
    this.breadCrumbItems = getBreadCrumbItemsWithLanguage(this.breadCrumbItemsData, this.language);
    this.getValueCP();
  }

  get f() {
    return this.form.controls
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: [null],
      fromUserId: [this.authService.user.userId],
      toUserId: [null],
      toRoleCode: [null],
      toDepartmentCode: [null],
      type: [null, [Validators.required]],
      subject: [null, [Validators.required, Validators.maxLength(255)]],
      content: [null, [Validators.required]],
      status: ['S'],
    });
  }

  submit() {
    this.isSubmit = true;
    if (this.form.invalid) {
      return;
    }
    const json = {
      "fromUserId" : this.f.fromUserId.value,
      "toUserId" : this.f.type.value=='U'?this.f.toUserId.value.toString():null ,
      "toRoleCode" : this.f.type.value=='R'?this.f.toRoleCode.value.toString():null,
      "toDepartmentCode" : this.f.type.value=='D'?this.f.toDepartmentCode.value.toString():null,
      "type" : this.f.type.value,
      "subject" : this.f.subject.value,
      "content" : this.f.content.value,
      "status" : this.f.status.value,
    }
    console.log(this.form.value)
    this.mailService.sendMail(json).subscribe(res => {
      if (res.errorCode == '0') {
        this.toastService.success('Send mail success', '');
        this.router.navigate(['/email-management/email'])
      } else {
        this.toastService.error('Send mail failed', '');
      }

    }, error => {
      this.toastService.error('Send mail failed', '');
    });
  }




  getValueCP() {
    this.departmentSerivice.getDepartmentList({}).subscribe(res => {
      if (res) {
        this.listDepartment = res.data;
        console.log(this.listDepartment)
      }
    })
    this.userService.getUserList({}).subscribe(res => {
      if (res) {
        this.listUser = res.data;
        console.log(this.listUser)
      }
    })
    this.roleService.getByCondition({}).subscribe(res => {
      if (res) {
        this.listRole = res.data;
        console.log(this.listRole)
      }
    })

    
   
  }

}
