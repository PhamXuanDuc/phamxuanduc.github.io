import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommandURL } from 'src/app/core/commands/api.command';
import {BaseApiService} from "../../../helpers/base-api.service";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private baseApiService: BaseApiService,
        private http: HttpClient,) { }

    create(payload: any) {
        return this.baseApiService.postJson(CommandURL.CREATE_PRODUCT, payload);
    }

    update(payload: any) {
        return this.baseApiService.postJson(CommandURL.UPDATE_PRODUCT, payload);
    }

    delete(payload: any) {
        return this.baseApiService.postJson(CommandURL.DELETE_PRODUCT, payload);
    }

    getByCondition(payload: any) {
        return this.baseApiService.postJson(CommandURL.GETBYCONDITION_PRODUCT, payload);
    }
}
