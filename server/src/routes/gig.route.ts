import express from "express";

import gigCtrl from "../controllers/gig.controller";

import { verifyToken } from "../middleware/jwt";
import validate from "../middleware/validateResource";

import { CreateGigSchema } from "../schema/gig.schema";

const gigRouter = express.Router();

gigRouter.post("/", verifyToken, validate(CreateGigSchema), gigCtrl.createGig);
gigRouter.get("/:id", gigCtrl.getGig);
gigRouter.delete("/:id", gigCtrl.deleteGig);

export default gigRouter;
