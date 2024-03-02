import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {NgbActiveModal, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import {UserService} from 'src/app/core/services/module/user.service';
import {ToastrService} from 'ngx-toastr';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { AuthenticationService } from 'src/app/core/services/auth/auth.service';
import { Pattern } from 'src/app/shared/utils/validator.util';

@Component({
    selector: 'app-user-modal',
    templateUrl: './user-modal.component.html',
    styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {


    @Input() title: any;
    @Input() item: any;

    @Output() passEntry: EventEmitter<any> = new EventEmitter();

    ngUnsubscribe = new Subject<void>();

    @Input() departmentList: Array<any> = [];
    @Input() roleList: Array<any> = [];

    toDay = new NgbDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());

    form: FormGroup;
    isSubmit: boolean;
    loading: boolean = false;
    userCodeHasUse = null;

    imageDefault = 'assets/images/users/avatar_default.png';
    filePath = '';
    file: any;

    constructor(
        public activeModal: NgbActiveModal,
        private formBuilder: FormBuilder,
        private userService: UserService,
        private toastService: ToastrService,
        private authService: AuthenticationService,
    ) {
    }

    get f() {
        return this.form.controls;
    }

    ngOnInit() {
        this.filePath = this.imageDefault;
        this.initForm();
        if (this.item) {
            let newitem = {...this.item};
            const date = new Date(this.item.birthday);
            newitem.birthday = new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
            if(this.item.roleCode) {
                newitem.roleCode = this.item.roleCode.split(',');
            }
            newitem.editer = this.authService.user.userId;
            this.form.patchValue(newitem);
            this.filePath = (this.item.avatarUrl ? this.item.avatarUrl : this.imageDefault);
        }
    }

    getDate() {
        return new Date(this.f.birthday.value.year, this.f.birthday.value.month, this.f.birthday.value.day);
    }

    initForm() {
        this.form = this.formBuilder.group({
            id: [null],
            code: [null, [Validators.required, Validators.maxLength(255)]],
            fullName: [null, [Validators.required, Validators.maxLength(255)]],
            birthday: [new NgbDate(1990, 1, 1), [Validators.required]],
            email: [null, [Validators.required, Validators.maxLength(255), Validators.pattern(Pattern.EMAIL_PATTERN)]],
            phoneNo: [null, [Validators.pattern(Pattern.PHONE_NUMBER)]],
            roleCode: [null, [Validators.required]],
            departmentCode: [null, [Validators.required]],
            avatarUrl: [null],
            creater: [this.authService.user.userId],
            createdDate: [null],
            editer: [null],
            editedDate: [null],
            status: [true]
        });
    }

    submit() {
        this.isSubmit = true;
        this.form.markAsTouched();
        if (this.form.invalid) {
            return;
        }

        const formValue = this.form.value;
        formValue.birthday = new Date(this.f.birthday.value.year, this.f.birthday.value.month - 1, this.f.birthday.value.day);
        formValue.avatarUrl = this.filePath;

        let roleCodes: string;
        formValue.roleCode.forEach(e => {
            if(!roleCodes) {
                roleCodes = e;
            } else {
                roleCodes = roleCodes + ',' + e;
            }
            
        });
        formValue.roleCode = roleCodes;

        if (this.item) {
            this.update(formValue);
        } else {
            this.create(formValue);
        }

    }

    create(formValue) {
        this.loading = true;
        this.userCodeHasUse = false;
        this.userService.createUser(formValue).subscribe(res => {
            if (res?.data.errorCode == '0') {
                this.toastService.success('Created success', '');
                this.passEntry.emit(res);
                this.reset();
            } else if (res.errorCode == '-1') {
                const fieldError = res.errorDesc.split(' ')[0];
                if (fieldError === 'Invalid') {
                    this.userCodeHasUse = 'Email';
                } else {
                    this.userCodeHasUse = fieldError;
                }

                this.toastService.error(res.errorDesc, '');
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
        this.userService.updateUser(formValue).subscribe(res => {
            if (res.errorCode === '0') {
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
        this.item = null;
        this.isSubmit = false;
        this.form.reset();
        this.filePath = this.imageDefault;
        this.f.status.setValue(true);
    }

    imagePreview(e: any) {
		this.file = (e.target as HTMLInputElement).files[0];
		// this.form.get('img').updateValueAndValidity();

		const reader = new FileReader();
		reader.onload = () => {
			this.filePath = reader.result as string;
		};
		reader.readAsDataURL(this.file);
	}

    close() {
        this.isSubmit = false;
        this.form.reset();
        this.item = null;
        this.activeModal.close();
      }

}
