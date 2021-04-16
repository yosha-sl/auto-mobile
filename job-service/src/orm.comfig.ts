import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const ormConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    username: 'root',
    password: 'root',
    port: 5432,
    host: '127.0.0.1',
    database: 'automobile',
    synchronize: true,
    entities: ["dist/**/*.entity{.ts,.js}"]
}