import { BaseResponse } from "@/types/core";
import { Example } from "@/types/entities";
import { ExampleParams } from "@/types/params";
import { ExampleForm } from "@/types/schemas";

import { fetchInstance } from "./config";

interface GetExampleRequest {
  params: ExampleParams;
  accessToken: string;
}

export const getExample = async ({
  params,
  accessToken,
}: GetExampleRequest): Promise<BaseResponse<Example>> => {
  const { id, name } = params;
  const queryParams = new URLSearchParams();
  queryParams.set("name", name);

  // path params, query params로 url 설정
  const url = `/api/example/${id}?${queryParams.toString()}`;

  const response = await fetchInstance(
    url,
    {
      method: "GET",
    },
    accessToken,
  );
  return response.json();
};

interface PostExampleRequest {
  body: ExampleForm;
  accessToken: string;
}

export const postExample = async ({
  body,
  accessToken,
}: PostExampleRequest): Promise<BaseResponse<Example>> => {
  const response = await fetchInstance(
    "/api/example",
    {
      method: "POST",
      body: JSON.stringify(body),
    },
    accessToken,
  );
  return response.json();
};
