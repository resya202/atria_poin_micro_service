const express = require('express');
const jwt = require('jsonwebtoken');
const { verifyToken, verifyApiKey } = require('../middleware/auth');
const config = require('../config/config');
const axios = require('axios');
const crypto = require('crypto');

const router = express.Router();

require('dotenv').config();

// Endpoint protected dengan API Key dan Token

router.post('/insert-point', verifyApiKey, verifyToken, async (req, res) => {
  const { p_StoreNo, p_ReceiptNo, p_PointAmt } = req.body;
  const keypass = process.env.SYSTEM_KEYPASS;

  // Buat hash
  const dataToHash = `%${p_StoreNo}%${p_ReceiptNo}%${p_PointAmt}%${keypass}%`;
  const p_keypass = crypto.createHash('sha256').update(dataToHash).digest('hex').toUpperCase();

  try {
    const response = await axios.post('http://175.103.47.241:4403/api/atria/insert_point', {
      p_StoreNo,
      p_ReceiptNo,
      p_PointAmt,
      p_keypass
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    const apiData = response.data;

    res.json({
      status: 'success',
      message: apiData.response_desc || 'Insert success',
      data: Array.isArray(apiData.data) ? apiData.data[0] : apiData.data || {}
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Gagal insert point',
      response: error.response?.data || error.message
    });
  }
});

router.post('/calculate-point', verifyApiKey, verifyToken, async (req, res) => {
  const { p_StoreNo, p_ItemNo } = req.body;
  const keypass = process.env.SYSTEM_KEYPASS;

  const dataToHash = `%${p_StoreNo}%${p_ItemNo}%${keypass}%`;
  const p_keypass = crypto.createHash('sha256').update(dataToHash).digest('hex').toUpperCase();

  try {
    const response = await axios.post('http://175.103.47.241:4403/api/atria/calculate_point', {
      p_StoreNo,
      p_ItemNo,
      p_keypass
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    const result = response.data?.data?.[0]; // ambil data pertama

    res.json({
      status: 'success',
      message: 'Data poin berhasil didapat',
      data: result
    });

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
      response: error.response?.data || null
    });
  }
});

router.post('/generate-coupon', verifyApiKey, verifyToken, async (req, res) => {
  const { p_JumlahCoupon, p_CouponAmt } = req.body;
  const keypass = process.env.SYSTEM_KEYPASS;

  const dataToHash = `%${p_JumlahCoupon}%${p_CouponAmt}%${keypass}%`;
  const p_keypass = crypto.createHash('sha256').update(dataToHash).digest('hex').toUpperCase();

  try {
    const response = await axios.post('http://175.103.47.241:4403/api/atria/CouponVoucher/Create', {
      p_JumlahCoupon,
      p_CouponAmt,
      p_keypass
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const result = response.data?.data?.[0] || response.data;

    res.json({
      status: 'success',
      message: 'Coupon berhasil dibuat',
      data: result
    });

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Gagal generate coupon',
      response: error.message || error
    });
  }
});

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'nova' && password === 'Jakasembung') {
    const token = jwt.sign({ username }, config.jwtSecret, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Username atau password salah' });
  }
});

// Contoh secure endpoint
router.get('/secure-data', verifyApiKey, verifyToken, (req, res) => {
  res.json({ message: 'Data rahasia untuk user terautentikasi', user: req.user });
});

module.exports = router;
