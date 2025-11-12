import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuario.entity';

@Controller('usuario')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() usuario: Usuario) {
    return this.usuariosService.create(usuario);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usuariosService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usuariosService.remove(id);
  }
}