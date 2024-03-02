import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommandURL } from 'src/app/core/commands/api.command';
import { BaseApiService } from 'src/app/core/helpers/base-api.service';

@Injectable({
    providedIn: 'root'
})
export class MailService {


    constructor(private baseApiService: BaseApiService) { }

    search(payload: any) {
        return this.baseApiService.postJson(CommandURL.GET_MAIL_PAGING, payload);
    }

    sendMail(payload: any) {
        return this.baseApiService.postJson(CommandURL.SEND_MAIL, payload);
    }

    updateMail(payload: any) {
        return this.baseApiService.postJson(CommandURL.UPDATE_MAIL, payload);
    }



}
