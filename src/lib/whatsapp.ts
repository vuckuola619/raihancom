export const WA_PRIMARY = "628567578388";
export const WA_SECONDARY = "6281211824913";
export const WA_PRIMARY_DISPLAY = "08567578388";
export const WA_SECONDARY_DISPLAY = "081211824913";

const defaultMessage =
  "Halo Raihan Com, saya ingin menanyakan alat bekas kantor. Barang: [jenis barang]. Kondisi: [kondisi]. Lokasi: [lokasi]. Saya bisa kirim foto.";

export function waLink(number: string = WA_PRIMARY, message: string = defaultMessage) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
