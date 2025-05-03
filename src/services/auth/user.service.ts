// import User from "../models/user.model";
// import { CreateUserDTO } from "../interface/user.interface";

// export class UserService {
//   async getUserByEmail(email: string) {
//     return await User.findOne({ where: { email } });
//   }

//   async getUserById(id: number) {
//     return await User.findByPk(id);
//   }

//   async createUser(data: CreateUserDTO) {
//     const newUser = await User.create(data);
//     return newUser.user_id;
//   }

//   async updateUserProfile(userId: number, updates: Partial<CreateUserDTO>) {
//     return await User.update(updates, { where: { user_id: userId } });
//   }

//   async updatePassword(userId: number, hashedPassword: string) {
//     return await User.update(
//       { password: hashedPassword },
//       { where: { user_id: userId } }
//     );
//   }
// }
