import {
  Table,
  Model,
  Column,
  DataType,
  BelongsToMany,
  BelongsTo,
  HasMany,
  ForeignKey,
} from "sequelize-typescript";
import { User } from "./UserModal";
import { Post } from "./PostModal";

@Table({
  timestamps: false,
  tableName: "reviews",
})
export class Review extends Model {
  @ForeignKey(() => Post)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  postId!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  comment!: string;

  @BelongsTo(() => Post)
  post!: Post[];

  @BelongsTo(() => User)
  user!: User[];
}
