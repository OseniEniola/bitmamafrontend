import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from "../interface";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private router: Router) { }

  username:string;
  savedSessions : Session[] = [];
  ngOnInit() {
  }

  siginin(){
    var isexit;
    if(this.username){
        this.savedSessions = this.savedSessions || [];
        this.savedSessions =JSON.parse(localStorage.getItem('bitMama')) || []
        if(this.savedSessions.length > 0 ){
          this.savedSessions.forEach(element => {
            if(!isexit){
              if(element.name === this.username){
                isexit = true
                sessionStorage.setItem('bitMama', this.username);
                this.router.navigateByUrl('login')
                return null
              }
            }
           
          });
        } 
        if(!isexit){
          sessionStorage.setItem('bitMama', this.username);
          this.savedSessions = JSON.parse(localStorage.getItem('bitMama')) || []
          this.savedSessions.push({name:this.username,lastFocus:''})
          localStorage.setItem('bitMama',JSON.stringify(this.savedSessions));
          this.router.navigateByUrl('login')
        }
       
    }else{
      alert('Please a username')
    }
   
  }

}
