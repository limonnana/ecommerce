import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/core';

@Component({
  selector: 'jhi-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.isLoggedIn = this.isAuthenticated();
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }
}
