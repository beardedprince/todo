import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
path = environment.path;
  constructor(private http: HttpClient ) { }

  createTask(id: any, taskForm) {
    const url = `${this.path + '/task'}/${id}`;
    return this.http.post(url, taskForm);
  }

  getTasksByListID(id) {
    const url = `${this.path + '/list' + '/task'}/${id}`;
    return this.http.get(url);
  }

  deleteTaskByID(id) {
    const url = `${this.path + '/task'}/${id}`;
    return this.http.delete(url);
  }
}
