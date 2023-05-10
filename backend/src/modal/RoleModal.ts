import {
  Table,
  Model,
  Column,
  DataType,
  BelongsToMany,
} from "sequelize-typescript";
import { User } from "./UserModal";
import { UserRole } from "./UserRole";

@Table({
  timestamps: false,
  tableName: "roles",
})
export class Role extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;


  @BelongsToMany(() => User, () => UserRole)
  user!: User[];
}
