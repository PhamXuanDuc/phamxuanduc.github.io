import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/auth/auth.service';
import { MailService } from 'src/app/core/services/module/mail/mail.service';
import { TaskService } from 'src/app/core/services/module/task-management/task.service';
import { UserService } from 'src/app/core/services/module/user.service';

@Component({
  selector: 'app-email-modal',
  templateUrl: './email-modal.component.html',
  styleUrls: ['./email-modal.component.scss']
})
export class EmailModalComponent implements OnInit {
  @Input() item: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  
  ngUnsubscribe = new Subject<void>();

  form: FormGroup;
  isSubmit: boolean;
  loading: boolean;

  listUser: Array<any> = [];

  
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private taskService: TaskService,
    private toastService: ToastrService,
    private userSerivice: UserService,
    private mailService: MailService,
  ) { }

  ngOnInit(): void {
    if(this.item){
      if(this.item.isRead!='t'){
        this.updateIsRead(this.item.id);
      }
    }
    this.getCP();
  }


  getCP(){
    this.userSerivice.getUserList({}).subscribe(res => {
      if (res) {
        this.listUser = res.data;
      }
    })
  }

  updateIsRead(id){
    // this.loading = true;
    const json = {
      'id':id,
      'isRead':'t'
    }
    this.mailService.updateMail(json).subscribe(res => {
      if(res){
        if (res.errorCode == '0') {
          console.log("Update is read suscess")
          this.passEntry.emit(res);
        } else {
          console.log("Update is read failed")
        }
      }
      // this.isSubmit = false;
      // this.loading = false;
    }, error => {
      console.log("Update is read failed")
      // this.isSubmit = false;
      // this.loading = false;
    });
  }

  updateTrash(id){
    this.loading = true;
    const json = {
      'id':id,
      'status':'T'
    }
    this.mailService.updateMail(json).subscribe(res => {
      if(res){
        if (res.errorCode == '0') {
          this.toastService.success('Đã di chuyển thư vào thùng rác', '');
          console.log("Update is read suscess")
          this.passEntry.emit(res);
        } else {
          console.log("Update is read failed")
          this.toastService.error('Chuyển thư vào thùng rác thất bại', '');
        }
      }
      this.isSubmit = false;
      this.loading = false;
    }, error => {
      console.log("Update is read failed")
      this.toastService.error('Chuyển thư vào thùng rác thất bại', '');
      this.isSubmit = false;
      this.loading = false;
    });
  }

  moveInbox(id){
    this.loading = true;
    const json = {
      'id':id,
      'status':'S'
    }
    this.mailService.updateMail(json).subscribe(res => {
      if(res){
        if (res.errorCode == '0') {
          this.toastService.success('Đã di chuyển thư vào hộp thư đến', '');
          console.log("Update is read suscess")
          this.passEntry.emit(res);
        } else {
          console.log("Update is read failed")
          this.toastService.error('Chuyển thư vào hộp thư đến thất bại', '');
        }
      }
      this.isSubmit = false;
      this.loading = false;
    }, error => {
      console.log("Update is read failed")
      this.toastService.error('Chuyển thư vào hộp thư đến thất bại', '');
      this.isSubmit = false;
      this.loading = false;
    });
  }




}
