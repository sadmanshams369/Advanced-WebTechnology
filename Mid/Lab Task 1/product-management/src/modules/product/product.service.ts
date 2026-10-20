import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./entities/product.entity";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    async create(data: Partial<Product>): Promise<Product> {
        const product = this.productRepository.create(data);
        return await this.productRepository.save(product);
    }

    async findAll(): Promise<Product[]> {
        return await this.productRepository.find();
    }

    async findOne(id: number): Promise<Product> {
        const product = await this.productRepository.findOneBy({ id });

        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        return product;
    }

    async update(id: number, data: Partial<Product>): Promise<Product> {
        const product = await this.findOne(id);
        Object.assign(product, data);
        return await this.productRepository.save(product);
    }

    async remove(id: number): Promise<{ message: string }> {
        const product = await this.findOne(id);
        await this.productRepository.remove(product);

        return { message: "Product deleted successfully" };
    }
}