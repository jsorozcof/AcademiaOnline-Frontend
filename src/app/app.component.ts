import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule, NzDropDownModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  esPaginaSinLayout = false;
  isCollapsed = false;
  usuario: { nombreCompleto: string, email: string } | null = null;
    constructor(private router: Router,  @Inject(PLATFORM_ID) private platformId: Object) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.urlAfterRedirects;
        this.esPaginaSinLayout = ['/auth/login', '/registro'].includes(url);
      });
  }
ngOnInit() {
  if (isPlatformBrowser(this.platformId)) {
    debugger;
    this.usuario = JSON.parse(localStorage.getItem('usuario') || 'null');

    this.router.events.subscribe(() => {
      const url = this.router.url;
      this.esPaginaSinLayout = url.includes('/login') || url.includes('/registro');
      if (!this.esPaginaSinLayout) {
        this.usuario = JSON.parse(localStorage.getItem('usuario') || 'null');
      }
    });
  }
}

   cerrarSesion() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/auth/login']);
  }
}
