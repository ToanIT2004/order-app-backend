import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(current: string, pageSize: string, qs: string): Promise<{
        meta: {
            current: number;
            pageSize: number;
            sumPage: number;
            totalIems: number;
        };
        result: (import("mongoose").Document<unknown, {}, import("./schema/user.schema").User> & import("./schema/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
    }>;
    findOne(id: string): string;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
