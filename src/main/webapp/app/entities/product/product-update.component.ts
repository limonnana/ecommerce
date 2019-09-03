import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IProduct, Product } from 'app/shared/model/product.model';
import { ProductService } from './product.service';
import { CategoryService } from '../category/category.service';
import { ICategory } from 'app/shared/model/category.model';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';

@Component({
  selector: 'jhi-product-update',
  templateUrl: './product-update.component.html'
})
export class ProductUpdateComponent implements OnInit {
  isSaving: boolean;
  categoryList: ICategory[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    price: [],
    category: [],
    pictureUrl: []
  });

  constructor(
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    protected categoryService: CategoryService,
    protected jhiAlertService: JhiAlertService
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ product }) => {
      this.updateForm(product);
    });
    this.getCategoryList();
  }

  getCategoryList() {
    this.categoryService
      .query()
      .pipe(
        filter((res: HttpResponse<ICategory[]>) => res.ok),
        map((res: HttpResponse<ICategory[]>) => res.body)
      )
      .subscribe(
        (res: ICategory[]) => {
          this.categoryList = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(product: IProduct) {
    this.editForm.patchValue({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      pictureUrl: product.pictureUrl
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const product = this.createFromForm();
    if (product.id !== undefined) {
      this.subscribeToSaveResponse(this.productService.update(product));
    } else {
      this.subscribeToSaveResponse(this.productService.create(product));
    }
  }

  private createFromForm(): IProduct {
    const category = this.editForm.get(['category']).value;
    console.log('category: ' + category);

    return {
      ...new Product(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      price: this.editForm.get(['price']).value,
      category: this.editForm.get(['category']).value,
      pictureUrl: this.editForm.get(['pictureUrl']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduct>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
