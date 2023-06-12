import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'srg@codeserg.io',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Joe Smith',
    email: 'joe@codeserg.io',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
  {
    name: 'Anna Smith',
    email: 'anna@codeserg.io',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  }
];

export default users;