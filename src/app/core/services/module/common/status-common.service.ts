import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommandURL } from 'src/app/core/commands/api.command';
import { BaseApiService } from 'src/app/core/helpers/base-api.service';

@Injectable({
    providedIn: 'root'
})
export class StatusCommonService {

    constructor(private baseApiService: BaseApiService) { }

    findStatusCommon(payload: any) {
        return this.baseApiService.postJson(CommandURL.FIND_STATUS_COMMON, payload); 
    }
}
