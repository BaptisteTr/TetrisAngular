import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Grid } from '../Objets/grid';

@Component({
  selector: 'app-next-tetromino',
  templateUrl: './next-tetromino.component.html',
  styleUrls: ['./next-tetromino.component.css']
})
export class NextTetrominoComponent implements OnInit, OnChanges  {
  public grid : Grid = new Grid(0,0);
  @Input()
  tetromino: any;

  constructor() {

  }

  ngOnChanges(): void {
    this.refresh();
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void{

    if (this.tetromino != null){
      console.log(this.tetromino.getHeight(), this.tetromino.getWidth());
      this.grid = new Grid(this.tetromino.getHeight(), this.tetromino.getWidth());
      this.grid.display(this.tetromino, undefined);
    }
  }

}
