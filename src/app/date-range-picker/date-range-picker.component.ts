import { Component, OnInit } from '@angular/core';
import { MONTH, ShowDateData } from './date-range-picker';
import { DateRangePickerService } from './date-range-picker.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.css']
})
export class DateRangePickerComponent implements OnInit {

  today: Date = new Date(); // 获取当日日期
  dateNow: Date = this.today; // 界面显示的日期
  dateNext: Date = new Date(this.dateNow.getFullYear(), this.dateNow.getMonth() + 1); // 界面显示的日期
  yearPicker: number = this.today.getFullYear(); // 用户选择的年份
  monthPicker = this.today.getMonth() + 1; // 用户选择的月份
  MONTH: SelectItem[] = MONTH; // 月份的选择项
  YEAR: SelectItem[] = []; // 年份选择项
  dateRange: Date[] = []; // 用户选择的日期范围
  dateRangeShow = ''; // 显示的用户选择的日期范围
  showtableDataOne = [];
  showtableDataTwo = [];

  constructor(private service: DateRangePickerService) {
    this.YEAR = this.service.getYearRange(this.today.getFullYear());
  }

  ngOnInit() {
    this.updateTableData();
  }

  /**
   * 将用户选择的年份导入到界面显示日期
   */
  getYearPicker() {
    this.dateNow.setFullYear(this.yearPicker);
    this.updateTableData();
  }

  /**
   * 将用户选择的月份导入到界面显示日期
   */
  getMonthPicker() {
    this.dateNow.setMonth(this.monthPicker - 1);
    this.updateTableData();
  }

  /**
   * 获取当前日期的上一个日期
   */
  getPrevDate() {
    this.dateNow.setMonth(this.dateNow.getMonth() - 1);
    this.yearPicker = this.dateNow.getFullYear();
    this.monthPicker = this.dateNow.getMonth() + 1;
    this.updateTableData();
  }

  /**
   * 获取当前日期的下一个日期
   */
  getNextDate() {
    this.dateNow.setMonth(this.dateNow.getMonth() + 1);
    this.yearPicker = this.dateNow.getFullYear();
    this.monthPicker = this.dateNow.getMonth() + 1;
    this.updateTableData();
  }

  /**
   * 更新日期显示数据
   */
  updateTableData() {
    // dateNext: Date = new Date(this.dateNow.getFullYear(), this.dateNow.getMonth() + 1);
    this.dateNext.setMonth(this.dateNow.getMonth() + 1);
    this.showtableDataOne = this.service.resolveDayCaluadateData(this.dateNow);
    this.showtableDataTwo = this.service.resolveDayCaluadateData(new Date(this.dateNext.getFullYear(), this.dateNext.getMonth()));
  }

  /**
   * 获取第一个选择的日期
   * @param event
   */
  selectDate1(event) {
    for (let i = 0; i < this.showtableDataOne.length; i++) {
      for (let j = 0; j < 7; j++) {
        if (this.showtableDataOne[i][j].showDate === event.showDate) {
          this.showtableDataOne[i][j].active = true;
          console.log('---------')
        }
      }
    }

    const selectedData = new Date(this.dateNow.getFullYear(), event.month, event.showDate);
    this.makesureDataRange(selectedData);
  }

  /**
   * 获取第二个选择的日期
   * @param event
   */
  selectDate2(event) {
    const selectedData = new Date(this.dateNext.getFullYear(), event.month, event.showDate);
    this.makesureDataRange(selectedData);
  }

  /**
   * 将选择的日期转换为需要的日期
   * @param selectedData
   */
  makesureDataRange(selectedData: Date) {
    switch (this.dateRange.length) {
      case 0:
        break;
      case 1: {
        if (this.dateRange[0] < selectedData) {
        } else {
          this.dateRange = [];
        }
      }
        break;
      case 2:
        this.dateRange = [];
        break;
      default:
        this.dateRange = [];
    }

    this.dateRange.push(selectedData);
    switch (this.dateRange.length) {
      case 0: this.dateRangeShow = '';
        break;
      case 1: this.dateRangeShow = this.dateRange[0].getFullYear() + '/' +
        (this.dateRange[0].getMonth()) + '/' + this.dateRange[0].getDate();
        break;
      case 2:
        this.dateRangeShow = this.dateRange[0].getFullYear() + '/' +
          (this.dateRange[0].getMonth()) + '/' + this.dateRange[0].getDate() + ' - ' + this.dateRange[1].getFullYear() + '/' +
          (this.dateRange[1].getMonth()) + '/' + this.dateRange[1].getDate();
        break;
      default:
        this.dateRangeShow = '';
    }
  }

}
