import {parseTime} from './convert.util';

export function createFileType(e: string) {
    let fileType = '';
    if (e === 'pdf') {
        fileType = `application/${e}`;
    } else if (e === 'docx') {
        fileType = 'application/msword';
    } else if (e === 'xls') {
        fileType = 'application/vnd.ms-excel';
    } else if (e === 'xlsx') {
        fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    }

    return fileType;
}

export function downLoadFile(data: any, type: string, fileName: string) {
    const date = new Date();
    const blob = new Blob([data], {type});
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, appendExtension(fileName + '_' + parseTime(date.getTime(), '{d}{m}{y}'), type));
    } else {
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = appendExtension(fileName + '_' + parseTime(date.getTime(), '{d}{m}{y}'), type);
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
    }
}

export function viewFile(data: any, type: string, fileName: string) {
    const blob = new Blob([data], {type});
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        const date = new Date();
        window.navigator.msSaveOrOpenBlob(blob, appendExtension(fileName + '_' + parseTime(date.getTime(), '{d}{m}{y}'), type));
    } else {
        const fileURL = URL.createObjectURL(blob);
        // setTimeout(() => {
        //     window.URL.revokeObjectURL(fileURL); // For Firefox it is necessary to delay revoking the ObjectURL
        // }, 100);
        var win = window.open('about:blank', 'newtab');
        win.open(fileURL, 'newtab');
    }
}

export function appendExtension(name: string, type: string) {
    switch (type) {
        case 'application/pdf':
            return name.concat('.').concat('pdf');
        case 'application/vnd.ms-excel':
            return name.concat('.').concat('xls');
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            return name.concat('.').concat('xlsx');
    }
}
