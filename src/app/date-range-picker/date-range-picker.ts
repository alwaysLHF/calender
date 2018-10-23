import { SelectItem } from 'primeng/api';

export const MONTH: SelectItem[] = [
    { label: '一月', value: 1 },
    { label: '二月', value: 2 },
    { label: '三月', value: 3 },
    { label: '四月', value: 4 },
    { label: '五月', value: 5 },
    { label: '六月', value: 6 },
    { label: '七月', value: 7 },
    { label: '八月', value: 8 },
    { label: '九月', value: 9 },
    { label: '十月', value: 10 },
    { label: '十一月', value: 11 },
    { label: '十二月', value: 12 },
];

/**
 * 界面每个表格应该显示的数据结构
 */
export class DateData {
    date: number;
    month: number;
    showDate: number;
}

/**
 * 将数据进行分行分列后的结构
 */
export class ShowDateData {
    // tslint:disable-next-line:no-inferrable-types
    active: boolean = false;
    // tslint:disable-next-line:no-inferrable-types
    disable: boolean = false;
    month: number;
    showDate: number;
}

/**
 * 用户选择按钮样式控制
 */
export class ButtonClass {
    dayClass = false;
    weekClass = false;
    monthClass = false;
    yearClass = false;

    initData() {
        this.dayClass = false;
        this.weekClass = false;
        this.monthClass = false;
        this.yearClass = false;
    }
}
