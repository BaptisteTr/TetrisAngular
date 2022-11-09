import { Grid } from "./grid";

export class Square {

  constructor(public height_position:number, public width_position:number, public color:string = "white", public filled:boolean = false, public isDisappearing:string = ""){}

  public isFilled(grid:Grid,centerPosY: number, centerPosX: number){
    if(grid.square_list.find(square => square.height_position == (this.height_position + centerPosY)
      && square.width_position == (this.width_position + centerPosX)
      && square.filled == true)!= undefined){
        return true;
    }
    return false;
  }
}
