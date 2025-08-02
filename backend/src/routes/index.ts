import { Router } from "express";
import userRouter from "./user-routes";
import chatRouter from "./chat-routes";
const appRouter = Router();

appRouter.use("/api/v1/user", userRouter);
appRouter.use("/api/v1/chat", chatRouter);
export default appRouter;
