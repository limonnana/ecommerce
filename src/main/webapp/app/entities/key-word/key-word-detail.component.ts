import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IKeyWord } from 'app/shared/model/key-word.model';

@Component({
  selector: 'jhi-key-word-detail',
  templateUrl: './key-word-detail.component.html'
})
export class KeyWordDetailComponent implements OnInit {
  keyWord: IKeyWord;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ keyWord }) => {
      this.keyWord = keyWord;
    });
  }

  previousState() {
    window.history.back();
  }
}
