import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import { Pool } from "pg";
import * as jwt from "jsonwebtoken";

interface DatabaseSecret {
  host: string;
  port: number;
  dbname: string;
  username: string;
  password: string;
}

let dbPool: Pool | null = null;
const secretsManager = new SecretsManagerClient({ region: "us-east-1" });

async function getDbConnection(): Promise<Pool> {
  if (!dbPool) {
    console.log("Creating new database connection pool...");
    let secret: DatabaseSecret;
    if (process.env.NODE_ENV === "local") {
      secret = {
        host: "host.docker.internal",
        port: 5435,
        dbname: "brightboost",
        username: "postgres",
        password: "brightboostpass",
      };
    } else {
      const secretArn = process.env.DATABASE_SECRET_ARN;
      if (!secretArn) {
        throw new Error("DATABASE_SECRET_ARN environment variable not set");
      }

      console.log("Fetching database secret from Secrets Manager...");
      const command = new GetSecretValueCommand({ SecretId: secretArn });
      const secretResult = await secretsManager.send(command);
      if (!secretResult.SecretString) {
        throw new Error("Failed to retrieve database secret");
      }

      secret = JSON.parse(secretResult.SecretString);
    }
    console.log(
      `Database config: host=${secret.host}, port=${secret.port}, dbname=${secret.dbname}`,
    );

    dbPool = new Pool({
      host: secret.host,
      port: secret.port,
      database: secret.dbname,
      user: secret.username,
      password: secret.password,
      ssl:
        process.env.NODE_ENV === "local"
          ? false
          : {
              rejectUnauthorized: false,
            },
      max: 5,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 25000,
    });

    console.log("Database pool created, testing connection...");
    try {
      const testClient = await dbPool.connect();
      console.log("Database connection test successful");
      testClient.release();
    } catch (error) {
      console.error("Database connection test failed:", error);
      throw error;
    }
  }

  return dbPool;
}

export const handler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin":
      "https://brave-bay-0bfacc110-production.centralus.6.azurestaticapps.net",
    "Access-Control-Allow-Headers": "Content-Type,Authorization,x-api-key",
    "Access-Control-Allow-Methods": "GET,OPTIONS",
  };

  console.log(
    "Student dashboard Lambda function started, event:",
    JSON.stringify(event, null, 2),
  );

  try {
    if (event.httpMethod === "OPTIONS") {
      return {
        statusCode: 200,
        headers,
        body: "",
      };
    }

    const authHeader =
      event.headers.Authorization || event.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: "Missing Authentication Token" }),
      };
    }

    const token = authHeader.substring(7);
    const jwtSecret = process.env.JWT_SECRET || "fallback-secret-key";

    let decoded;
    try {
      decoded = jwt.verify(token, jwtSecret) as any;
    } catch (err) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: "Session expired" }),
      };
    }

    if (decoded.role !== "STUDENT") {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({ error: "Dashboard unavailable, please retry." }),
      };
    }

    console.log("Attempting database connection...");
    const db = await getDbConnection();
    console.log("Database connection established successfully");

    const dashboardData = {
      message: `Welcome back, ${decoded.name}!`,
      courses: [
        {
          id: "course-1",
          name: "Math 101",
          grade: "A",
          teacher: "Ms. Johnson",
        },
        {
          id: "course-2",
          name: "Science 202",
          grade: "B+",
          teacher: "Mr. Smith",
        },
      ],
      assignments: [
        {
          id: "assignment-1",
          title: "Math Homework",
          dueDate: "2024-01-15",
          status: "pending",
        },
        {
          id: "assignment-2",
          title: "Science Project",
          dueDate: "2024-01-10",
          status: "completed",
        },
      ],
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(dashboardData),
    };
  } catch (error) {
    console.error("Student dashboard error:", error);

    if (error instanceof Error) {
      if (error.message.includes("connection")) {
        return {
          statusCode: 503,
          headers,
          body: JSON.stringify({ error: "Database connection error" }),
        };
      }
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Internal server error",
        message:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : undefined,
      }),
    };
  }
};
