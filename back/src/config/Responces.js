export class AppSuccess {
  constructor(data) {
    this.status = "success";
    this.data = data;
  }
}
export class AppFail {
  constructor(message) {
    this.status = "fail";
    this.message = message;
  }
}
export class AppError {
  constructor(message) {
    this.status = "error";
    this.message = message;
  }
}
