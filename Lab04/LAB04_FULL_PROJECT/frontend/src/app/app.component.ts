import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>LAB04 — Tasks SPA</h1>
      <nav>
        <a routerLink="/">Tasks</a> |
        <a routerLink="/add">Add Task</a>
      </nav>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent { }
