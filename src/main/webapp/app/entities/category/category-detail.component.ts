import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category/category.service';
import { ICategory } from 'app/shared/model/category.model';
import { JhiAlertService } from 'ng-jhipster';

@Component({
  selector: 'jhi-category-detail',
  templateUrl: './category-detail.component.html'
})
export class CategoryDetailComponent implements OnInit {
  category: ICategory;
  categoryList: ICategory[] = [];
  categoryListIsEmpty: boolean = true;
  productListIsEmpty: boolean = true;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected jhiAlertService: JhiAlertService,
    protected categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ category }) => {
      this.category = category;
    });
    if (this.category.categories.length > 0) {
      this.categoryListIsEmpty = false;
    }
    if (this.category.products.length > 0) {
      this.productListIsEmpty = false;
    }
  }

  previousState() {
    window.history.back();
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
