import { Component, OnInit } from '@angular/core';
import { AudioService } from "../../services/audio.service";
import { StreamState } from "../../interfaces/stream-state";


@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {
  files: Array<any> = [];
  state: StreamState | undefined;
  currentFile: any = {};

  constructor(public audioService: AudioService) {

    this.files = [{
      url: "../../assets/music/tetris.mp3"
    }];

    // listen to stream state
    this.audioService.getState().subscribe(state => {
    this.state = state;
    });
  }

  ngOnInit(): void {
    this.openFile(this.files[0],0);
  }

  playStream(url: any) {
    this.audioService.playStream(url).subscribe(events => {
      // listening for fun here
    });
  }

  openFile(file: { url: any; }, index: any) {
    this.currentFile = { index, file };
    this.audioService.stop();
    this.playStream(file.url);
  }

  pause() {
    this.audioService.pause();
  }

  play() {
    this.audioService.play();
  }

}
