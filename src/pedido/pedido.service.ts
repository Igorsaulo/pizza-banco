import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Produto } from '@prisma/client';
import { Pedidos } from '@prisma/client';

@Injectable()
export class PedidoService {
    constructor(private prisma: PrismaService) { }

    async createPedido(produtos: Partial<Produto[]>, userId: number): Promise<Pedidos> {
        const pedido: Pedidos = await this.prisma.pedidos.create({
            data: {
                userId: userId,
                dataEmisao: new Date(Date.now() - 3 * 60 * 60 * 1000),
                valorTotal: 0,
            }
        });

        produtos.forEach(async (produto: any) => {
            const item = await this.prisma.item.create({
                data: {
                    pedidosId: pedido.pedidosId,
                    quantidade: produto.quantidade,
                    subtotal: produto.valor * produto.quantidade,
                }
            });

            await this.prisma.produto.update({
                where: {
                    produtoId: produto.produtoId,
                },
                data: {
                    itemId: item.itemId,
                }
            });
        });

        return pedido;
    };


    async getAllPedidos(): Promise<Pedidos[]> {
        return this.prisma.pedidos.findMany();
    }

    async getPedidoById(id: number): Promise<Pedidos> {
        return this.prisma.pedidos.findUnique({
            where: {
                pedidosId: id,
            },
        });
    }

    async updatePedido(id: number, data: Pedidos): Promise<Pedidos> {
        return this.prisma.pedidos.update({
            where: {
                pedidosId: id,
            },
            data,
        });
    }

    async deletePedido(id: number): Promise<Pedidos> {
        return this.prisma.pedidos.delete({
            where: {
                pedidosId: id,
            },
        });
    }
}