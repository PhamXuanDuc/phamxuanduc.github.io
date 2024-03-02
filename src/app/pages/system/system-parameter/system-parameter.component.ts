import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/services/auth/auth.service';
import { SystemParameterService } from 'src/app/core/services/module/system/system-parameter.service';
import { ShareDataService } from 'src/app/share-data.service';
import { getBreadCrumbItems, getBreadCrumbItemsWithLanguage } from 'src/app/shared/utils/app.util';

@Component({
  selector: 'app-system-parameter',
  templateUrl: './system-parameter.component.html',
  styleUrls: ['./system-parameter.component.scss']
})
export class SystemParameterComponent implements OnInit {
  breadCrumbItems: Array<any>;

  listSystemParameter : Array<any> = [];
  form: FormGroup;
  language: string;
  breadCrumbItemsData: Array<any>;


  constructor(
    private authService: AuthenticationService,
    private systemParameterService: SystemParameterService,
    private toastService: ToastrService,
    private shareDataService: ShareDataService,
    private router: Router,
    private translate: TranslateService


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
    
    this.getParameterList()

  }

  getParameterList(){
    const json = {

    }
    this.systemParameterService.searchSystemParameter(json).subscribe(res => {
      if (res) {
        this.listSystemParameter = res.data;
        this.listSystemParameter.forEach(element => {
          element.disabled = true;
        });
        console.log(this.listSystemParameter);
      } else {
        this.listSystemParameter = [];
      }
    }, err => {
    })
  }

  edit(item:any){
    console.log(item)
    if(!item.disabled){
      this.systemParameterService.updateSystemParameter(item).subscribe(res => {
        if (res.errorCode == '0') {
          this.toastService.success('Updated success', '');
          this.getParameterList();
        } else {
          this.toastService.error('Update failed', '');
          this.getParameterList();
        }
  
      }, error => {
        this.toastService.error('Update failed', '');
      });
    }

  }
 

}
