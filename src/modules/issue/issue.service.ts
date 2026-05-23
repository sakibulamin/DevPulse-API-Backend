import { pool } from "../../dataBase";




// issue create
export const createIssueDB = async (
  payload: any,
  reporter_id: number
) => {

  const { title, description, type } = payload;

  const result = await pool.query(
    `
    INSERT INTO issues( title, description,type,reporter_id)VALUES($1,$2,$3,$4)
    RETURNING *
    `,
    [title, description, type, reporter_id]
  );

  return result.rows[0];

};




// all issues
export const getIssuesDB = async (
  query: any
) => {

  let sql = `SELECT * FROM issues`;

  const conditions = [];

  const values = [];

  if (query.type) {

    values.push(query.type);

    conditions.push(
      `type = $${values.length}`
    );
  }

  if (query.status) {

    values.push(query.status);

    conditions.push(
      `status = $${values.length}`
    );
  }

  if (conditions.length > 0) {

    sql += ` WHERE ` + conditions.join(" AND ");
  }

  if (query.sort === "oldest") {

    sql += ` ORDER BY created_at ASC`;

  } else {

    sql += ` ORDER BY created_at DESC`;
  }

  const result = await pool.query(
    sql, values
  );

  const issues = result.rows;


  for (const issue of issues) {

    const userResult = await pool.query(`
      SELECT id,name,role FROM users WHERE id = $1
      `, [issue.reporter_id]);

    issue.reporter = userResult.rows[0];

    delete issue.reporter_id;

  }

  return issues;
};




//single issue
export const getSingleDB = async (id: number) => {

  const result = await pool.query(
    `SELECT * FROM issues WHERE id = $1`, [id]);

  const issue = result.rows[0];

  if (!issue) {
    throw new Error("Issue not found");
  }

  const userResult = await pool.query(
    `SELECT id,name,role FROM users WHERE id = $1`,
    [issue.reporter_id]
  );

  const { reporter_id, created_at, updated_at, ...rest } = issue;

  return {
    ...rest,
    reporter: userResult.rows[0],
    created_at,
    updated_at
  };
};


// update issue
export const updateIssueDB = async (
  id: number,
  payload: any,
  user: any
) => {

  const issueResult = await pool.query(`
    SELECT * FROM issues WHERE id = $1
    `, [id]);

  const issue = issueResult.rows[0];

  if (!issue) {

    throw new Error("Issue not found");
  }

  if (user.role === "maintainer") {

    const result = await pool.query(
      `
      UPDATE issues SET title = $1, description = $2, type = $3,status=$4, updated_at = NOW() WHERE id = $5 RETURNING *
      `,
      [
        payload.title, payload.description, payload.type, payload.status, id]
    );

    return result.rows[0];
  }


  if (
    user.role === "contributor" &&
    issue.reporter_id === user.id &&
    issue.status === "open"
  ) {

    const result = await pool.query(`
      UPDATE issues SET title = $1, description = $2, type = $3,status=$4, updated_at = NOW() WHERE id = $4 RETURNING * `,
      [payload.title, payload.description, payload.type, payload.status, id]
    );

    return result.rows[0];
  }

  throw new Error(
    "You are not authorized"
  );
};


// delete issue
export const deleteIssueDB = async (id: number, user: any) => {

  if (user.role !== "maintainer") {

    throw new Error(
      "Only maintainer can delete issue"
    );
  }


  const issueResult = await pool.query(`
    DELETE FROM issues WHERE id = $1
    `, [id]);

  const issue = issueResult.rows[0];

  if (!issue) {

    throw new Error("Issue not found");
  }
};

export const issueService = {
  createIssueDB,
  getIssuesDB,
  getSingleDB,
  updateIssueDB,
  deleteIssueDB
}