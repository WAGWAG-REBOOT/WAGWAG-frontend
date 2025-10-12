export class ApiError extends Error {
  constructor(response: { timestamp: string; status: number; error: string; path: string }) {
    super(response.error || "API Error");
    this.name = "ApiError";
    this.response = response;
  }

  readonly response: {
    timestamp: string;
    status: number;
    error: string;
    path: string;
  };
}
