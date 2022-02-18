import { Module } from "@nestjs/common";
import { GqlModuleAsyncOptions, GqlModuleOptions, GraphQLModule } from "@nestjs/graphql";
import { DatabaseModule } from "src/database/database.module";
import { userProviders } from "./user.providers";
import { UsersResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
    imports: [
        DatabaseModule,
        GraphQLModule.forRootAsync({
            useFactory: () => {
                const schemaModuleOptions: Partial<GqlModuleOptions> = {};

                if (process.env.NODE_ENV !== 'production' || process.env.IS_OFFLINE) {
                    schemaModuleOptions.autoSchemaFile = 'src/user/user.schema.gql';
                } else {
                    schemaModuleOptions.typePaths = ['*.gql'];
                }

                return {
                    context: ({ req }) => ({ req }),
                    useGlobalPrefix: true,
                    playground: true,
                    introspection: true,
                    ...schemaModuleOptions,
                };
            }
        } as GqlModuleAsyncOptions),
    ],
    providers: [
        ...userProviders,
        UserService,
        UsersResolver,
    ],
})
export class UserModule { }