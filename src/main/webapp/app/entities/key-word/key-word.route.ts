import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { KeyWord } from 'app/shared/model/key-word.model';
import { KeyWordService } from './key-word.service';
import { KeyWordComponent } from './key-word.component';
import { KeyWordDetailComponent } from './key-word-detail.component';
import { KeyWordUpdateComponent } from './key-word-update.component';
import { KeyWordDeletePopupComponent } from './key-word-delete-dialog.component';
import { IKeyWord } from 'app/shared/model/key-word.model';

@Injectable({ providedIn: 'root' })
export class KeyWordResolve implements Resolve<IKeyWord> {
  constructor(private service: KeyWordService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IKeyWord> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<KeyWord>) => response.ok),
        map((keyWord: HttpResponse<KeyWord>) => keyWord.body)
      );
    }
    return of(new KeyWord());
  }
}

export const keyWordRoute: Routes = [
  {
    path: '',
    component: KeyWordComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'limonnanaApp.keyWord.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: KeyWordDetailComponent,
    resolve: {
      keyWord: KeyWordResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'limonnanaApp.keyWord.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: KeyWordUpdateComponent,
    resolve: {
      keyWord: KeyWordResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'limonnanaApp.keyWord.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: KeyWordUpdateComponent,
    resolve: {
      keyWord: KeyWordResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'limonnanaApp.keyWord.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const keyWordPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: KeyWordDeletePopupComponent,
    resolve: {
      keyWord: KeyWordResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'limonnanaApp.keyWord.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
