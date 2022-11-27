import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-command-bar',
  templateUrl: './command-bar.component.html',
  styleUrls: ['./command-bar.component.css']
})
export class CommandBarComponent implements OnInit {

  @Output() left =  new EventEmitter<any>();
  @Output() right =  new EventEmitter<any>();
  @Output() down =  new EventEmitter<any>();
  @Output() rotate =  new EventEmitter<any>();
  @Output() pause =  new EventEmitter<any>();
  @Output() restart =  new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  triggerLeft(){
    this.left.emit("left");
  }
  triggerRight(){
    this.right.emit();
  }
  triggerDown(){
    this.down.emit();
  }
  triggerRotate(){
    this.rotate.emit();
  }
  triggerPause(){
    this.pause.emit();
  }
  triggerRestart(){
    this.restart.emit();
  }

}
