import { Injectable } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DateData, ShowDateData, MONTH } from './date-range-picker';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class DateRangePickerService {

  private static YEARRANGE = 11;
  private today = new Date(); // 获取当日日期
  maxDate = new Date(2038, 3, 15); // 日期选择范围的最大值
  minDate = new Date(2000, 5, 21); // 日期选择范围的最小值

  constructor() { }

  /**
   * 获取日历年份选项
   */
  getYearRange(): SelectItem[] {

    // tslint:disable-next-line:prefer-const
    let yearRange: SelectItem[] = [];

    if (this.maxDate > this.minDate) {
      for (let i = this.minDate.getFullYear(); i <= this.maxDate.getFullYear(); i++) {
        yearRange.push({ label: i.toString(), value: i });
      }
      return yearRange;
    } else {
      const yearNow = new Date().getFullYear();
      if ((0 < yearNow / 1000) && (yearNow / 1000) < 9) {
        for (let i = yearNow - DateRangePickerService.YEARRANGE; i < yearNow + DateRangePickerService.YEARRANGE; i++) {
          yearRange.push({ label: i.toString(), value: i });
        }
        return yearRange;
      } else {
        yearRange.push(
          { label: this.today.getFullYear().toString(), value: this.today.getFullYear() }
        );
        return yearRange;
      }
    }

  }

  /**
   * 获取当前日期后，将其解析为选择为日的范围时面板显示想数据
   */
  resolveDayCaluadateData(dateNow: Date): any[] {
    // tslint:disable-next-line:prefer-const
    let dateArray: DateData[] = [];
    const firstDay = new Date(dateNow.getFullYear(), dateNow.getMonth(), 1);
    let firstDayWeekDay = firstDay.getDay(); // 获取到星期几

    if (firstDayWeekDay === 0) {
      firstDayWeekDay = 7;
    }

    const year = firstDay.getFullYear();
    const month = firstDay.getMonth() + 1;

    const lastDayOfLastMonth = new Date(year, month - 1, 0);
    const lastDateOfLastMonth = lastDayOfLastMonth.getDate();
    const preMonthDayCount = firstDayWeekDay - 1;
    const lastDay = new Date(year, month, 0);
    const lastDate = lastDay.getDate();

    for (let i = 0; i < 6 * 7; i++) {
      const date = i + 1 - preMonthDayCount;
      let showDate = date;
      let thisMonth = month;
      // 上一个月
      if (date <= 0) {
        thisMonth = month - 1;
        showDate = lastDateOfLastMonth + date;
      } else {
        if (date > lastDate) {
          // 下一个月
          thisMonth = month + 1;
          showDate = showDate - lastDate;
        }
      }

      if (thisMonth === 0) {
        thisMonth = 12;
      }

      if (thisMonth === 13) {
        thisMonth = 1;
      }

      dateArray.push({
        month: thisMonth,
        date: date,
        showDate: showDate
      });
    }


    return this.turnToShowTableData(dateArray, month, dateNow);
  }

  /**
   * 将数据进行分行分列
   */
  turnToShowTableData(dateData: DateData[], month, dateNow: Date): ShowDateData[] {
    // tslint:disable-next-line:prefer-const
    let showDataArray = [];
    let minShowDataArray: ShowDateData[] = [];

    for (let i = 0; i < dateData.length; i++) {
      // tslint:disable-next-line:prefer-const
      let d = new ShowDateData();
      const today = new Date(dateNow.getFullYear(), dateData[i].month, dateData[i].showDate);
      if (dateData[i].month !== month || today > this.maxDate || today < this.minDate) {
        d.disable = false;
      } else {
        d.disable = true;
      }
      d.month = dateData[i].month;
      d.showDate = dateData[i].showDate;
      if (i % 7 === 6) {
        minShowDataArray.push(d);
        showDataArray.push(minShowDataArray);
        minShowDataArray = [];
      } else {
        minShowDataArray.push(d);
      }
    }

    return showDataArray;
  }

  /**
   * 获取日期选择范围
   */
  getYEARRANGE() {
    return DateRangePickerService.YEARRANGE;
  }

  /**
   * 获取用户输入的最大最小值
   */
  setDateRangeInput(maxDate: Date, minDate: Date) {
    this.maxDate = maxDate;
    this.minDate = minDate;
    return;
  }

  getMonthTableData() {
    // tslint:disable-next-line:prefer-const
    let monthArray = [];
    // tslint:disable-next-line:prefer-const
    let tempArray = [];
    for (let i = 0; i < MONTH.length; i++) {
      if (i % 4 === 3) {
        tempArray.push(MONTH[i]);
        monthArray.push(tempArray);
        tempArray = [];
      } else {
        tempArray.push(MONTH[i]);
      }
    }

    return monthArray;
  }
}
