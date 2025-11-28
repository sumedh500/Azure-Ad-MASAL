import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-restricted-page',
  templateUrl: './restricted-page.component.html',
  styleUrls: ['./restricted-page.component.scss']
})
export class RestrictedPageComponent implements OnInit {

  constructor(private authService: AuthService) { }

  getName(): string {
    const account = this.authService.activeAccount;
    return account?.name ?? 'unknown';
  }


  ngOnInit(): void {
  }

}
