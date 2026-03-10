import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

// Carga las variables de entorno desde el archivo .env
config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DB_URL,
  // Ruta donde TypeORM buscará las entidades
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  // synchronize debe ser false en producción siempre, pero true es útil para pruebas iniciales
  synchronize: true,
};

// Exportamos el DataSource configurado (Muy útil también para TypeORM CLI en el futuro)
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
