import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommandURL } from '../../commands/api.command';
import { BaseApiService } from '../../helpers/base-api.service';

@Injectable({
    providedIn: 'root'
})
export class PermissionService {

    constructor(private baseApiService: BaseApiService,
        private http: HttpClient,) { }

    create(payload: any) {
        return this.baseApiService.postJson(CommandURL.CREATE_PER, payload);
    }

    update(payload: any) {
        return this.baseApiService.postJson(CommandURL.UPDATE_ROLE, payload);
    }

    savePermission(payload: any) {
        return this.baseApiService.postJson(CommandURL.SAVE_PERMISSION, payload);
    }

    getPERByCondition(payload: any) {
        return this.baseApiService.postJson(CommandURL.GETALLCONDITION_PER, payload);
    }
}
