import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { hashPassword } from 'src/helper/util';
import aqp from 'api-query-params';


@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  isUsernameExist = async (username: string) => {
    const user = await this.userModel.exists({ username })
    if (user) return true;
    return false
  }

  async create(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto

    //check username 
    const isExist = await this.isUsernameExist(username);
    if (isExist) {
      throw new BadRequestException(`Username đã tồn tại: ${username}. Vui lòng sử dụng username khác.`)
    }

    // hash password
    const hastPassword = await hashPassword(password)
    const user = await this.userModel.create({
      username, password: hastPassword
    })
    return {
      _id: user._id
    };
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    // Nó sẽ gán req.query vào filter 
    const { filter, sort, population } = aqp(qs)

    //Xóa current và pageSize trong filter
    delete filter.current
    delete filter.pageSize

    // Logic tính ra số bước nhảyy
    const offset = (+currentPage - 1) * (+limit)

    // Logic tính ra trang hiện tại đang đứng
    const defaultLimit = +limit ? +limit : 10

    // Logic tính tổng số trang
    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit)

    // Hiện tại filter đang trống {}
    const result = await this.userModel.find({ ...filter, deleted: false })
      .skip(offset)
      .limit(defaultLimit)
      // ép kiểu về kiểu dữ liệu any tại ban đầu nó là number
      // lỗi thư viện
      .sort(sort as any)
      .populate(population)
      .exec()

    return {
      meta: {
        current: currentPage, //Trang hiện tại
        pageSize: limit,
        sumPage: totalPages,
        totalIems: totalItems
      },
      result
    }

  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
