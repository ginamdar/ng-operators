import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {share} from 'rxjs/operators';

interface Post {
  UserId: number;
  Id: number;
  Body: string;
  Title: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ng-operators';
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
