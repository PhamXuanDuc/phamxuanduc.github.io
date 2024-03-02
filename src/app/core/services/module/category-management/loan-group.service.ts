import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommandURL } from 'src/app/core/commands/api.command';
import {BaseApiService} from "../../../helpers/base-api.service";

@Injectable({
    providedIn: 'root'
})
export class LoanGroupService {

    constructor(private baseApiService: BaseApiService,
        private http: HttpClient,) { }

    create(payload: any) {
        return this.baseApiService.postJson(CommandURL.CREATE_LOAN_GROUP, payload);
    }

    update(payload: any) {
        return this.baseApiService.postJson(CommandURL.UPDATE_LOAN_GROUP, payload);
    }

    delete(payload: any) {
        return this.baseApiService.postJson(CommandURL.DELETE_LOAN_GROUP, payload);
    }

    getByCondition(payload: any) {
        return this.baseApiService.postJson(CommandURL.GETBYCONDITION_LOAN_GROUP, payload);
    }
}
