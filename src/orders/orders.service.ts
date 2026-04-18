import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { UsersRepository } from 'src/users/users.repository';
import { CreateOrderDto } from './dtos/createOrder.dto';
import { ProductRepository } from 'src/products/products.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly usersRepository: UsersRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  // Obtener todas las órdenes
  getAllOrdersService() {
    return this.ordersRepository.getAllOrdersRepository();
  }

  // Obtener las órdenes de un usuario específico
  async getUserOrdersService(userId: string) {
    const userExisting = await this.usersRepository.getUserByIdRepository(userId);
    if (!userExisting) {
      throw new NotFoundException('Usuario no encontrado');
    }
    if (!userExisting.isActive) {
      throw new NotFoundException('Usuario inactivo');
    }
    return this.ordersRepository.getUserOrdersRepository(userExisting);
  }

  // Crear una nueva orden
  async createOrderService(createOrderDto: CreateOrderDto) {
    const userExisting = await this.usersRepository.getUserByIdRepository(
      createOrderDto.userId,
    );
    if (!userExisting) {
      throw new NotFoundException('Usuario no encontrado');
    }
    if (!userExisting.isActive) {
      throw new NotFoundException('Usuario inactivo');
    }

    if (!createOrderDto.products || createOrderDto.products.length === 0) {
      throw new NotFoundException('No se han proporcionado productos para la orden');
    }

    for (const product of createOrderDto.products) {
      const productExisting = await this.productRepository.getProductById(
        product.productId,
      );
      if (!productExisting) {
        throw new NotFoundException(`Producto con ID ${product.productId} no encontrado`);
      }
      if (!productExisting.isActive) {
        throw new BadRequestException(`El producto ${productExisting.name} no está disponible`);
      }
      if ((productExisting.stock ?? 0) < product.quantity) {
        throw new BadRequestException(
          `Stock insuficiente para el producto ${productExisting.name}. Disponible: ${productExisting.stock ?? 0}, Solicitado: ${product.quantity}`,
        );
      }
      if (product.quantity <= 0) {
        throw new BadRequestException(
          `La cantidad debe ser mayor a 0 para el producto ${productExisting.name}`,
        );
      }
    }
    return this.ordersRepository.createOrderRepository(createOrderDto);
  }
}
