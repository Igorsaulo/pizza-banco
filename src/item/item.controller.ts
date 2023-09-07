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
import { ItemService } from "./item.service";
import { Item } from "./interface/item.interface";
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('item')
export class ItemController {
    constructor(private readonly itemService: ItemService) { }

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() item: Item) {
        try {
            return await this.itemService.createItem(item);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(AuthGuard)
    @Get()
    async getAll() {
        try {
            return await this.itemService.getAllItems();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getById(@Param('id') id: number) {
        try {
            return await this.itemService.getItemById(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
    
    @UseGuards(AuthGuard)
    @Patch(':id')
    async update(@Param('id') id: number, @Body() item: Item) {
        try {
            return await this.itemService.updateItem(id, item);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: number) {
        try {
            return await this.itemService.deleteItem(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

}