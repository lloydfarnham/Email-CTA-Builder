import html2canvas from "html2canvas";
const exportAsImage = (el, imageFileName) => {
  html2canvas(el, { useCORS: true }).then(canvas => {
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      downloadImage(url, imageFileName);
    }, "image/png", 1.0);
  });
};

const downloadImage = (url, fileName) => {
  const link = document.createElement("a");
  link.download = fileName;
  link.href = url;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(link);
};

export default exportAsImage;
