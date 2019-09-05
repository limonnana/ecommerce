import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IKeyWord } from 'app/shared/model/key-word.model';
import { KeyWordService } from './key-word.service';

@Component({
  selector: 'jhi-key-word-delete-dialog',
  templateUrl: './key-word-delete-dialog.component.html'
})
export class KeyWordDeleteDialogComponent {
  keyWord: IKeyWord;

  constructor(protected keyWordService: KeyWordService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.keyWordService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'keyWordListModification',
        content: 'Deleted an keyWord'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-key-word-delete-popup',
  template: ''
})
export class KeyWordDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ keyWord }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(KeyWordDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.keyWord = keyWord;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/key-word', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/key-word', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
