import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ListService } from 'core/services/list.service';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import {map} from 'rxjs/operators';
import { AuthService } from 'core/services/auth.service';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
listForm: FormGroup;
todolists: any;
isLoading = false;
user: any;
noData: any;

  constructor( private fb: FormBuilder, private title: Title,
               private list: ListService, private toastr: ToastrService,
               private router: Router, private userService: AuthService) { }

  ngOnInit(): void {

    this.title.setTitle( 'Todo | Userboard');

    this.listForm = this.fb.group({
      title: ['', Validators.required]
    });

    this.user =  JSON.parse(localStorage.getItem('user'));
    this.getLists();

  }

  submitList() {
    this.list.postList(this.user._id, this.listForm.value).subscribe( result => {
      if (result) {
        this.listForm.reset();
        this.toastr.error('list added successfully');

        this.getLists();
      }
    }, err => {
        this.toastr.error(err.error);
    });
  }


  getLists() {
    this.list.getListWithUserID(this.user._id).subscribe( (data: any) => {
      if (data) {
        this.todolists = data.data;
        if (this.todolists.length === 0) {
          this.noData = true;
        } else {
          this.noData = false;
        }
      }
    }, err => {
      this.toastr.error(err.message);
    });
  }

  // deleteList(id: any) {
  //   this.isLoading = true;
  //   this.list.deleteList(id).subscribe(data => {
  //     if (data) {
  //       this.isLoading = false;
  //       this.toastr.success('List deleted successfully');
  //       this.getLists();
  //     }
  //   }, err => {
  //     this.toastr.error(err.error);
  //   });
  // }

  logoutUer() {
    this.userService.logoutUser();
  }

}
