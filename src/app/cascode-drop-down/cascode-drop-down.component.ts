import { Component, OnInit } from '@angular/core';
import { Dropdown, AllOpinion } from './cascode-drop-down';

@Component({
  selector: 'app-cascode-drop-down',
  templateUrl: './cascode-drop-down.component.html',
  styleUrls: ['./cascode-drop-down.component.css']
})
export class CascodeDropDownComponent implements OnInit {

  constructor() { }

  Shen: Dropdown[] = []; // 省份选择框
  Shi: Dropdown[] = []; // 市选择框
  Qv: Dropdown[] = []; // 区选择框

  selectedShen;  // 省份选项
  selectedShi; // 市选项
  selectedQv; // 区选项

  ngOnInit() {
    this.getShenOpinion();
  }

  /**
   * 省选项改变时重新赋值市区
   */
  chengeShenOpinion() {
    this.getShiOpinion();
    this.getQvOpinion();
  }

  /**
   * 改变市选项框并赋值
   */
  getShiOpinion() {
    this.Shi = this.getOption(this.selectedShen);
    this.selectedShi = this.Shi[0];
  }

  /**
   * 改变省选项框并赋值
   */
  getShenOpinion() {
    this.Shen = this.getOption(new Dropdown);
    this.selectedShen = this.Shen[0];
  }

  /**
   * 改变区选项框并赋值
   */
  getQvOpinion() {
    this.Qv = this.getOption(this.selectedShi);
    this.selectedQv = this.Qv[0];
  }

  /**
   * 获取选项框选项
   * @param selected
   */
  getOption(selected: Dropdown): Dropdown[] {
    const list: Dropdown[] = [];
    AllOpinion.forEach(
      element => {
        if (element.fatherNodeId === selected.nodeId && element.fatherCodeId === selected.codeId) {
          list.push(element);
        }
      }
    );
    return list;
  }


}
