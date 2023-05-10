import { Table, Model, Column, DataType, BelongsToMany, BelongsTo, HasMany, ForeignKey } from "sequelize-typescript";
import { User } from "./UserModal";
import { Category } from "./CategoryModal";
import { Review } from "./ReviewModal";


@Table({
    timestamps:false,
    tableName: "posts"
})
export class Post extends Model {
    @Column({
        type:DataType.STRING,
        allowNull: false,
    })
    title!:string;


  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image!: string;


  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  createdBy!: number;

  @ForeignKey(() => Category)
  @Column({
    type:DataType.INTEGER,
    allowNull:false
  })
  categortId!: number;

  @BelongsTo(() => User)
  user!: User[];

  @BelongsTo(() => Category)
  category!: Category[]

  @HasMany(() => Review)
  review!:Review[]
}