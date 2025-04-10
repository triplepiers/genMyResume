import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = join(dirname(fileURLToPath(import.meta.url)), '../data');
const user_db_file = join(__dirname, 'Users.json');
const head_db_file = join(__dirname, 'Head.json');
const edu_db_file  = join(__dirname, 'Education.json');
const work_db_file = join(__dirname, 'Work.json')

export {
    user_db_file,
    head_db_file,
    edu_db_file,
    work_db_file
}