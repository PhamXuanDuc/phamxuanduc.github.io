import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'getLabelByIdInArray'
})
export class GetLabelByIdInArrayPipe implements PipeTransform {
    constructor() {}

    transform(value: any, list: Array<any>, keyValue: string, keyName: string) {
        if (value && list) {
            const item = list.find(elem => elem[keyValue] === value);
            return item ? item[keyName] : '';
        }
        return '';
    }
}
