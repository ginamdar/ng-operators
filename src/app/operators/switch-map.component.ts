import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from '../model/Post';
import {delay, share, switchMap, tap} from 'rxjs/operators';
import {Comments} from '../model/Comments';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-switch-map',
  template: '<div>I\'m switchMap Operator</div>'
})
export class SwitchMapComponent implements OnInit{
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    const posts$ = this.getPosts();
    const comments$ = this.getComments();

    const combined$ = posts$
      .pipe(
        switchMap(posts => {
          return comments$
            .pipe(
              tap(comments => {
                console.log(posts);
                console.log(comments);
              })
            );
        }),
      );
    combined$.subscribe();
  }

  getPosts() {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
      .pipe(
        share()
      );
  }

  getComments() {
    return this.http.get<Comments[]>('https://jsonplaceholder.typicode.com/comments')
      .pipe(
        share()
      );
  }
}
