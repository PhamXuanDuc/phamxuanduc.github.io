import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import {LayoutsModule} from './layouts/layouts.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {ToastrModule} from 'ngx-toastr';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomDateParserFormatter } from './datepicker-formatter';
import { ExcelService } from './core/services/ExcelService';
import {httpInterceptorProviders} from "./core/helpers";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LayoutsModule,
        AppRoutingModule,
        ToastrModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpTranslateLoader,
                deps: [HttpClient]
            }
        }),
        PdfViewerModule,
        
    ],
    providers: [
        {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter},
        ExcelService,
        httpInterceptorProviders
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json?v=' + (new Date()).getTime());
}
