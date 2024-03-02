import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommandURL } from '../../commands/api.command';
import { BaseApiService } from '../../helpers/base-api.service';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(
    private baseApiService: BaseApiService,
    private http: HttpClient
  ) { }

  findAll() {
    return this.http.post<any>(CommandURL.FIND_ALL, {});
  }

  getDepartmentList(payload: any) {
    return this.baseApiService.postJson(CommandURL.GET_DEPARTMENT_PAGING, payload);
  }

  createDepartment(payload: any) {
    return this.baseApiService.postJson(CommandURL.CREATE_DEPARTMENT, payload);
  }

  updateDepartment(payload: any) {
    return this.baseApiService.postJson(CommandURL.UPDATE_DEPARTMENT, payload);
  }

  deleteDepartment(payload: any) {
    return this.baseApiService.postJson(CommandURL.DELETE_DEPARTMENT, payload);
  }

  export(json:any){
    return this.http.post(CommandURL.EXPORT_DEPARTMENT, json, {
			responseType: 'arraybuffer',
			headers: new HttpHeaders()
		  });
  }

  exportTemplate(json:any){
    return this.http.post(CommandURL.EXPORT_TEMPLATE_DEPARTMENT, json, {
			responseType: 'arraybuffer',
			headers: new HttpHeaders()
		  });
  } 

  importDepartment(payload: FormData) {
    return this.http.post<any>(CommandURL.IMPORT_DEPARTMENT,
        payload,
        { headers: { 'Other-Content-Type': 'yes' } }
    );
}
  
}
