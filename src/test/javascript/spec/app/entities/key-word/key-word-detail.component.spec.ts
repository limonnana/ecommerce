/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LimonnanaTestModule } from '../../../test.module';
import { KeyWordDetailComponent } from 'app/entities/key-word/key-word-detail.component';
import { KeyWord } from 'app/shared/model/key-word.model';

describe('Component Tests', () => {
  describe('KeyWord Management Detail Component', () => {
    let comp: KeyWordDetailComponent;
    let fixture: ComponentFixture<KeyWordDetailComponent>;
    const route = ({ data: of({ keyWord: new KeyWord(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LimonnanaTestModule],
        declarations: [KeyWordDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(KeyWordDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(KeyWordDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.keyWord).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
