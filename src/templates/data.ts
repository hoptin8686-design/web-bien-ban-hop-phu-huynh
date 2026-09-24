import { BienBanData, ClassRepresentative } from '../types';

export const initialTruongBanData: BienBanData = {
  coQuanCapTren: 'SỞ GD&ĐT CAO BẰNG',
  tenTruong: 'TRƯỜNG THPT PHỤC HÒA',
  tieuDe: 'BIÊN BẢN HỌP TRƯỞNG PHỤ HUYNH CÁC LỚP',
  namHoc: '2026 - 2027',
  diaDiemNgayThang: 'Phục Hòa, ngày 27 tháng 9 năm 2026',
  
  thoiGian: '08h00 ngày 27 tháng 9 năm 2026',
  diaDiem: 'Phòng Hội đồng Trường THPT Phục Hòa',
  
  chuToa: 'Hoàng Trung Kiên',
  chuToaChucVu: 'Hiệu trưởng',
  thuKy: 'Đàm Thị Hợp',
  thuKyChucVu: 'Thư ký Hội đồng',
  thanhPhanThamDuText: '- Thầy Hoàng Trung Kiên - Hiệu trưởng, chủ tọa.\n- 14 phụ huynh đại diện cho 14 lớp.\n- 14 Giáo viên chủ nhiệm (GVCN) các lớp.\n- Thư ký hội đồng.',
  soLuongTong: 56,
  soLuongCoMat: 56,
  soLuongVangMat: 0,
  lyDoVangMat: 'Không',

  canCuPhapLy: 'Thông tư số 55/2011/TT-BGDĐT ngày 22/11/2011 của Bộ Giáo dục và Đào tạo về Điều lệ Ban đại diện cha mẹ học sinh.',
  noiDungBaoCao: '1. Thầy Hoàng Trung Kiên – Hiệu trưởng nhà trường phổ biến và thông qua các nội dung quy định theo Thông tư 55/2011/TT-BGDĐT về tổ chức và hoạt động của Ban đại diện cha mẹ học sinh.\n2. Báo cáo tóm tắt tình hình nhà trường đầu năm học 2026-2027, định hướng phát triển giáo dục, cơ sở vật chất và kế hoạch dạy học.\n3. Triển khai dự kiến một số hoạt động và các khoản thu theo quy định, thỏa thuận trong năm học 2026-2027.',
  noiDungPhuHuynhYKien: 'Đại diện phụ huynh các lớp thảo luận sôi nổi, đóng góp ý kiến về việc phối hợp giữa gia đình và nhà trường trong việc quản lý, giáo dục nề nếp và nâng cao chất lượng học tập của học sinh. Toàn thể phụ huynh nhất trí cao với chủ trương, kế hoạch của nhà trường.',
  quyConDuNamTruoc: '0 đồng (hoặc số tiền đã kết toán được bàn giao lại đầy đủ cho Ban đại diện phụ huynh năm học mới 2026-2027)',
  
  soLuongBanDaiDien: 5,
  danhSachBanDaiDien: [
    { stt: 1, chucVu: 'Trưởng ban', phuHuynh: 'Lê Hoài Nam', hocSinh: 'Lê Ngọc Linh', lop: '11A3', soDienThoai: '0912.345.678' },
    { stt: 2, chucVu: 'Phó ban', phuHuynh: 'Đặng Tố Uyên', hocSinh: 'Nông Khánh Chi', lop: '12A1', soDienThoai: '0866115267' },
    { stt: 3, chucVu: 'Phó ban', phuHuynh: 'Lương Văn Trường', hocSinh: 'Lương Tuấn Anh', lop: '10A2', soDienThoai: '0983.123.456' },
    { stt: 4, chucVu: 'Kế toán', phuHuynh: 'Tống Thị Nguyệt', hocSinh: 'Nông Bính Ngọ', lop: '11A1', soDienThoai: '0988508118' },
    { stt: 5, chucVu: 'Ủy viên', phuHuynh: 'Trần Thu Hương', hocSinh: 'Trần Minh Quân', lop: '10A5', soDienThoai: '0394676974' },
  ],
  
  danhSachKhoanThu: [
    { id: '1', tenKhoanThu: 'Bảo hiểm y tế học sinh', mucThu: 'Theo quy định nhà nước', hinhThuc: 'Bắt buộc', ghiChu: 'Thu theo mức lương cơ sở quy định' },
    { id: '2', tenKhoanThu: 'Kinh phí hoạt động Ban đại diện CMHS trường', mucThu: 'Tự nguyện thỏa thuận', hinhThuc: 'Tự nguyện', ghiChu: 'Theo Thông tư 55/2011/TT-BGDĐT' },
    { id: '3', tenKhoanThu: 'Nước uống học sinh', mucThu: 'Thỏa thuận theo kỳ', hinhThuc: 'Thỏa thuận', ghiChu: 'Phục vụ nước uống tinh khiết cả năm' },
    { id: '4', tenKhoanThu: 'Sổ liên lạc điện tử / Ứng dụng kết nối', mucThu: 'Thỏa thuận', hinhThuc: 'Thỏa thuận', ghiChu: 'Cập nhật điểm và thông báo từ nhà trường' },
    { id: '5', tenKhoanThu: 'Đồng phục học sinh (Áo khoác, áo cộc, phù hiệu)', mucThu: 'Theo giá nhà cung cấp', hinhThuc: 'Thỏa thuận', ghiChu: 'Phù hợp thuần phong mỹ tục và tiết kiệm' },
    { id: '6', tenKhoanThu: 'Bảo hiểm thân thể học sinh (tự nguyện)', mucThu: 'Theo đơn vị bảo hiểm', hinhThuc: 'Tự nguyện', ghiChu: 'Bảo hiểm Quân đội / Bảo Việt' },
  ],
  
  ketLuanChuToa: [
    'Báo cáo tóm tắt kết quả năm học 2025-2026; phương hướng, nhiệm vụ năm học 2026-2027 được toàn thể cuộc họp nhất trí thông qua.',
    'Các khoản thu đầu năm đã được thảo luận công khai, dân chủ và đạt sự đồng thuận, nhất trí 100%.',
    'Bầu ra được Ban đại diện Cha mẹ học sinh nhà trường gồm 05 ông bà tiêu biểu, nhiệt tình, trách nhiệm.',
    'Thống nhất các kỳ họp trong năm: Họp phụ huynh đầu năm học, cuối học kỳ I, kết thúc năm học và các buổi họp chuyên đề khi cần thiết.',
  ],
  tiLeNhatTri: '100%',
  tiLeKhongNhatTri: '0%',
  yKienKhac: 'Không có',
  thoiGianKetThuc: '11h15 cùng ngày',
  
  chuKyBenTraiChucDanh: 'THƯ KÝ',
  chuKyBenTraiHoTen: 'Đàm Thị Hợp',
  chuKyBenPhaiChucDanh: 'CHỦ TỌA\nHIỆU TRƯỞNG',
  chuKyBenPhaiHoTen: 'Hoàng Trung Kiên',
};

export const initialLopHocData: BienBanData = {
  coQuanCapTren: 'SỞ GD&ĐT CAO BẰNG',
  tenTruong: 'TRƯỜNG THPT PHỤC HÒA',
  tieuDe: 'BIÊN BẢN HỌP PHỤ HUYNH HỌC SINH ĐẦU NĂM',
  namHoc: '2026 - 2027',
  diaDiemNgayThang: 'Phục Hòa, ngày 27 tháng 9 năm 2026',
  
  thoiGian: '09h30 ngày 27 tháng 9 năm 2026',
  diaDiem: 'Phòng học lớp 10A1 - Trường THPT Phục Hòa',
  
  chuToa: 'Đàm Thị Thanh Hà',
  chuToaChucVu: 'Giáo viên chủ nhiệm',
  thuKy: 'Nông Thị Lan',
  thuKyChucVu: 'Phụ huynh học sinh',
  thanhPhanThamDuText: '- Bà: Đàm Thị Thanh Hà - Giáo viên chủ nhiệm lớp 10A1 (Chủ trì).\n- Toàn thể quý bậc phụ huynh học sinh lớp 10A1.\n- Bà: Nông Thị Lan - Phụ huynh em Hoàng Văn Nam (Thư ký cuộc họp).',
  soLuongTong: 42,
  soLuongCoMat: 41,
  soLuongVangMat: 1,
  lyDoVangMat: 'Có lý do (Bận công tác, đã xin phép trước)',
  
  tenLop: '10A1',
  gvcnTen: 'Đàm Thị Thanh Hà',
  siSoLop: 42,
  siSoNam: 20,
  siSoNu: 22,

  canCuPhapLy: 'Kế hoạch năm học 2026-2027 của Trường THPT Phục Hòa và Điều lệ Ban đại diện cha mẹ học sinh ban hành kèm theo Thông tư 55/2011/TT-BGDĐT.',
  noiDungBaoCao: '1. Báo cáo tình hình lớp đầu năm: Sĩ số 42 học sinh (20 nam, 22 nữ). Đa số học sinh ngoan ngoãn, có ý thức học tập tốt.\n2. Phổ biến nội quy nhà trường, quy chế đánh giá xếp loại học sinh theo Thông tư mới của Bộ GD&ĐT.\n3. Thống nhất phương hướng học tập, rèn luyện nề nếp, xây dựng chi đoàn vững mạnh và chỉ tiêu đỗ tốt nghiệp, đại học.\n4. Thông qua các khoản thu thỏa thuận theo hướng dẫn của nhà trường và nghị quyết Hội nghị phụ huynh chung.',
  noiDungPhuHuynhYKien: 'Phụ huynh phát biểu ý kiến: Đề nghị GVCN thường xuyên trao đổi thông tin về tình hình học tập và rèn luyện của học sinh qua Zalo/Sổ liên lạc điện tử; phụ huynh cam kết quản lý giờ giấc học tập tại nhà và phối hợp chặt chẽ cùng nhà trường.',
  quyConDuNamTruoc: '0 đồng',
  
  soLuongBanDaiDien: 3,
  danhSachBanDaiDien: [
    { stt: 1, chucVu: 'Trưởng ban (Chi hội trưởng)', phuHuynh: 'Lê Văn Thắng', hocSinh: 'Lê Minh Khôi', lop: '10A1', soDienThoai: '0978.112.233' },
    { stt: 2, chucVu: 'Phó ban (Chi hội phó)', phuHuynh: 'Hoàng Thị Mơ', hocSinh: 'Nông Gia Hân', lop: '10A1', soDienThoai: '0915.667.889' },
    { stt: 3, chucVu: 'Ủy viên (Thủ quỹ)', phuHuynh: 'Trần Văn Kiên', hocSinh: 'Trần Thảo Vy', lop: '10A1', soDienThoai: '0389.554.321' },
  ],
  
  danhSachKhoanThu: [
    { id: '1', tenKhoanThu: 'Bảo hiểm y tế học sinh', mucThu: 'Theo quy định nhà nước', hinhThuc: 'Bắt buộc', ghiChu: 'Đóng theo quy định của BHXH Việt Nam' },
    { id: '2', tenKhoanThu: 'Quỹ hoạt động Chi hội phụ huynh lớp', mucThu: 'Tự nguyện thỏa thuận', hinhThuc: 'Tự nguyện', ghiChu: 'Khen thưởng học sinh, chăm lo hoạt động lớp' },
    { id: '3', tenKhoanThu: 'Nước uống học sinh', mucThu: 'Theo thông báo trường', hinhThuc: 'Thỏa thuận', ghiChu: 'Phục vụ nước uống tinh khiết' },
    { id: '4', tenKhoanThu: 'Đồng phục, phù hiệu học sinh', mucThu: 'Theo số lượng đăng ký', hinhThuc: 'Thỏa thuận', ghiChu: 'Theo mẫu quy định của trường' },
    { id: '5', tenKhoanThu: 'Bảo hiểm thân thể (tự nguyện)', mucThu: 'Theo đơn vị bảo hiểm', hinhThuc: 'Tự nguyện', ghiChu: 'Không bắt buộc' },
  ],
  
  ketLuanChuToa: [
    'Toàn thể phụ huynh nhất trí cao với báo cáo của GVCN và phương hướng hoạt động của lớp năm học 2026-2027.',
    'Bầu ra Ban đại diện Cha mẹ học sinh lớp gồm 03 vị phụ huynh nhiệt tình, đại diện cho tập thể lớp.',
    'Nhất trí các khoản thu theo quy định và thỏa thuận phục vụ trực tiếp cho các em học sinh.',
    'Quyết tâm cùng nhà trường giáo dục con em đạt kết quả cao nhất trong năm học mới.',
  ],
  tiLeNhatTri: '100%',
  tiLeKhongNhatTri: '0%',
  yKienKhac: 'Không có',
  thoiGianKetThuc: '11h30 cùng ngày',
  
  chuKyBenTraiChucDanh: 'THƯ KÝ CUỘC HỌP',
  chuKyBenTraiHoTen: 'Nông Thị Lan',
  chuKyBenPhaiChucDanh: 'GIÁO VIÊN CHỦ NHIỆM',
  chuKyBenPhaiHoTen: 'Đàm Thị Thanh Hà',
};

export const danhSach14LopData: ClassRepresentative[] = [
  { stt: 1, lop: '10A1', gvcn: 'Đàm Thị Thanh Hà', banDaiDien: 'Lê Văn Thắng', soDienThoai: '0978.112.233', ghiChu: 'Đã hoàn thiện' },
  { stt: 2, lop: '10A2', gvcn: 'Nông Quốc Tuệ', banDaiDien: 'Lương Văn Trường', soDienThoai: '0983.123.456', ghiChu: 'Phó ban trường' },
  { stt: 3, lop: '10A3', gvcn: 'Đàm Thị Quyên', banDaiDien: 'Hoàng Văn Nam', soDienThoai: '0912.445.566', ghiChu: 'Đã hoàn thiện' },
  { stt: 4, lop: '10A4', gvcn: 'Hoàng Thị Huệ', banDaiDien: 'Bế Thị Thu', soDienThoai: '0989.223.344', ghiChu: 'Đã hoàn thiện' },
  { stt: 5, lop: '10A5', gvcn: 'Nông Thị Đông', banDaiDien: 'Trần Thu Hương', soDienThoai: '0394676974', ghiChu: 'Ủy viên trường' },
  { stt: 6, lop: '11A1', gvcn: 'Nông Văn Chiến', banDaiDien: 'Tống Thị Nguyệt', soDienThoai: '0988508118', ghiChu: 'Kế toán trường' },
  { stt: 7, lop: '11A2', gvcn: 'Hoàng Minh Tuấn', banDaiDien: 'Triệu Văn Bằng', soDienThoai: '0975.334.455', ghiChu: 'Đã hoàn thiện' },
  { stt: 8, lop: '11A3', gvcn: 'Nguyễn Văn Sắc', banDaiDien: 'Lê Hoài Nam', soDienThoai: '0912.345.678', ghiChu: 'Trưởng ban trường' },
  { stt: 9, lop: '11A4', gvcn: 'Nông Văn Đình', banDaiDien: 'Nông Văn Chung', soDienThoai: '0986.778.899', ghiChu: 'Đã hoàn thiện' },
  { stt: 10, lop: '11A5', gvcn: 'Đinh Tố Loan', banDaiDien: 'Hoàng Thị Lan', soDienThoai: '0913.556.677', ghiChu: 'Đã hoàn thiện' },
  { stt: 11, lop: '12A1', gvcn: 'Ngọc Bích Diệp', banDaiDien: 'Đặng Tố Uyên', soDienThoai: '0866115267', ghiChu: 'Phó ban trường' },
  { stt: 12, lop: '12A2', gvcn: 'Nông Thị Bích Hảo', banDaiDien: 'Hoàng Văn Thắng', soDienThoai: '0972.889.900', ghiChu: 'Đã hoàn thiện' },
  { stt: 13, lop: '12A3', gvcn: 'Dương Minh Toản', banDaiDien: 'Vũ Thị Hoa', soDienThoai: '0984.665.544', ghiChu: 'Đã hoàn thiện' },
  { stt: 14, lop: '12A4', gvcn: 'Lê Tuấn Vương', banDaiDien: 'Ma Văn Hùng', soDienThoai: '0916.223.311', ghiChu: 'Đã hoàn thiện' },
];
