const postError = {
  type01: { code: 404, message: 'Post does not exist' },
  type02: { code: 401, message: 'Unauthorized user' },
  type03: { code: 400, message: 'one or more "categoryIds" not found' },
  type04: { code: 500, message: 'Please contact the support team' },
};

const userError = {
  type01: { code: 404, message: 'User does not exist' },
  type02: { code: 409, message: 'User already registered' },
  type03: { code: 401, message: 'Unauthorized user' }, 
  type04: { code: 500, message: 'Please contact the support team' },
};

const categoryError = {
  type01: { code: 404, message: 'Categoty not found' },
  type02: { code: 401, message: 'Unauthorized user' }, 
  type03: { code: 500, message: 'Please contact the support team' },
};

const loginError = {
  type01: { code: 400, message: 'Invalid fields' },
  type02: { code: 401, message: 'Token not found' }, 
  type03: { code: 500, message: 'Please contact the support team' },
};
module.exports = {
  postError,
  userError,
  categoryError,
  loginError,
};
