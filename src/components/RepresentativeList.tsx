import React, { useState } from 'react';
import { 
  Download, 
  Printer, 
  Search, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Building2,
  Phone,
  UserCheck
} from 'lucide-react';
import { ClassRepresentative } from '../types';
import { exportClassListToDocx } from '../utils/docxExport';

interface RepresentativeListProps {
  initialList: ClassRepresentative[];
  schoolName: string;
}

export const RepresentativeList: React.FC<RepresentativeListProps> = ({
  initialList,
  schoolName,
}) => {
  const [list, setList] = useState<ClassRepresentative[]>(initialList);
  const [filterGrade, setFilterGrade] = useState<'all' | '10' | '11' | '12'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const filteredList = list.filter((item) => {
    const matchGrade =
      filterGrade === 'all' || item.lop.startsWith(filterGrade);
    const matchSearch =
      item.lop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.gvcn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.banDaiDien.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.soDienThoai.includes(searchTerm);
    return matchGrade && matchSearch;
  });

  const handleUpdate = (idx: number, field: keyof ClassRepresentative, val: string) => {
    const updated = [...list];
    updated[idx] = { ...updated[idx], [field]: val };
    setList(updated);
  };

  const handleExport = () => {
    exportClassListToDocx(list, `DS_BAN_DAI_DIEN_14_LOP_${schoolName.replace(/\s+/g, '_')}.docx`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-slate-50 to-blue-50/50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-600" />
            <span>Danh Sách Ban Đại Diện Cha Mẹ Học Sinh 14 Lớp Năm Học 2026-2027</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Dữ liệu trực tiếp theo biểu mẫu Trường THPT Phục Hòa (kèm GVCN và SĐT liên hệ)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>In danh sách</span>
          </button>

          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Tải Word (.docx)</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-slate-500 mr-1">Khối lớp:</span>
          {(['all', '10', '11', '12'] as const).map((grade) => (
            <button
              key={grade}
              onClick={() => setFilterGrade(grade)}
              className={`px-3 py-1 text-xs rounded-lg font-medium transition ${
                filterGrade === grade
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {grade === 'all' ? 'Tất cả (14 lớp)' : `Khối ${grade}`}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo lớp, GVCN, Phụ huynh..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Table Content */}
      <div className="flex-1 overflow-auto p-4">
        <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/90 text-slate-700 font-bold border-b border-slate-200 uppercase text-[11px]">
                <th className="p-3 w-12 text-center">STT</th>
                <th className="p-3 w-20 text-center">Lớp</th>
                <th className="p-3 w-48">Giáo viên chủ nhiệm</th>
                <th className="p-3">Ban Đại Diện CMHS Lớp</th>
                <th className="p-3 w-36">Số điện thoại</th>
                <th className="p-3 w-32">Ghi chú</th>
                <th className="p-3 w-16 text-center">Sửa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredList.map((item, index) => {
                const originalIdx = list.findIndex((l) => l.lop === item.lop);
                const isEditing = editingIndex === originalIdx;

                return (
                  <tr key={item.lop} className="hover:bg-blue-50/30 transition">
                    <td className="p-3 text-center font-medium text-slate-500">
                      {item.stt}
                    </td>
                    <td className="p-3 text-center">
                      <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {item.lop}
                      </span>
                    </td>
                    <td className="p-3 font-medium text-slate-800">
                      {item.gvcn}
                    </td>
                    <td className="p-3">
                      {isEditing ? (
                        <input
                          type="text"
                          value={item.banDaiDien}
                          onChange={(e) => handleUpdate(originalIdx, 'banDaiDien', e.target.value)}
                          className="w-full px-2 py-1 border border-blue-300 rounded font-semibold text-slate-800"
                        />
                      ) : (
                        <div className="flex items-center gap-1.5 font-bold text-slate-900">
                          <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                          <span>{item.banDaiDien || <span className="text-slate-400 font-normal italic">Chưa cập nhật</span>}</span>
                        </div>
                      )}
                    </td>
                    <td className="p-3">
                      {isEditing ? (
                        <input
                          type="text"
                          value={item.soDienThoai}
                          onChange={(e) => handleUpdate(originalIdx, 'soDienThoai', e.target.value)}
                          className="w-full px-2 py-1 border border-blue-300 rounded font-mono"
                        />
                      ) : (
                        <div className="flex items-center gap-1 font-mono text-slate-600">
                          {item.soDienThoai ? (
                            <>
                              <Phone className="w-3 h-3 text-slate-400" />
                              <span>{item.soDienThoai}</span>
                            </>
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="p-3 text-slate-500 text-[11px]">
                      {isEditing ? (
                        <input
                          type="text"
                          value={item.ghiChu}
                          onChange={(e) => handleUpdate(originalIdx, 'ghiChu', e.target.value)}
                          className="w-full px-2 py-1 border border-blue-300 rounded"
                        />
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px]">
                          {item.ghiChu || 'Hoàn tất'}
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => setEditingIndex(isEditing ? null : originalIdx)}
                        className={`p-1 rounded transition ${
                          isEditing
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'text-slate-400 hover:text-blue-600 hover:bg-slate-100'
                        }`}
                        title={isEditing ? 'Lưu' : 'Chỉnh sửa'}
                      >
                        {isEditing ? <Check className="w-4 h-4" /> : <Edit3 className="w-3.5 h-3.5" />}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-center justify-between">
          <p>
            📌 <strong>Lưu ý hành chính:</strong> Theo biểu mẫu nhà trường, GVCN các lớp cần hoàn thiện danh sách đại diện CMHS trước 12h ngày 27/9/2026.
          </p>
          <span className="font-semibold text-blue-700">14/14 Lớp hoàn thành</span>
        </div>
      </div>
    </div>
  );
};
