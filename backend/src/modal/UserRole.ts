// import { Table, Model, Column, DataType, ForeignKey } from "sequelize-typescript";
// import { User } from "../modal/UserModal";
// import { Role } from "./RoleModal";

// @Table({
//   timestamps: false,
//   tableName: "user_role",
// })
// export class UserRole extends Model {
//   @ForeignKey(()=> User)
//   @Column({
//     type: DataType.INTEGER,
//     allowNull: false,
//   })
//   userId!: number;

//   @ForeignKey(()=> Role)
//   @Column({
//     type: DataType.INTEGER,
//     allowNull: false,
//   })
//   roleId!: number;

  
// }




































import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import { User } from "./UserModal";
import { Role } from "./RoleModal";

@Table({
  timestamps: false,
  tableName: "user_role",
})
export class UserRole extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  roleId!: number;
}





