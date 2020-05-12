import { Component, OnInit } from '@angular/core';
import {interval, of} from 'rxjs';
import {mergeMapTo, take} from 'rxjs/operators';

@Component({
  selector: 'app-merge-map-to',
  templateUrl: './merge-map-to.component.html',
})
export class MergeMapToComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    of(1, 2, 3)
      .pipe(
        mergeMapTo(of('same', 'inner', 'value')) // same-inner-value repeated 3 times
      )
      .subscribe(console.log);


    of('ping')
      .pipe(
        mergeMapTo(interval(100)
          .pipe(
            take(3)
          ),
          (sourceVal, intervalVal) => {
              sourceVal = intervalVal === 1 ? 'pong' : sourceVal;
              return `${sourceVal} ${intervalVal * 2}`;
            })
        )
      .subscribe(console.log);
  }

}
