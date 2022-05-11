import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HostListener } from "@angular/core";
import { Session } from "../interface";
@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"],
})
export class LandingComponent implements OnInit {
  constructor(private route: Router) {}
  activeSessions: Session[] = [];
  username: string;
  lastFocus: string;
  currentTime: string;
  @HostListener("window:focus", ["$event"])
  onFocus(event: FocusEvent): void {
    // Do something
    this.lastFocus = "Active";
    this.activeSessions = JSON.parse(localStorage.getItem("bitMama")) || [];
    this.activeSessions.map((element) => {
      if (element.name === this.username) {
        return (element.lastFocus = "Active");
      }
      localStorage.setItem("bitMama", JSON.stringify(this.activeSessions));
    });
  }

  @HostListener("window:blur", ["$event"])
  onBlur(event: FocusEvent): void {
    // Do something
    this.lastFocus = new Date().getTime().toString();
    this.activeSessions = JSON.parse(localStorage.getItem("bitMama")) || [];
    this.activeSessions.map((element) => {
      if (element.name === this.username) {
        return (element.lastFocus = new Date().getTime().toString());
      }
      localStorage.setItem("bitMama", JSON.stringify(this.activeSessions));
    });


  }

  ngOnInit() {
    this.username = sessionStorage.getItem("bitMama");
    this.activeSessions = JSON.parse(localStorage.getItem("bitMama")) || [];
    
    if (this.activeSessions.some(e => e.name === this.username)) {
      setInterval(()=>{
        this.currentTime =  new Date().getTime().toString()
        console.log(this.currentTime)
        console.log(this.activeSessions[1].lastFocus)
      },1000)
    }else{
      this.route.navigateByUrl('/')
    }
  
  }

  logout() {
    sessionStorage.removeItem("bitMama");
    this.activeSessions.forEach((element, index) => {
      if (element.name === this.username) {
        console.log("Deleting session");
        this.activeSessions.splice(index, 1);
        localStorage.setItem("bitMama", JSON.stringify(this.activeSessions));
      }
    });
    this.route.navigateByUrl("/");
  }
  signout() {
    this.route.navigateByUrl("/");
  }

  signoutSesion(user:string){
    this.activeSessions.forEach((element, index) => {
      if (element.name === user) {
        console.log("Deleting session");
        this.activeSessions.splice(index, 1);
        localStorage.setItem("bitMama", JSON.stringify(this.activeSessions));
      }
    });
  }
  }

