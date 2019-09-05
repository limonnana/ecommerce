/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { LimonnanaTestModule } from '../../../test.module';
import { KeyWordDeleteDialogComponent } from 'app/entities/key-word/key-word-delete-dialog.component';
import { KeyWordService } from 'app/entities/key-word/key-word.service';

describe('Component Tests', () => {
  describe('KeyWord Management Delete Component', () => {
    let comp: KeyWordDeleteDialogComponent;
    let fixture: ComponentFixture<KeyWordDeleteDialogComponent>;
    let service: KeyWordService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LimonnanaTestModule],
        declarations: [KeyWordDeleteDialogComponent]
      })
        .overrideTemplate(KeyWordDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(KeyWordDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(KeyWordService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
