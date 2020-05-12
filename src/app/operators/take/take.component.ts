import {Component, OnInit} from '@angular/core';
import {fromEvent, of, Subject} from 'rxjs';
import {take, takeLast, takeUntil, takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-take',
  // template: '<div>I\'m take family operator</div>'
  templateUrl: './take.component.html'
})
export class TakeComponent implements OnInit {
  onStop = new Subject<void>();

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
        takeWhile(() => counter < 1),
      )
      .subscribe(() => {
        console.log('document clicked! ', counter++);
      },
        (err) => console.error(err),
        // tslint:disable-next-line:no-console
        () => console.info('Complete!')
      );

    const source$ = fromEvent(document, 'click');
    source$
      .pipe(
        takeUntil(this.onStop)
      )
      .subscribe(
        (value) => console.log('source$ ', value),
      (err) => console.error(err)
      );
  }

  stopHandler() {
    this.onStop.next();
    this.onStop.complete();
  }
}
