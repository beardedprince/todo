import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListService {
path = environment.path;

  constructor(private http: HttpClient) { }

  postList(listForm) {
    return this.http.post(this.path + '/list', listForm);
  }

  getList() {
    return this.http.get(this.path + '/lists');
  }

  deleteList(id) {
    const url = `${this.path + '/list'}/${id}`;
    return this.http.delete(url);
  }
}
