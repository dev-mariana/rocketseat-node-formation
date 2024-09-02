import 'knex';

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string;
      session_id: string;
      name: string;
      email: string;
      created_at: string;
    };

    meals: {
      id: string;
      name: string;
      description: string;
      isDiet: boolean;
      user_id: string;
      date: number;
      datetime: string;
    };
  }
}
