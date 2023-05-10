import { RequestHandler, Request, Response, NextFunction } from "express";
import { Category } from "../modal/CategoryModal";
import { customError } from "../helper/responseHelper";
import { Post } from "../modal/PostModal";

export const createCategory: RequestHandler = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    var categoryData = await Category.create({
      title: req.body.title,
      description: req.body.description,
    });

    return res
      .status(200)
      .json({ message: "Category created successfully", data: categoryData });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedCategory: Category | null = await Category.findByPk(id);
    if (!deletedCategory) {
      customError("Category not found...", 404);
    }
    await Category.destroy({ where: { id } });
    return res
      .status(200)
      .json({
        message: "Category deleted successfully",
        data: deletedCategory,
      });
  } catch (error) {
    next(error);
  }
};

export const getAllCategory: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allCategorys: Category[] = await Category.findAll({
      // include:[
      //     {
      //         model: Product,
      //         attributes:['id','title']
      //       }
      // ]
    });
    return res
      .status(200)
      .json({ message: "Category fetched successfully", data: allCategorys });
  } catch (error) {
    next(error);
  }
};
