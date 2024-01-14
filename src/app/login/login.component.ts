import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/authGard/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(
    private activatedRoute : ActivatedRoute,
    private formBuilder : FormBuilder,
    private router : Router,private authService:AuthService){}
  

ngOnInit():void{
if(this.authService.isLoggedIn()){
  this.router.navigate(['books'])
}
}
  loginn = this.formBuilder.group({
    email : ['',Validators.email],
    password : '',
    
  });


  login(){
    console.log(this.loginn.value)
    if(this.loginn.valid)
    {
      this.authService.login(this.loginn.value).subscribe(
        res => {
          console.log(res)
          this.router.navigate(['books'])
        },
        (error:Error)=>{
          console.log(error)
        }
      );
    }
  
    
    
  }
}
