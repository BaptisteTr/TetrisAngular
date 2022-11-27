import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { CommandBarComponent } from '../command-bar.component';

@Component({
  selector: 'app-command-bar-mobile',
  templateUrl: './command-bar-mobile.component.html',
  styleUrls: ['./command-bar-mobile.component.css']
})
export class CommandBarMobileComponent extends CommandBarComponent implements OnInit {

  @Output() pause =  new EventEmitter<any>();
  @Output() restart =  new EventEmitter<any>();

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  triggerPause(){
    this.pause.emit();
  }
  triggerRestart(){
    this.restart.emit();
  }


}
