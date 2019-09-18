import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../entities/product/product.service';
import { LoginModalService, AccountService, Account } from 'app/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { IProduct } from 'app/shared/model/product.model';
import { Search } from 'app/shared/model/search.model';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
  account: Account;
  modalRef: NgbModalRef;
  searchField: string;
  products: IProduct[];

  searchForm = this.fb.group({
    searchField: []
  });

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private eventManager: JhiEventManager,
    private fb: FormBuilder,
    private productService: ProductService,
    protected jhiAlertService: JhiAlertService
  ) {}

  ngOnInit() {
    this.accountService.identity().then((account: Account) => {
      this.account = account;
    });
    // this.registerAuthenticationSuccess();
  }

  registerAuthenticationSuccess() {
    this.eventManager.subscribe('authenticationSuccess', message => {
      this.accountService.identity().then(account => {
        this.account = account;
      });
    });
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }

  search() {
    console.log('to search for: ' + this.getSearchField());
    let search = new Search(this.getSearchField());
    this.productService
      .search(search)
      .pipe(
        filter((res: HttpResponse<IProduct[]>) => res.ok),
        map((res: HttpResponse<IProduct[]>) => res.body)
      )
      .subscribe(
        (res: IProduct[]) => {
          this.products = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  getSearchField() {
    return this.searchForm.get(['searchField']).value;
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
