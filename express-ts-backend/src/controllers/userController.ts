import { Request, Response } from "express";
import pool from "../config/db";
import { User } from "../validation/userValidation";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, age }: User = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *",
      [name, email, age]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: (error as { errors: unknown[] }).errors });
  }
};
