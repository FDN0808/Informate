export interface EventItem {
  event_id: number;
  nama_acara: string;
  tanggal_mulai: string;
  tanggal_selesai?: string;
  lokasi?: string;
  deskripsi?: string;
}
