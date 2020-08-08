import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ListService } from 'core/services/list.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from 'core/services/task.service';
import { AuthService } from 'core/services/auth.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  taskForm: FormGroup;
  editTaskForm: FormGroup;
  todolists: any;
  isLoading = false;
  id: any;
  listTitle: any;
  tasks: any[];
  noData = false;
  taskId: any;


    constructor( private fb: FormBuilder, private title: Title,
                 private taskService: TaskService, private toastr: ToastrService,
                 private router: Router, private route: ActivatedRoute,
                 private user: AuthService) { }

    ngOnInit(): void {

      this.taskForm = this.fb.group({
        task: ['', Validators.required]
      });
      this.id = this.route.snapshot.params.id;
      this.listTitle = this.route.snapshot.params.title;
      this.getTaskByListsId();
      this.createEditTaskForm();


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
          this.tasks = data.data;
          if (this.tasks.length === 0) {
            this.noData = true;
          } else {
            this.noData = false;
          }
        }
      }, err => {
         this.toastr.error(err.error.message);
      });
    }

    deleteTask(id: any) {
      this.isLoading = true;
      this.taskService.deleteTaskByID(id).subscribe(data => {
        if (data) {
          this.toastr.success('Task deleted successfully');
          this.getTaskByListsId();
          this.isLoading = false;
        }
      }, err => {
        this.toastr.error(err.error.message);
      });
    }

    editTask(id) {
      this.taskId = id;
      this.getTaskById();
    }

    getTaskById() {
      this.taskService.getTaskByID(this.taskId).subscribe( result => {
        if (result) {
          this.setUpData(result);
          console.log(result);
        }
      }, err => {
        this.toastr.error(err.error.message);
      });
    }

    createEditTaskForm() {
      this.editTaskForm = this.fb.group({
        task: ['', Validators.required]
      });
    }

    setUpData(result: any) {
      this.editTaskForm = this.fb.group({
        task : result.task
      });

    }

    submitTaskEdit() {
      console.log(this.editTaskForm.value);
      this.taskService.editTaskByID(this.taskId, this.editTaskForm.value).subscribe( data => {
        if (data) {
          this.toastr.success('Task edited successfully');
          this.isLoading = false;
          this.getTaskByListsId();

        }
      }, err => {
        this.toastr.error(err.error.message);
      });
    }

    logoutUer() {
      this.user.logoutUser();
    }

}
