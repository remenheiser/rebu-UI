import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'rebu';
  
  ngOnInit() {
    
    if (localStorage.hasOwnProperty('token')) {
      document.getElementById('logoutButton').innerHTML = 'Logout'; // Signed in
    } else {
      document.getElementById('logoutButton').innerHTML = 'Sign In'; // Signed out
    }
  }

  
  loginLogout() {
 
    // To invalidate a basic auth login:
    // 
    // 	1. Call this logout function.
    //	2. It makes a GET request to an URL with false Basic Auth credentials
    //	3. The URL returns a 401 Unauthorized
    // 	4. Forward to some "you-are-logged-out"-page
    // 	5. Done, the Basic Auth header is invalid now
    if (localStorage.hasOwnProperty('token'))  {
    // jQuery.ajax({
    //           type: "GET",
    //           url: "/api/user/login",
    //           async: false,
    //           username: "logmeout",
    //           password: "123456",
    //           headers: { "Authorization": "Basic xxx" }
    // })
    // .done(function(){
        // If we don't get an error, we actually got an error as we expect an 401!
    // })
    // .fail(function(){
        // We expect to get an 401 Unauthorized error! In this case we are successfully 
              // logged out and we redirect the user.
              localStorage.removeItem('token');
              document.location.href = '/home';
      // });
   
      // return false;
    } else {
      document.location.href = "/signup";
    }
  }
  
}

