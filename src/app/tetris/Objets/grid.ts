import {Square} from './square';
import {Tetromino} from './tetromino';

export class Grid {

  public square_list: Array<Square>;

  constructor(public height: number, public width: number){
    this.square_list = new Array<Square>();
    for(let i = 0; i<height; i++){
      for(let j = 0; j<width; j++){
        this.square_list.push(new Square(i,j));
      }
    }
  }

  display(tetromino:Tetromino){
    tetromino.display(this.square_list);
  }

}
