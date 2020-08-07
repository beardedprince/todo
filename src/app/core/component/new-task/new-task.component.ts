import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ListService } from 'core/services/list.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from 'core/services/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  taskForm: FormGroup;
  todolists: any;
  isLoading = false;
  id: any;
  listTitle: any;
  tasks: any;
  noData: boolean;


    constructor( private fb: FormBuilder, private title: Title,
                 private taskService: TaskService, private toastr: ToastrService,
                 private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {

      this.taskForm = this.fb.group({
        task: ['', Validators.required]
      });
      this.id = this.route.snapshot.params.id;
      this.listTitle = this.route.snapshot.params.title;
      this.getTaskByListsId();


    }

    submitTask() {
      console.log(this.taskForm.value);
      this.taskService.createTask(this.id, this.taskForm.value).subscribe( result => {
        if (result) {
          console.log(result);
          this.taskForm.reset();
          this.getTaskByListsId();
        }
      }, err => {
          this.toastr.error(err.error);
      });
    }


    getTaskByListsId() {
      this.taskService.getTasksByListID(this.id).subscribe( (data: any) => {
        if (data) {
          console.log('tasks', data);
          this.tasks = data.data;
        }
      }, err => {
        this.noData = err.error.message;
      });
    }

    deleteTask(id: any) {
      this.isLoading = true;
      this.taskService.deleteTaskByID(id).subscribe(data => {
        if (data) {
          console.log(data);
          this.toastr.success('Task deleted successfully');
          this.getTaskByListsId();
          this.isLoading = false;
        }
      }, err => {
        this.toastr.error(err.error.message);
      });
    }
}
