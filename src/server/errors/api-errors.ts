export class BaseApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class AuthenticationError extends BaseApiError {
  constructor(message: string = "Неправильний email або пароль.") {
    super(message);
  }
}

export class InternalServerError extends BaseApiError {
  constructor(message: string = "Внутрішня помилка сервера.") {
    super(message);
  }
}
