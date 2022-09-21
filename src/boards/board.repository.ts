import { DataSource, Repository } from 'typeorm';
import { Board } from './board.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private readonly dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  // 특정 게시물 조회
  async getBoardById(id: number): Promise<Board> {
    const found = await this.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException('존재하는 게시물이 없습니다.');
    }

    return found;
  }

  // 게시물 생성
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.save(board);
    return board;
  }

  // 특정 게시물 삭제
  async deleteBoard(id: number): Promise<void> {
    const result = await this.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('존재하는 게시물이 없습니다.');
    }
  }
}
