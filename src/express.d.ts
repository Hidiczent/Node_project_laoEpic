// express.d.ts
declare namespace Express {
  export interface Request {
    user?: {
      user_id: number;
      role: "user" | "admin";
    };
  }
  }
  