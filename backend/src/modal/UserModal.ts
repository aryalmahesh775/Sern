import {
  Table,
  Model,
  Column,
  DataType,
  BelongsToMany,
} from "sequelize-typescript";
import { Role } from "./RoleModal";
import { UserRole } from "./UserRole";

@Table({
  timestamps: false,
  tableName: "users",
})
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isGood: boolean = false;

  @BelongsToMany(() => Role,() => UserRole)
  role!:Role[];
}
