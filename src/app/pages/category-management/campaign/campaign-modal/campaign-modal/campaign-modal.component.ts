import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {CampaignService} from "../../../../../core/services/module/category-management/campaign.service";

@Component({
    selector: 'app-campaign-modal',
    templateUrl: './campaign-modal.component.html',
    styleUrls: ['./campaign-modal.component.scss']
})
export class CampaignModalComponent implements OnInit {

    @Input() title: any;
    @Input() item: any;

    @Output() passEntry: EventEmitter<any> = new EventEmitter();

    ngUnsubscribe = new Subject<void>();

    form: FormGroup;
    isSubmit: boolean;
    loading: boolean = false;
    newitem: any;
    userCodeHasUse = null;

    constructor(
        public activeModal: NgbActiveModal,
        private formBuilder: FormBuilder,
        private toastService: ToastrService,
        private campaignService: CampaignService,
    ) {
    }

    get f() {
        return this.form.controls;
    }

    ngOnInit() {
        this.initForm();
        if (this.item) {
            this.form.patchValue(this.item);
            this.f.code.disable();
        }
    }

    initForm() {
        this.form = this.formBuilder.group({
            id: [null],
            code: [null, [Validators.required, Validators.maxLength(255)]],
            name: [null, [Validators.required, Validators.maxLength(255)]],
            nameEn: [null, [Validators.required, Validators.maxLength(255)]],
            description: [null, [Validators.maxLength(255)]],
            creater: [null],
            createdDate: [null],
            editer: [null],
            editedDate: [null],
            // status: [true]
        });
    }

    submit() {
        this.isSubmit = true;
        if (this.form.invalid) {
            console.log('Lỗi form', this.form.value);
            return;
        }
        if (this.item) {
            this.update();
        } else {
            this.create();
        }

    }

    create() {
        this.loading = true;

        this.campaignService.create(this.form.value).subscribe(res => {
            if (res && res.data) {
                this.toastService.success('Created success');
                this.passEntry.emit(res);
                this.reset();
            } else {
                this.toastService.error(res.errorDesc);
            }
            this.isSubmit = false;
            this.loading = false;
        }, error => {
            this.toastService.error('Create failed');
            this.isSubmit = false;
            this.loading = false;
        });
    }


    update() {
        this.loading = true;
        this.campaignService.update(this.form.value).subscribe(res => {
            if (res && res.data) {
                this.toastService.success('Update success');
                this.passEntry.emit(res);
                this.reset();
            } else {
                this.toastService.error(res.errorDesc);
            }
            this.isSubmit = false;
            this.loading = false;
        }, error => {
            this.toastService.error('Update failed');
            this.isSubmit = false;
            this.loading = false;
        });

    }

    reset() {
        this.isSubmit = false;
        this.form.reset();
    }

}
