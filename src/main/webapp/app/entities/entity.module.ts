import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.LimonnanaProductModule)
      },
      {
        path: 'category',
        loadChildren: () => import('./category/category.module').then(m => m.LimonnanaCategoryModule)
      },
      {
        path: 'key-word',
        loadChildren: () => import('./key-word/key-word.module').then(m => m.LimonnanaKeyWordModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LimonnanaEntityModule {}
