
export type User = {
    id: String;
    name: String;
    imageUri: String;
    status: String;
  }
  
export type Message = {
    id: String;
    content: string;
    createdAt: string;
    user: User;
  }

export interface ChatRoom  {
    id: String;
    users: User[];
    lastMessage: Message;
  }
  