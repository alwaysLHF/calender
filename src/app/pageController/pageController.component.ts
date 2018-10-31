import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { PageControllerService } from './pageController.service';

@Component({
  selector: 'app-page-controller',
  templateUrl: './pageController.component.html',
  styleUrls: ['./pageController.component.css'],
  providers: [PageControllerService]
})
export class PageControllerComponent implements OnInit, OnChanges {
  @Input() pageSizeInit;
  @Input() pageTotal;
  @Input() pageSize;
  @Input() firstPageIs;
  @Output() pageClick = new EventEmitter<object>();

  pageNumTotal = 0; // 总共有多少页
  pageSizeNow = 20; // 当前页量
  pageSizeBefore = 20; // 切换前页量，用于做缓存数据
  pageFirst = 1;
  // pageShowNum = {
  //   pageOne: this.pageFirst,
  //   pageTwo: this.pageFirst + 1,
  //   pageThree: this.pageFirst + 2,
  //   pageFour: this.pageFirst + 3,
  //   pageFive: this.pageFirst + 4
  // };
  // pageShowNum = [
  //   { num: this.pageFirst, active: true },
  //   { num: this.pageFirst + 1, active: false },
  //   { num: this.pageFirst + 2, active: false },
  //   { num: this.pageFirst + 3, active: false },
  //   { num: this.pageFirst + 4, active: false },
  // ];
  pageRecord = 1; // 记录当前是第几页
  jumpToPage = ''; // 跳转输入
  pageShowNum = [
    { value: 6, header: '<<', active: false },
    { value: 7, header: '<', active: false },
    { value: 1, header: this.pageFirst, active: true },
    { value: 2, header: this.pageFirst + 1, active: false },
    { value: 3, header: this.pageFirst + 2, active: false },
    { value: 4, header: this.pageFirst + 3, active: false },
    { value: 5, header: this.pageFirst + 4, active: false },
    { value: 8, header: '>', active: false },
    { value: 9, header: '>>', active: false },
  ];
  constructor() { }

  ngOnChanges() {
    if (this.pageTotal && this.pageSizeNow) {
      this.pageNumTotal = Math.ceil(this.pageTotal / this.pageSizeNow);
    }
    if (this.firstPageIs) {
      this.pageRecord = this.pageFirst = this.firstPageIs;
    }
  }

  ngOnInit() {
    if (this.firstPageIs) {
      this.pageRecord = this.pageFirst = this.firstPageIs;
      this.pageShowNum = [
        { value: 6, header: '<<', active: false },
        { value: 7, header: '<', active: false },
      ];
      const leng = this.pageNumTotal - this.pageFirst;
      for (let i = 0; i <= leng; i++) { // 循环产生分页按钮
        if (i <= 4) { // 总共显示五条数据，从0-4
          this.pageShowNum.push({ value: i + 1, header: this.pageFirst + i, active: false });
        }
      }
      this.pageShowNum.push( // 因为是push进去，所以要后加入
        { value: 8, header: '>', active: false },
        { value: 9, header: '>>', active: false });
      this.pageShowNum.forEach(el => {
        if (el.value === 1) {
          el.active = true;
        }
      });
    }
  }
  // 分页按钮点击
  pageClickEvent(e) {
    console.log(e);
    console.log(this.pageShowNum);
    if (e.value <= 5) {
      this.pageShowNum.forEach(el => {
        el.active = false;
      });
      e.active = true;
      this.pageRecord = e.header;
      this.pageClick.emit({ pageNum: e.header, pageSize: this.pageSizeNow });
    } else {
      switch (e.value) {
        case 6: // 首页
          this.pageFirst = 1;
          this.pageRecord = 1;
          break;
        case 7: // 上一页
          if (this.pageFirst >= 2) {  // 大于第二页则可以再向前一页
            this.pageFirst--;
          }
          if (this.pageRecord > 1) {
            this.pageRecord--;
          }
          break;
        case 8: // 下一页
          if (this.pageFirst + 5 <= this.pageNumTotal) { // 小于倒数第二页则可以继续向后走
            this.pageFirst++;
          }
          if (this.pageRecord < this.pageNumTotal) {
            this.pageRecord++;
          }
          break;
        case 9: // 尾页
          if (this.pageNumTotal <= 4) { // 如果总页数小于5的话，显示全部分页按钮
            this.pageFirst = 1;
          } else {
            this.pageFirst = this.pageNumTotal - 4; // 如果总页数大于5个的话，整体显示数量显示5个标准，然后向后走一格
          }
          this.pageRecord = this.pageNumTotal;
          break;
      }
      // 刷新分页按钮
      this.pageShowNum = [
        { value: 6, header: '<<', active: false },
        { value: 7, header: '<', active: false },
      ];
      const leng = this.pageNumTotal - this.pageFirst;
      for (let i = 0; i <= leng; i++) {
        if (i <= 4) { // 总共显示五条数据，从0-4
          this.pageShowNum.push({ value: i + 1, header: this.pageFirst + i, active: false });
        }
      }
      this.pageShowNum.push(
        { value: 8, header: '>', active: false },
        { value: 9, header: '>>', active: false });
      this.pageShowNum.forEach(el => {
        el.active = false;
        if (el.header === this.pageRecord) {
          el.active = true;
        }
      });
    }
  }

  // 页量更改
  selectPageSizeChange(e) {
    console.log(this.pageSizeNow);
    if (this.pageTotal && this.pageSizeNow) {
      this.pageNumTotal = Math.ceil(this.pageTotal / this.pageSizeNow);
    }
    // 刷新分页按钮
    this.pageShowNum = [
      { value: 6, header: '<<', active: false },
      { value: 7, header: '<', active: false },
    ];
    let leng = this.pageNumTotal - this.pageFirst; // 总页数 - 当前页数 = 要显示几个页数
    if (this.pageNumTotal < 5) { // 如果leng小于0，没有可显示的分页按钮
      this.pageFirst = 1;
      // this.pageRecord = this.pageSizeBefore * this.pageRecord // 当前页量，第几页
      this.pageRecord = 1; /* 这里 他不得1但是，还是需要通过当前该显示哪页来做判断*/
      leng = this.pageNumTotal - this.pageFirst; // 则初始化显示第一页
    }
    // 循环添加当前有的条数
    for (let i = 0; i <= leng; i++) {
      if (i <= 4) { // 总共显示五条数据，从0-4
        this.pageShowNum.push({ value: i + 1, header: this.pageFirst + i, active: false });
      }
    }
    this.pageShowNum.push(
      { value: 8, header: '>', active: false },
      { value: 9, header: '>>', active: false });
    // 只要切换了当前的页量，就初始化数据
    this.pageShowNum.forEach(el => {
      el.active = false;
      if (el.value === 1) {
        el.active = true;
      }
    });
    this.pageSizeBefore = this.pageSizeNow;
  }
  jumpToClick() {
    console.log(this.jumpToPage);
  }
}
