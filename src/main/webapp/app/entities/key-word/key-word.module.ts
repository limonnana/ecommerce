import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { LimonnanaSharedModule } from 'app/shared';
import {
  KeyWordComponent,
  KeyWordDetailComponent,
  KeyWordUpdateComponent,
  KeyWordDeletePopupComponent,
  KeyWordDeleteDialogComponent,
  keyWordRoute,
  keyWordPopupRoute
} from './';

const ENTITY_STATES = [...keyWordRoute, ...keyWordPopupRoute];

@NgModule({
  imports: [LimonnanaSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    KeyWordComponent,
    KeyWordDetailComponent,
    KeyWordUpdateComponent,
    KeyWordDeleteDialogComponent,
    KeyWordDeletePopupComponent
  ],
  entryComponents: [KeyWordComponent, KeyWordUpdateComponent, KeyWordDeleteDialogComponent, KeyWordDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LimonnanaKeyWordModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
