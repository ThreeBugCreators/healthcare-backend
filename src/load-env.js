import path from 'path';
import dotenv from 'dotenv';

if (process.env.ENV === 'dev') {
    dotenv.config({ path: path.resolve(process.cwd(), '.local.env') });
}
