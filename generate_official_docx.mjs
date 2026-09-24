import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
} from 'docx';
import fs from 'fs';

const borderNone = {
  top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  left: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
};

const tableBorderSingle = {
  top: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
  bottom: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
  left: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
  right: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
};

const headerTable = new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  borders: borderNone,
  rows: [
    new TableRow({
      children: [
        new TableCell({
          width: { size: 45, type: WidthType.PERCENTAGE },
          borders: borderNone,
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: 'SỞ GD&ĐT CAO BẰNG', font: 'Times New Roman', size: 24 }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: 'TRƯỜNG THPT PHỤC HÒA', bold: true, font: 'Times New Roman', size: 24 }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: '---------------------', bold: true, font: 'Times New Roman', size: 20 }),
              ],
            }),
          ],
        }),
        new TableCell({
          width: { size: 55, type: WidthType.PERCENTAGE },
          borders: borderNone,
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: 'CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM', bold: true, font: 'Times New Roman', size: 24 }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: 'Độc lập – Tự do – Hạnh phúc', bold: true, font: 'Times New Roman', size: 26 }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: '---------------------------------', bold: true, font: 'Times New Roman', size: 20 }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

// Bảng Ban đại diện
const boardHeaderRow = new TableRow({
  children: [
    new TableCell({
      borders: tableBorderSingle,
      width: { size: 8, type: WidthType.PERCENTAGE },
      children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'STT', bold: true, font: 'Times New Roman', size: 24 })] })],
    }),
    new TableCell({
      borders: tableBorderSingle,
      width: { size: 20, type: WidthType.PERCENTAGE },
      children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Chức vụ', bold: true, font: 'Times New Roman', size: 24 })] })],
    }),
    new TableCell({
      borders: tableBorderSingle,
      width: { size: 26, type: WidthType.PERCENTAGE },
      children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Họ tên Phụ huynh', bold: true, font: 'Times New Roman', size: 24 })] })],
    }),
    new TableCell({
      borders: tableBorderSingle,
      width: { size: 20, type: WidthType.PERCENTAGE },
      children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Học sinh', bold: true, font: 'Times New Roman', size: 24 })] })],
    }),
    new TableCell({
      borders: tableBorderSingle,
      width: { size: 10, type: WidthType.PERCENTAGE },
      children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Lớp', bold: true, font: 'Times New Roman', size: 24 })] })],
    }),
    new TableCell({
      borders: tableBorderSingle,
      width: { size: 16, type: WidthType.PERCENTAGE },
      children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Số điện thoại', bold: true, font: 'Times New Roman', size: 24 })] })],
    }),
  ],
});

const boardMembers = [
  { stt: 1, chucVu: 'Trưởng ban', phuHuynh: 'Lê Hoài Nam', hocSinh: 'Lê Ngọc Linh', lop: '11A3', sdt: '0912.345.678' },
  { stt: 2, chucVu: 'Phó ban', phuHuynh: 'Đặng Tố Uyên', hocSinh: 'Nông Khánh Chi', lop: '12A1', sdt: '0866115267' },
  { stt: 3, chucVu: 'Phó ban', phuHuynh: 'Lương Văn Trường', hocSinh: 'Lương Tuấn Anh', lop: '10A2', sdt: '0983.123.456' },
  { stt: 4, chucVu: 'Kế toán', phuHuynh: 'Tống Thị Nguyệt', hocSinh: 'Nông Bính Ngọ', lop: '11A1', sdt: '0988508118' },
  { stt: 5, chucVu: 'Ủy viên', phuHuynh: 'Trần Thu Hương', hocSinh: 'Trần Minh Quân', lop: '10A5', sdt: '0394676974' },
];

const boardDataRows = boardMembers.map((m) => new TableRow({
  children: [
    new TableCell({ borders: tableBorderSingle, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: m.stt.toString(), font: 'Times New Roman', size: 24 })] })] }),
    new TableCell({ borders: tableBorderSingle, children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: m.chucVu, bold: true, font: 'Times New Roman', size: 24 })] })] }),
    new TableCell({ borders: tableBorderSingle, children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: m.phuHuynh, bold: true, font: 'Times New Roman', size: 24 })] })] }),
    new TableCell({ borders: tableBorderSingle, children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: m.hocSinh, font: 'Times New Roman', size: 24 })] })] }),
    new TableCell({ borders: tableBorderSingle, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: m.lop, bold: true, font: 'Times New Roman', size: 24 })] })] }),
    new TableCell({ borders: tableBorderSingle, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: m.sdt, font: 'Times New Roman', size: 24 })] })] }),
  ],
}));

const boardTable = new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  borders: tableBorderSingle,
  rows: [boardHeaderRow, ...boardDataRows],
});

// Bảng Khoản thu
const feeHeaderRow = new TableRow({
  children: [
    new TableCell({ borders: tableBorderSingle, width: { size: 8, type: WidthType.PERCENTAGE }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'STT', bold: true, font: 'Times New Roman', size: 24 })] })] }),
    new TableCell({ borders: tableBorderSingle, width: { size: 36, type: WidthType.PERCENTAGE }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Nội dung khoản thu', bold: true, font: 'Times New Roman', size: 24 })] })] }),
    new TableCell({ borders: tableBorderSingle, width: { size: 22, type: WidthType.PERCENTAGE }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Mức thu dự kiến', bold: true, font: 'Times New Roman', size: 24 })] })] }),
    new TableCell({ borders: tableBorderSingle, width: { size: 16, type: WidthType.PERCENTAGE }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Hình thức', bold: true, font: 'Times New Roman', size: 24 })] })] }),
    new TableCell({ borders: tableBorderSingle, width: { size: 18, type: WidthType.PERCENTAGE }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Ghi chú', bold: true, font: 'Times New Roman', size: 24 })] })] }),
  ],
});

const fees = [
  { stt: 1, ten: 'Bảo hiểm y tế học sinh', muc: 'Theo quy định nhà nước', hinhThuc: 'Bắt buộc', ghiChu: 'Theo quy định của BHXH' },
  { stt: 2, ten: 'Kinh phí hoạt động Ban đại diện CMHS trường', muc: 'Tự nguyện thỏa thuận', hinhThuc: 'Tự nguyện', ghiChu: 'Theo Thông tư 55/2011/TT-BGDĐT' },
  { stt: 3, ten: 'Nước uống học sinh', muc: 'Thỏa thuận theo kỳ', hinhThuc: 'Thỏa thuận', ghiChu: 'Nước tinh khiết cả năm học' },
  { stt: 4, ten: 'Sổ liên lạc điện tử / Ứng dụng kết nối', muc: 'Thỏa thuận', hinhThuc: 'Thỏa thuận', ghiChu: 'Thông tin kết quả rèn luyện' },
  { stt: 5, ten: 'Đồng phục học sinh (Áo khoác, áo cộc, phù hiệu)', muc: 'Theo giá nhà cung ứng', hinhThuc: 'Thỏa thuận', ghiChu: 'Quy định đồng phục nhà trường' },
  { stt: 6, ten: 'Bảo hiểm thân thể học sinh (tự nguyện)', muc: 'Theo công ty bảo hiểm', hinhThuc: 'Tự nguyện', ghiChu: 'Tự nguyện tham gia' },
];

const feeDataRows = fees.map((f) => new TableRow({
  children: [
    new TableCell({ borders: tableBorderSingle, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: f.stt.toString(), font: 'Times New Roman', size: 24 })] })] }),
    new TableCell({ borders: tableBorderSingle, children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: f.ten, bold: true, font: 'Times New Roman', size: 24 })] })] }),
    new TableCell({ borders: tableBorderSingle, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: f.muc, font: 'Times New Roman', size: 24 })] })] }),
    new TableCell({ borders: tableBorderSingle, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: f.hinhThuc, font: 'Times New Roman', size: 24 })] })] }),
    new TableCell({ borders: tableBorderSingle, children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: f.ghiChu, font: 'Times New Roman', size: 22 })] })] }),
  ],
}));

const feeTable = new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  borders: tableBorderSingle,
  rows: [feeHeaderRow, ...feeDataRows],
});

// Chữ ký
const signatureTable = new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  borders: borderNone,
  rows: [
    new TableRow({
      children: [
        new TableCell({
          width: { size: 50, type: WidthType.PERCENTAGE },
          borders: borderNone,
          children: [
            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'THƯ KÝ', bold: true, font: 'Times New Roman', size: 26 })] }),
            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '(Ký và ghi rõ họ tên)', italics: true, font: 'Times New Roman', size: 22 })] }),
            new Paragraph({ text: '', spacing: { before: 1400 } }),
            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Đàm Thị Hợp', bold: true, font: 'Times New Roman', size: 26 })] }),
          ],
        }),
        new TableCell({
          width: { size: 50, type: WidthType.PERCENTAGE },
          borders: borderNone,
          children: [
            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'CHỦ TỌA\nHIỆU TRƯỞNG', bold: true, font: 'Times New Roman', size: 26 })] }),
            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '(Ký và ghi rõ họ tên, đóng dấu)', italics: true, font: 'Times New Roman', size: 22 })] }),
            new Paragraph({ text: '', spacing: { before: 1400 } }),
            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Hoàng Trung Kiên', bold: true, font: 'Times New Roman', size: 26 })] }),
          ],
        }),
      ],
    }),
  ],
});

const doc = new Document({
  sections: [
    {
      properties: {
        page: {
          margin: { top: 1134, bottom: 1134, left: 1701, right: 1134 },
        },
      },
      children: [
        headerTable,
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          spacing: { before: 140, after: 180 },
          children: [new TextRun({ text: 'Phục Hòa, ngày 27 tháng 9 năm 2026', italics: true, font: 'Times New Roman', size: 24 })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 140, after: 60 },
          children: [new TextRun({ text: 'BIÊN BẢN HỌP TRƯỞNG PHỤ HUYNH CÁC LỚP', bold: true, font: 'Times New Roman', size: 32 })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 40, after: 280 },
          children: [new TextRun({ text: 'NĂM HỌC 2026 - 2027', bold: true, font: 'Times New Roman', size: 26 })],
        }),

        new Paragraph({
          alignment: AlignmentType.LEFT,
          spacing: { before: 160, after: 80 },
          children: [new TextRun({ text: 'I. THỜI GIAN, ĐỊA ĐIỂM, THÀNH PHẦN', bold: true, font: 'Times New Roman', size: 26 })],
        }),
        new Paragraph({
          indent: { firstLine: 400 },
          children: [
            new TextRun({ text: '1. Thời gian: ', bold: true, font: 'Times New Roman', size: 26 }),
            new TextRun({ text: '08h00 ngày 27 tháng 9 năm 2026', font: 'Times New Roman', size: 26 }),
          ],
        }),
        new Paragraph({
          indent: { firstLine: 400 },
          children: [
            new TextRun({ text: '2. Địa điểm: ', bold: true, font: 'Times New Roman', size: 26 }),
            new TextRun({ text: 'Phòng Hội đồng Trường THPT Phục Hòa', font: 'Times New Roman', size: 26 }),
          ],
        }),
        new Paragraph({
          indent: { firstLine: 400 },
          children: [new TextRun({ text: '3. Thành phần tham dự:', bold: true, font: 'Times New Roman', size: 26 })],
        }),
        new Paragraph({ indent: { left: 400 }, children: [new TextRun({ text: '- Thầy Hoàng Trung Kiên - Hiệu trưởng, chủ tọa.', font: 'Times New Roman', size: 26 })] }),
        new Paragraph({ indent: { left: 400 }, children: [new TextRun({ text: '- 14 phụ huynh đại diện 14 lớp.', font: 'Times New Roman', size: 26 })] }),
        new Paragraph({ indent: { left: 400 }, children: [new TextRun({ text: '- 14 Giáo viên chủ nhiệm (GVCN) các lớp.', font: 'Times New Roman', size: 26 })] }),
        new Paragraph({ indent: { left: 400 }, children: [new TextRun({ text: '- Thư ký hội đồng: Cô Đàm Thị Hợp.', font: 'Times New Roman', size: 26 })] }),
        new Paragraph({
          indent: { firstLine: 400 },
          spacing: { before: 60, after: 160 },
          children: [
            new TextRun({ text: '- Có mặt: ', font: 'Times New Roman', size: 26 }),
            new TextRun({ text: '56/56', bold: true, font: 'Times New Roman', size: 26 }),
            new TextRun({ text: ' đồng chí/đại biểu; Vắng mặt: ', font: 'Times New Roman', size: 26 }),
            new TextRun({ text: '0', bold: true, font: 'Times New Roman', size: 26 }),
            new TextRun({ text: ' (Lý do: Không).', font: 'Times New Roman', size: 26 }),
          ],
        }),

        new Paragraph({
          alignment: AlignmentType.LEFT,
          spacing: { before: 160, after: 80 },
          children: [new TextRun({ text: 'II. NỘI DUNG CUỘC HỌP', bold: true, font: 'Times New Roman', size: 26 })],
        }),
        new Paragraph({
          indent: { firstLine: 400 },
          alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun({ text: 'Thầy Hoàng Trung Kiên – Hiệu trưởng nhà trường thông qua nội dung chương trình cuộc họp gồm các phần:', bold: true, font: 'Times New Roman', size: 26 })],
        }),
        new Paragraph({
          indent: { firstLine: 400 },
          spacing: { before: 80, after: 60 },
          children: [new TextRun({ text: '1. Phổ biến quy định và báo cáo triển khai nhiệm vụ năm học', bold: true, font: 'Times New Roman', size: 26 })],
        }),
        new Paragraph({
          indent: { firstLine: 400 },
          alignment: AlignmentType.JUSTIFIED,
          children: [
            new TextRun({ text: 'Căn cứ: ', italics: true, font: 'Times New Roman', size: 26 }),
            new TextRun({ text: 'Thông tư số 55/2011/TT-BGDĐT ngày 22/11/2011 của Bộ Giáo dục và Đào tạo về Điều lệ Ban đại diện cha mẹ học sinh.', font: 'Times New Roman', size: 26 }),
          ],
        }),
        new Paragraph({
          indent: { firstLine: 400 },
          alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun({ text: 'Hiệu trưởng nhà trường phổ biến và thông qua các nội dung quy định theo Thông tư 55/2011/TT-BGDĐT về tổ chức và hoạt động của Ban đại diện cha mẹ học sinh; báo cáo tóm tắt kế hoạch năm học 2026-2027.', font: 'Times New Roman', size: 26 })],
        }),

        new Paragraph({
          indent: { firstLine: 400 },
          spacing: { before: 120, after: 60 },
          children: [new TextRun({ text: '2. Bầu Ban đại diện cha mẹ học sinh', bold: true, font: 'Times New Roman', size: 26 })],
        }),
        new Paragraph({
          indent: { firstLine: 400 },
          children: [
            new TextRun({ text: 'Số lượng Ban đại diện cha mẹ học sinh được cuộc họp thống nhất ấn định: ', font: 'Times New Roman', size: 26 }),
            new TextRun({ text: '05 người', bold: true, font: 'Times New Roman', size: 26 }),
            new TextRun({ text: '. Danh sách cụ thể như sau:', font: 'Times New Roman', size: 26 }),
          ],
        }),
        boardTable,
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          spacing: { before: 60, after: 140 },
          children: [new TextRun({ text: '(Danh sách ấn định 05 người./.)', italics: true, font: 'Times New Roman', size: 24 })],
        }),

        new Paragraph({
          indent: { firstLine: 400 },
          spacing: { before: 120, after: 60 },
          children: [new TextRun({ text: '3. Triển khai dự kiến một số hoạt động và các khoản thu năm học 2026-2027', bold: true, font: 'Times New Roman', size: 26 })],
        }),
        new Paragraph({
          indent: { firstLine: 400 },
          children: [new TextRun({ text: 'Các khoản thu thỏa thuận và quy định phục vụ học sinh:', italics: true, font: 'Times New Roman', size: 26 })],
        }),
        feeTable,

        new Paragraph({
          indent: { firstLine: 400 },
          spacing: { before: 140, after: 60 },
          children: [new TextRun({ text: '4. Thông báo quỹ còn dư của năm học trước', bold: true, font: 'Times New Roman', size: 26 })],
        }),
        new Paragraph({
          indent: { firstLine: 400 },
          children: [new TextRun({ text: '- Quỹ còn: 0 đồng (hoặc số tiền đã quyết toán bàn giao lại đầy đủ cho Ban đại diện/kế toán phụ huynh năm học mới 2026-2027).', font: 'Times New Roman', size: 26 })],
        }),

        new Paragraph({
          alignment: AlignmentType.LEFT,
          spacing: { before: 160, after: 80 },
          children: [new TextRun({ text: 'III. KẾT LUẬN VÀ BIỂU QUYẾT', bold: true, font: 'Times New Roman', size: 26 })],
        }),
        new Paragraph({
          indent: { firstLine: 400 },
          children: [new TextRun({ text: 'Đồng chí Hoàng Trung Kiên - Hiệu trưởng kết luận các nội dung:', bold: true, font: 'Times New Roman', size: 26 })],
        }),
        new Paragraph({ indent: { left: 400 }, children: [new TextRun({ text: '- Báo cáo tóm tắt kết quả năm học 2025-2026; phương hướng, nhiệm vụ năm học 2026-2027 được toàn thể cuộc họp nhất trí.', font: 'Times New Roman', size: 26 })] }),
        new Paragraph({ indent: { left: 400 }, children: [new TextRun({ text: '- Các khoản thu đầu năm đã được thảo luận công khai và nhất trí 100%.', font: 'Times New Roman', size: 26 })] }),
        new Paragraph({ indent: { left: 400 }, children: [new TextRun({ text: '- Bầu ra được Ban đại diện Phụ huynh học sinh nhà trường gồm 05 ông bà tiêu biểu, trách nhiệm.', font: 'Times New Roman', size: 26 })] }),
        new Paragraph({ indent: { left: 400 }, children: [new TextRun({ text: '- Thống nhất các kỳ họp trong năm: Họp phụ huynh đầu năm học, cuối học kỳ I, kết thúc năm học và tổng kết.', font: 'Times New Roman', size: 26 })] }),

        new Paragraph({
          indent: { firstLine: 400 },
          spacing: { before: 80, after: 40 },
          children: [new TextRun({ text: 'Biểu quyết các nội dung trên:', bold: true, font: 'Times New Roman', size: 26 })],
        }),
        new Paragraph({ indent: { left: 600 }, children: [new TextRun({ text: '+ Nhất trí: 56/56 = 100%', bold: true, font: 'Times New Roman', size: 26 })] }),
        new Paragraph({ indent: { left: 600 }, children: [new TextRun({ text: '+ Không nhất trí: 0 = 0%', font: 'Times New Roman', size: 26 })] }),
        new Paragraph({ indent: { left: 600 }, children: [new TextRun({ text: '+ Ý kiến khác: Không', font: 'Times New Roman', size: 26 })] }),

        new Paragraph({
          indent: { firstLine: 400 },
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 80, after: 280 },
          children: [new TextRun({ text: 'Cuộc họp kết thúc hồi 11h15 cùng ngày, biên bản được thông qua trước các thành viên trong cuộc họp nhất trí ký tên./.', italics: true, font: 'Times New Roman', size: 26 })],
        }),

        signatureTable,
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  // Save to desktop
  const desktopPath = 'D:/Desktop/BIEN_BAN_HOP_PHU_HUYNH_DAU_NAM_2026-2027_CHUAN.docx';
  fs.writeFileSync(desktopPath, buffer);
  console.log('Saved to Desktop:', desktopPath);

  // Save to public folder
  const publicPath = 'D:/Du-an-web/web-bien-ban-hop-phu-huynh/public/BIEN_BAN_HOP_PHU_HUYNH_DAU_NAM_2026-2027_CHUAN.docx';
  fs.writeFileSync(publicPath, buffer);
  console.log('Saved to Public folder:', publicPath);
});
