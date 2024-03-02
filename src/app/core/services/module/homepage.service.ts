import { Injectable } from '@angular/core';
import { CommandURL } from '../../commands/api.command';
import { BaseApiService } from '../../helpers/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  constructor(
    private baseApiService: BaseApiService
  ) { }

  getDepartmentChart() {
    return this.baseApiService.postJson(CommandURL.FIND_DEPARTMENT_CHART, {})
  }

}
