import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('cards')
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  cardId: string;

  @Column()
  seriesCode: string;

  @Column()
  type: string;

  @Column()
  subtype: string;

  @Column({ nullable: true })
  atk: number;

  @Column({ nullable: true })
  def: number;

  @Column({ nullable: true })
  stars: number;

  @Column({ type: 'text' })
  description: string;

  @Column()
  imageUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
