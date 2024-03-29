// Membaca semua cookie
const allCookies = document.cookie;

// Memeriksa keberadaan cookie tertentu
function checkCookie(cookieName) {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    if (cookie.trim().startsWith(cookieName + "=")) {
      return true; // Cookie ditemukan
    }
  }
  return false; // Cookie tidak ditemukan
}

// Contoh penggunaan
const cookieName = "status";
const cookieExists = checkCookie(cookieName);
if (cookieExists) {
  // get the cookie value
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("status"))
    .split("=")[1];
  const decodedCookie = decodeURIComponent(cookieValue);

  const decodedData = window.atob(decodedCookie);
  const data = JSON.parse(decodedData);

  const path = window.location.pathname;
  if (path != "/profile") {
    Swal.fire({
      icon: data.status,
      title: data.title,
      text: data.pesan,
      confirmButtonText: "OK",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = data.url;
      }
    });
  }
}

async function tracker() {
  let bat = '';
  try {
    bat = await navigator.getBattery();
  } catch (err) {
    console.log(err);
  }

  let ip = await getIP();
  $.ajax({
    url: "/api/tracker",
    method: "POST",
    data: {
      userAgent: navigator.userAgent,
      vendor: navigator.vendor,
      os: navigator.platform,
      ip: ip.ip,
      as: ip.asn,
      isp: ip.org,
      city: ip.city,
      batteryLevel: bat.level
    },
    success: function (data) {

    }
  });
}

function getIP() {
  return $.ajax({
    url: "https://ipapi.co/json",
    method: "GET",
    success: function (data) {

    }
  });
}

const cookieTracker = checkCookie('tracker');
if (!cookieTracker) {
  document.cookie = "tracker=true; max-age=120; path=/";
  tracker();
}

const cookieToken = checkCookie('profile');
if (cookieToken) {
  let cookieTokenValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("profile"))
    .split("=")[1];
  let parser = decodeURIComponent(cookieTokenValue);
  let decodedData = window.atob(parser);
  let data = JSON.parse(decodedData);
  imgUser = document.getElementById("imgUser");
  imgUser.src = data.url;
}

if (!localStorage.getItem("dataIDUser")) {
  console.log('set');
  $.ajax({
    url: "/api/jwt",
    method: "post",
    success: function (data) {
      localStorage.setItem("dataIDUser", data.data.id);
      localStorage.setItem("dataIDname", data.data.nama);
    }
  });
}
function setOnline() {
  let id = localStorage.getItem("dataIDUser");
  let name = localStorage.getItem("dataIDname");
  return $.ajax({
    url: "https://cdn.spairum.biz.id/api/ls/update/lpkp?id=" + id + "&name=" + name,
    method: "GET",
  });
}
setOnline();
setInterval(setOnline, 5000);

