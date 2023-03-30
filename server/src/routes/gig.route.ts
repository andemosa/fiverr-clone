import express from "express";

import gigCtrl from "../controllers/gig.controller";

import { verifyToken } from "../middleware/jwt";
import validate from "../middleware/validateResource";

import { CreateGigSchema } from "../schema/gig.schema";

const gigRouter = express.Router();

gigRouter.post("/", verifyToken, validate(CreateGigSchema), gigCtrl.createGig);
gigRouter.get("/", gigCtrl.getGigs);

gigRouter.get("/:id", gigCtrl.getGig);
gigRouter.delete("/:id", verifyToken, gigCtrl.deleteGig);

export default gigRouter;
