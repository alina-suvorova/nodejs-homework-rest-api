const authService = require('../../services/auth');
const { HTTP_STATUS_CODE } = require('../../libs/constants');
const registration = async (req, res) => {
  const user = await authService.create(req.body);
  return res.status(HTTP_STATUS_CODE.CREATED).json({
    status: 'success',
    code: HTTP_STATUS_CODE.CREATED,
    data: { ...user },
  });
};
const login = async (req, res) => {
  const token = await authService.login(req.body);
  return res.status(HTTP_STATUS_CODE.OK).json({
    status: 'success',
    code: HTTP_STATUS_CODE.OK,
    data: { token },
  });
};
const logout = async (req, res) => {
  await authService.logout(req.user.id);
  return res.status(HTTP_STATUS_CODE.NO_CONTENT).json();
};

const current = async (req, res, next) => {
  const user = await authService.getUserByToken(req, res, next);

  res.status(HTTP_STATUS_CODE.OK).json({
    status: "success",
    code: HTTP_STATUS_CODE.OK,
    data: { email: user.email, subscription: user.subscription },
  });
};

const verifyUser = async (req, res) => {
  const token = req.params.token
  const user = await authService.verifyUser(token)
  return res.status(HTTP_STATUS_CODE.OK).json({
    status: 'success',
    code: HTTP_STATUS_CODE.OK,
    data: {message: `User verified. Welcome ${user.name}`},
  })
}
const reverifyEmail = async (req, res) => {
  const { email } = req.body
  await authService.reverifyEmail(email)
  return res.status(HTTP_STATUS_CODE.OK).json({
    status: 'success',
    code: HTTP_STATUS_CODE.OK,
    data: {message: 'Success'},
  })
}

module.exports = { registration, login, logout, current, verifyUser, reverifyEmail  };
