import {AfterViewInit, Component, inject} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {TopBarComponent} from "../../components/top-bar/top-bar.component";
import {SectionsComponent} from "../../components/sections/sections.component";
import {BoardService} from "../../../core/services/board.service";
import {Board, TokenInfos} from "../../../core/models";
import {AuthService} from "../../../core/services";
import {forkJoin, Observable} from "rxjs";
import {LoaderComponent} from "../../../shared/loader/loader.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    TopBarComponent,
    SectionsComponent,
    LoaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {

  private _boardService: BoardService = inject(BoardService);
  private _authService: AuthService = inject(AuthService);

  protected boards: Board[] = [];
  protected board!: Board;

  protected user!: TokenInfos;
  protected isLoaded: boolean = false;

  ngAfterViewInit() {
    this.loadData();
  }

  protected loadData() {
    this.chargeUser();
    const apiCalls:Observable<any>[] = [
      this._boardService.getAll(this.user?.id)
    ];

    forkJoin(apiCalls).subscribe({
      next: data => {
        const boards: Board[] = data[0].map((board: Board) => board);
        this.chargeBoards(boards);
      },
      error: (err) => {
        console.error('Erro ao carregar dados:', err);
      },
      complete: () =>
      {
        this.isLoaded = true;
      }
    })
  }

  protected  changeBoard(event: Board): void{
    this.board = event;
  }

  private chargeUser() {
    this.user =  this._authService.tokenInfo;
  }

  private chargeBoards(boards: Board[]) {
    this.boards = boards;
    this.board = boards[0];
  }
}
