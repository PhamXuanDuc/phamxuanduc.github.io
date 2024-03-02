import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbCollapseModule, NgbDatepickerModule, NgbTimepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ClickOutsideModule } from 'ng-click-outside';

import { SlimscrollDirective } from './slimscroll.directive';
import { CountToDirective } from './count-to.directive';

import { PreloaderComponent } from './preloader/preloader.component';
import { PagetitleComponent } from './pagetitle/pagetitle.component';
import { PortletComponent } from './portlet/portlet.component';
import { EmaillistComponent } from './emaillist/emaillist.component';
import { WidgetComponent } from './widget/widget.component';

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [SlimscrollDirective, PreloaderComponent, PagetitleComponent, CountToDirective, PortletComponent, EmaillistComponent, WidgetComponent],
  imports: [
    CommonModule,
    FormsModule,
    ClickOutsideModule,
    NgbCollapseModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgbDropdownModule
  ],
  // tslint:disable-next-line: max-line-length
  exports: [SlimscrollDirective, PreloaderComponent, PagetitleComponent, CountToDirective, PortletComponent, EmaillistComponent, WidgetComponent]
})
export class UIModule { }
