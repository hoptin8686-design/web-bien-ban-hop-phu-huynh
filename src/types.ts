export type TemplateType = 'truong_ban' | 'lop_hoc' | 'danh_sach_lop';

export interface BoardMember {
  stt: number;
  chucVu: string;
  phuHuynh: string;
  hocSinh: string;
  lop: string;
  soDienThoai: string;
}

export interface FeeItem {
  id: string;
  tenKhoanThu: string;
  mucThu: string;
  hinhThuc: string; // 'Quy định' | 'Thỏa thuận' | 'Tự nguyện'
  ghiChu: string;
}

export interface ClassRepresentative {
  stt: number;
  lop: string;
  gvcn: string;
  banDaiDien: string;
  soDienThoai: string;
  ghiChu: string;
}

export interface BienBanData {
  // Tiêu đề & Đơn vị
  coQuanCapTren: string;
  tenTruong: string;
  tieuDe: string;
  namHoc: string;
  diaDiemNgayThang: string; // "Phục Hòa, ngày 27 tháng 9 năm 2026"
  
  // Thời gian & Địa điểm
  thoiGian: string;
  diaDiem: string;
  
  // Thành phần tham dự
  chuToa: string;
  chuToaChucVu: string;
  thuKy: string;
  thuKyChucVu: string;
  thanhPhanThamDuText: string;
  soLuongTong: number;
  soLuongCoMat: number;
  soLuongVangMat: number;
  lyDoVangMat: string;
  
  // Thông tin lớp học (nếu là mẫu lớp)
  tenLop?: string;
  gvcnTen?: string;
  siSoLop?: number;
  siSoNam?: number;
  siSoNu?: number;

  // Nội dung
  canCuPhapLy: string;
  noiDungBaoCao: string;
  noiDungPhuHuynhYKien: string;
  quyConDuNamTruoc: string;
  
  // Ban đại diện
  soLuongBanDaiDien: number;
  danhSachBanDaiDien: BoardMember[];
  
  // Các khoản thu
  danhSachKhoanThu: FeeItem[];
  
  // Kết luận & Biểu quyết
  ketLuanChuToa: string[];
  tiLeNhatTri: string;
  tiLeKhongNhatTri: string;
  yKienKhac: string;
  thoiGianKetThuc: string;
  
  // Ký tên
  chuKyBenTraiChucDanh: string;
  chuKyBenTraiHoTen: string;
  chuKyBenPhaiChucDanh: string;
  chuKyBenPhaiHoTen: string;
}
