import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [RouterOutlet, MenubarModule],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss'
})
export class SkeletonComponent implements OnInit {
  items: MenuItem[] | undefined;
  private authService:AuthService = inject(AuthService);
  private router:Router = inject(Router);

  ngOnInit() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-file',
        routerLink:'/user/dashboard'
      },
      {
        label: 'Question',
        icon: 'pi pi-fw pi-file',
        routerLink:'/user/question'
      },
      {
        label: 'My questions',
        icon: 'pi pi-fw pi-send',
        routerLink:'/user/my-questions'
      },
      {
        label: 'Search',
        icon: 'pi pi-fw pi-search',
        routerLink:'/user/search'
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off',
        command: () => {
          console.log("logout clicked")
          this.authService.logout();
          this.router.navigate(["/"]);
        }
      }
    ];
  }
}
