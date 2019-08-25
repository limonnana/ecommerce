import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LimonnanaSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [LimonnanaSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [LimonnanaSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LimonnanaSharedModule {
  static forRoot() {
    return {
      ngModule: LimonnanaSharedModule
    };
  }
}
