import { Inject, Injectable } from "@nestjs/common";
import { FindManyOptions, ILike, Repository } from "typeorm";
import { User, UserSearchResult } from "./user.entity";
import { USER_REPOSITORY } from "./user.providers";

export type TUserCreate = {
    name: string,
    dob?: Date | null,
    address?: string,
    description?: string,
    imageUrl?: string
}

export type TUserUpdate = {
    name: string,
    dob?: Date,
    address?: string,
    description?: string,
    imageUrl?: string
}

@Injectable()
export class UserService {
    constructor(
        @Inject(USER_REPOSITORY)
        private userRepository: Repository<User>
    ) { }

    create(data: TUserCreate): Promise<User> {
        const user = this.userRepository.create(data);
        return this.userRepository.save(user);
    }

    findById(id: number): Promise<User> {
        return this.userRepository.findOne(id);
    }
    
    async findAll(searchText = '', take = 10, skip = 0): Promise<UserSearchResult> {

        const query = searchText ? {
            where: [
                { name: ILike(`%${searchText}%`) },
            ]
        } : {}

        const getQuery = {
            ...query,
            take,
            skip,
            order: {
                name: "ASC",
            }
        }

        const [total, list] = await Promise.all([
            this.userRepository.count(query),
            this.userRepository.find(getQuery as FindManyOptions)
        ])

        return {
            total, list
        } as UserSearchResult;
    }

    async updateById(id: number, data: TUserUpdate): Promise<User> {
        await this.userRepository.update({ id }, data)
        return this.findById(id);
    }

    async deleteById(id: number): Promise<boolean> {
        return !!(await this.userRepository.delete({ id }))
    }
}