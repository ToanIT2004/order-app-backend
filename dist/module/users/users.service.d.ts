import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    isUsernameExist: (username: string) => Promise<boolean>;
    create(createUserDto: CreateUserDto): Promise<{
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(currentPage: number, limit: number, qs: string): Promise<{
        meta: {
            current: number;
            pageSize: number;
            sumPage: number;
            totalIems: number;
        };
        result: (import("mongoose").Document<unknown, {}, User> & User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
    }>;
    findOne(id: number): string;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
