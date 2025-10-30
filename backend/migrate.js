import { createDatabase } from './migrations/createDatabase.js';
import { up, down } from './migrations/001_create_tables.js';
import { seedData } from './migrations/002_seed_data.js';

async function runMigrations() {
  console.log('🚀 Iniciando migraciones...\n');
  
  const dbCreated = await createDatabase();
  if (!dbCreated) {
    console.error('No se pudo crear la base de datos. Abortando...');
    process.exit(1);
  }
  
  const tablesCreated = await up();
  if (!tablesCreated) {
    console.error('No se pudieron crear las tablas. Abortando...');
    process.exit(1);
  }
  
  await seedData();
  
  console.log('\n✅ Migraciones completadas exitosamente!');
  process.exit(0);
}

async function rollbackMigrations() {
  console.log('🔄 Revirtiendo migraciones...\n');
  
  const rolledBack = await down();
  if (rolledBack) {
    console.log('\n✅ Rollback completado exitosamente!');
  } else {
    console.error('\n❌ Error en el rollback');
  }
  
  process.exit(0);
}

const command = process.argv[2];

if (command === 'up' || !command) {
  await runMigrations();
} else if (command === 'down') {
  await rollbackMigrations();
} else {
  console.log('Uso: node migrate.js [up|down]');
  process.exit(1);
}