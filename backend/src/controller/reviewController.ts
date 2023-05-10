import { RequestHandler, Request, Response, NextFunction } from "express";
import {Review} from "../modal/ReviewModal"
import { customError } from "../helper/responseHelper";

export const createReview: RequestHandler = async (req:any, res:Response, next:NextFunction) => {
    try {

        const user = req.user
        var ReviewData = await Review.create({
            comment:req.body.comment,
            postId: req.body.postId,
            userId: user.id
           });
          return res
            .status(200)
            .json({ message: "Review created successfully", data: ReviewData });
    } catch (error) {
        next(error)
    }
};

export const deleteReview: RequestHandler = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { id } = req.params;
        const deletedReview: Review | null = await Review.findByPk(id);
        if(!deletedReview){
            customError("Review not found...", 404);
        }
        await Review.destroy({ where: { id } });
        return res
          .status(200)
          .json({ message: "Review deleted successfully", data: deletedReview });
    } catch (error) {
        next(error)
    }

};

export const getAllReview: RequestHandler = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const allReviews: Review[] = await Review.findAll();
        return res
          .status(200)
          .json({ message: "Review fetched successfully", data: allReviews });
    } catch (error) {
        next(error)
    }
};

export const getReviewById: RequestHandler = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { id } = req.params;
        const ReviewData: Review | null = await Review.findByPk(id);
        if(!ReviewData){
            customError("Review not found...", 404);
        }
        return res
          .status(200)
          .json({ message: "Review fetched successfully", data: ReviewData }); 
    } catch (error) {
        next(error)
    }

};