import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = join(dirname(fileURLToPath(import.meta.url)), '../data');
const user_db_file = join(__dirname, 'Users.json');
const head_db_file = join(__dirname, 'Head.json');
const edu_db_file  = join(__dirname, 'Education.json');
const work_db_file = join(__dirname, 'Work.json');
const more_db_file = join(__dirname, 'More.json');
const ss_db_file = join(__dirname, 'SelfStatement.json');
const tp_db_file = join(__dirname, 'Template.json');
const job_db_files = {
    rec_db_file: join(__dirname, 'JobRec.json'),
    detail_db_file: join(__dirname, 'jobDetail.json'),
    req_db_file: join(__dirname, 'jobReqs.json')
}

export {
    user_db_file,
    head_db_file,
    edu_db_file,
    work_db_file,
    more_db_file,
    ss_db_file,
    tp_db_file,
    job_db_files
}