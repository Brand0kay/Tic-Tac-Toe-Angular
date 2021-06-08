import { Component, OnInit } from '@angular/core';
import { Gamelogic } from '../gamelogic';

@Component({
  selector: '.app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [Gamelogic]
})
export class GameComponent implements OnInit {

  constructor(public game: Gamelogic) { }

  ngOnInit(): void {
  }

  startGame(): void{
    this.game.gameStart();
    const currentPlayer = 'Current Turn: Player: ' + this.game.currentTurn;
    const information = document.querySelector('.current-status');
    if(information != null){
      information.innerHTML = currentPlayer;
      if(this.game.currentTurn === 1){
        information.innerHTML = "<span style='color: #568ca8;'>" + currentPlayer  + "</span>";
      }
      else{
        information.innerHTML = "<span style='color: #cc44fa;'>" + currentPlayer  + "</span>";
      }
    }
  }

  async clickSubfield(subfield: any): Promise<void>{
    if(this.game.gameStatus ===1){
      const position = subfield.currentTarget.getAttribute('position');
      const information = document.querySelector('.current-status');

      this.game.setField(position, this.game.currentTurn);
      const color = this.game.getPlayerColorClass();
      subfield.currentTarget.classList.add(color);

      await this.game.checkGameEndWinner().then( (end: boolean) => {
        if(this.game.gameStatus === 0 && end){
          if(information != null){
            if(this.game.currentTurn === 1){
              information.innerHTML = "<span style='color: #568ca8;'> WINNER: Player " + this.game.currentTurn + "</span>";
            }
            else{
              information.innerHTML = "<span style='color: #cc44fa;'> WINNER: Player " + this.game.currentTurn + "</span>";
            }
        } 
      }
      });


      await this.game.checkGameEndFull().then( (end: boolean) => {
        if(this.game.gameStatus === 0 && end){
          if(information != null){
            information.innerHTML = "<span style='color: #Efd009;'>Cat's Game, try again?</span>";;
        } 
      }
      });

      this.game.changePlayer();

      if(this.game.gameStatus === 1){
        const currentPlayer = 'Current Turn: Player: ' + this.game.currentTurn;
        if(information != null){
          information.innerHTML = currentPlayer;
          if(this.game.currentTurn === 1){
            information.innerHTML = "<span style='color: #568ca8;'>" + currentPlayer  + "</span>";
          }
          else{
            information.innerHTML = "<span style='color: #cc44fa;'>" + currentPlayer  + "</span>";
          }
      }
    }
  }
}
}
