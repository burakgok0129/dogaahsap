/**
 * Admin giriş kontrolü — sessionStorage kullanır (kurulum gerektirmez)
 */
var ADMIN_KULLANICI = "admin";
var ADMIN_SIFRE = "admin123";
var ADMIN_OTURUM_ANAHTAR = "doga_admin_giris";

function adminGirisYapildiMi() {
  return sessionStorage.getItem(ADMIN_OTURUM_ANAHTAR) === "evet";
}

function adminGirisYap() {
  sessionStorage.setItem(ADMIN_OTURUM_ANAHTAR, "evet");
}

function adminCikisYap() {
  sessionStorage.removeItem(ADMIN_OTURUM_ANAHTAR);
}

/** Panel sayfalarında giriş yoksa giriş sayfasına yönlendir */
function adminGirisZorunlu() {
  if (!adminGirisYapildiMi()) {
    window.location.href = "admin-giris.html";
  }
}

function adminGirisDogrula(kullanici, sifre) {
  return kullanici === ADMIN_KULLANICI && sifre === ADMIN_SIFRE;
}
