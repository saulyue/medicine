import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User> // 注入User实体类的Repository
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }
  login(query: any) {
    console.log("query",query);
    return { status: "ok", type: "account", currentAuthority: "admin" };
  }
  outLogin() {
    return {
      data: {},
      success: true,
    };
  }
  currentUser(query: any) {
    return {
      success: true,
      data: {
        name: "Serati Ma",
        avatar:
          "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
        userid: "00000001",
        email: "antdesign@alipay.com",
        signature: "海纳百川，有容乃大",
        title: "交互专家",
        group: "蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED",
        tags: [
          {
            key: "0",
            label: "很有想法的",
          },
          {
            key: "1",
            label: "专注设计",
          },
          {
            key: "2",
            label: "辣~",
          },
          {
            key: "3",
            label: "大长腿",
          },
          {
            key: "4",
            label: "川妹子",
          },
          {
            key: "5",
            label: "海纳百川",
          },
        ],
        notifyCount: 12,
        unreadCount: 11,
        country: "China",
        geographic: {
          province: {
            label: "浙江省",
            key: "330000",
          },
          city: {
            label: "杭州市",
            key: "330100",
          },
        },
        address: "西湖区工专路 77 号",
        phone: "0752-268888888",
      },
    };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
