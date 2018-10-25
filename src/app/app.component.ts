import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  minDate = new Date(2017, 0, 6);
  maxDate = new Date(2019, 11, 6);

  constructor() {
  }

  title = 'app';

  dateRangeSubmit(event) {
    console.log(event);
  }
}
