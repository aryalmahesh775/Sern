import { NextFunction, Request, RequestHandler, Response } from "express";
import { User } from "../modal/UserModal";
import { Role } from "../modal/RoleModal";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRole } from "../modal/UserRole";
import { SuccessResponse, customError } from "../helper/responseHelper";

export const createUser: RequestHandler = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const isUser = await User.findOne({
      where: { email: req.body.email },
    });
    if (isUser) {
      customError("User already exist", 403);
    }
    if (req.body.password.length < 5) {
      customError("Password must be of 6 character ....", 403);
    }
    var user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, salt),
      isGood: req.body.isGood,
    });

    await UserRole.create({
      userId: user.id,
      roleId: 1,
    });
    return res
      .status(200)
      .json({ message: "User created successfully...", data: user });
  } catch (error) {
    next(error);
  }
};

export const loginUser: RequestHandler = async (
    req: any,
    res: any,
    next: any
  ) => {
    try {
      const user = await User.findOne({
        where: { email: req.body.email },
        raw: true,
      });
      if (user) {
        const password_valid = await bcrypt.compare(
          req.body.password,
          user.password
        );
  
        let token;

        if(!password_valid){
            return customError("Password Incorrect...", 422);
        }
          token = jwt.sign(
            { id: user.id, email: user.email, name: user.name },
            process.env.JWT_SECRET!
          );
  
          const responseData = {
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              password: user.password,
              isGood: user.isGood,
            },
          };
          res
            .status(200)
            .json(
              SuccessResponse(
                "User Login successful",
                res.statusCode,
                responseData
              )
            );
      } else {
        customError("User does not exist...", 422);
      }
    } catch (error) {
      next(error);
    }
  };
  
  export const deleteUser: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedUser: User | null = await User.findByPk(id);
      if(!deletedUser){
        customError("User does not exist...", 422);
      }
      await User.destroy({ where: { id } });
      return res
        .status(200)
        .json({ message: "User deleted successfully", data: deletedUser });
    } catch (error) {
      next(error);
    }
  };
  
  export const getAllUsers: RequestHandler = async (req, res, next) => {
    try {
      const allUsers: any = await User.findAll({
        include: [
          {
            model: Role,
            through: { attributes: [] },
          },
        ],
      });
      return res
        .status(200)
        .json(SuccessResponse(
          "User fetched successfully",
          res.statusCode,
          allUsers
        ));
    } catch (error) {
      next(error);
    }
  };
  
  export const getUserDetails: RequestHandler = async (req:any, res, next) => {
    try {
      let user = req.user
      return res
        .status(200)
        .json(SuccessResponse(
          "User fetched successfully",
          res.statusCode,
          user
        ));
    } catch (error) {
      next(error);
    }
  };
  
  export const getUserById: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const user: User | null = await User.findByPk(id, {
        include: [
          {
            model: Role,
            through: { attributes: [] },
          },
        ],
      });
      if (!user) {
        customError("User not found...", 404);
      }
      return res
        .status(200)
        .json(SuccessResponse(
          "User fetched successfully",
          res.statusCode,
          user
        ));
    } catch (error) {
      next(error);
    }
  };
  
  export const updateUser: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    await User.update({ ...req.body }, { where: { id } });
    const updateUsr: User | null = await User.findByPk(id);
    return res
      .status(200)
      .json(SuccessResponse(
        "User updated successfully",
        res.statusCode,
        updateUsr
      ));
  };
  

  export const addUserRole = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userData = req.params.userID;
      const roleData = req.body.roleID;

      console.log(userData, roleData)
      const user: User | null = await User.findByPk(userData);
      if(!user){
        customError("User not found...", 404);
      }
      const role: Role | null = await Role.findByPk(roleData);
      if(!role){
        customError("Role not found", 404);
      }
      await UserRole.create({
        userId: userData,
        roleId: roleData,
      });
      return res
        .status(200)
        .json(SuccessResponse("Role added successfully...", res.statusCode));
    } catch (error) {
      next(error);
    }
  };
  
  
  export const removeUserRole = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userData = req.params.userID;
      const roleData = req.body.roleID;
      const user: User | null = await User.findByPk(userData);
      if(!user){
        customError("User not found...", 404);
      }
      const role: Role | null = await Role.findByPk(roleData);
      if(!role){
        customError("Role not found", 404);
      }
      await UserRole.destroy({
        where:{userId:userData , roleId:roleData}
      });
      return res
        .status(200)
        .json(SuccessResponse("Role deleted successfully...", res.statusCode));
    } catch (error) {
      next(error);
    }
  };
  