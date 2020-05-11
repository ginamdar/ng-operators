import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WikiSearchService {

  constructor(private http: HttpClient) { }

  searchTerm(terms: Observable<string>, debounceMs = 400) {
    return terms.pipe(
      debounceTime(debounceMs),
      distinctUntilChanged(),
      switchMap(term => this.search(term))
    );
  }

  search(term: string) {
    const search = new URLSearchParams();
    search.set('action', 'opensearch');
    search.set('search', term);
    search.set('format', 'json');
    // search.set('callback', 'JSONP_CALLBACK');
    search.set('origin', '*');
    // return this.http.jsonp<Array<string>>(`https://en.wikipedia.org/w/api.php?${search}`,
    return this.http.get<Array<string>>(`https://en.wikipedia.org/w/api.php?${search}`)
      .pipe(
        tap(response => console.log(`WikiSearchService: ${JSON.stringify(response)}`)),
        map(response => response[1])
      );
  }

}
