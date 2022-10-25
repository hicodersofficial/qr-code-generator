const download = document.querySelector(".download");
const dark = document.querySelector(".dark");
const light = document.querySelector(".light");
const qrContainer = document.querySelector("#qr-code");
const qrText = document.querySelector(".qr-text");
const shareBtn = document.querySelector(".share-btn");
const sizes = document.querySelector(".sizes");

dark.addEventListener("input", handleDarkColor);
light.addEventListener("input", handleLightColor);
qrText.addEventListener("input", handleQRText);
sizes.addEventListener("change", handleSize);
shareBtn.addEventListener("click", handleShare);

const defaultUrl = "https://www.instagram.com/hi.coders/";
let colorLight = "#fff",
  colorDark = "#000",
  text = defaultUrl,
  size = 300;

function handleDarkColor(e) {
  colorDark = e.target.value;
  generateQRCode();
}

function handleLightColor(e) {
  colorLight = e.target.value;
  generateQRCode();
}

function handleQRText(e) {
  const value = e.target.value;
  text = value;
  if (!value) {
    text = defaultUrl;
  }
  generateQRCode();
}

function generateQRCode() {
  qrContainer.innerHTML = "";
  new QRCode("qr-code", {
    text,
    height: size,
    width: size,
    colorLight,
    colorDark,
  });
  makeDownloadBtn();
}

function makeDownloadBtn() {
  setTimeout(() => {
    const img = document.querySelector("#qr-code img");
    if (img.currentSrc) {
      download.href = img.currentSrc;
      return;
    }
    const canvas = document.querySelector("canvas");
    download.href = canvas.toDataURL();
  }, 50);
}

async function handleShare() {
  setTimeout(async () => {
    try {
      const img = document.querySelector("#qr-code img");
      const base64url = img.currentSrc;
      const blob = await (await fetch(base64url)).blob();
      const file = new File([blob], "QRCode.png", {
        type: blob.type,
      });
      await navigator.share({
        files: [file],
        title: text,
      });
    } catch (error) {
      alert("Your browser doesn't support sharing.");
    }
  }, 100);
}

function handleSize(e) {
  size = e.target.value;
  generateQRCode();
}
generateQRCode();
