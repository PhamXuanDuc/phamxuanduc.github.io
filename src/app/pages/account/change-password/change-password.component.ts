import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/auth/auth.service';
import { SystemParameterService } from 'src/app/core/services/module/system/system-parameter.service';
import { UserService } from 'src/app/core/services/module/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {


    @Output() passEntry: EventEmitter<any> = new EventEmitter();

    ngUnsubscribe = new Subject<void>();

    form: FormGroup;
    isSubmit: boolean;
    loading: boolean = false;
    listSystemParameter : Array<any> = [];

    listTemp : Array<any> = []; 

    PWD_MIN_NUMERIC = 0
    PWD_MIN_LENGTH = 0
    PWD_SPECIAL_CHARACTERS : string;
    PWD_MIN_SMALL_LETTER = 0
    PWD_MAX_LENGTH = 0
    PWD_MIN_CAPITAL_LETTER = 0
    PWD_MIN_SPECIAL = 0;


    isInValidPass = true;
    isInValidCapitalLetter = true;
    isInValidSmallLetter = true;
    isInValidNumber = true;
    isInValiMaxlength = true;
    isInValiMinlength = true;
    isInValidSpecialCharacters = false;



    constructor(
        public activeModal: NgbActiveModal,
        private formBuilder: FormBuilder,
        private userService: UserService,
        private toastService: ToastrService,
        private authService: AuthenticationService,
        private translate: TranslateService,
        private systemParameterService: SystemParameterService,

    ) {
    }

    get f() {
        return this.form.controls;
    }

    ngOnInit() {
        this.initForm();
        this.getParameterList();
    }

    initForm() {
        this.form = this.formBuilder.group({
            code: [this.authService.user.userCode],
            oldPassword: [null,[Validators.required]],
            password: [null,[Validators.required]],
            rePassword: [null,[Validators.required]],
            editer: [this.authService.user.userId],
        },
        {
            validator: this.ConfirmedValidator('password', 'rePassword')
        });
    }

    initCheck() {
        this.isInValiMinlength = false;
        this.isInValiMaxlength = false;
        this.isInValidPass = false;
        this.isInValidCapitalLetter = false;
        this.isInValidSmallLetter = false;
        this.isInValidNumber = false;
    }


    getParameterList(){
        this.systemParameterService.searchSystemParameter({}).subscribe(res => {
          if (res) {
            this.listSystemParameter = res.data;
            this.PWD_MIN_NUMERIC = this.listSystemParameter.filter(t => t.code === "PWD_MIN_NUMERIC")[0].value
            this.PWD_MIN_LENGTH = this.listSystemParameter.filter(t => t.code === "PWD_MIN_LENGTH")[0].value
            this.PWD_SPECIAL_CHARACTERS = this.listSystemParameter.filter(t => t.code === "PWD_SPECIAL_CHARACTERS")[0].value
            this.PWD_MIN_SMALL_LETTER = this.listSystemParameter.filter(t => t.code === "PWD_MIN_SMALL_LETTER")[0].value
            this.PWD_MAX_LENGTH = this.listSystemParameter.filter(t => t.code === "PWD_MAX_LENGTH")[0].value
            this.PWD_MIN_CAPITAL_LETTER = this.listSystemParameter.filter(t => t.code === "PWD_MIN_CAPITAL_LETTER")[0].value
            this.PWD_MIN_SPECIAL = this.listSystemParameter.filter(t => t.code === "PWD_MIN_SPECIAL")[0].value

            console.log("Số kí tự chữ số tối thiểu của mật khẩu "+this.PWD_MIN_NUMERIC)
            console.log("Độ dài tối thiểu của mật khẩu: "+this.PWD_MIN_LENGTH)
            console.log("Số kí đặc biệt cho phép làm mật khẩu: "+this.PWD_SPECIAL_CHARACTERS)
            console.log("Số kí tự thường tối thiểu trong chuỗi mật khẩu: "+this.PWD_MIN_SMALL_LETTER)
            console.log("Độ dài tối đa của mật khẩu: "+this.PWD_MAX_LENGTH)
            console.log("Số kí tự chữ số tối thiểu của mật khẩu: "+this.PWD_MIN_CAPITAL_LETTER)
            console.log("Số kí tự ĐẶT BIỆT tối thiểu của mật khẩu: "+this.PWD_MIN_SPECIAL)


          } else {
            this.listSystemParameter = [];
          }
        }, err => {
        })
    }

    checkPassSpecialCharacter(passNew: string) {
        console.log(passNew)

        this.isInValidPass = true;
        this.isInValidSpecialCharacters = false;
        this.isInValidCapitalLetter = true;
        this.isInValidSmallLetter = true;
        this.isInValidNumber = true;
        this.isInValiMaxlength = true;
        this.isInValiMinlength = true;
        let isInValid  = true;
        if(!passNew){
            return;
        }
        let countSpec = 0;
        let upper = 0, lower = 0, number = 0, special = 0;
        for (let i = 0; i < passNew.length; i++) {
            if (passNew[i] >= 'A' && passNew[i] <= 'Z') {
                upper++;
            } else if (passNew[i] >= 'a' && passNew[i] <= 'z') {
                lower++;
            } else if (passNew[i] >= '0' && passNew[i] <= '9') {
                number++;
            } else {
                if (this.PWD_SPECIAL_CHARACTERS.indexOf(passNew.charAt(i)) > 0) {
                    special++;
                } else{
                    console.log("Phá ko à")
                    this.isInValidSpecialCharacters = true;
                    isInValid = true;
                }
            }
        }
        if (this.PWD_MIN_SPECIAL && this.PWD_MIN_SPECIAL > 0) { // kí tự dat biêt tối thiểu ok
            if (special < this.PWD_MIN_SPECIAL) {
                this.isInValidPass = true;
                isInValid = true;
            } else {
                this.isInValidPass = false;
                isInValid = false;
            }
        }
        if (this.PWD_MIN_SMALL_LETTER > 0) {//case chu thuong tối thiểu ook
            const smallLetter = passNew?.replace(/[^a-z]/g, '');
            if (smallLetter?.length < this.PWD_MIN_SMALL_LETTER) {
                this.isInValidSmallLetter = true;
                isInValid = true;
            } else {
                this.isInValidSmallLetter = false;
            }
        }
        if (this.PWD_MIN_CAPITAL_LETTER > 0) {//case chu hoa tối thiểu ook
            const capitalLetter = passNew?.replace(/[^A-Z]/g, '');
            if (capitalLetter?.length < this.PWD_MIN_CAPITAL_LETTER) {
                this.isInValidCapitalLetter = true;
                isInValid = true;
            } else {
                this.isInValidCapitalLetter = false;
            }
        }
        if (this.PWD_MIN_NUMERIC > 0) {//case so tối thiểu 
            const limitNumber = passNew?.replace(/[^0-9]/g, '');
            if (limitNumber?.length < this.PWD_MIN_NUMERIC) {
                this.isInValidNumber = true;
                isInValid = true;
            } else {
                this.isInValidNumber = false;
            }
        }
        if (passNew?.length > this.PWD_MAX_LENGTH) {
            this.isInValiMaxlength = true;
        } else {
            this.isInValiMaxlength = false;
        }
        if (passNew?.length < this.PWD_MIN_LENGTH) {
            this.isInValiMinlength = true;
        } 
        else {
            this.isInValiMinlength = false;
        }
        return isInValid;
    }


    
    submit() {
        // this.loading = true;
        this.isSubmit = true;
        if(!this.form.invalid){
            this.checkPassSpecialCharacter(this.form.value.password)
        }else{
            return;
        }

        console.log(this.isInValidSpecialCharacters)

        if (this.isInValidSpecialCharacters || this.isInValiMinlength || this.isInValiMaxlength || this.isInValidCapitalLetter || this.isInValidNumber
            || this.isInValidSmallLetter || this.isInValidPass) {
                this.toastService.error('Password sai quy tắc', '');
            return;
        }else{
            console.log("Password hợp lệ nhé !")

        }

        this.userService.changePassword(this.form.value).subscribe(res => {
            if (res.errorCode === '0') {
                this.toastService.success('Change password success', '');
                this.passEntry.emit(res);
            } else {
                this.toastService.error(res.errorDesc, '');
            }
            this.isSubmit = false;
            this.loading = false;
        }, error => {
            this.toastService.error('Change password  failed', '');
            this.isSubmit = false;
            this.loading = false;
        });
    }

    ConfirmedValidator(controlName: string, matchingControlName: string){
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];
            if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
                return;
            }
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ confirmedValidator: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }

}
