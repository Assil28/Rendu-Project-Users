import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../model/user';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  user?: User;



  editForm = this.formBuilder.group({
    name: '',
    email: ['', Validators.email],
    password: ['', Validators.minLength(5)]
  });



  editUser = () => {

    const values = this.editForm.value;
    this.userService.editUser(
      new User(this.user!.id, values.name!, values.email!, values.password!)
    ).subscribe(
      obj => this.router.navigate(['/users'])
    );
  }



  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {

        this.userService.getUserById(+params['id']).subscribe(
          user => {
            this.user = user;

            this.editForm.setValue({
              name: this.user.name,
              email: this.user.email,
              password: this.user.password
            })
          }
        )
      }
    )

  }

}
