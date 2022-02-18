import { DATABASE_CONNECTION } from "../user/user.providers";
import { createConnection } from "typeorm";

export const databaseProviders = [
    {
        provide: DATABASE_CONNECTION,
        useFactory: async () => await createConnection({
            type: 'postgres',
            host: process.env.POSTGRES_HOST as string,
            port: parseInt(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER as string,
            password: process.env.POSTGRES_PASSWORD as string,
            database: process.env.POSTGRES_DATABASE as string,
            entities: [
                __dirname + '/../**/*.entity{.ts,.js}'
            ],
            synchronize: true
        })
    }
]