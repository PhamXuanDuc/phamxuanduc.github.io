import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CampaignComponent} from "./campaign/campaign.component";
import {LoanGroupComponent} from "./loan-group/loan-group.component";
import {ProductComponent} from "./product/product.component";

const routes: Routes = [
  {
    path: 'campaign',
    component: CampaignComponent
  },
  {
    path: 'loan-group',
    component: LoanGroupComponent,
  },
  {
    path: 'product',
    component: ProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryManagementRoutingModule { }
