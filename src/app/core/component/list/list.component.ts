import { Component, OnInit } from '@angular/core';
import { AuthService } from 'core/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ListService } from 'core/services/list.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  listForm: FormGroup;
  editListForm: FormGroup;
todolists: any;
isLoading = false;
id: any;


  constructor( private fb: FormBuilder, private title: Title,
               private list: ListService, private toastr: ToastrService,
               private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.title.setTitle( 'Todo | Userboard');

    this.listForm = this.fb.group({
      title: ['', Validators.required]
    });

    this.getLists();

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.createEditListForm();


  }

  submitList() {
    this.list.postList(this.listForm.value).subscribe( result => {
      if (result) {
        this.listForm.reset();
        this.getLists();
      }
    }, err => {
        this.toastr.error(err.error);
    });
  }


  getLists() {
    this.list.getList().subscribe( (data: any) => {
      if (data) {
        this.todolists = data.data;
      }
    }, err => {
      this.toastr.error(err.message);
    });
  }

  goToList(title: any, id: any) {
    this.router.navigate(['/user', 'board', title, id]);
  }

  deleteList(id: any) {
    this.isLoading = true;
    this.list.deleteList(id).subscribe(data => {
      if (data) {
        this.isLoading = false;
        this.toastr.success('List deleted successfully');
        this.getLists();
      }
    }, err => {
      this.toastr.error(err.error);
    });
  }

  editList(id: any) {
    this.id = id;
    this.getListByID();

  }

  getListByID() {
    this.list.getListWithID(this.id).subscribe( data => {
      if (data) {
            console.log(data);
            this.setUpData(data);
          }
        }, err => {
          this.toastr.error(err.error);
    });
  }

  createEditListForm() {
    this.editListForm = this.fb.group({
      title: ['', Validators.required]
    });
  }

  setUpData(data: any) {
    this.editListForm.patchValue({
      title: data.title
    });
  }

  submitListEdit() {
    this.isLoading = true;

    this.list.updateListWithID(this.id, this.editListForm.value).subscribe( data => {
      if (data) {
        this.editListForm.reset();
        this.toastr.success('List updated successfully');
        this.isLoading = false;

        this.getLists();
      }
      }, err => {
          this.toastr.error(err.error);
      });
  }


}
