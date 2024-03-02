import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommandURL } from 'src/app/core/commands/api.command';
import { BaseApiService } from 'src/app/core/helpers/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class SystemParameterService {

constructor(
  private baseApiService: BaseApiService,
  private http: HttpClient) 
  { }


    searchSystemParameter(payload: any) {
        return this.baseApiService.postJson(CommandURL.SEARCH_SYSTEM_PARAMETER, payload);
    }

    updateSystemParameter(payload: any) {
        return this.baseApiService.postJson(CommandURL.UPDATE_SYSTEM_PARAMETER, payload);
    }


}
