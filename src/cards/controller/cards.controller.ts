import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { CardsService } from '../service/cards.service';
import { CreateCardDto } from '../dto/create-card.dto';
import { Card } from '../entities/card.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles/roles.guard';

@ApiTags('Cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) { }


  @Post()
  @ApiOperation({ summary: 'Crear una nueva carta', description: 'Crea un registro de carta en la base de datos.' })
  @ApiResponse({ status: 201, description: 'Carta creada exitosamente.', type: Card })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  create(@Body() dto: CreateCardDto): Promise<Card> {
    return this.cardsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las cartas', description: 'Devuelve una lista de todas las cartas registradas.' })
  @ApiResponse({ status: 200, description: 'Lista de cartas.', type: [Card] })
  findAll(): Promise<Card[]> {
    return this.cardsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una carta por ID', description: 'Busca una carta específica por su ID.' })
  @ApiResponse({ status: 200, description: 'Carta encontrada.', type: Card })
  @ApiResponse({ status: 404, description: 'Carta no encontrada.' })
  findOne(@Param('id') id: number): Promise<Card> {
    return this.cardsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una carta', description: 'Modifica los datos de una carta existente.' })
  @ApiResponse({ status: 200, description: 'Carta actualizada correctamente.', type: Card })
  @ApiResponse({ status: 404, description: 'Carta no encontrada.' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  update(@Param('id') id: number, @Body() dto: Partial<CreateCardDto>): Promise<Card> {
    return this.cardsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una carta', description: 'Elimina una carta específica de la base de datos.' })
  @ApiResponse({ status: 200, description: 'Carta eliminada correctamente.' })
  @ApiResponse({ status: 404, description: 'Carta no encontrada.' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  remove(@Param('id') id: number): Promise<void> {
    return this.cardsService.remove(id);
  }
}
