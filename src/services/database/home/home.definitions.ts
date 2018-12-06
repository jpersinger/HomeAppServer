export interface Message {
  id: string;
  creator: string;
  message: string;
  created: string;
  parentMessage?: string;
}
