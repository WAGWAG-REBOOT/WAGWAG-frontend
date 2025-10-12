/**
 * 제네릭 T로 엔티티를 감쌀 수 있도록 구성
 */
export interface BaseResponse<T = unknown> {
  success?: boolean;
  message?: string;
  data?: T;
}
