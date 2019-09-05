/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { LimonnanaTestModule } from '../../../test.module';
import { KeyWordUpdateComponent } from 'app/entities/key-word/key-word-update.component';
import { KeyWordService } from 'app/entities/key-word/key-word.service';
import { KeyWord } from 'app/shared/model/key-word.model';

describe('Component Tests', () => {
  describe('KeyWord Management Update Component', () => {
    let comp: KeyWordUpdateComponent;
    let fixture: ComponentFixture<KeyWordUpdateComponent>;
    let service: KeyWordService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LimonnanaTestModule],
        declarations: [KeyWordUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(KeyWordUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(KeyWordUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(KeyWordService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new KeyWord(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new KeyWord();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
