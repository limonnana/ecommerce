import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IKeyWord } from 'app/shared/model/key-word.model';
import { AccountService } from 'app/core';
import { KeyWordService } from './key-word.service';

@Component({
  selector: 'jhi-key-word',
  templateUrl: './key-word.component.html'
})
export class KeyWordComponent implements OnInit, OnDestroy {
  keyWords: IKeyWord[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected keyWordService: KeyWordService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.keyWordService
      .query()
      .pipe(
        filter((res: HttpResponse<IKeyWord[]>) => res.ok),
        map((res: HttpResponse<IKeyWord[]>) => res.body)
      )
      .subscribe(
        (res: IKeyWord[]) => {
          this.keyWords = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInKeyWords();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IKeyWord) {
    return item.id;
  }

  registerChangeInKeyWords() {
    this.eventSubscriber = this.eventManager.subscribe('keyWordListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
