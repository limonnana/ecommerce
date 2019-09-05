/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LimonnanaTestModule } from '../../../test.module';
import { KeyWordComponent } from 'app/entities/key-word/key-word.component';
import { KeyWordService } from 'app/entities/key-word/key-word.service';
import { KeyWord } from 'app/shared/model/key-word.model';

describe('Component Tests', () => {
  describe('KeyWord Management Component', () => {
    let comp: KeyWordComponent;
    let fixture: ComponentFixture<KeyWordComponent>;
    let service: KeyWordService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LimonnanaTestModule],
        declarations: [KeyWordComponent],
        providers: []
      })
        .overrideTemplate(KeyWordComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(KeyWordComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(KeyWordService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new KeyWord(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.keyWords[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
