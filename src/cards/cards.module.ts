import { Module } from '@nestjs/common';
import { CardsController } from './controller/cards.controller';
import { CardsService } from './service/cards.service';
import { Card } from './entities/card.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  controllers: [CardsController],
  providers: [CardsService]
})
export class CardsModule {}
