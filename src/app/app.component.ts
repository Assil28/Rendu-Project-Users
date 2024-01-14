import { Component } from '@angular/core';
import { AuthService } from 'src/authGard/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'books';

  constructor(private authService:AuthService){

  }

  logout():void{
    console.log("aaaa")
    this.authService.logout()
  }
}
