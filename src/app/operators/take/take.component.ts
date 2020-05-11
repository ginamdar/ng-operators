import {Component, OnInit} from '@angular/core';
import {fromEvent} from 'rxjs';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-take',
  template: '<div>I\'m take family operator</div>'
})
export class TakeComponent implements OnInit {
  ngOnInit() {
    let counter = 1;
    const clicked$ = fromEvent(document, 'click');
    clicked$
      .pipe(
        take(3),
      )
      .subscribe(() => {
        console.log('document clicked! ', counter++);
      },
        (err) => console.error(err),
        // tslint:disable-next-line:no-console
        () => console.info('Complete!')
      );
  }
}
