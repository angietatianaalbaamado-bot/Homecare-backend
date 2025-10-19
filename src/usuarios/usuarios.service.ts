import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepo: Repository<Usuario>,
  ) {}

  create(usuario: Usuario) {
    return this.usuariosRepo.save(usuario);
  }

  findAll() {
    return this.usuariosRepo.find();
  }

  findOne(id: number) {
    return this.usuariosRepo.findOneBy({ id });
  }

  remove(id: number) {
    return this.usuariosRepo.delete(id);
  }
}
