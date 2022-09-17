import { Injectable } from '@nestjs/common';
import { Board } from './board.model';

@Injectable()
export class BoardsService {
<<<<<<< HEAD
  private boards: B
=======
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }
>>>>>>> 45fd3caa9c854e9d1c8f81a2aed6035c2acec901
}
