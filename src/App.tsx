import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { DocumentForm } from './components/DocumentForm';
import { DocumentPreview } from './components/DocumentPreview';
import { RepresentativeList } from './components/RepresentativeList';
import { TemplateType, BienBanData } from './types';
import { initialTruongBanData, initialLopHocData, danhSach14LopData } from './templates/data';
import { exportBienBanToDocx } from './utils/docxExport';
import { CheckCircle2, AlertCircle, FileText, Check, ShieldCheck, Sparkles } from 'lucide-react';

export function App() {
  const [templateType, setTemplateType] = useState<TemplateType>('truong_ban');
  const [truongBanData, setTruongBanData] = useState<BienBanData>(() => {
    const saved = localStorage.getItem('phuc_hoa_bb_truong_ban_v1');
    return saved ? JSON.parse(saved) : initialTruongBanData;
  });

  const [lopHocData, setLopHocData] = useState<BienBanData>(() => {
    const saved = localStorage.getItem('phuc_hoa_bb_lop_hoc_v1');
    return saved ? JSON.parse(saved) : initialLopHocData;
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('phuc_hoa_bb_truong_ban_v1', JSON.stringify(truongBanData));
  }, [truongBanData]);

  useEffect(() => {
    localStorage.setItem('phuc_hoa_bb_lop_hoc_v1', JSON.stringify(lopHocData));
  }, [lopHocData]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const currentData = templateType === 'truong_ban' ? truongBanData : lopHocData;

  const handleDataChange = (updated: BienBanData) => {
    if (templateType === 'truong_ban') {
      setTruongBanData(updated);
    } else {
      setLopHocData(updated);
    }
  };

  const handleExportDocx = async () => {
    try {
      if (templateType === 'danh_sach_lop') {
        showToast('Vui lòng bấm nút Tải Word ở bảng danh sách lớp!');
        return;
      }
      await exportBienBanToDocx(currentData);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      showToast('🎉 Đã tải file Word (.docx) chuẩn thành công! Hãy mở bằng Microsoft Word để kiểm tra.');
    } catch (err) {
      console.error(err);
      showToast('⚠️ Có lỗi xảy ra khi tạo file Word. Vui lòng thử lại!');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const textContent = `
${currentData.coQuanCapTren}
${currentData.tenTruong}
CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập – Tự do – Hạnh phúc

${currentData.diaDiemNgayThang}

${currentData.tieuDe}
NĂM HỌC ${currentData.namHoc}

I. THỜI GIAN, ĐỊA ĐIỂM, THÀNH PHẦN
1. Thời gian: ${currentData.thoiGian}
2. Địa điểm: ${currentData.diaDiem}
3. Thành phần:
${currentData.thanhPhanThamDuText}
- Có mặt: ${currentData.soLuongCoMat}/${currentData.soLuongTong}; Vắng: ${currentData.soLuongVangMat} (Lý do: ${currentData.lyDoVangMat})

II. NỘI DUNG CUỘC HỌP
Chủ tọa: ${currentData.chuToa} - ${currentData.chuToaChucVu}
1. Căn cứ và báo cáo:
- Căn cứ: ${currentData.canCuPhapLy}
${currentData.noiDungBaoCao}

2. Bầu Ban đại diện cha mẹ học sinh (${currentData.soLuongBanDaiDien} người):
${currentData.danhSachBanDaiDien.map((m, i) => `${i + 1}. ${m.chucVu}: ${m.phuHuynh} (HS: ${m.hocSinh} - Lớp ${m.lop}) - SĐT: ${m.soDienThoai}`).join('\n')}

3. Các khoản thu theo quy định & thỏa thuận:
${currentData.danhSachKhoanThu.map((f, i) => `${i + 1}. ${f.tenKhoanThu} | Mức thu: ${f.mucThu} (${f.hinhThuc})`).join('\n')}

4. Tồn quỹ năm trước bàn giao: ${currentData.quyConDuNamTruoc}

5. Ý kiến thảo luận:
${currentData.noiDungPhuHuynhYKien}

III. KẾT LUẬN VÀ BIỂU QUYẾT
${currentData.ketLuanChuToa.map((k, i) => `- ${k}`).join('\n')}
+ Nhất trí: ${currentData.tiLeNhatTri}
+ Không nhất trí: ${currentData.tiLeKhongNhatTri}
+ Ý kiến khác: ${currentData.yKienKhac}

Cuộc họp kết thúc hồi ${currentData.thoiGianKetThuc}.

${currentData.chuKyBenTraiChucDanh}: ${currentData.chuKyBenTraiHoTen}
${currentData.chuKyBenPhaiChucDanh}: ${currentData.chuKyBenPhaiHoTen}
    `.trim();

    navigator.clipboard.writeText(textContent).then(() => {
      showToast('📋 Đã sao chép toàn bộ văn bản vào bộ nhớ tạm!');
    });
  };

  const handleResetDefault = () => {
    if (confirm('Bạn có chắc muốn khôi phục về dữ liệu mẫu gốc ban đầu không?')) {
      if (templateType === 'truong_ban') {
        setTruongBanData(initialTruongBanData);
      } else {
        setLopHocData(initialLopHocData);
      }
      showToast('🔄 Đã khôi phục dữ liệu mẫu gốc THPT Phục Hòa!');
    }
  };

  const handleApplyPhucHoaSample = () => {
    if (templateType === 'truong_ban') {
      setTruongBanData(initialTruongBanData);
    } else {
      setLopHocData(initialLopHocData);
    }
    showToast('✨ Đã nạp dữ liệu mẫu chuẩn của Trường THPT Phục Hòa ngày 27/9/2026!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentTemplate={templateType}
        onSelectTemplate={(t) => setTemplateType(t)}
        onExportDocx={handleExportDocx}
        onPrint={handlePrint}
        onCopyText={handleCopyText}
        onResetDefault={handleResetDefault}
        schoolName={currentData.tenTruong}
      />

      {/* Thông báo Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Main Workspace Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
        {/* Banner giới thiệu & Hướng dẫn */}
        <div className="no-print bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-5 text-white shadow-lg border border-blue-800/40 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-amber-400 text-slate-950 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Mẫu Chuẩn Nghị Định 30/2020 & Thông Tư 55/2011
                </span>
                <span className="text-blue-300 text-xs hidden sm:inline">•</span>
                <span className="text-blue-200 text-xs font-mono">Trường THPT Phục Hòa 2026-2027</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                Tạo & Tải Về Biên Bản Họp Phụ Huynh Đầu Năm Chuẩn Word (.docx)
              </h2>
              <p className="text-xs text-blue-200/90 max-w-3xl leading-relaxed">
                Biên bản được định dạng chính xác 100% theo mẫu thực tế có sẵn trên máy tính nhà trường (ngày 27/9/2026).
                Quý thầy/cô có thể chỉnh sửa trực tiếp, nạp dữ liệu nhanh, bấm <strong>"Tải Word (.docx)"</strong> để nhận file chuẩn mở bằng Microsoft Word, hoặc <strong>"In / Lưu PDF"</strong> để in ngay!
              </p>
            </div>

            <div className="flex items-center gap-2 self-end md:self-auto">
              <button
                onClick={handleExportDocx}
                className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center gap-2 transition transform active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>Tải Ngay File Word (.docx)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Workspace Display */}
        {templateType === 'danh_sach_lop' ? (
          <div className="h-[750px]">
            <RepresentativeList
              initialList={danhSach14LopData}
              schoolName={currentData.tenTruong}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Input Form (5 Cols) */}
            <div className="no-print lg:col-span-5 h-[800px]">
              <DocumentForm
                data={currentData}
                onChange={handleDataChange}
                templateType={templateType}
                onApplyPhucHoaSample={handleApplyPhucHoaSample}
              />
            </div>

            {/* Right: WYSIWYG A4 Live Document Preview (7 Cols) */}
            <div className="lg:col-span-7 h-[800px]">
              <DocumentPreview
                data={currentData}
                onExportDocx={handleExportDocx}
                onPrint={handlePrint}
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="no-print bg-slate-900 border-t border-slate-800 text-slate-400 py-6 text-xs text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">TRƯỜNG THPT PHỤC HÒA</span>
            <span>•</span>
            <span>Ứng Dụng Hành Chính Giáo Dục 2026-2027</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Font chuẩn: Times New Roman</span>
            <span>•</span>
            <span>Xuất file: .docx / .pdf</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
