import {
    Controller,
    Get,
    Post,
    Delete,
    Patch,
    Body,
    Param,
    UseGuards,
    HttpException,
    HttpStatus
} from "@nestjs/common";
import { PedidoService } from "./pedido.service";
import { Pedidos, Produto } from "@prisma/client";
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('pedido')
export class PedidoController {
    constructor(private readonly pedidoService: PedidoService) { }

    @UseGuards(AuthGuard)
    @Post(':id')
    async create(@Body() produtos: Produto[], @Param('id') id: number) {
        try {
            return await this.pedidoService.createPedido(produtos, id);
        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(AuthGuard)
    @Get()
    async getAll() {
        try {
            return await this.pedidoService.getAllPedidos();
        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        };
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getById(@Body('id') id: number) {
        try {
            return await this.pedidoService.getPedidoById(id);
        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    async update(@Body('id') id: number, @Body() pedido: Pedidos) {
        try {
            return await this.pedidoService.updatePedido(id, pedido);
        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(@Body('id') id: number) {
        try {
            return await this.pedidoService.deletePedido(id);
        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
