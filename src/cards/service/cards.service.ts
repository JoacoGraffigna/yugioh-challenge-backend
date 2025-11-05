import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from '../entities/card.entity';
import { CreateCardDto } from '../dto/create-card.dto';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,
  ) {}

  async create(dto: CreateCardDto): Promise<Card> {
    const existing = await this.cardsRepository.findOne({
      where: { cardId: dto.cardId },
    });

    if (existing) {
      throw new BadRequestException(
        `Ya existe una carta con el ID de carta "${dto.cardId}".`,
      );
    }

    const card = this.cardsRepository.create(dto);
    return this.cardsRepository.save(card);
  }

  async findAll(): Promise<Card[]> {
    return this.cardsRepository.find();
  }

  async findOne(id: number): Promise<Card> {
    const card = await this.cardsRepository.findOneBy({ id });
    if (!card) throw new NotFoundException('Card not found');
    return card;
  }

  async update(id: number, dto: Partial<CreateCardDto>): Promise<Card> {
    await this.cardsRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.cardsRepository.delete(id);
  }
}
