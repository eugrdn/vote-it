type ErrorInfo = {
  title: string;
  detail?: string;
  payload?: object;
  code?: ErrorCode | string;
  type?: string;
};

enum ErrorCode {
  FirebaseError = 10001,
  FingerprintError = 10002,
  ConflictLoginError = 10003,
}

export class AppError extends Error {
  constructor(private info: ErrorInfo) {
    super(info.title);

    Error.stackTraceLimit = 3;
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;

    Object.setPrototypeOf(this, AppError.prototype);
  }

  get title() {
    return this.info.title;
  }

  set title(title) {
    this.info.title = title;
  }

  get code() {
    return this.info.code;
  }

  set code(code) {
    this.info.code = code;
  }

  get type() {
    return this.info.type;
  }

  set type(type) {
    this.info.type = type;
  }

  get payload() {
    return this.info.payload;
  }

  set payload(payload) {
    this.info.payload = payload;
  }

  get detail() {
    return this.info.detail;
  }

  set detail(detail) {
    this.info.detail = detail;
  }

  toString(): string {
    return JSON.stringify(
      {
        title: this.title,
        detail: this.detail,
        payload: this.payload,
        code: this.code,
        type: this.type,
      },
      null,
      2,
    );
  }
}

export class FirebaseValidationError extends AppError {
  constructor(title: string, detail: string, code: ErrorCode | string) {
    super({
      title,
      detail,
      code,
      type: ErrorCode[ErrorCode.FirebaseError],
    });
    Object.setPrototypeOf(this, FirebaseValidationError.prototype);
  }
}

export class FingerprintError extends AppError {
  constructor(title: string, detail: string) {
    super({
      title,
      detail,
      code: ErrorCode.FingerprintError,
      type: ErrorCode[ErrorCode.FingerprintError],
    });
    Object.setPrototypeOf(this, FingerprintError.prototype);
  }
}

// TODO
export class ConflictLoginError extends AppError {
  constructor(title: string, detail: string) {
    super({
      title,
      detail,
      code: ErrorCode.ConflictLoginError,
      type: ErrorCode[ErrorCode.ConflictLoginError],
    });
    Object.setPrototypeOf(this, ConflictLoginError.prototype);
  }
}
