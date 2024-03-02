import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommandURL } from '../../commands/api.command';
import { BaseApiService } from '../../helpers/base-api.service';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {


    constructor(private baseApiService: BaseApiService) { }

    create(payload: any) {
        return this.baseApiService.postJson(CommandURL.CREATE_MENU, payload);
    }

    update(payload: any) {
        return this.baseApiService.postJson(CommandURL.UPDATE_MENU, payload);
    }

    getByCondition(payload: any) {
        return this.baseApiService.postJson(CommandURL.GET_MENU_BY_CONDITION, payload);
    }

    findAllMenu() {
        return this.baseApiService.postJson(CommandURL.FIND_ALL_MENU, {});
    }

    findMenuByUserId(userId: string) {
        const json = {userId: userId}
        return this.baseApiService.postJson(CommandURL.FIND_MENU_BY_USERID, json); 
    }
}
