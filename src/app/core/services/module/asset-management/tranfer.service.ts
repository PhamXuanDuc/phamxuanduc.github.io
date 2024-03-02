import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CommandURL } from "src/app/core/commands/api.command";
import { BaseApiService } from "src/app/core/helpers/base-api.service";


@Injectable({
    providedIn: 'root',
})
export class TranferService {
    constructor(
        private baseApiService: BaseApiService,
        private http: HttpClient) { }

    searchTransfer(json: any) {
        return this.baseApiService.postJson(CommandURL.SEARCH_TRANFER, json);
    }

    createTransfer(json: any) {
        return this.baseApiService.postJson(CommandURL.CREATE_TRANFER, json);
    }

    editTransfer(json: any) {
        return this.baseApiService.postJson(CommandURL.UPDATE_TRANFER, json);
    }

    importTransfer(payload: FormData) {
        return this.http.post<any>(CommandURL.IMPORT_TRANSFER,
            payload,
            { headers: { 'Other-Content-Type': 'yes' } }
        );
    }
    
}