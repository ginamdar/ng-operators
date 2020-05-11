import {Component, OnInit} from '@angular/core';
import {WikiSearchService} from '../services/wiki-search.service';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-debounce-time',
  templateUrl: './debounce-time.component.html',
  styles: [`.form-control { width: 300px; }`]

})
export class DebounceTimeComponent implements OnInit {
  searchTerm: string;
  constructor(private wikiSearchService: WikiSearchService) {
  }

  ngOnInit(): void {
    this.search = this.search.bind(this);
  }

  search(term$: Observable<string>): Observable<string[]> {
    return term$
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(searchTerm => {
          if (!searchTerm) {
            return [];
          }
          return this.wikiSearchService.search(searchTerm);
        })
      );
  }

}
