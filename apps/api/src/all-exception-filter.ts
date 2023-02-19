import {ApolloError} from "apollo-server-express";
import {Catch, ExceptionFilter} from "@nestjs/common";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(error) {
    console.error('AllExceptionFilter', error);
    if (error instanceof ApolloError) {
      throw error;
    }
  }
}
