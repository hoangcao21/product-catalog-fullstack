export interface StandardResponseBody<R = undefined> {
  readonly success: boolean;
  readonly result: R;
}

export interface PaginatedResponseBody<R> {
  readonly success: boolean;
  readonly result: R[];
  readonly nextCursor?: string;
}
