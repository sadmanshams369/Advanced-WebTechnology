import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { Product } from "./entities/product.entity";

@Controller("products")
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    create(@Body() data: Partial<Product>) {
        return this.productService.create(data);
    }

    @Get()
    findAll() {
        return this.productService.findAll();
    }

    @Get(":id")
    findOne(@Param("id", ParseIntPipe) id: number) {
        return this.productService.findOne(id);
    }

    @Patch(":id")
    update(
        @Param("id", ParseIntPipe) id: number,
        @Body() data: Partial<Product>,
    ) {
        return this.productService.update(id, data);
    }

    @Delete(":id")
    remove(@Param("id", ParseIntPipe) id: number) {
        return this.productService.remove(id);
    }
}