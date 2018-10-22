import { Component, OnInit, Input } from '@angular/core';
import { MONTH, ShowDateData } from './date-range-picker';
import { DateRangePickerService } from './date-range-picker.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.css']
})
export class DateRangePickerComponent implements OnInit {

  @Input() maxDate = new Date(2038, 1, 1); // 日期选择范围的最大值
  @Input() minDate = new Date(2000, 1, 1); // 日期选择范围的最小值

  today: Date = new Date(); // 获取当日日期
  dateNow: Date = this.today; // 界面显示的日期
  dateNext: Date = new Date(this.dateNow.getFullYear(), this.dateNow.getMonth() + 1); // 界面显示的日期
  yearPicker: number = this.today.getFullYear(); // 用户选择的年份
  monthPicker = this.today.getMonth() + 1; // 用户选择的月份
  MONTH: SelectItem[] = MONTH; // 月份的选择项
  YEAR: SelectItem[] = []; // 年份选择项
  dateRange: Date[] = []; // 用户选择的日期范围
  dateRangeShow = ''; // 显示的用户选择的日期范围
  choose = 'day'; // 用户要选择的范围
  MonthTableDataOne; // 用户选择月份时界面第一表格数据
  MonthTableDataTwo; // 用户选择月份时界面第二表格数据
  showtableDataOne = [];
  showtableDataTwo = [];
  isYearPickerShow = true;
  isMonthPickerShow = true;
  isMonthShow = true;
  isDayTableShow = true;
  isMonthTableShow = false;

  constructor(private service: DateRangePickerService) {
    this.service.setDateRangeInput(this.maxDate, this.minDate);
    this.YEAR = this.service.getYearRange();
  }

  ngOnInit() {
    this.updateTableData();
    console.log(this.service.getMonthTableData())
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
    switch (this.choose) {
      case 'day':
        if (this.dateNow.getFullYear() >= this.YEAR[0].value) {
          this.dateNow.setMonth(this.dateNow.getMonth() - 1);
          this.yearPicker = this.dateNow.getFullYear();
          this.monthPicker = this.dateNow.getMonth() + 1;
          this.updateTableData();
        }
        break;
      case 'month':
        if (this.dateNow.getFullYear() >= this.YEAR[0].value) {
          this.dateNow.setFullYear(this.dateNow.getFullYear() - 1);
          this.yearPicker = this.dateNow.getFullYear();
          this.monthPicker = this.dateNow.getMonth() + 1;
        }
    }
  }

  /**
   * 获取当前日期的下一个日期
   */
  getNextDate() {
    switch (this.choose) {
      case 'day':
        if (this.dateNext.getFullYear() <= this.YEAR[this.YEAR.length - 1].value) {
          this.dateNow.setMonth(this.dateNow.getMonth() + 1);
          this.yearPicker = this.dateNow.getFullYear();
          this.monthPicker = this.dateNow.getMonth() + 1;
          this.updateTableData();
        }
        break;
      case 'month':
        if (this.dateNext.getFullYear() <= this.YEAR[this.YEAR.length - 1].value) {
          this.dateNow.setFullYear(this.dateNow.getFullYear() + 1);
          this.yearPicker = this.dateNow.getFullYear();
          this.monthPicker = this.dateNow.getMonth() + 1;
        }
    }
  }

  /**
   * 更新日期显示数据
   */
  updateTableData() {
    // dateNext: Date = new Date(this.dateNow.getFullYear(), this.dateNow.getMonth() + 1);
    this.dateNext = new Date(this.dateNow);
    this.dateNext.setMonth(this.dateNow.getMonth() + 1);
    this.showtableDataOne = this.service.resolveDayCaluadateData(this.dateNow);
    this.showtableDataTwo = this.service.resolveDayCaluadateData(new Date(this.dateNext.getFullYear(), this.dateNext.getMonth()));
  }

  /**
   * 获取第一个选择的日期
   * @param event
   */
  selectDate1(event) {
    if (event.disable === true) {
      const selectedData = new Date(this.dateNow.getFullYear(), event.month - 1, event.showDate);
      this.makesureDataRange(selectedData);
      this.setDateActive();
      if (this.dateRange.length !== 2) {
        for (let i = 0; i < this.showtableDataOne.length; i++) {
          for (let j = 0; j < 7; j++) {
            if (this.showtableDataOne[i][j].disable === true) {
              this.showtableDataOne[i][j].active = false;
              if (this.showtableDataOne[i][j].showDate === event.showDate) {
                this.showtableDataOne[i][j].active = true;
              }
            }
          }
        }
      }
    }
  }

  /**
   * 获取第二个选择的日期
   * @param event
   */
  selectDate2(event) {
    if (event.disable === true) {
      const selectedData = new Date(this.dateNext.getFullYear(), event.month - 1, event.showDate);
      this.makesureDataRange(selectedData);
      this.setDateActive();
      if (this.dateRange.length !== 2) {
        for (let i = 0; i < this.showtableDataTwo.length; i++) {
          for (let j = 0; j < 7; j++) {
            if (this.showtableDataTwo[i][j].disable === true) {
              this.showtableDataTwo[i][j].active = false;
              if (this.showtableDataTwo[i][j].showDate === event.showDate) {
                this.showtableDataTwo[i][j].active = true;
              }
            }
          }
        }
      }
    }
  }

  /**
   * 将选择的日期转换为需要的日期
   * @param selectedData
   */
  makesureDataRange(selectedData: Date) {
    if (selectedData.getFullYear() <= this.YEAR[this.YEAR.length - 1].value) {
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
          ((this.dateRange[0].getMonth()) + 1) + '/' + this.dateRange[0].getDate();
          break;
        case 2:
          this.dateRangeShow = this.dateRange[0].getFullYear() + '/' +
            ((this.dateRange[0].getMonth()) + 1) + '/' + this.dateRange[0].getDate() + ' - ' + this.dateRange[1].getFullYear() + '/' +
            ((this.dateRange[1].getMonth()) + 1) + '/' + this.dateRange[1].getDate();
          break;
        default:
          this.dateRangeShow = '';
      }
    }
  }

  /**
   * 将选择的日期激活，让其显示为特定颜色
   */
  setDateActive() {
    for (let i = 0; i < this.showtableDataOne.length; i++) {
      for (let j = 0; j < 7; j++) {
        if (this.showtableDataOne[i][j].disable === true) {
          this.showtableDataOne[i][j].active = false;
          if (this.dateRange.length === 2) {
            const date = new Date(this.dateNow.getFullYear(), this.dateNow.getMonth(), this.showtableDataOne[i][j].showDate);
            if (this.dateRange[0] <= date && this.dateRange[1] >= date) {
              this.showtableDataOne[i][j].active = true;
            }
          }
        }
      }
    }
    for (let i = 0; i < this.showtableDataTwo.length; i++) {
      for (let j = 0; j < 7; j++) {
        if (this.showtableDataTwo[i][j].disable === true) {
          this.showtableDataTwo[i][j].active = false;
          if (this.dateRange.length === 2) {
            const date = new Date(this.dateNext.getFullYear(), this.dateNext.getMonth(), this.showtableDataTwo[i][j].showDate);
            if (this.dateRange[0] <= date && this.dateRange[1] >= date) {
              this.showtableDataTwo[i][j].active = true;
            }
          }
        }
      }
    }
  }

  /**
   * 用户选择范围为日 月 季度 年
   */
  rangeChoose(choose) {
    this.choose = choose;
    switch (this.choose) {
      case 'day':
        this.isYearPickerShow = true;
        this.isMonthPickerShow = true;
        this.isMonthShow = true;
        this.isDayTableShow = true;
        this.isMonthTableShow = false;
        break;
      case 'month':
        this.isYearPickerShow = true;
        this.isMonthPickerShow = false;
        this.isMonthShow = false;
        this.isDayTableShow = false;
        this.isMonthTableShow = true;
        this.dateNow.setFullYear(this.yearPicker);
        this.dateNext.setFullYear(this.yearPicker + 1);
        this.MonthTableDataOne = this.service.getMonthTableData();
        this.MonthTableDataTwo = this.service.getMonthTableData();
        break;

    }
  }
}
