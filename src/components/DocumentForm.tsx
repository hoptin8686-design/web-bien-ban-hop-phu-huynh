import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Award, 
  CreditCard, 
  CheckCircle, 
  Plus, 
  Trash2, 
  Info,
  Calendar,
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react';
import { BienBanData, BoardMember, FeeItem, TemplateType } from '../types';

interface DocumentFormProps {
  data: BienBanData;
  onChange: (data: BienBanData) => void;
  templateType: TemplateType;
  onApplyPhucHoaSample: () => void;
}

export const DocumentForm: React.FC<DocumentFormProps> = ({
  data,
  onChange,
  templateType,
  onApplyPhucHoaSample
}) => {
  const [activeTab, setActiveTab] = useState<'chung' | 'thanh_phan' | 'ban_dai_dien' | 'khoan_thu' | 'ket_luan'>('chung');

  const updateField = <K extends keyof BienBanData>(key: K, value: BienBanData[K]) => {
    onChange({
      ...data,
      [key]: value,
    });
  };

  // Board Member Handlers
  const handleAddMember = () => {
    const newMember: BoardMember = {
      stt: data.danhSachBanDaiDien.length + 1,
      chucVu: 'Ủy viên',
      phuHuynh: '',
      hocSinh: '',
      lop: '',
      soDienThoai: '',
    };
    updateField('danhSachBanDaiDien', [...data.danhSachBanDaiDien, newMember]);
    updateField('soLuongBanDaiDien', data.danhSachBanDaiDien.length + 1);
  };

  const handleUpdateMember = (index: number, field: keyof BoardMember, val: string | number) => {
    const updated = [...data.danhSachBanDaiDien];
    updated[index] = { ...updated[index], [field]: val };
    updateField('danhSachBanDaiDien', updated);
  };

  const handleRemoveMember = (index: number) => {
    const updated = data.danhSachBanDaiDien.filter((_, idx) => idx !== index).map((m, idx) => ({ ...m, stt: idx + 1 }));
    updateField('danhSachBanDaiDien', updated);
    updateField('soLuongBanDaiDien', updated.length);
  };

  // Fee Item Handlers
  const handleAddFee = () => {
    const newFee: FeeItem = {
      id: Date.now().toString(),
      tenKhoanThu: '',
      mucThu: '',
      hinhThuc: 'Thỏa thuận',
      ghiChu: '',
    };
    updateField('danhSachKhoanThu', [...data.danhSachKhoanThu, newFee]);
  };

  const handleUpdateFee = (index: number, field: keyof FeeItem, val: string) => {
    const updated = [...data.danhSachKhoanThu];
    updated[index] = { ...updated[index], [field]: val };
    updateField('danhSachKhoanThu', updated);
  };

  const handleRemoveFee = (index: number) => {
    const updated = data.danhSachKhoanThu.filter((_, idx) => idx !== index);
    updateField('danhSachKhoanThu', updated);
  };

  // Conclusions Handlers
  const handleUpdateConclusion = (index: number, val: string) => {
    const updated = [...data.ketLuanChuToa];
    updated[index] = val;
    updateField('ketLuanChuToa', updated);
  };

  const handleAddConclusion = () => {
    updateField('ketLuanChuToa', [...data.ketLuanChuToa, '']);
  };

  const handleRemoveConclusion = (index: number) => {
    updateField('ketLuanChuToa', data.ketLuanChuToa.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
      {/* Form Header */}
      <div className="p-4 bg-gradient-to-r from-slate-50 to-blue-50/50 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <span>Tuỳ Chỉnh Thông Tin Biên Bản</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-normal">
              {templateType === 'truong_ban' ? 'Mẫu Trưởng Ban' : 'Mẫu Lớp Học'}
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Mọi thay đổi sẽ cập nhật trực tiếp vào văn bản Word và bản xem trước
          </p>
        </div>
        <button
          onClick={onApplyPhucHoaSample}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-800 rounded-lg text-xs font-medium transition"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Nạp Mẫu THPT Phục Hòa</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50/70 overflow-x-auto">
        <button
          onClick={() => setActiveTab('chung')}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 transition whitespace-nowrap ${
            activeTab === 'chung'
              ? 'border-blue-600 text-blue-700 bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>1. Thông Tin Chung</span>
        </button>

        <button
          onClick={() => setActiveTab('thanh_phan')}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 transition whitespace-nowrap ${
            activeTab === 'thanh_phan'
              ? 'border-blue-600 text-blue-700 bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>2. Thành Phần Tham Dự</span>
        </button>

        <button
          onClick={() => setActiveTab('ban_dai_dien')}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 transition whitespace-nowrap ${
            activeTab === 'ban_dai_dien'
              ? 'border-blue-600 text-blue-700 bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>3. Ban Đại Diện ({data.danhSachBanDaiDien.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('khoan_thu')}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 transition whitespace-nowrap ${
            activeTab === 'khoan_thu'
              ? 'border-blue-600 text-blue-700 bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>4. Các Khoản Thu & Quỹ</span>
        </button>

        <button
          onClick={() => setActiveTab('ket_luan')}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 transition whitespace-nowrap ${
            activeTab === 'ket_luan'
              ? 'border-blue-600 text-blue-700 bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <CheckCircle className="w-3.5 h-3.5" />
          <span>5. Kết Luận & Ký Tên</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="p-5 overflow-y-auto space-y-4 flex-1">
        {/* TAB 1: THÔNG TIN CHUNG */}
        {activeTab === 'chung' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Cơ quan quản lý cấp trên
                </label>
                <input
                  type="text"
                  value={data.coQuanCapTren}
                  onChange={(e) => updateField('coQuanCapTren', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="SỞ GD&ĐT CAO BẰNG"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tên đơn vị / Trường học
                </label>
                <input
                  type="text"
                  value={data.tenTruong}
                  onChange={(e) => updateField('tenTruong', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="TRƯỜNG THPT PHỤC HÒA"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tiêu đề biên bản
                </label>
                <input
                  type="text"
                  value={data.tieuDe}
                  onChange={(e) => updateField('tieuDe', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Năm học
                </label>
                <input
                  type="text"
                  value={data.namHoc}
                  onChange={(e) => updateField('namHoc', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-center font-bold"
                  placeholder="2026 - 2027"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-500" />
                <span>Địa danh, ngày tháng văn bản (góc phải tiêu đề)</span>
              </label>
              <input
                type="text"
                value={data.diaDiemNgayThang}
                onChange={(e) => updateField('diaDiemNgayThang', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none italic"
                placeholder="Phục Hòa, ngày 27 tháng 9 năm 2026"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-500" />
                  <span>Thời gian họp</span>
                </label>
                <input
                  type="text"
                  value={data.thoiGian}
                  onChange={(e) => updateField('thoiGian', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="08h00 ngày 27 tháng 9 năm 2026"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-500" />
                  <span>Địa điểm họp</span>
                </label>
                <input
                  type="text"
                  value={data.diaDiem}
                  onChange={(e) => updateField('diaDiem', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Phòng hội đồng Trường THPT Phục Hòa"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Căn cứ pháp lý / Văn bản hướng dẫn
              </label>
              <textarea
                rows={2}
                value={data.canCuPhapLy}
                onChange={(e) => updateField('canCuPhapLy', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {templateType === 'lop_hoc' && (
              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200 grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-blue-900 mb-1">Tên lớp</label>
                  <input
                    type="text"
                    value={data.tenLop || ''}
                    onChange={(e) => updateField('tenLop', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-blue-300 rounded-lg font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-blue-900 mb-1">Sĩ số lớp</label>
                  <input
                    type="number"
                    value={data.siSoLop || 0}
                    onChange={(e) => updateField('siSoLop', parseInt(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-blue-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-blue-900 mb-1">Số nam</label>
                  <input
                    type="number"
                    value={data.siSoNam || 0}
                    onChange={(e) => updateField('siSoNam', parseInt(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-blue-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-blue-900 mb-1">Số nữ</label>
                  <input
                    type="number"
                    value={data.siSoNu || 0}
                    onChange={(e) => updateField('siSoNu', parseInt(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-blue-300 rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: THÀNH PHẦN THAM DỰ */}
        {activeTab === 'thanh_phan' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="text-xs font-bold text-slate-800 mb-2">Chủ tọa / Người chủ trì</h3>
                <div className="space-y-2">
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-0.5">Họ và tên</label>
                    <input
                      type="text"
                      value={data.chuToa}
                      onChange={(e) => updateField('chuToa', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-0.5">Chức vụ</label>
                    <input
                      type="text"
                      value={data.chuToaChucVu}
                      onChange={(e) => updateField('chuToaChucVu', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                      placeholder="Hiệu trưởng / Giáo viên chủ nhiệm"
                    />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="text-xs font-bold text-slate-800 mb-2">Thư ký cuộc họp</h3>
                <div className="space-y-2">
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-0.5">Họ và tên</label>
                    <input
                      type="text"
                      value={data.thuKy}
                      onChange={(e) => updateField('thuKy', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-0.5">Chức vụ</label>
                    <input
                      type="text"
                      value={data.thuKyChucVu}
                      onChange={(e) => updateField('thuKyChucVu', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                      placeholder="Thư ký hội đồng / Phụ huynh học sinh"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Chi tiết thành phần tham dự (mỗi dòng một ý)
              </label>
              <textarea
                rows={4}
                value={data.thanhPhanThamDuText}
                onChange={(e) => updateField('thanhPhanThamDuText', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
              />
            </div>

            <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">Tổng số đại biểu triệu tập</label>
                <input
                  type="number"
                  value={data.soLuongTong}
                  onChange={(e) => updateField('soLuongTong', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">Có mặt</label>
                <input
                  type="number"
                  value={data.soLuongCoMat}
                  onChange={(e) => updateField('soLuongCoMat', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg font-bold text-green-700"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">Vắng mặt</label>
                <input
                  type="number"
                  value={data.soLuongVangMat}
                  onChange={(e) => updateField('soLuongVangMat', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg font-bold text-rose-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Lý do vắng mặt (nếu có)
              </label>
              <input
                type="text"
                value={data.lyDoVangMat}
                onChange={(e) => updateField('lyDoVangMat', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* TAB 3: BAN ĐẠI DIỆN */}
        {activeTab === 'ban_dai_dien' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-800">
                  Danh Sách Ban Đại Diện Cha Mẹ Học Sinh
                </h3>
                <p className="text-[11px] text-slate-500">
                  Hiện có {data.danhSachBanDaiDien.length} thành viên được bầu vào ban đại diện
                </p>
              </div>
              <button
                onClick={handleAddMember}
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm Thành Viên</span>
              </button>
            </div>

            <div className="space-y-3">
              {data.danhSachBanDaiDien.map((member, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 relative group">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                      #{idx + 1}
                    </span>
                    <button
                      onClick={() => handleRemoveMember(idx)}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded transition"
                      title="Xóa thành viên"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-0.5">Chức vụ</label>
                      <input
                        type="text"
                        value={member.chucVu}
                        onChange={(e) => handleUpdateMember(idx, 'chucVu', e.target.value)}
                        className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded font-semibold"
                        placeholder="Trưởng ban / Phó ban / Kế toán / Ủy viên"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-0.5">Họ tên Phụ huynh</label>
                      <input
                        type="text"
                        value={member.phuHuynh}
                        onChange={(e) => handleUpdateMember(idx, 'phuHuynh', e.target.value)}
                        className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded font-bold text-slate-800"
                        placeholder="Nguyễn Văn A"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-0.5">Số điện thoại</label>
                      <input
                        type="text"
                        value={member.soDienThoai}
                        onChange={(e) => handleUpdateMember(idx, 'soDienThoai', e.target.value)}
                        className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded font-mono"
                        placeholder="09xx..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-0.5">Phụ huynh học sinh</label>
                      <input
                        type="text"
                        value={member.hocSinh}
                        onChange={(e) => handleUpdateMember(idx, 'hocSinh', e.target.value)}
                        className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded"
                        placeholder="Tên học sinh"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-0.5">Lớp</label>
                      <input
                        type="text"
                        value={member.lop}
                        onChange={(e) => handleUpdateMember(idx, 'lop', e.target.value)}
                        className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded font-semibold"
                        placeholder="11A3"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: KHOẢN THU & QUỸ */}
        {activeTab === 'khoan_thu' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-800">
                  Các Khoản Thu Quy Định & Thỏa Thuận
                </h3>
                <p className="text-[11px] text-slate-500">
                  Liệt kê các khoản thu công khai theo đúng quy định Thông tư 55/2011
                </p>
              </div>
              <button
                onClick={handleAddFee}
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm Khoản Thu</span>
              </button>
            </div>

            <div className="space-y-3">
              {data.danhSachKhoanThu.map((fee, idx) => (
                <div key={fee.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">
                      Khoản #{idx + 1}
                    </span>
                    <button
                      onClick={() => handleRemoveFee(idx)}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded transition"
                      title="Xóa khoản thu này"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] text-slate-500 mb-0.5">Tên khoản thu</label>
                      <input
                        type="text"
                        value={fee.tenKhoanThu}
                        onChange={(e) => handleUpdateFee(idx, 'tenKhoanThu', e.target.value)}
                        className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded font-semibold"
                        placeholder="Nước uống / BHYT / Quỹ đại diện CMHS..."
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-0.5">Hình thức</label>
                      <select
                        value={fee.hinhThuc}
                        onChange={(e) => handleUpdateFee(idx, 'hinhThuc', e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-slate-300 rounded bg-white"
                      >
                        <option value="Thỏa thuận">Thỏa thuận</option>
                        <option value="Tự nguyện">Tự nguyện</option>
                        <option value="Bắt buộc">Bắt buộc</option>
                        <option value="Quy định">Quy định</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-0.5">Mức thu dự kiến</label>
                      <input
                        type="text"
                        value={fee.mucThu}
                        onChange={(e) => handleUpdateFee(idx, 'mucThu', e.target.value)}
                        className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded font-semibold text-blue-700"
                        placeholder="Theo quy định nhà nước / Tự nguyện..."
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-0.5">Ghi chú</label>
                      <input
                        type="text"
                        value={fee.ghiChu}
                        onChange={(e) => handleUpdateFee(idx, 'ghiChu', e.target.value)}
                        className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded text-slate-600"
                        placeholder="Căn cứ nghị quyết, hướng dẫn..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl">
              <label className="block text-xs font-bold text-amber-900 mb-1">
                Tồn quỹ của năm học trước bàn giao lại
              </label>
              <input
                type="text"
                value={data.quyConDuNamTruoc}
                onChange={(e) => updateField('quyConDuNamTruoc', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-amber-300 rounded-lg bg-white font-semibold text-amber-950"
                placeholder="0 đồng (hoặc số tiền cụ thể đã kết toán)"
              />
            </div>
          </div>
        )}

        {/* TAB 5: KẾT LUẬN & CHỮ KÝ */}
        {activeTab === 'ket_luan' && (
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-800">
                  Kết luận của Chủ tọa cuộc họp
                </label>
                <button
                  onClick={handleAddConclusion}
                  className="flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 font-medium"
                >
                  <Plus className="w-3 h-3" />
                  <span>Thêm ý kết luận</span>
                </button>
              </div>

              <div className="space-y-2">
                {data.ketLuanChuToa.map((kl, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-xs font-bold text-slate-400 mt-2">{idx + 1}.</span>
                    <textarea
                      rows={2}
                      value={kl}
                      onChange={(e) => handleUpdateConclusion(idx, e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <button
                      onClick={() => handleRemoveConclusion(idx)}
                      className="text-slate-400 hover:text-rose-500 p-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Kết quả Biểu quyết</h4>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-600 mb-1">Nhất trí</label>
                  <input
                    type="text"
                    value={data.tiLeNhatTri}
                    onChange={(e) => updateField('tiLeNhatTri', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded font-bold text-green-700"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 mb-1">Không nhất trí</label>
                  <input
                    type="text"
                    value={data.tiLeKhongNhatTri}
                    onChange={(e) => updateField('tiLeKhongNhatTri', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded font-bold text-slate-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 mb-1">Ý kiến khác</label>
                  <input
                    type="text"
                    value={data.yKienKhac}
                    onChange={(e) => updateField('yKienKhac', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded font-semibold text-slate-600"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Thời gian bế mạc cuộc họp
              </label>
              <input
                type="text"
                value={data.thoiGianKetThuc}
                onChange={(e) => updateField('thoiGianKetThuc', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                placeholder="11h15 cùng ngày"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <h5 className="text-xs font-bold text-slate-800 mb-2">Chữ ký bên trái (Thư ký)</h5>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={data.chuKyBenTraiChucDanh}
                    onChange={(e) => updateField('chuKyBenTraiChucDanh', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded font-bold uppercase"
                    placeholder="THƯ KÝ"
                  />
                  <input
                    type="text"
                    value={data.chuKyBenTraiHoTen}
                    onChange={(e) => updateField('chuKyBenTraiHoTen', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded font-bold"
                    placeholder="Họ tên Thư ký"
                  />
                </div>
              </div>

              <div>
                <h5 className="text-xs font-bold text-slate-800 mb-2">Chữ ký bên phải (Chủ tọa / GVCN)</h5>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={data.chuKyBenPhaiChucDanh}
                    onChange={(e) => updateField('chuKyBenPhaiChucDanh', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded font-bold uppercase"
                    placeholder="CHỦ TỌA / HIỆU TRƯỞNG"
                  />
                  <input
                    type="text"
                    value={data.chuKyBenPhaiHoTen}
                    onChange={(e) => updateField('chuKyBenPhaiHoTen', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded font-bold"
                    placeholder="Họ tên Chủ tọa"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
