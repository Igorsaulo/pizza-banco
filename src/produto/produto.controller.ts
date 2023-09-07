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
import { ProdutoService } from "./produto.service";
import { Produto } from "./interface/produto.interface";
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('produto')
export class ProdutoController {
    constructor(private readonly produtoService: ProdutoService) { }

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() produto: Produto) {
        try {
            return await this.produtoService.createProduto(produto);
        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(AuthGuard)
    @Get()
    async getAll() {
        try {
            return await this.produtoService.getAllProdutos();
        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getById(@Param('id') id: number) {
        try {
            return await this.produtoService.getProdutoById(id);
        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    async update(@Param('id') id: number, @Body() produto: Produto) {
        try {
            return await this.produtoService.updateProduto(id, produto);
        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: number) {
        try {
            return await this.produtoService.deleteProduto(id);
        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}