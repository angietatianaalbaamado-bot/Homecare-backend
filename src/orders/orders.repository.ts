import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/orders.entity';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dtos/createOrder.dto';
import { OrderDetail } from 'src/entities/orderDetail.entity';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private readonly ordersDataBase: Repository<Order>,

    @InjectRepository(OrderDetail)
    private readonly orderDetailDataBase: Repository<OrderDetail>,

    @InjectRepository(Product)
    private readonly productsDataBase: Repository<Product>,

    @InjectRepository(User)
    private readonly usersDataBase: Repository<User>,
  ) {}

  // Obtener todas las órdenes
  getAllOrdersRepository() {
    return this.ordersDataBase.find({
      relations: ['orderDetails', 'user', 'orderDetails.product'],
    });
  }

  // Obtener órdenes de un usuario
  async getUserOrdersRepository(userExisting: User) {
    return this.ordersDataBase.find({
      where: { user: userExisting },
      relations: ['orderDetails', 'user', 'orderDetails.product'],
    });
  }

  // Crear orden
  async createOrderRepository(createOrderDto: CreateOrderDto) {
    // 1. Buscar usuario
    const user = await this.usersDataBase.findOne({
      where: { id: createOrderDto.userId },
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // 2. Crear orden
    const newOrder = this.ordersDataBase.create({
      user,
      addressDelivery: createOrderDto.addressDelivery,
    });

    const savedOrder = await this.ordersDataBase.save(newOrder);

    const orderDetails: OrderDetail[] = [];
    const IVA_RATE = 0.19;

    // 3. Recorrer productos
    for (const item of createOrderDto.products) {
      const product = await this.productsDataBase.findOne({
        where: { uuid: item.productId },
      });

      if (!product) {
        throw new Error(`Producto con ID ${item.productId} no encontrado`);
      }

      const precio = Number(product.price);
      const cantidad = item.quantity;
      const descuento = item.discount || 0;

      const subTotal = precio * cantidad - descuento;
      const iva = subTotal * IVA_RATE;

      // 🔥 CORRECCIÓN CLAVE AQUÍ
      const orderDetail = this.orderDetailDataBase.create({
        cant: cantidad,
        subTotal,
        iva,
        discount: descuento,
        shippingFees: 0,
        product,
        order: savedOrder,
      });

      const savedDetail = await this.orderDetailDataBase.save(orderDetail);
      orderDetails.push(savedDetail);

      // actualizar stock
      if (product.stock !== undefined) {
        product.stock = product.stock - cantidad;
        await this.productsDataBase.save(product);
      }
    }

    // 4. Respuesta
    return {
      message: 'Orden creada exitosamente',
      order: {
        id: savedOrder.uuid,
        orderDetails: orderDetails.map((detail) => ({
          productName: detail.product.name,
          quantity: detail.cant,
          subTotal: detail.subTotal,
          iva: detail.iva,
          total: Number(detail.subTotal) + Number(detail.iva),
        })),
        totalOrder: orderDetails.reduce(
          (acc, d) => acc + Number(d.subTotal) + Number(d.iva),
          0,
        ),
      },
    };
  }
}