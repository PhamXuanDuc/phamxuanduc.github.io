export function formatPrefixMonthDay(value: any) {
  if (value < 10) {
    return '0' + value;
  }
  return value;
}

export function formatDateStrFromDatePicker(
  value: any,
  splittor: string = '/'
) {
  return (
    formatPrefixMonthDay(value.day) +
    splittor +
    formatPrefixMonthDay(value.month) +
    splittor +
    value.year
  );
}

export function formatDateStr(value: any) {
  return (
    '' +
    value.year +
    formatPrefixMonthDay(value.month) +
    formatPrefixMonthDay(value.day)
  );
}

export function formatDateFromStr(value: string) {
  const date = value.split('/');
  return new Date(Number(date[2]), Number(date[1]) - 1, Number(date[0]));
}

export function formatISODate(value: any) {
  if (value) {
    const date = new Date(value);
    return (
      date.getFullYear() +
      '-' +
      formatPrefixMonthDay(date.getMonth() + 1) +
      '-' +
      formatPrefixMonthDay(date.getDate())
    );
  } else {
    return null;
  }
}

export function formatDateToMilliseconds(value: any) {
  const formatDate = new Date(value.year, value.month - 1, value.day, 0, 0, 0);
  return formatDate.getTime();
}

/**
 * Format file size
 * @param bytes
 * @param decimals
 */
export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) {
    return '0 Bytes';
  }
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function deepCopyDate(d: Date) {
  return new Date(d.valueOf());
}

/**
 * Add date by number
 * @param numberOfDate
 */
export function plusDate(numberOfDate: number) {
  const date = new Date();
  const maxDate = deepCopyDate(date);
  maxDate.setDate(new Date().getDate() + numberOfDate);
  return new Date(maxDate.valueOf());
}

export function addDaysToDate(date: any, n: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
}

export function plusYear(numberOfYear: number) {
  const date = new Date();
  const maxDate = deepCopyDate(date);
  maxDate.setFullYear(date.getFullYear() + numberOfYear);
  return new Date(maxDate.valueOf());
}

export function toDateFromObject(param: any) {
  return new Date(param.year, param.month - 1, param.day);
}

export function groupBy(arr: Array<any>, id: string) {
  return arr.reduce(
    (r, v, i, a, k = (c => c[id])(v)) => ((r[k] || (r[k] = [])).push(v), r),
    {}
  );
}

export function groupItemBy(array: Array<any>, property: string) {
  const hash: any = {},
    props = property.split('.');
  for (var i = 0; i < array.length; i++) {
    var key = props.reduce((acc, prop) => {
      return acc && acc[prop];
    }, array[i]);
    if (!hash[key]) hash[key] = [];
    hash[key].push(array[i]);
  }
  return hash;
}

/**
 * Paging elements by number from list
 * @param array
 * @param pageSize
 * @param pageNumber
 */
export function paginate(
  array: Array<any>,
  pageSize: number,
  pageNumber: number
) {
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}

/**
 * Remove duplicate element
 * @param arr
 * @param kF
 * @param kD
 */
export function dedupe(arr: any, kF: any, kD: any | undefined) {
  return arr.reduce(
    (p: any, c: any) => {
      // create an identifying id from the object values
      const id = [kF.map((k: any) => c[k])].join('|');
      // if id is not found in temp array => add object to the output array and add key to temp array
      if (p.temp.indexOf(id) === -1) {
        p.out.push(kD ? omit(c, kD) : c);
        p.temp.push(id);
      }
      return p;
    },
    { temp: [], out: [] }
  ).out;
}

export function omit(obj: any, arr: any) {
  return Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc: any, key: string) => ((acc[key] = obj[key]), acc), {});
}

export function toFixedWithoutRounding(value: any) {
  if (!value) {
    return '';
  }
  return value.toString().match(/^-?\d+(?:\.\d{0})?/)[0];
}

/**
 * Get parameter by name in URL
 * @param paramName
 */
export function gup(paramName: string) {
  const url = location.href;
  paramName = paramName.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regexS = '[\\?&]' + paramName + '=([^&#]*)';
  const regex = new RegExp(regexS);
  const results = regex.exec(url);
  return results == null ? null : results[1];
}

export function getKeyValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

export function formatStringNumber(value: string, defaultKey = '0') {
  value = value.trim();
  value = value.replace(/\D/g, '');
  while (value.length > 0 && value[0] === '0') {
    value = value.replace('0', '');
  }
  return value ? value : defaultKey ? defaultKey : '';
}

export function removeVietNameCharacter(str: string) {
  // remove accents
  var from = "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
      to   = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
  for (var i=0, l=from.length ; i < l ; i++) {
    str = str.replace(RegExp(from[i], "gi"), to[i]);
  }

  str = str.toLowerCase()
        .trim()
        .replace(/[^a-z0-9\-]/g, '-')
        .replace(/-+/g, '-');

  return str;
}
