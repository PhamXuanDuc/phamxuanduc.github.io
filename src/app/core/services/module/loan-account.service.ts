import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CommandURL} from '../../commands/api.command';
import {BaseApiService} from '../../helpers/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class LoanAccountService {

constructor(
  private baseApiService: BaseApiService,
  private http: HttpClient) { }

    getAccountList(payload: any) {
        return this.baseApiService.postJson(CommandURL.GET_ACCOUNT_PAGING, payload);
    }

    createAccount(payload: any) {
        return this.baseApiService.postJson(CommandURL.CREATE_ACCOUNT, payload);
    }

    updateAccount(payload: any) {
        return this.baseApiService.postJson(CommandURL.UPDATE_ACCOUNT, payload);
    }

    deleteAccount(payload: any) {
        return this.baseApiService.postJson(CommandURL.DELETE_ACCOUNT, payload);
    }

}
