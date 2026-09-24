import React from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  Copy, 
  RotateCcw, 
  Sparkles,
  Users,
  Building,
  School
} from 'lucide-react';
import { TemplateType } from '../types';

interface NavbarProps {
  currentTemplate: TemplateType;
  onSelectTemplate: (t: TemplateType) => void;
  onExportDocx: () => void;
  onPrint: () => void;
  onCopyText: () => void;
  onResetDefault: () => void;
  schoolName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTemplate,
  onSelectTemplate,
  onExportDocx,
  onPrint,
  onCopyText,
  onResetDefault,
  schoolName
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & School Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-400 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <School className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-wider text-amber-400 uppercase">
                  {schoolName || 'TRƯỜNG THPT PHỤC HÒA'}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Chuẩn Word 2026-2027
                </span>
              </div>
              <h1 className="text-xs sm:text-sm font-semibold text-slate-200">
                Hệ Thống Tạo & Xuất Biên Bản Họp Phụ Huynh Đầu Năm
              </h1>
            </div>
          </div>

          {/* Template Switcher Buttons */}
          <nav className="hidden md:flex items-center p-1 bg-slate-800/80 rounded-xl border border-slate-700/60">
            <button
              onClick={() => onSelectTemplate('truong_ban')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentTemplate === 'truong_ban'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              <span>Họp Trưởng Ban 14 Lớp</span>
              <span className="bg-amber-400/20 text-amber-300 text-[10px] px-1.5 py-0.2 rounded font-mono">Mẫu gốc</span>
            </button>

            <button
              onClick={() => onSelectTemplate('lop_hoc')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentTemplate === 'lop_hoc'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Họp Tại Lớp (GVCN)</span>
            </button>

            <button
              onClick={() => onSelectTemplate('danh_sach_lop')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentTemplate === 'danh_sach_lop'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>DS Ban Đại Diện 14 Lớp</span>
            </button>
          </nav>

          {/* Top Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onResetDefault}
              title="Khôi phục lại dữ liệu mẫu gốc"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={onCopyText}
              title="Sao chép toàn bộ văn bản để dán"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition"
            >
              <Copy className="w-3.5 h-3.5 text-slate-300" />
              <span>Sao chép</span>
            </button>

            <button
              onClick={onPrint}
              title="In ra giấy A4 hoặc Lưu dạng PDF"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition"
            >
              <Printer className="w-3.5 h-3.5 text-blue-400" />
              <span>In / Lưu PDF</span>
            </button>

            <button
              onClick={onExportDocx}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-600 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all transform active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Tải Word (.docx)</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            </button>
          </div>
        </div>

        {/* Mobile Template Switcher */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-800 text-xs">
          <button
            onClick={() => onSelectTemplate('truong_ban')}
            className={`px-2 py-1 rounded ${currentTemplate === 'truong_ban' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400'}`}
          >
            Họp Trưởng Ban
          </button>
          <button
            onClick={() => onSelectTemplate('lop_hoc')}
            className={`px-2 py-1 rounded ${currentTemplate === 'lop_hoc' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400'}`}
          >
            Họp Tại Lớp
          </button>
          <button
            onClick={() => onSelectTemplate('danh_sach_lop')}
            className={`px-2 py-1 rounded ${currentTemplate === 'danh_sach_lop' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400'}`}
          >
            DS 14 Lớp
          </button>
        </div>
      </div>
    </header>
  );
};
