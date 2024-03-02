import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {CommandURL} from 'src/app/core/commands/api.command';
import {BaseApiService} from "../../../helpers/base-api.service";

@Injectable({
    providedIn: 'root'
})
export class SystemLogsService {

    constructor(private baseApiService: BaseApiService,
                private http: HttpClient,) {
    }

    getByCondition(payload: any) {
        return this.baseApiService.postJson(CommandURL.GETBYCONDITION_SYSTEM_LOGS, payload);
    }
}
