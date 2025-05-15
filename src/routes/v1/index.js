const express = require("express");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const resepRoute = require("./resep.route");
const kategoriRoute = require("./kategori.route");
const pencarianRoute = require("./pencarian.route");
const bahanRoute = require("./bahan.route");
const langkahRoute = require("./langkah.route");
const adminResepRoute = require("./adminResep.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/resep",
    route: resepRoute,
  },
  {
    path: "/category",
    route: kategoriRoute,
  },
  {
    path: "/pencarian",
    route: pencarianRoute,
  },
  {
    path: "/bahan",
    route: bahanRoute,
  },
  {
    path: "/langkah",
    route: langkahRoute,
  },
  {
    path: "/admin/resep",
    route: adminResepRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
