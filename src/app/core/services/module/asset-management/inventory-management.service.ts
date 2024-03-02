import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CommandURL } from "src/app/core/commands/api.command";
import { BaseApiService } from "src/app/core/helpers/base-api.service";


@Injectable({
    providedIn: 'root',
})
export class InventoryManagementService {
    constructor(
        private baseApiService: BaseApiService,
        private http: HttpClient) { }

    searchInventoryPhase(json: any) {
        return this.baseApiService.postJson(CommandURL.SEARCH_INVENTORY_PHASE, json);
    }

    createInventoryPhase(json: any) {
        return this.baseApiService.postJson(CommandURL.CREATE_INVENTORY_PHASE, json);
    }

    editInventoryPhase(json: any) {
        return this.baseApiService.postJson(CommandURL.UPDATE_INVENTORY_PHASE, json);
    }
    
}