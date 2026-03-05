import { JwtModuleAsyncOptions } from "@nestjs/jwt";

export const jwtModuleOptions = (): JwtModuleAsyncOptions => ({
  inject: [],
  useFactory: async () => ({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: "1d" },
  }),
});
