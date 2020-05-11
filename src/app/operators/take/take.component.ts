import {Component, OnInit} from '@angular/core';
import {fromEvent, of} from 'rxjs';
import {take, takeLast, takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-take',
  template: '<div>I\'m take family operator</div>'
})
export class TakeComponent implements OnInit {
  ngOnInit() {
    let counter = 1;
    const clicked$ = fromEvent(document, 'click');
    const last$ = of(1, 2, 3, 4, 5);
    last$
      .pipe(
        takeLast(2)
      )
      .subscribe((value) => console.log('Last Values', value));
    
    clicked$
      .pipe(
        takeWhile(() => counter < 4),
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
