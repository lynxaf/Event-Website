const Participant = require('../../api/v1/participants/model');
const Events = require('../../api/v1/events/model');
const Orders = require('../../api/v1/orders/model');
const Payments = require('../../api/v1/payments/model');

const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require('../../errors');
const { createTokenParticipant, createJWT } = require('../../utils');

const { otpMail } = require('../mail');

const generateOtp = () => String(Math.floor(1000 + Math.random() * 9000));

const sanitizeParticipant = (participant) => {
  const sanitizedParticipant = participant.toObject();
  delete sanitizedParticipant.password;
  delete sanitizedParticipant.otp;
  return sanitizedParticipant;
};

const signupParticipant = async (req) => {
  const { firstName, lastName, email, password, role } = req.body;
  const normalizedEmail = email ? email.trim().toLowerCase() : '';
  const otp = generateOtp();

  const existingActiveParticipant = await Participant.findOne({
    email: normalizedEmail,
    status: 'aktif',
  });

  if (existingActiveParticipant) {
    throw new BadRequestError('Email sudah terdaftar dan akun sudah aktif');
  }

  let result = await Participant.findOne({
    email: normalizedEmail,
    status: 'tidak aktif',
  });

  if (result) {
    result.firstName = firstName;
    result.lastName = lastName;
    result.role = role;
    result.email = normalizedEmail;
    result.password = password;
    result.otp = otp;
    await result.save();
  } else {
    result = await Participant.create({
      firstName,
      lastName,
      email: normalizedEmail,
      password,
      role,
      otp,
    });
  }
  await otpMail(normalizedEmail, result);

  return sanitizeParticipant(result);
};

const activateParticipant = async (req) => {
  const { otp, email } = req.body;
  const normalizedEmail = email ? email.trim().toLowerCase() : '';
  const normalizedOtp = otp ? otp.toString().trim() : '';

  if (!normalizedEmail || !normalizedOtp) {
    throw new BadRequestError('Email dan kode OTP wajib diisi');
  }

  const check = await Participant.findOne({
    email: normalizedEmail,
  });

  if (!check) throw new NotFoundError('Partisipan belum terdaftar');

  if (check.status === 'aktif') {
    throw new BadRequestError('Akun sudah aktif');
  }

  if (check.otp !== normalizedOtp) {
    throw new BadRequestError('Kode otp salah');
  }

  check.status = 'aktif';
  check.otp = generateOtp();
  await check.save();

  return sanitizeParticipant(check);
};

const signinParticipant = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const result = await Participant.findOne({ email: email });

  if (!result) {
    throw new UnauthorizedError('Invalid Credentials');
  }

  if (result.status === 'tidak aktif') {
    throw new UnauthorizedError('Akun anda belum aktif');
  }

  const isPasswordCorrect = await result.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError('Invalid Credentials');
  }

  const token = createJWT({ payload: createTokenParticipant(result) });

  return token;
};

const getAllEvents = async (req) => {
  const result = await Events.find({ statusEvent: 'Published' })
    .populate('category')
    .populate('image')
    .populate('organizer')
    .select('_id title date tickets venueName category image organizer');

  return result;
};

const getOneEvent = async (req) => {
  const { id } = req.params;
  const result = await Events.findOne({ _id: id, statusEvent: 'Published' })
    .populate('category')
    .populate({ path: 'talent', populate: 'image' })
    .populate('image');

  if (!result) throw new NotFoundError(`Tidak ada acara dengan id :  ${id}`);

  return result;
};

const getAllOrders = async (req) => {
  const result = await Orders.find({ participant: req.participant.id });
  return result;
};

/**
 * Tugas Send email invoice
 * TODO: Ambil data email dari personal detail
 *  */
const checkoutOrder = async (req) => {
  const { event, personalDetail, payment, tickets } = req.body;

  if (!event || !payment || !personalDetail || !Array.isArray(tickets) || !tickets.length) {
    throw new BadRequestError('Data checkout belum lengkap');
  }
  if (
    !personalDetail.firstName ||
    !personalDetail.lastName ||
    !personalDetail.email
  ) {
    throw new BadRequestError('Data pemesan belum lengkap');
  }

  const checkingEvent = await Events.findOne({
    _id: event,
    statusEvent: 'Published',
  });
  if (!checkingEvent) {
    throw new NotFoundError('Tidak ada acara dengan id : ' + event);
  }

  const checkingPayment = await Payments.findOne({ _id: payment, status: true });

  if (!checkingPayment) {
    throw new NotFoundError(
      'Tidak ada metode pembayaran dengan id :' + payment
    );
  }
  if (String(checkingPayment.organizer) !== String(checkingEvent.organizer)) {
    throw new BadRequestError('Metode pembayaran tidak tersedia untuk event ini');
  }

  let totalPay = 0;
  let totalOrderTicket = 0;
  const selectedTypes = new Set();
  tickets.forEach((tic) => {
    const quantity = Number(tic.sumTicket);
    const ticket = checkingEvent.tickets.find(
      (availableTicket) =>
        availableTicket.type === tic.ticketCategories?.type
    );
    if (!ticket || selectedTypes.has(ticket.type)) {
      throw new BadRequestError('Kategori tiket tidak valid');
    }
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new BadRequestError('Jumlah tiket tidak valid');
    }
    if (ticket.statusTicketCategories === false || quantity > ticket.stock) {
      throw new BadRequestError('Stock event tidak mencukupi');
    }

    selectedTypes.add(ticket.type);
    ticket.stock -= quantity;
    totalOrderTicket += quantity;
    totalPay += ticket.price * quantity;
  });

  await checkingEvent.save();

  const historyEvent = {
    title: checkingEvent.title,
    date: checkingEvent.date,
    about: checkingEvent.about,
    tagline: checkingEvent.tagline,
    keyPoint: checkingEvent.keyPoint,
    venueName: checkingEvent.venueName,
    tickets: tickets,
    image: checkingEvent.image,
    category: checkingEvent.category,
    talent: checkingEvent.talent,
    organizer: checkingEvent.organizer,
  };

  const result = new Orders({
    date: new Date(),
    personalDetail: personalDetail,
    totalPay,
    totalOrderTicket,
    orderItems: tickets,
    participant: req.participant.id,
    event,
    historyEvent,
    payment,
  });

  await result.save();
  return result;
};

const getAllPaymentByOrganizer = async (req) => {
  const { organizer } = req.params;

  const result = await Payments.find({ organizer: organizer });

  return result;
};

module.exports = {
  signupParticipant,
  activateParticipant,
  signinParticipant,
  getAllEvents,
  getOneEvent,
  getAllOrders,
  checkoutOrder,
  getAllPaymentByOrganizer,
};