import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommandURL } from '../../commands/api.command';
import { BaseApiService } from '../../helpers/base-api.service';

@Injectable({
    providedIn: 'root'
})
export class RoleService {

    constructor(private baseApiService: BaseApiService,
        private http: HttpClient,) { }

    create(payload: any) {
        return this.baseApiService.postJson(CommandURL.CREATE_ROLE, payload);
    }

    update(payload: any) {
        return this.baseApiService.postJson(CommandURL.UPDATE_ROLE, payload);
    }

    getByCondition(payload: any) {
        return this.baseApiService.postJson(CommandURL.GETBYCONDITION_ROLE, payload);
    }
}
