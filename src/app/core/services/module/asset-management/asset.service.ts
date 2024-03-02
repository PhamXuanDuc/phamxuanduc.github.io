import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CommandURL } from "src/app/core/commands/api.command";
import { BaseApiService } from "src/app/core/helpers/base-api.service";


@Injectable({
    providedIn: 'root',
})
export class AssetService {
    constructor(
        private baseApiService: BaseApiService,
        private http: HttpClient) { }

    searchAsset(json: any) {
        return this.baseApiService.postJson(CommandURL.SEARCH_ASSET, json);
    }

    createAsset(payload: any) {
        return this.http.post<any>(CommandURL.CREATE_ASSET,
            payload,
            { headers: { 'Other-Content-Type': 'yes' } }
        );
    }

    editAsset(payload: any) {
        return this.http.post<any>(CommandURL.UPDATE_ASSET,
            payload,
            { headers: { 'Other-Content-Type': 'yes' } }
        );
    }
    importAsset(payload: FormData) {
        return this.http.post<any>(CommandURL.IMPORT_ASSET,
            payload,
            { headers: { 'Other-Content-Type': 'yes' } }
        );
    }

    searchByCondition(json:any){
        return this.baseApiService.postJson(CommandURL.SEARCH_CONDITION,json);
    }

    findAssetFile(json: any) {
        return this.baseApiService.postJson(CommandURL.FIND_ASSET_FILE, json);
    }


    export(json:any){
        return this.http.post(CommandURL.EXPORT_TEMPLATE, json, {
			responseType: 'arraybuffer',
			headers: new HttpHeaders()
		});
    }

    exportTransfer(json:any){
        return this.http.post(CommandURL.EXPORT_TEMPLATE_TRANSFER, json, {
			responseType: 'arraybuffer',
			headers: new HttpHeaders()
		  });
    }

    exportAsset(json:any){
        return this.http.post(CommandURL.EXPORT_ASSET, json, {
			responseType: 'arraybuffer',
			headers: new HttpHeaders()
		  });
    }
    // export(json:any){
    //     return this.http.post(CommandURL., json, {
    // 		responseType: 'arraybuffer',
    // 		headers: new HttpHeaders()
    // 	  });
    // }
}