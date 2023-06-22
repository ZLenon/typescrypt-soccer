export type Msg = { message: string };
type ErrorType = 'INVALID_DATA' | 'UNAUTHORIZED' | 'NOT_FOUND' | 'CONFLICT';
type ServiceResError = {
  type: ErrorType,
  data: Msg
};

type ServiceResSuccess<T> = {
  type: 'SUCCESS',
  data: T
};

export type ServiceRes<T> = ServiceResError | ServiceResSuccess<T>;
