import { Module } from "@nestjs/common";
import { ProdutoController } from "./produto.controller";
import { ProdutoService } from "./produto.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [ProdutoController],
    providers: [ProdutoService],
    exports: [ProdutoService],
})

export class ProdutoModule { }
