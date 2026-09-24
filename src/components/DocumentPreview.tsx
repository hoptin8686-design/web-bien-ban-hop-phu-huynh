import React, { useState } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Printer, 
  Download,
  FileCheck
} from 'lucide-react';
import { BienBanData } from '../types';

interface DocumentPreviewProps {
  data: BienBanData;
  onExportDocx: () => void;
  onPrint: () => void;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  data,
  onExportDocx,
  onPrint,
}) => {
  const [zoom, setZoom] = useState<number>(100);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 10, 140));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 10, 70));
  const handleZoomReset = () => setZoom(100);

  return (
    <div className="flex flex-col h-full bg-slate-200/80 rounded-2xl border border-slate-300 overflow-hidden shadow-inner">
      {/* Preview Toolbar */}
      <div className="p-3 bg-white border-b border-slate-300 flex items-center justify-between no-print shadow-sm">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
            <FileCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Mô Phỏng Trang In A4 (Nghị định 30/2020/NĐ-CP)</span>
          </span>
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            Times New Roman • Căn lề chuẩn
          </span>
        </div>

        <div className="flex items-center space-x-1.5">
          <button
            onClick={handleZoomOut}
            title="Thu nhỏ"
            className="p-1.5 hover:bg-slate-100 rounded text-slate-600 hover:text-slate-900 transition"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono font-medium text-slate-600 w-10 text-center">
            {zoom}%
          </span>
          <button
            onClick={handleZoomIn}
            title="Phóng to"
            className="p-1.5 hover:bg-slate-100 rounded text-slate-600 hover:text-slate-900 transition"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomReset}
            title="Kích thước chuẩn 100%"
            className="p-1.5 hover:bg-slate-100 rounded text-slate-600 hover:text-slate-900 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-[1px] bg-slate-300 mx-1"></div>

          <button
            onClick={onPrint}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded transition"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">In / PDF</span>
          </button>

          <button
            onClick={onExportDocx}
            className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Tải .docx</span>
          </button>
        </div>
      </div>

      {/* A4 Paper Scroll Container */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start print:p-0 print:bg-white print:overflow-visible">
        <div
          id="print-document"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
          className="transition-transform duration-200 a4-paper bg-white shadow-2xl print:shadow-none mx-auto border border-slate-300 print:border-none"
        >
          {/* A4 Content formatted strictly as standard Vietnamese administrative document */}
          <div className="document-body font-times text-black">
            {/* Header Two-Columns Table */}
            <div className="grid grid-cols-12 gap-2 mb-3">
              <div className="col-span-5 text-center">
                <div className="text-[13px] font-normal uppercase leading-tight tracking-tight">
                  {data.coQuanCapTren}
                </div>
                <div className="text-[13px] font-bold uppercase leading-tight tracking-tight">
                  {data.tenTruong}
                </div>
                <div className="w-24 mx-auto border-b border-black mt-1"></div>
              </div>

              <div className="col-span-7 text-center">
                <div className="text-[13px] font-bold uppercase leading-tight tracking-tight">
                  CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM
                </div>
                <div className="text-[14px] font-bold leading-tight tracking-tight">
                  Độc lập – Tự do – Hạnh phúc
                </div>
                <div className="w-36 mx-auto border-b-2 border-black mt-1"></div>
              </div>
            </div>

            {/* Date and Place */}
            <div className="text-right italic text-[13px] mb-4">
              {data.diaDiemNgayThang}
            </div>

            {/* Title */}
            <div className="text-center mb-6">
              <h1 className="text-[17px] font-bold uppercase tracking-wide leading-snug">
                {data.tieuDe}
              </h1>
              <div className="text-[14px] font-bold mt-0.5">
                NĂM HỌC {data.namHoc}
              </div>
            </div>

            {/* Section I */}
            <div className="mb-4">
              <h2 className="text-[14px] font-bold uppercase mb-1">
                I. THỜI GIAN, ĐỊA ĐIỂM, THÀNH PHẦN
              </h2>
              <div className="text-[14px] space-y-1 pl-4 text-justify leading-relaxed">
                <p>
                  <span className="font-bold">1. Thời gian: </span>
                  <span>{data.thoiGian}</span>
                </p>
                <p>
                  <span className="font-bold">2. Địa điểm: </span>
                  <span>{data.diaDiem}</span>
                </p>
                <div>
                  <span className="font-bold">3. Thành phần tham dự:</span>
                  <div className="pl-4 whitespace-pre-line">
                    {data.thanhPhanThamDuText}
                  </div>
                  <p className="mt-1">
                    - Có mặt: <span className="font-bold">{data.soLuongCoMat}/{data.soLuongTong}</span> đồng chí/đại biểu; 
                    Vắng mặt: <span className="font-bold">{data.soLuongVangMat}</span> (Lý do: {data.lyDoVangMat}).
                  </p>
                </div>
              </div>
            </div>

            {/* Section II */}
            <div className="mb-4">
              <h2 className="text-[14px] font-bold uppercase mb-1">
                II. NỘI DUNG CUỘC HỌP
              </h2>
              <div className="text-[14px] space-y-3 text-justify leading-relaxed">
                <p className="pl-4">
                  Đồng chí <span className="font-bold">{data.chuToa}</span> – {data.chuToaChucVu} chủ trì thông qua chương trình nội dung cuộc họp gồm các phần:
                </p>

                {/* 1. Phổ biến */}
                <div className="pl-4 space-y-1">
                  <p className="font-bold">
                    1. Phổ biến quy định và báo cáo triển khai nhiệm vụ năm học
                  </p>
                  <p className="italic text-slate-800">
                    Căn cứ pháp lý: {data.canCuPhapLy}
                  </p>
                  <div className="whitespace-pre-line text-justify">
                    {data.noiDungBaoCao}
                  </div>
                </div>

                {/* 2. Bầu cử ban đại diện */}
                <div className="pl-4 space-y-2">
                  <p className="font-bold">
                    2. Bầu Ban đại diện cha mẹ học sinh
                  </p>
                  <p>
                    Số lượng Ban đại diện được cuộc họp thống nhất ấn định: <span className="font-bold">0{data.soLuongBanDaiDien} người</span>. Danh sách cụ thể như sau:
                  </p>

                  {/* Bảng Ban đại diện */}
                  <table className="w-full border-collapse border border-black text-[13px] my-2">
                    <thead>
                      <tr className="bg-slate-50 font-bold text-center">
                        <th className="border border-black p-1.5 w-10">STT</th>
                        <th className="border border-black p-1.5 w-28">Chức vụ</th>
                        <th className="border border-black p-1.5">Họ tên Phụ huynh</th>
                        <th className="border border-black p-1.5">Học sinh</th>
                        <th className="border border-black p-1.5 w-16">Lớp</th>
                        <th className="border border-black p-1.5 w-28">Số điện thoại</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.danhSachBanDaiDien.map((item, idx) => (
                        <tr key={idx}>
                          <td className="border border-black p-1.5 text-center">{idx + 1}</td>
                          <td className="border border-black p-1.5 font-semibold">{item.chucVu}</td>
                          <td className="border border-black p-1.5 font-bold">{item.phuHuynh}</td>
                          <td className="border border-black p-1.5">{item.hocSinh || '-'}</td>
                          <td className="border border-black p-1.5 text-center font-medium">{item.lop || '-'}</td>
                          <td className="border border-black p-1.5 text-center font-mono">{item.soDienThoai || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="text-right italic text-[12px]">
                    (Danh sách ấn định 0{data.soLuongBanDaiDien} người./.)
                  </p>
                </div>

                {/* 3. Triển khai các khoản thu */}
                <div className="pl-4 space-y-2">
                  <p className="font-bold">
                    3. Triển khai dự kiến một số hoạt động và các khoản thu năm học
                  </p>
                  <p className="italic">
                    Các khoản thu thỏa thuận và quy định phục vụ trực tiếp cho học sinh trong năm học:
                  </p>

                  {/* Bảng Khoản thu */}
                  <table className="w-full border-collapse border border-black text-[13px] my-2">
                    <thead>
                      <tr className="bg-slate-50 font-bold text-center">
                        <th className="border border-black p-1.5 w-10">STT</th>
                        <th className="border border-black p-1.5">Nội dung khoản thu</th>
                        <th className="border border-black p-1.5 w-32">Mức thu</th>
                        <th className="border border-black p-1.5 w-24">Hình thức</th>
                        <th className="border border-black p-1.5">Ghi chú</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.danhSachKhoanThu.map((fee, idx) => (
                        <tr key={fee.id}>
                          <td className="border border-black p-1.5 text-center">{idx + 1}</td>
                          <td className="border border-black p-1.5 font-bold">{fee.tenKhoanThu}</td>
                          <td className="border border-black p-1.5 text-center font-semibold">{fee.mucThu}</td>
                          <td className="border border-black p-1.5 text-center">{fee.hinhThuc}</td>
                          <td className="border border-black p-1.5 text-[12px]">{fee.ghiChu}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 4. Tồn quỹ năm học cũ */}
                <div className="pl-4 space-y-1">
                  <p className="font-bold">
                    4. Thông báo quỹ còn dư của năm học trước
                  </p>
                  <p>
                    - Quỹ còn: <span className="font-bold">{data.quyConDuNamTruoc}</span> bàn giao lại cho Ban đại diện / kế toán của phụ huynh năm học mới 2026-2027.
                  </p>
                </div>

                {/* 5. Ý kiến phụ huynh */}
                <div className="pl-4 space-y-1">
                  <p className="font-bold">
                    5. Thảo luận & Ý kiến đóng góp của Phụ huynh
                  </p>
                  <div className="whitespace-pre-line text-justify">
                    {data.noiDungPhuHuynhYKien}
                  </div>
                </div>
              </div>
            </div>

            {/* Section III */}
            <div className="mb-6">
              <h2 className="text-[14px] font-bold uppercase mb-1">
                III. KẾT LUẬN VÀ BIỂU QUYẾT
              </h2>
              <div className="text-[14px] space-y-1 pl-4 text-justify leading-relaxed">
                <p className="font-bold">
                  Đồng chí {data.chuToa} kết luận các nội dung thống nhất sau:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  {data.ketLuanChuToa.map((kl, idx) => (
                    <li key={idx}>{kl}</li>
                  ))}
                </ul>

                <div className="mt-3 font-semibold">
                  Biểu quyết các nội dung trên:
                </div>
                <div className="pl-4 space-y-0.5">
                  <p>+ Nhất trí: <span className="font-bold">{data.tiLeNhatTri}</span></p>
                  <p>+ Không nhất trí: <span className="font-bold">{data.tiLeKhongNhatTri}</span></p>
                  <p>+ Ý kiến khác: {data.yKienKhac}</p>
                </div>

                <p className="italic mt-3">
                  Cuộc họp kết thúc hồi {data.thoiGianKetThuc}, biên bản được thông qua trước toàn thể các thành viên trong cuộc họp nhất trí ký tên./.
                </p>
              </div>
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-2 text-center text-[14px] mt-8 pt-4 signature-section">
              <div>
                <div className="font-bold uppercase tracking-wider">{data.chuKyBenTraiChucDanh}</div>
                <div className="italic text-[12px]">(Ký và ghi rõ họ tên)</div>
                <div className="h-24"></div>
                <div className="font-bold text-[14px]">{data.chuKyBenTraiHoTen}</div>
              </div>

              <div>
                <div className="font-bold uppercase tracking-wider whitespace-pre-line">{data.chuKyBenPhaiChucDanh}</div>
                <div className="italic text-[12px]">(Ký và ghi rõ họ tên, đóng dấu)</div>
                <div className="h-24"></div>
                <div className="font-bold text-[14px]">{data.chuKyBenPhaiHoTen}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
