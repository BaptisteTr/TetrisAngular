import { Component, Input, OnInit } from '@angular/core';
import { Score } from '../Objets/score';

@Component({
  selector: 'app-score-counter',
  templateUrl: './score-counter.component.html',
  styleUrls: ['./score-counter.component.css']
})
export class ScoreCounterComponent implements OnInit {

  @Input() score: Score = new Score();

  constructor() {
  }

  ngOnInit(): void {
    this.score = new Score();
  }

}
