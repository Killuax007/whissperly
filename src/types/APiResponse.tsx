import { Message } from "@/models/User";

export interface ApiRespopnse {
  success: boolean;
  message: string;
  isAcceptingMessage?: boolean;
  messages?: Array<Message>;
}
