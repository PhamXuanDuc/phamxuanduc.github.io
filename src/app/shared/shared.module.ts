import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UIModule} from './ui/ui.module';
import {DebounceClickDirective} from './directive/debounce-click.directive';
import {GetLabelByIdInArrayPipe} from './pipe/get-label-by-id-in-array.pipe';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {GetLabelByIdInArrayToStringPipe} from './pipe/get-label-by-id-in-array-to-string.pipe';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
    declarations: [DebounceClickDirective, GetLabelByIdInArrayPipe,GetLabelByIdInArrayToStringPipe],
    imports: [
        CommonModule,
        UIModule,
    TranslateModule,

        
    ],
    exports: [DebounceClickDirective, GetLabelByIdInArrayPipe,GetLabelByIdInArrayToStringPipe,TranslateModule]
})
export class SharedModule {
}
