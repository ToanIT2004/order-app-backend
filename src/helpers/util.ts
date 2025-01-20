const bcrypt = require('bcrypt');
const saltRounds = 10;

export const hashPassword = (password: string) => {
   return bcrypt.hashSync(password, saltRounds);
}

export const comparePassword = (password: string, hash: string) => {
   return bcrypt.compareSync(password, hash);
}
