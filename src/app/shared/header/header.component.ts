import { Component, effect, inject, OnInit, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit {

  authService = inject(AuthService)
  injector = inject(Injector)
  isLoggedIn = false;

  constructor(private router: Router) { }

  ngOnInit(): void {

    effect(() => {
      this.isLoggedIn = this.authService.isLoggedIn();

    },{injector: this.injector});

  }

  navigateTo(path: string) {
    this.router.navigate([path]); // Gunakan router untuk navigasi
  }

  logout() {

    this.authService.logout()
  }
}
