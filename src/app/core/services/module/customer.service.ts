import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommandURL } from '../../commands/api.command';
import { BaseApiService } from '../../helpers/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

constructor(
  private baseApiService: BaseApiService,
  private http: HttpClient) 
  { }


    getCustomer(payload: any) {
        return this.baseApiService.postJson(CommandURL.GET_CUSTOMER_PAGING, payload);
    }

    createCustomer(payload: any) {
        return this.baseApiService.postJson(CommandURL.CREATE_CUSTOMER, payload);
    }

    updateCustomer(payload: any) {
        return this.baseApiService.postJson(CommandURL.UPDATE_CUSTOMER, payload);
    }

    deleteCustomer(payload: any) {
        return this.baseApiService.postJson(CommandURL.DELETE_CUSTOMER, payload);
    }

    export(json:any){
        return this.http.post(CommandURL.EXPORT_CUSTOMER, json, {
            responseType: 'arraybuffer',
            headers: new HttpHeaders()
        });
    }
    importCustomer(payload: FormData) {
        return this.http.post<any>(CommandURL.IMPORT_CUSTMOER,
            payload,
            {headers: {'Other-Content-Type': 'yes'}}
        );
    }


}
