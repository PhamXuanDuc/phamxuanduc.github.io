import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CategoryManagementRoutingModule} from './category-management-routing.module';
import {CampaignComponent} from './campaign/campaign.component';
import {LoanGroupComponent} from './loan-group/loan-group.component';
import {ProductComponent} from './product/product.component';
import { CampaignModalComponent } from './campaign/campaign-modal/campaign-modal/campaign-modal.component';
import { LoanGroupModalComponent } from './loan-group/loan-group-modal/loan-group-modal.component';
import { ProductModalComponent } from './product/product-modal/product-modal.component';
import {UIModule} from "../../shared/ui/ui.module";
import {NgSelectModule} from "@ng-select/ng-select";
import {TranslateModule} from "@ngx-translate/core";
import {NgbModule, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        CampaignComponent,
        LoanGroupComponent,
        ProductComponent,
        CampaignModalComponent,
        LoanGroupModalComponent,
        ProductModalComponent
    ],
    imports: [
        CommonModule,
        CategoryManagementRoutingModule,
        UIModule,
        NgSelectModule,
        TranslateModule,
        NgbPaginationModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class CategoryManagementModule {
}
