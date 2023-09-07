import { Injectable } from '@nestjs/common';
import { Item } from './interface/item.interface';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ItemService {
    constructor(private prisma: PrismaService) { }

    async createItem(data: Item): Promise<Item> {
        return this.prisma.item.create({
            data,
        });
    }

    async getAllItems(): Promise<Item[]> {
        return this.prisma.item.findMany();
    }

    async getItemById(id: number): Promise<Item> {
        return this.prisma.item.findUnique({
            where: {
                itemId: id,
            },
        });
    }

    async updateItem(id: number, data: Item): Promise<Item> {
        return this.prisma.item.update({
            where: {
                itemId: id,
            },
            data,
        });
    }

    async deleteItem(id: number): Promise<Item> {
        return this.prisma.item.delete({
            where: {
                itemId: id,
            },
        });
    }
}
