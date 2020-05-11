import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {share} from 'rxjs/operators';
import {Post} from '../model/Post';

@Component({
  selector: 'app-share-op',
  template: '<div>I\'m share operator</div>'
})
export class ShareOpComponent implements OnInit{
  loading = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    const request = this.getPosts();
    this.setLoadingSpinner(request);

    request.subscribe(data => {
      console.log(data);
    });
  }

  setLoadingSpinner(observable: Observable<any>) {
    this.loading = true;
    observable.subscribe(() => this.loading = false);
  }

  getPosts() {
    return this.http.get<Post[]>('http://jsonplaceholder.typicode.com/posts')
      .pipe(
        share()
      );
  }

}
