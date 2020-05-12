import {Component, OnInit} from '@angular/core';
import {of} from 'rxjs';
import {filter, first, pairwise} from 'rxjs/operators';

@Component({
    selector: 'app-pairwise',
    template: '<div>I\'m pairwise operator</div>'
})
export class PairwiseComponent implements OnInit {
    ngOnInit() {
        const numbersData = [10, 12, 15, 13, 18, 20];

        const result = of(...numbersData)
          .pipe(
            pairwise(),
            filter(([p1, p2]) => p2 - p1 < 0),
            first()
            );

        result
            .subscribe(
              (([p1, p2]) => console.log(`decrease found: ${p1} to ${p2}`)),
              (err) => console.error(err),
              () => console.info('Complete')
            );
    }
}
