import { Component, OnInit } from '@angular/core';
import { AuthService } from 'core/services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private user: AuthService) { }

  ngOnInit(): void {
  }

  logoutUser() {
    setTimeout(() => {
      this.user.logoutUser();
    }, 5000);
  }

}
