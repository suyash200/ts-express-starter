import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { users } from "../models/users.models";
import { ServiceFunctionReturn } from "../types/uit.types";
import { GenericRepository } from "../util/CommonRepository";
import constants from "../constants";
import { getFindQuery } from "../util/misc.util";

const userRep = new GenericRepository(users);

export const addUsersService = async (
  dbCon: NodePgDatabase,
  reqBody: any,
): Promise<ServiceFunctionReturn> => {
  try {
    const addUser = await userRep.addEntity(dbCon, { ...reqBody.body });
    if (addUser) {
      return {
        success: true,
        statusCode: constants.responseConstants.Created.code,
        message: `${constants.responseConstants.Created.message} User`,
      };
    }

    return {
      success: true,
      statusCode: constants.responseConstants.ServerError.code,
      message: `${constants.responseConstants.ServerError.message} User not created`,
    };
  } catch (error) {
    return {
      success: true,
      statusCode: constants.responseConstants.ServerError.code,
      message: `${constants.responseConstants.ServerError.message} User not created`,
    };
  }
};

export async function updateUserService(
  dbCon: NodePgDatabase,
  reqBody: any & { userId: number },
) {
  try {
    const findQuery = getFindQuery(users.id, reqBody.params.userId);
    const updateUser = await userRep.updateEntity(
      dbCon,
      findQuery,
      reqBody.body,
    );
    console.log("the updated useds", updateUser);
    if (updateUser) {
      return {
        success: true,
        statusCode: constants.responseConstants.Ok.code,
        message: `${constants.responseConstants.Ok.message} User updated`,
      };
    }

    return {
      success: false,
      statusCode: constants.responseConstants.ServerError.code,
      message: `${constants.responseConstants.ServerError.message} User not updated`,
    };
  } catch (error: any | Error) {
    reqBody.logger.error({
      message: "error due to something",
      err: new Error(error),
    });
    return {
      success: false,
      statusCode: constants.responseConstants.ServerError.code,
      message: `${constants.responseConstants.ServerError.message} User not updated`,
    };
  }
}

export async function deleteUserService(dbCon: NodePgDatabase, reqBody: any) {
  try {
    const findQuery = getFindQuery(users.id, reqBody.params.userId);
    const updateUser = await userRep.deleteEntity(dbCon, findQuery);
    if (updateUser) {
      return {
        success: true,
        statusCode: constants.responseConstants.Ok.code,
        message: `${constants.responseConstants.Ok.message} User deleted`,
      };
    }

    return {
      success: false,
      statusCode: constants.responseConstants.ServerError.code,
      message: `${constants.responseConstants.ServerError.message} User not deleted`,
    };
  } catch (error: any | Error) {
    reqBody.log.error({
      message: `error in user deletion due to :${error}`,
      error: new Error(error),
    });
    return {
      success: false,
      statusCode: constants.responseConstants.ServerError.code,
      message: `${constants.responseConstants.ServerError.message} User not deleted`,
    };
  }
}

export async function getUserService(
  dbCon: NodePgDatabase,
  reqBody: any & { userId: string },
) {
  try {
    const findQuery = getFindQuery(users.id, reqBody.params.userId);
    const fetchUsers = await userRep.getEntity(dbCon, findQuery);
    console.log(fetchUsers[0].deleted !== true);
    if (fetchUsers.length !== 0 && fetchUsers[0].deleted === false) {
      return {
        success: true,
        statusCode: constants.responseConstants.Ok.code,
        message: `${constants.responseConstants.Ok.message} User fetched`,
        data: fetchUsers,
      };
    }

    return {
      success: false,
      statusCode: constants.responseConstants.NotFound.code,
      message: `${constants.responseConstants.NotFound.message} User not found`,
    };
  } catch (error: any | Error) {
    reqBody.log.error({
      message: "error in select users",
      error: new Error(error.message),
    });
    return {
      success: false,
      statusCode: constants.responseConstants.ServerError.code,
      message: `${constants.responseConstants.ServerError.message} server Error`,
    };
  }
}
