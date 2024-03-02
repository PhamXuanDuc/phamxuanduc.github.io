import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CommandURL } from "src/app/core/commands/api.command";
import { BaseApiService } from "src/app/core/helpers/base-api.service";


@Injectable({
    providedIn: 'root',
})
export class TaskService{
    constructor(
        private baseApiService: BaseApiService,
		private http: HttpClient) {}

    searchTask(json:any){
        return this.baseApiService.postJson(CommandURL.GET_TASK_PAGING,json);
    }

    createTask(json:any){
        return this.baseApiService.postJson(CommandURL.CREATE_TASK,json);
    }

    editTask(json:any){
        return this.baseApiService.postJson(CommandURL.UPDATE_TASK,json);
    }

    deleteTask(json:any){
        return this.baseApiService.postJson(CommandURL.DELETE_TASK,json);
    }

    exportTask(json:any){
        return this.baseApiService.postJson(CommandURL.EXPORT_TASK,json);
    }
    importFile(payload: FormData) {
        return this.http.post<any>(CommandURL.IMPORT_TASK, payload, 
            { headers: { 'Other-Content-Type': 'yes' } });
    }
    deleteFile(json:any){
        return this.baseApiService.postJson(CommandURL.DELETE_TASK_ATTACHMENTS,json);
    }

    findTaskAttachments(json:any){
        return this.baseApiService.postJson(CommandURL.FIND_TASK_ATTACHMENTS,json);
    }

    exportTaskAttachments(json:any){
        return this.http.post(CommandURL.EXPORT_TASK_ATTACHMENTS, json,{
			responseType: 'arraybuffer',
			headers: new HttpHeaders()
		  });
    }
    
    findCommentByTaskCode(json:any){
        return this.baseApiService.postJson(CommandURL.FIND_COMMENT_BY_TASK_CODE,json);
    }

    createTaskComment(json:any){
        return this.baseApiService.postJson(CommandURL.CREATE_TASK_COMMENT,json);
    }

    updateTaskComment(json:any){
        return this.baseApiService.postJson(CommandURL.UPDATE_TASK_COMMENT,json);
    }

    deleteTaskComment(json:any){
        return this.baseApiService.postJson(CommandURL.DELETE_TASK_COMMENT,json);
    }
    
}