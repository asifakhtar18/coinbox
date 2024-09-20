import { z, ZodError, ZodSchema } from "zod";

const formatZodErrors = (
  errors: z.ZodError
): { field: string; message: string }[] => {
  return errors.errors.map((error) => ({
    field: error.path.join("."),
    message: error.message,
  }));
};

export const validateData = <T>(
  data: {},
  schema: ZodSchema<T>
): T | { field: string; message: string }[] => {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = formatZodErrors(error);
      return formattedErrors;
    }
    throw error;
  }
};
