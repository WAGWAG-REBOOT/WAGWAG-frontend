import type { BaseResponse } from "@/types/core";

import { handleApiError } from "./error";

const BASE_URL = "https://api.wagwag.com";

const createInstance = (baseURL: string, defaultOptions?: RequestInit) => {
  return async (url: string, options?: RequestInit, accessToken?: string) => {
    // 서버 사이드에서는 accessToken을 매개변수로 받아야 함
    // 클라이언트 사이드에서는 localStorage에서 가져올 수 있음
    let token = accessToken;

    // 클라이언트 사이드이고 accessToken이 없으면 localStorage에서 가져오기
    if (typeof window !== "undefined" && !token) {
      token = localStorage.getItem("accessToken") || undefined;
    }

    const body = options?.body;
    const isFormData = body instanceof FormData;
    // formData인지 확인 후, Content-Type 헤더 부착
    // WHY: formData일 때는 브라우저가 자동 설정

    // accessToken 필요하나 없으면 redirect
    // if (cookies && !accessToken) {
    // 	return redirect(302, "/auth/signin");
    // }

    const requestOptions: RequestInit = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions?.headers,
        ...options?.headers,
        ...(!isFormData && { "Content-Type": "application/json" }),
        Authorization: `Bearer ${token ? token : ""}`,
      },
    };

    const cleanUrl = url.startsWith("/") ? url.slice(1) : url;
    const cleanBaseURL = baseURL.endsWith("/") ? baseURL : baseURL + "/";
    const requestUrl = new URL(cleanUrl, cleanBaseURL).toString();

    const response = await fetch(requestUrl, requestOptions);

    if (!response.ok) {
      const status = response.status;
      const url = response.url;
      const body = (await response.json()) as BaseResponse<null>;
      console.error("❌ API 에러:", { body, status, url });

      await handleApiError({ body, status, url });
    }

    return response;
  };
};

export const fetchInstance = createInstance(BASE_URL);
