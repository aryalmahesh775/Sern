import { RequestHandler, Request, Response, NextFunction } from "express";
import { Role } from "../modal/RoleModal";
import { customError } from "../helper/responseHelper";

export const createRole: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    var roleData = await Role.create({
      title: req.body.title,
    });
    return res
      .status(200)
      .json({ message: "Role created successfully", data: roleData });
  } catch (error) {
    next(error);
  }
};

export const getAllRole: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allRoles: Role[] = await Role.findAll();
    return res
      .status(200)
      .json({ message: "Role fetch successfully", data: allRoles });
  } catch (error) {
    next(error);
  }
};

export const getRoleById: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const roleData: Role | null = await Role.findByPk(id);
    if (!roleData) {
      customError("Role not found...", 404);
    }
    return res
      .status(200)
      .json({ message: "Role fetched successfully", data: roleData });
  } catch (error) {
    next(error);
  }
};
export const deleteRole: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedRole: Role | null = await Role.findByPk(id);
    if(!deletedRole){
        customError("Role not found...", 404);
    }
    await Role.destroy({ where: { id } });
    return res
      .status(200)
      .json({ message: "Role deleted successfully", data: deletedRole });
  } catch (error) {
    next(error);
  }
};


