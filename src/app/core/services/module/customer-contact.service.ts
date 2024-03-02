import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommandURL } from '../../commands/api.command';
import { BaseApiService } from '../../helpers/base-api.service';

@Injectable({
    providedIn: 'root'
})
export class CustomerContactService {

    constructor(
        private baseApiService: BaseApiService,
        private http: HttpClient)
    { }


    findCustomerContactByCustomerId(payload: any) {
        return this.baseApiService.postJson(CommandURL.FIND_CUSTOMER_CONTACT_BY_CUSTOMER_ID, payload);
    }


    deleteCustomerContact(payload: any) {
        return this.baseApiService.postJson(CommandURL.DELETE_CUSTOMER_CONTACT, payload);
    }

    exportCustomerContact(json:any){
        return this.http.post(CommandURL.EXPORT_CUSTOMER_CONTACT, json, {
            responseType: 'arraybuffer',
            headers: new HttpHeaders()
        });
    }
}
