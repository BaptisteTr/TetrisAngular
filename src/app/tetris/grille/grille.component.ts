import {EventEmitter, Input, Output} from '@angular/core';
import {Component, HostListener, OnInit} from '@angular/core';
import {Grid} from '../Objets/grid';
import { Score } from '../Objets/score';
import { Tetromino, TetrominoI, TetrominoJ, TetrominoL, TetrominoO, TetrominoS, TetrominoT, TetrominoZ } from '../Objets/tetromino';

@Component({
  selector: 'app-grille',
  templateUrl: './grille.component.html',
  styleUrls: ['./grille.component.css']
})
export class GrilleComponent implements OnInit {
  public grid : Grid = new Grid(0,0);
  public lines: number = 20;
  public columns: number = 10;
  public currentTetromino:Tetromino;
  public hoverTetromino:Tetromino;
  public nextTetromino:Tetromino;
  public score:Score = new Score();
  public speedValue;
  private tLastDown: any;
  private tcurrent: any;
  public isGameOver: boolean;
  displayGameOver: string;
  displayPause: string;
  displayScore: string;
  pause: boolean = false;
  @Input()
  hover: boolean = false;
  scoreAnimation="";
  lastScoreTick = 0;

  @Output() tetrominoChanged =  new EventEmitter<Tetromino>();
  @Output() scoreChanged =  new EventEmitter<Score>();

  constructor() {
    this.currentTetromino = this.randomTetromino();
    this.currentTetromino.setStartPosition();
    this.nextTetromino = this.randomTetromino();
    this.nextTetromino.setDefaultPosition();
    this.speedValue =  725;
    this.isGameOver = false;
    this.displayGameOver = "none";
    this.displayPause = "none";
    this.displayScore = "none";
    this.hoverTetromino = new TetrominoI();
    this.hoverTetromino.copy(this.currentTetromino);
    this.hoverTetromino.moveDownUntilLock(this.grid);
  }

  async ngOnInit() {

    this.tLastDown = performance.now();

    this.grid = new Grid(this.lines,this.columns);
    this.tetrominoChanged.emit(this.nextTetromino);
    this.hoverTetromino.copy(this.currentTetromino);
    this.hoverTetromino.moveDownUntilLock(this.grid);

    setInterval(()=>this.gameplayLoop(),1000/60);
  }

  draw(){
    if(this.hover) {
      this.grid.display(this.currentTetromino, this.hoverTetromino);
    } else {
      this.grid.display(this.currentTetromino, undefined);
    }
  }

  gameplayLoop(){
    if (!this.isGameOver && !this.pause){
      this.displayGameOver="none";
      this.displayPause="none";
      this.tcurrent = performance.now();

      if(this.tcurrent - this.tLastDown >= this.speedValue){
        this.currentTetromino.checkAndMoveDown(this.grid);
        this.hoverTetromino.copy(this.currentTetromino);
        this.hoverTetromino.moveDownUntilLock(this.grid);
        this.tLastDown = this.tcurrent;
      }
      if(this.currentTetromino.locked){
        if(this.currentTetromino.blocks.find(block => this.currentTetromino.centerPosY+block.height_position == 0) != undefined){
          this.isGameOver = true;
        } else {
          this.currentTetromino = this.nextTetromino;
          this.nextTetromino = this.randomTetromino();
          this.nextTetromino.setDefaultPosition();
          this.tetrominoChanged.emit(this.nextTetromino);
          this.currentTetromino.setStartPosition();
          this.hoverTetromino.copy(this.currentTetromino);
          this.hoverTetromino.moveDownUntilLock(this.grid);
        }

        this.cleanCompletedLines();
      }
    } else {
      if(this.isGameOver){
        this.displayGameOver="block";
      } else if(this.pause){
        this.displayPause="block";
      }
    }
  }

  cleanCompletedLines(){
    let lineCount = 0;
    for(let y:number = this.lines; y >= 0; y--){
      let line = this.grid.square_list.filter(block => (block.height_position == y && block.filled));
      if(line.length == this.columns){
        lineCount++;
        line.forEach(block => {
          block.isDisappearing = "disappearing";
        });
        for(let y2:number = y; y2 >= 0; y2--)
        {
          let currentLine = this.getLine(y2);
          let upperLine = this.getLine(y2-1);

          currentLine.forEach(block => {
            let upperBlock = upperLine.find(upperBlock => upperBlock.width_position == block.width_position);

            if(upperBlock != undefined){
              block.color = upperBlock.color;
              block.filled = upperBlock.filled;
            }
          });
        }
        y++;
      }
    }
    if(lineCount > 0){

      let score = this.calculateScore(lineCount,this.score.vitesse);
      this.score.lineScore = this.score.lineScore+lineCount;
      this.score.pointScore = this.score.pointScore+score;
      if(Math.floor(this.score.lineScore/10) > this.score.vitesse){
        this.score.vitesse++;
        let speedChange = this.speedValue/3;
        this.speedValue -=  speedChange;
      }

      this.lastScoreTick = score;
      this.displayScore="block";
      this.scoreAnimation="animateScore";
      setTimeout(() => {
        this.displayScore="none";
        this.scoreAnimation="";
      }, 1000);
      this.scoreChanged.emit(this.score);
    }
  }

  getLine(lineNumber: number){
    return this.grid.square_list.filter(block => (block.height_position == lineNumber));
  }

  onArrowLeft(){
    if(!this.pause){
      this.currentTetromino.checkAndMoveLeft(this.grid);
      this.hoverTetromino.copy(this.currentTetromino);
      this.hoverTetromino.moveDownUntilLock(this.grid);
    }
  }

  onArrowRight(){
    if(!this.pause) {
      this.currentTetromino.checkAndMoveRight(this.grid);
      this.hoverTetromino.copy(this.currentTetromino);
      this.hoverTetromino.moveDownUntilLock(this.grid);
    }
  }

  onArrowDown(){
    if(!this.pause) {
      this.currentTetromino.checkAndMoveDown(this.grid);
      this.hoverTetromino.copy(this.currentTetromino);
      this.hoverTetromino.moveDownUntilLock(this.grid);
    }
  }

  onArrowUp(){
    this.currentTetromino.centerPosY--;
  }

  onSpaceBar(){
    if(!this.pause) {
      this.currentTetromino.rotate(this.grid);
      this.hoverTetromino.copy(this.currentTetromino);
      this.hoverTetromino.moveDownUntilLock(this.grid);
    }
  }

  onL(){
    this.currentTetromino.lock(this.grid);
  }

  onPause(){
    if(this.pause){
      this.pause = false;
    } else {
      this.pause = true;
    }
  }

  restart(){
    this.currentTetromino = this.randomTetromino();
    this.currentTetromino.setStartPosition();
    this.nextTetromino = this.randomTetromino();
    this.nextTetromino.setDefaultPosition();
    this.hoverTetromino.copy(this.currentTetromino);
    this.hoverTetromino.moveDownUntilLock(this.grid);
    this.speedValue =  725;
    this.isGameOver = false;
    this.displayGameOver = "none";
    this.displayPause = "none";
    this.grid.square_list.forEach(block => {block.filled = false});
    this.tetrominoChanged.emit(this.nextTetromino);
    this.score = new Score();
    this.scoreChanged.emit(this.score);
  }

  randomTetromino(): Tetromino {
    const tetrominos = [TetrominoI, TetrominoJ, TetrominoL, TetrominoO, TetrominoS, TetrominoT, TetrominoZ];
    var randTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)];
    const colors = ["purple","grey","turquoise","blue","green","yellow","orange","lightBlue"];
    var randColor = colors[Math.floor(Math.random() * colors.length)];
    return new randTetromino(randColor);
  }

  calculateScore(lineCount: number, vitesse: number) : number {
    let baseValue = 40;
    switch(lineCount){
      case 1: {
        baseValue = 40;
        break;
      }
      case 2: {
        baseValue = 100;
        break;
      }
      case 3: {
        baseValue = 300;
        break;
      }
      case 4: {
        baseValue = 1200;
        break;
      }
      default : {
        baseValue = 0;
      }
    }
    return baseValue * (vitesse + 1);
  }



  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(!this.pause && !this.isGameOver) {
      if(event.key == "ArrowLeft"){
        this.onArrowLeft();
      } else if(event.key == "ArrowRight"){
        this.onArrowRight();
      } else if(event.key == "ArrowDown"){
        this.onArrowDown();
      } else if(event.key == "ArrowUp"){
        this.onSpaceBar();
      } else if(event.key == " "){
        this.onSpaceBar();
      } else if(event.key == "l"){
        this.onL();
      } else {
        console.log(event.key);
      }
    }
  }
}
