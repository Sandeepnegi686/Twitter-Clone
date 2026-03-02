import "express";

declare global {
  namespace Express {
    interface Request {
      files: {
        profileImage?: Express.Multer.File[];
        coverImage?: Express.Multer.File[];
      };
      user?: {
        _id: string;
        email: string;
        name: string;
      };
    }
  }
}
