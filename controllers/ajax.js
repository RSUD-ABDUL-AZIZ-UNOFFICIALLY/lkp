const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;
const { User, Departemen, Atasan, Lpkp } = require("../models");
const { Op } = require("sequelize");
const { report } = require(".");
module.exports = {
  updateProfile: async (req, res) => {
    let body = req.body;
    console.log(body.nama);
    let token = req.cookies.token;
    let decoded = jwt.verify(token, secretKey);
    let user = await User.update(
      {
        nama: body.nama,
        dep: body.dep,
        jab: body.jab,
        tgl_lahir: body.tgl_lahir,
        nip: body.nip,
      },
      {
        where: {
          nik: decoded.id,
        },
      }
    );
    try {
      let atasan = await Atasan.update(
        {
          bos: body.atasan,
        },
        {
          where: {
            user: decoded.id,
          },
        }
      );
      if (atasan == 0) {
        await Atasan.create({
          user: decoded.id,
          bos: body.atasan,
        });
      }
    } catch (error) {}
    return res.status(200).json({
      error: false,
      message: body,
    });
  },
  getAnggota: async (req, res) => {
    try {
      let token = req.cookies.token;
      let decoded = jwt.verify(token, secretKey);
      let data = await Atasan.findAll({
        include: [
          {
            model: User,
            as: "bio",
          },
        ],
        where: {
          bos: decoded.id,
        },
        attributes: ["user"],
      });
      return res.status(200).json({
        error: false,
        message: "success",
        data: data,
      });
    } catch (error) {}
  },
  progress: async (req, res) => {
    let token = req.cookies.token;
    let decoded = jwt.verify(token, secretKey);
    let body = req.body;
    await Lpkp.create({
      nik: decoded.id,
      rak: body.rak,
      tgl: body.tgl,
      volume: body.volume,
      satuan: body.satuan,
      waktu: body.waktu,
    });
    return res.status(200).json({
      error: false,
      message: "success",
    });
  },
  monthly: async (req, res) => {
    let token = req.cookies.token;
    let decoded = jwt.verify(token, secretKey);
    let queryparams = req.query;

    let data = await Lpkp.findAll({
      where: {
        nik: decoded.id,
        tgl: {
          [Op.startsWith]: queryparams.date,
        },
      },
      order: [["tgl", "ASC"]],
    });
    return res.status(200).json({
      error: false,
      message: queryparams,
      data: data,
    });
  },
  getScore: async (req, res) => {
    let token = req.cookies.token;
    let decoded = jwt.verify(token, secretKey);
    let queryparams = req.query;

    let data = await Lpkp.findAll({
      where: {
        nik: decoded.id,
        tgl: {
          [Op.startsWith]: queryparams.date,
        },
      },
    });

    let sumWaktu = 0;
    for (let i = 0; i < data.length; i++) {
      sumWaktu += data[i].waktu;
    }
    // IF(sumWaktu>7999;"BAIK";IF(sumWaktu>7379;"CUKUP";IF(sumWaktu>6719;"KURANG";IF(sumWaktu>0;"WKE MINIMAL TIDAK TERPENUHI";))))
    let kategori = "";
    if (sumWaktu > 7999) {
      kategori = "BAIK";
    } else if (sumWaktu > 7379) {
      kategori = "CUKUP";
    } else if (sumWaktu > 6719) {
      kategori = "KURANG";
    } else if (sumWaktu > 0) {
      kategori = "WKE MINIMAL TIDAK TERPENUHI";
    }
    // IF(F41>7999;"100%";IF(F41>7379;"90%";IF(F41>6719;"80%";IF(F41>0;"0%";))))
    let tpp = "";
    if (sumWaktu > 7999) {
      tpp = "100%";
    } else if (sumWaktu > 7379) {
      tpp = "90%";
    } else if (sumWaktu > 6719) {
      tpp = "80%";
    } else if (sumWaktu > 0) {
      tpp = "0%";
    }

    return res.status(200).json({
      error: false,
      message: "success",
      data: {
        capaian: sumWaktu,
        kategori: kategori,
        tpp: tpp,

      },
    });
  },
  deleteLpkp: async (req, res) => {
    let token = req.cookies.token;
    let decoded = jwt.verify(token, secretKey);
    let body = req.query;
    await Lpkp.destroy({
      where: {
        id: body.id,
        nik: decoded.id,
      },
    });
    return res.status(200).json({
      error: false,
      message: "success",
    });
  },
};