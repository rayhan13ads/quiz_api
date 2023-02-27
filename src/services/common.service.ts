import { FindManyOptions, FindOneOptions } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { Repository } from "typeorm";

export  class CommonService<T> {
     constructor( public  repository: Repository<T>) { }

    async all(options:FindManyOptions): Promise<any[]> {
        return await this.repository.find(options);
    }


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async paginate(page = 1,condition:any ,relations:any = []): Promise<any> {
        const take = 15;

        const [data, total] = await this.repository.findAndCount({
            where:condition,
            take,
            skip: (page - 1) * take,
            relations,
        });
        
        return  {
            data: data,
            meta: {
                total,
                page,
                last_page: Math.ceil(total / take),
            },
        };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async create(data: any): Promise<any> {
        return await this.repository.save(data);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async findOne(condition: FindOneOptions): Promise<any> {
        return await this.repository.findOne(condition);
    }

    async update(id: number, data: QueryDeepPartialEntity<any>): Promise<any> {
        return this.repository.update(id, data);
    }

    async delete(id: number): Promise<any> {
        return this.repository.delete(id);
    }
}
