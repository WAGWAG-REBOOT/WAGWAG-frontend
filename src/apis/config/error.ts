import { BaseResponse } from "@/types/core";
import { ApiError } from "@/types/core/error";

export async function handleApiError({
  body,
  status,
  url,
}: {
  body: BaseResponse<null>;
  status: number;
  url: string;
}): Promise<never> {
  // 50x
  if (status >= 500) {
    throw new ApiError({
      timestamp: new Date().toISOString(),
      status: status,
      error: "서버에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
      path: url,
    });
  }

  throw new ApiError({
    timestamp: new Date().toISOString(),
    status: status,
    error: body.message || "서버에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
    path: url,
  });
}
