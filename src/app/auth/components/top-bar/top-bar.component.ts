import {
  AfterContentInit,
  AfterViewInit,
  Component,
  input,
  InputSignal,
  OnInit,
  output,
  OutputEmitterRef
} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {Board, emptyBoard} from "../../../core/models";
import {FormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatLabel,
    MatIcon,
    MatSelect,
    MatOption,
    FormsModule
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent implements OnInit {

  public boards: InputSignal<Board[]> = input.required();
  public selectBoard: OutputEmitterRef<Board> = output<Board>();

  protected selectedBoard: Board = emptyBoard;

  ngOnInit() {
    this.selectedBoard = this.boards()[0];
  }

  protected changeBoard(){
    this.selectBoard.emit(this.selectedBoard);
  }
}

