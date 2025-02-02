import { AccountService } from "./account-service";

export function makeAccountService() {
  return new AccountService();
}