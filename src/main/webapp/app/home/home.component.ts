import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../entities/product/product.service';
import { LoginModalService, AccountService, Account } from 'app/core';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
  account: Account;
  modalRef: NgbModalRef;
  searchField: string;

  searchForm = this.fb.group({
    searchField: []
  });

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private eventManager: JhiEventManager,
    private fb: FormBuilder,
    private productService: ProductService
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
  /*
  search(){
    this.productService.query(this.getSearchField())
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
  }

  getSearchField(){
    this.searchField = this.searchForm.get(['searchField']).value;
    return this.searchField;
  }
/*
  loadProductsFromQuery() {
    this.productService
      .query()
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

  */
}
