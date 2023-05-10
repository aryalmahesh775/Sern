import { Sequelize } from "sequelize-typescript"
import { Role } from "../modal/RoleModal";
import { User } from "../modal/UserModal";
import { UserRole } from "../modal/UserRole";
import { Post } from "../modal/PostModal";
import { Category } from "../modal/CategoryModal";
import { Review } from "../modal/ReviewModal";

const connection = new Sequelize({
    dialect:"mysql",
    host:"localhost",
    username:"mysql-user",
    password:"mysql-password",
    database:"mahesh_node",
    models:[Role, User, UserRole, Post, Category, Review]
})

export default connection;