

import type { Request, Response } from "express";
import { issueService } from "./issue.service";
import sendResponse from "../../middleware/utils/sendRseponse";





// create issue
const createIssue = async (req: Request, res: Response) => {
  const reporter_id = req.user.id;

  try {
    const result = await issueService.createIssueDB(
      req.body,
      reporter_id
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Issue created successfully",
      data: result,

    });
  } catch (error) {
    if (error instanceof Error) {
      sendResponse(res, {
        statusCode: 500,
        success: false,
        message: error.message,
        error: error
      });
    }

  }
};



//all issues
const getAllIssues = async (req: Request, res: Response) => {

  try {
    const result = await issueService.getIssuesDB(
      req.query
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      data: result,

    });
  } catch (error) {
    if (error instanceof Error) {
      sendResponse(res, {
        statusCode: 500,
        success: false,
        message: error.message,
        error: error
      });
    }

  }
};



// single issue
const getSingleIssue = async (req: Request, res: Response) => {

  try {
    const result = await issueService.getSingleDB(
      Number(req.params.id)
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error instanceof Error) {
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: error.message,
        error: error
      });
    }

  }
};



// update issue
const updateIssue = async (req: Request, res: Response) => {

  const user = req.user;
  // const id=req.params.id

  try {
    const result = await issueService.updateIssueDB(
      Number(req.params.id),
      req.body,
      user
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue updated successfully",
      data: result

    });
  } catch (error) {
    if (error instanceof Error) {
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: error.message,
        error: error
      });
    }
  }
};



// delete issue
const deleteIssue = async (req: Request, res: Response) => {


  try {
    const user = req.user;
    await issueService.deleteIssueDB(
      Number(req.params.id),
      user
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue deleted successfully",

    });
  } catch (error) {
    if (error instanceof Error) {
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: error.message,
        error: error
      });
    }
  }
};

export const issueController = {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue
}