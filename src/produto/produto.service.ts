import { Injectable } from '@nestjs/common';
import { Produto } from './interface/produto.interface';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProdutoService {
    constructor(private prisma: PrismaService) { }

    async createProduto(data: Produto): Promise<Produto> {
        try {
            return await this.prisma.produto.create({
                data,
            });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }

    async getAllProdutos(): Promise<Produto[]> {
        try {
            return await this.prisma.produto.findMany();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }

    async getProdutoById(id: number): Promise<Produto> {
        try {
            return await this.prisma.produto.findUnique({
                where: {
                    produtoId: id,
                },
            });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }

    async updateProduto(id: number, data: Produto): Promise<Produto> {
        try {
            return await this.prisma.produto.update({
                where: {
                    produtoId: id,
                },
                data,
            });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteProduto(id: number): Promise<Produto> {
        try {
            return await this.prisma.produto.delete({
                where: {
                    produtoId: id,
                },
            });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
