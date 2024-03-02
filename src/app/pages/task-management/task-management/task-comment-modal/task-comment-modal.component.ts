import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/auth/auth.service';
import { TaskService } from 'src/app/core/services/module/task-management/task.service';

@Component({
  selector: 'app-task-comment-modal',
  templateUrl: './task-comment-modal.component.html',
  styleUrls: ['./task-comment-modal.component.scss']
})
export class TaskCommentModalComponent implements OnInit {
  @Input() title: any;
  @Input() item: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  
  ngUnsubscribe = new Subject<void>();

  form: FormGroup;
  isSubmit: boolean;
  loading: boolean;
  
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private taskService: TaskService,
    private toastService: ToastrService,


  ) { }

  ngOnInit(): void {
    console.log(this.item)
    this.initForm()
    if (this.item) {
      this.form.patchValue(this.item);
      console.log(this.form.value)
    }


  }

  initForm() {
    this.form = this.formBuilder.group({
      id: [null],
      taskCode: [null],
      dataComment: [null],
      creater: [null],
      createDate : [null],
      editer: [this.authService.user.userCode],
      editDate: [null]
    });
  }


  get f() {
    return this.form.controls
  }

  update() {
    this.loading = true;
    this.form.value.editer = this.authService.user.userCode;
    this.taskService.updateTaskComment(this.form.value).subscribe(res => {
      if (res.errorCode == '0') {
        this.toastService.success('Updated success', '');
        this.passEntry.emit(res);
        this.form.reset();
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
}
