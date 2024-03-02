import {Injectable} from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {FILE_TYPE} from '../../shared/utils/app.util';


@Injectable()
export class ExcelService {

    constructor() {
    }

    public exportAsExcelFile(json: any[], excelFileName: string): void {

        const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        const myworkbook: XLSX.WorkBook = {Sheets: {data: myworksheet}, SheetNames: ['data']};
        const excelBuffer: any = XLSX.write(myworkbook, {bookType: 'xlsx', type: 'array'});
        this.saveAsExcelFile(excelBuffer, excelFileName);
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {
            type: FILE_TYPE.EXCEL
        });
        FileSaver.saveAs(data, fileName + '_exported' + FILE_TYPE.EXCEL_EXTENSION);
    }

}
