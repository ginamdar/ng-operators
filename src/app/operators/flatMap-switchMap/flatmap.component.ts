import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';

interface Color {
  color: string;
}

interface Driver {
  name: string;
}

interface Car {
  driver: string;
  color: string;
}

@Component({
  selector: 'app-flatmap',
  templateUrl: './flatmap.component.html'
})
export class FlatmapComponent implements OnInit {
  ngOnInit() {
    const carColor$: Observable<Color> = this.getColor();
    const carDriver$: Observable<Driver> = this.getDriver();

    const car$: Observable<Car> = carColor$
      .pipe(
        mergeMap(color => {
          return carDriver$
            .pipe(
              map(driver => {
                const car: Car = {
                  driver: driver.name,
                  color: color.color
                };
                return car;
              })
            );
        })
      );

    car$.subscribe(console.log);
  }

  getColor(): Observable<Color> {
    return of({
      color: 'blue'
    });
  }

  getDriver(): Observable<Driver> {
    return of({
      name: 'Guru'
    });
  }
}
