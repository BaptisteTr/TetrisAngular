import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GrilleComponent } from './grille/grille.component';
import { Score } from './Objets/score';
import { Tetromino } from './Objets/tetromino';

@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.css']
})
export class TetrisComponent implements OnInit,AfterViewInit  {

  public nextTetromino:any;
  public score:any;
  public fps:any;
  public left:any;
  public right:any;
  public down:any;
  public rotate:any;
  public pause:any;
  public restart:any;
  public toggle:any;

  @ViewChild(GrilleComponent)
  private grille: any;

  constructor() {
    this.fps = 60;
  }

  ngAfterViewInit(): void {
    setInterval(() => this.gameLoop(), 1000 / this.fps);
  }

  ngOnInit(): void {
  }

  private gameLoop(){
    this.grille.draw();
  }

  nextTetrominoChangedHandler(nextTetromino: Tetromino){
    this.nextTetromino = nextTetromino;
  }

  leftHandler(){
    this.grille.onArrowLeft();
  }

  rightHandler(){
    this.grille.onArrowRight();
  }

  downHandler(){
    this.grille.onArrowDown();
  }

  rotateHandler(){
    this.grille.onSpaceBar();
  }

  pauseHandler(){
    this.grille.onPause();
  }

  restartHandler(){
    this.grille.restart();
  }

  scoreChangedHandler(score:Score){
    this.score = score;
  }

  toggleHandler(toggle : boolean){
    this.toggle = toggle;
  }

}
