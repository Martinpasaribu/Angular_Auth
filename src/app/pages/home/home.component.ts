import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/model/common.model';


@Component({
  selector: 'app-home',
  standalone: true,
  imports : [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  authService = inject(AuthService)
  user!: User

  constructor(private router: Router) { }

  ngOnInit(): void {

    this.authService.me().subscribe({
      next:(response)=>{
        console.log(response);
        this.user = response.data;
      }
    })
  }

  navigateTo(path: string) {
    this.router.navigate([path]); // Gunakan router untuk navigasi
  }

  logout() {

    this.authService.logout()
  }

}
