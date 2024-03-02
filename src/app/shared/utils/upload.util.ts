export function uploadFileAlfresco(file: File, creator: string, module?: string, isTemplate?: boolean) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const json = {module, fileName: file.name, fileType: file.type, creator, template: isTemplate};
    formData.append('info', new Blob([JSON.stringify(json)], {type: 'application/json'}));
    return formData;
}

export function uploadFileAlfresco_AdminTool(file: File, creator: string) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const json = {fileName: file.name, fileType: file.type, creator};
    formData.append('info', new Blob([JSON.stringify(json)], {type: 'application/json'}));
    return formData;
}

export function parseDataUpload(file: File, json: any) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('info', new Blob([JSON.stringify(json)], {type: 'application/json'}));
    return formData;
}
