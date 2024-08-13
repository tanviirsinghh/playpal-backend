const UserModel = require('../model/user')
const reply = require('../helper/reply')
const lang = require('../language/en')
const { generateToken } = require('../services/JWT')
const Lang = require('../language/en')
const { generateOTP, verifyOTP } = require('../helper/index')
const SendMail = require('../services/mail')
const Bcrypt = require('bcrypt')

const { z } = require('zod')
const oAuthModel = require('../model/oAuth')
// const signInSchema = require("../config");
// const signUpSchema = require("../config");

const signUpSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  userName: z.string(),
  email: z.string().email(),
  phoneNumber: z.number(),
  address: z.string(),
  password: z.string().min(6)
})

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

const login = async (req, res) => {
  const { password, email } = req.body

  const { success } = signInSchema.safeParse({ email, password })
  if (!success) {
    res.status(411)
    return res.json({
      message: 'Input not correct'
    })
  }
  try {
    const user = await UserModel.findOne({ email })
    if (!user) {
      return res.status(200).json(reply.failure(lang.LOGIN_NOTFOUND))
    }
    const isMatch = await Bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.json(reply.failure(lang.PASSWORD_NOTFOUND))
    }

    const module = await generateOTP(user._id, 'otp for login')

    await SendMail(user.email, 'opt', 'Otp for login ' + module.otp)

    const token = generateToken(user)
    return res.status(200).json(reply.success(Lang.LOGIN_SUCCESS, { token }))
  } catch (err) {
    return res.json(reply.failure(err.message))
  }
}

const Register = async (req, res) => {
  const {
    firstName,
    lastName,
    userName,
    email,
    phoneNumber,
    address,
    password
  } = req.body
  const { success } = signUpSchema.safeParse({
    firstName,
    lastName,
    userName,
    email,
    phoneNumber,
    address,
    password
  })
  if (!success) {
    res.status(411)
    return res.json({
      message: 'Input not correct'
    })
  }

  const encypted_password = await Bcrypt.hash(password, saltRounds)

  // try {
  //     if (await ExistUser(email)) {
  //         return res.status(200).json(reply.failure(lang.REGISTER_EMAIL_ALREADY))
  //     }

  // } catch (err) { return res.status(402).json(reply.failure(err.message,)); }
  try {
    const user = new UserModel({
      firstName,
      lastName,
      userName,
      email,
      phoneNumber,
      address,
      password: encypted_password
    })
    user.save()

    const module = await generateOTP(user._id, 'registered by ')
    await SendMail(user.email, 'opt', 'your otp is ' + module)

    const token = generateToken(user)

    return res.status(200).json(reply.success(Lang.LOGIN_SUCCESS, { token }))
  } catch (err) {
    return res.json(err)
  }
}

const handleOTpverification = async (req, res) => {
  const { otp } = req.body
  const isverified = await verifyOTP(req.user._id, otp)

  if (!isverified) {
    return res.send(false)
  }
  const user = await UserModel.findOne({ _id: req.user._id })

  const token = generateToken(user)

  return res.json({
    status: true,
    data: {
      token
    }
  })
}

const handleforgot = async (req, res) => {
  const value = req.body
  const changepassword = await UserModel.findOne({ email: value })
  const module = await generateOTP(
    changepassword._id,
    'otp for forgottn password '
  )
  await SendMail(user.email, 'opt', 'your otp is ' + module)
  return res.json(changepassword)
}

const oAuthLogin = async (req, res) => {
  console.log('bakcend hit')
  const {
    id,
    email,
    given_name,
    family_name,
    name
    // picture
  } = req.body
  try {
    const user = await new oAuthModel({
      id, 
      email,
       given_name, 
       family_name,
        name, 
    })
    user.save()
    const token = await generateToken(user)
    console.log(token)
    return res.status(200).json(reply.success(Lang.LOGIN_SUCCESS, { token }))
  } catch (err) {
    return res.json(err)
  }
}

module.exports = {
  login,
  Register,
  handleOTpverification,
  handleforgot,
  oAuthLogin
}
