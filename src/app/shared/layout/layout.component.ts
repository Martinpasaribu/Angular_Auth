import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared.module';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true ,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  imports:[RouterModule, SharedModule]
})
export class LayoutComponent {

  authService = inject(AuthService);
  isLoggedIn = this.authService.isLoggedIn();

}
