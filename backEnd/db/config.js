import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = join(dirname(fileURLToPath(import.meta.url)), '../data');
const user_db_file = join(__dirname, 'Users.json');

export {
    user_db_file
}