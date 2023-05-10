import { RequestHandler, Request, Response, NextFunction } from "express";
import { Post } from "../modal/PostModal";
import { customError } from "../helper/responseHelper";
import { Review } from "../modal/ReviewModal";

export const createPost: RequestHandler = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    var postData = await Post.create({
      title: req.body.title,
      description: req.body.description,
      image: req.file?.path,
      createdBy: user.id,
      categortId: req.body.categoryId
    });
    return res
      .status(200)
      .json({ message: "Post created successfully", data: postData });
  } catch (error) {
    next(error);
  }
};

export const getAllPost: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allPosts: Post[] = await Post.findAll({
        include: [
        {
          model: Review,
        },
      ]});
    return res
      .status(200)
      .json({ message: "Posts fetch successfully", data: allPosts });
  } catch (error) {
    next(error);
  }
};

export const getPostById: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const postData: Post | null = await Post.findByPk(id);
    if (!postData) {
      customError("Post not found...", 404);
    }
    return res
      .status(200)
      .json({ message: "Post fetched successfully", data: postData });
  } catch (error) {
    next(error);
  }
};
export const deletePost: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedPost: Post | null = await Post.findByPk(id);
    if (!deletedPost) {
      customError("Post not found...", 404);
    }
    await Post.destroy({ where: { id } });
    return res
      .status(200)
      .json({ message: "Post deleted successfully", data: deletedPost });
  } catch (error) {
    next(error);
  }
};
