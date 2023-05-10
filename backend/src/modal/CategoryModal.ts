import {
    Table,
    Model,
    Column,
    DataType,
    HasMany,
  } from "sequelize-typescript";
  import { Post } from "./PostModal"

  @Table({
    timestamps:false,
    tableName:"categories",
  })
  export class Category extends Model{
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    title!:string

    @Column({
        type: DataType.STRING,
        allowNull:false,
    })
    description!: string;

    @HasMany(() => Post)
    post!: Post[]
  }