import { AxiosError } from "axios";
import { User } from "./User";

export type AuthContextType = {
  user: User | undefined;
  isPending: boolean;
  isError: boolean;
  error: AxiosError | null;
  token: string | null;
  updateToken: (token: string) => void;
  logout: () => void;
};
