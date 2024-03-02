import {HttpHeaders} from '@angular/common/http';

export const DATE_FORMAT = {
    DEFAULT_DATE_TIME: '{y}-{m}-{d} {h}:{i}:{s}',
    DATE_WITH_SLASH: '{d}/{m}/{y}',
    DATE_WITH_DASH: '{d}-{m}-{y}',
    DATE_WITH_DASH_YEAR: '{y}-{m}-{d}',
    DEFAULT_PLACEHOLDER: 'dd/MM/yyyy'
};

export const ResponseText = { responseType : 'text' as 'json' };
export const ExportFileOptions = {
    responseType: 'arraybuffer', headers: new HttpHeaders()
};
export const EmptyString = '';
