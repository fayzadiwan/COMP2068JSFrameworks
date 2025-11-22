import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TasksListComponent } from './tasks/tasks-list.component';
import { TaskFormComponent } from './tasks/task-form.component';
import { TaskService } from './tasks/task.service';

@NgModule({
  declarations: [AppComponent, TasksListComponent, TaskFormComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: TasksListComponent },
      { path: 'add', component: TaskFormComponent },
      { path: 'edit/:id', component: TaskFormComponent }
    ])
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
