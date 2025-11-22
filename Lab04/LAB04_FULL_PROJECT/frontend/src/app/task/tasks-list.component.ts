import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from './task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {
  tasks: Task[] = [];
  loading = false;
  error = '';

  constructor(private svc: TaskService, private router: Router) { }

  ngOnInit(): void { this.load(); }

  load() {
    this.loading = true;
    this.svc.list().subscribe({
      next: t => { this.tasks = t; this.loading = false; },
      error: () => { this.error = 'Failed to load tasks'; this.loading = false; }
    });
  }

  toggle(task: Task) {
    const updated = { ...task, completed: !task.completed };
    this.svc.update(updated).subscribe(() => this.load());
  }

  edit(id: number) { this.router.navigate(['/edit', id]); }

  remove(id: number) {
    if (!confirm('Delete this task?')) return;
    this.svc.delete(id).subscribe(() => this.load());
  }
}
