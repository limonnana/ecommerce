import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IKeyWord, KeyWord } from 'app/shared/model/key-word.model';
import { KeyWordService } from './key-word.service';
import { ICategory } from 'app/shared/model/category.model';
import { CategoryService } from 'app/entities/category';

@Component({
  selector: 'jhi-key-word-update',
  templateUrl: './key-word-update.component.html'
})
export class KeyWordUpdateComponent implements OnInit {
  isSaving: boolean;

  categories: ICategory[];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    category: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected keyWordService: KeyWordService,
    protected categoryService: CategoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ keyWord }) => {
      this.updateForm(keyWord);
    });
    this.categoryService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICategory[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICategory[]>) => response.body)
      )
      .subscribe((res: ICategory[]) => (this.categories = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(keyWord: IKeyWord) {
    this.editForm.patchValue({
      id: keyWord.id,
      name: keyWord.name,
      category: keyWord.category
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const keyWord = this.createFromForm();
    if (keyWord.id !== undefined) {
      this.subscribeToSaveResponse(this.keyWordService.update(keyWord));
    } else {
      this.subscribeToSaveResponse(this.keyWordService.create(keyWord));
    }
  }

  private createFromForm(): IKeyWord {
    return {
      ...new KeyWord(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      category: this.editForm.get(['category']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IKeyWord>>) {
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

  trackCategoryById(index: number, item: ICategory) {
    return item.id;
  }
}
