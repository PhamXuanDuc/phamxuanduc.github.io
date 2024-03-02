import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CommandURL } from "src/app/core/commands/api.command";
import { BaseApiService } from "src/app/core/helpers/base-api.service";


@Injectable({
    providedIn: 'root',
})
export class InventoryService {
    constructor(
        private baseApiService: BaseApiService,
        private http: HttpClient) { }

    searchInventory(json: any) {
        return this.baseApiService.postJson(CommandURL.SEARCH_INVENTORY, json);
    }

    createInventory(json: any) {
        return this.baseApiService.postJson(CommandURL.CREATE_INVENTORY, json);
    }

    editInventory(json: any) {
        return this.baseApiService.postJson(CommandURL.UPDATE_INVENTORY, json);
    }
    
}