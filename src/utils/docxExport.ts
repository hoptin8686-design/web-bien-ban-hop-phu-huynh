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
import { saveAs } from 'file-saver';
import { BienBanData, ClassRepresentative } from '../types';

export const exportBienBanToDocx = async (data: BienBanData, fileName?: string) => {
  const defaultFileName = fileName || `${data.tieuDe.replace(/\s+/g, '_')}_${data.namHoc.replace(/\s+/g, '')}.docx`;

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

  // Header 2 cột: Cơ quan ban hành (trái) và Quốc hiệu Tiêu ngữ (phải)
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
                  new TextRun({
                    text: data.coQuanCapTren.toUpperCase(),
                    font: 'Times New Roman',
                    size: 24, // 12pt
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: data.tenTruong.toUpperCase(),
                    bold: true,
                    font: 'Times New Roman',
                    size: 24, // 12pt
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: '---------------------',
                    bold: true,
                    font: 'Times New Roman',
                    size: 20,
                  }),
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
                  new TextRun({
                    text: 'CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM',
                    bold: true,
                    font: 'Times New Roman',
                    size: 24, // 12pt
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'Độc lập – Tự do – Hạnh phúc',
                    bold: true,
                    font: 'Times New Roman',
                    size: 26, // 13pt
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: '---------------------------------',
                    bold: true,
                    font: 'Times New Roman',
                    size: 20,
                  }),
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
        width: { size: 22, type: WidthType.PERCENTAGE },
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Chức vụ', bold: true, font: 'Times New Roman', size: 24 })] })],
      }),
      new TableCell({
        borders: tableBorderSingle,
        width: { size: 24, type: WidthType.PERCENTAGE },
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Họ tên Phụ huynh', bold: true, font: 'Times New Roman', size: 24 })] })],
      }),
      new TableCell({
        borders: tableBorderSingle,
        width: { size: 22, type: WidthType.PERCENTAGE },
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Học sinh', bold: true, font: 'Times New Roman', size: 24 })] })],
      }),
      new TableCell({
        borders: tableBorderSingle,
        width: { size: 10, type: WidthType.PERCENTAGE },
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Lớp', bold: true, font: 'Times New Roman', size: 24 })] })],
      }),
      new TableCell({
        borders: tableBorderSingle,
        width: { size: 14, type: WidthType.PERCENTAGE },
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Số điện thoại', bold: true, font: 'Times New Roman', size: 24 })] })],
      }),
    ],
  });

  const boardDataRows = data.danhSachBanDaiDien.map((member, idx) => {
    return new TableRow({
      children: [
        new TableCell({
          borders: tableBorderSingle,
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: (idx + 1).toString(), font: 'Times New Roman', size: 24 })] })],
        }),
        new TableCell({
          borders: tableBorderSingle,
          children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: member.chucVu, bold: member.chucVu.includes('Trưởng') || member.chucVu.includes('Phó'), font: 'Times New Roman', size: 24 })] })],
        }),
        new TableCell({
          borders: tableBorderSingle,
          children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: member.phuHuynh, bold: true, font: 'Times New Roman', size: 24 })] })],
        }),
        new TableCell({
          borders: tableBorderSingle,
          children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: member.hocSinh || '-', font: 'Times New Roman', size: 24 })] })],
        }),
        new TableCell({
          borders: tableBorderSingle,
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: member.lop || '-', font: 'Times New Roman', size: 24 })] })],
        }),
        new TableCell({
          borders: tableBorderSingle,
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: member.soDienThoai || '-', font: 'Times New Roman', size: 24 })] })],
        }),
      ],
    });
  });

  const boardTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: tableBorderSingle,
    rows: [boardHeaderRow, ...boardDataRows],
  });

  // Bảng Khoản thu
  const feeHeaderRow = new TableRow({
    children: [
      new TableCell({
        borders: tableBorderSingle,
        width: { size: 8, type: WidthType.PERCENTAGE },
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'STT', bold: true, font: 'Times New Roman', size: 24 })] })],
      }),
      new TableCell({
        borders: tableBorderSingle,
        width: { size: 36, type: WidthType.PERCENTAGE },
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Nội dung khoản thu', bold: true, font: 'Times New Roman', size: 24 })] })],
      }),
      new TableCell({
        borders: tableBorderSingle,
        width: { size: 22, type: WidthType.PERCENTAGE },
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Mức thu dự kiến', bold: true, font: 'Times New Roman', size: 24 })] })],
      }),
      new TableCell({
        borders: tableBorderSingle,
        width: { size: 16, type: WidthType.PERCENTAGE },
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Hình thức', bold: true, font: 'Times New Roman', size: 24 })] })],
      }),
      new TableCell({
        borders: tableBorderSingle,
        width: { size: 18, type: WidthType.PERCENTAGE },
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Ghi chú', bold: true, font: 'Times New Roman', size: 24 })] })],
      }),
    ],
  });

  const feeDataRows = data.danhSachKhoanThu.map((fee, idx) => {
    return new TableRow({
      children: [
        new TableCell({
          borders: tableBorderSingle,
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: (idx + 1).toString(), font: 'Times New Roman', size: 24 })] })],
        }),
        new TableCell({
          borders: tableBorderSingle,
          children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: fee.tenKhoanThu, bold: true, font: 'Times New Roman', size: 24 })] })],
        }),
        new TableCell({
          borders: tableBorderSingle,
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: fee.mucThu, font: 'Times New Roman', size: 24 })] })],
        }),
        new TableCell({
          borders: tableBorderSingle,
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: fee.hinhThuc, font: 'Times New Roman', size: 24 })] })],
        }),
        new TableCell({
          borders: tableBorderSingle,
          children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: fee.ghiChu || '', font: 'Times New Roman', size: 22 })] })],
        }),
      ],
    });
  });

  const feeTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: tableBorderSingle,
    rows: [feeHeaderRow, ...feeDataRows],
  });

  // Chữ ký 2 bên (Thư ký - Chủ tọa / GVCN)
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
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: data.chuKyBenTraiChucDanh.toUpperCase(),
                    bold: true,
                    font: 'Times New Roman',
                    size: 26,
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: '(Ký và ghi rõ họ tên)',
                    italics: true,
                    font: 'Times New Roman',
                    size: 22,
                  }),
                ],
              }),
              new Paragraph({ text: '', spacing: { before: 1400 } }), // Khoảng trống ký tên
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: data.chuKyBenTraiHoTen,
                    bold: true,
                    font: 'Times New Roman',
                    size: 26,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            borders: borderNone,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: data.chuKyBenPhaiChucDanh.toUpperCase(),
                    bold: true,
                    font: 'Times New Roman',
                    size: 26,
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: '(Ký và ghi rõ họ tên, đóng dấu)',
                    italics: true,
                    font: 'Times New Roman',
                    size: 22,
                  }),
                ],
              }),
              new Paragraph({ text: '', spacing: { before: 1400 } }), // Khoảng trống ký tên
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: data.chuKyBenPhaiHoTen,
                    bold: true,
                    font: 'Times New Roman',
                    size: 26,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });

  // Tách dòng nội dung
  const formatMultiLines = (text: string, isBullet = false) => {
    return text.split('\n').filter(line => line.trim().length > 0).map(line => {
      return new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: isBullet ? { left: 400, hanging: 200 } : { firstLine: 400 },
        spacing: { line: 276, before: 60, after: 60 },
        children: [
          new TextRun({
            text: line.trim(),
            font: 'Times New Roman',
            size: 26,
          }),
        ],
      });
    });
  };

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1134, // 20mm
              bottom: 1134, // 20mm
              left: 1701, // 30mm
              right: 1134, // 20mm
            },
          },
        },
        children: [
          headerTable,
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            spacing: { before: 140, after: 180 },
            children: [
              new TextRun({
                text: data.diaDiemNgayThang,
                italics: true,
                font: 'Times New Roman',
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 140, after: 60 },
            children: [
              new TextRun({
                text: data.tieuDe.toUpperCase(),
                bold: true,
                font: 'Times New Roman',
                size: 32, // 16pt
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 40, after: 280 },
            children: [
              new TextRun({
                text: `NĂM HỌC ${data.namHoc}`,
                bold: true,
                font: 'Times New Roman',
                size: 26, // 13pt
              }),
            ],
          }),

          // I. THỜI GIAN, ĐỊA ĐIỂM, THÀNH PHẦN
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { before: 160, after: 80 },
            children: [
              new TextRun({
                text: 'I. THỜI GIAN, ĐỊA ĐIỂM, THÀNH PHẦN',
                bold: true,
                font: 'Times New Roman',
                size: 26,
              }),
            ],
          }),
          new Paragraph({
            indent: { firstLine: 400 },
            spacing: { before: 60, after: 60 },
            children: [
              new TextRun({ text: '1. Thời gian: ', bold: true, font: 'Times New Roman', size: 26 }),
              new TextRun({ text: data.thoiGian, font: 'Times New Roman', size: 26 }),
            ],
          }),
          new Paragraph({
            indent: { firstLine: 400 },
            spacing: { before: 60, after: 60 },
            children: [
              new TextRun({ text: '2. Địa điểm: ', bold: true, font: 'Times New Roman', size: 26 }),
              new TextRun({ text: data.diaDiem, font: 'Times New Roman', size: 26 }),
            ],
          }),
          new Paragraph({
            indent: { firstLine: 400 },
            spacing: { before: 60, after: 60 },
            children: [
              new TextRun({ text: '3. Thành phần tham dự:', bold: true, font: 'Times New Roman', size: 26 }),
            ],
          }),
          ...formatMultiLines(data.thanhPhanThamDuText, true),
          new Paragraph({
            indent: { firstLine: 400 },
            spacing: { before: 60, after: 160 },
            children: [
              new TextRun({ text: '- Có mặt: ', font: 'Times New Roman', size: 26 }),
              new TextRun({ text: `${data.soLuongCoMat}/${data.soLuongTong}`, bold: true, font: 'Times New Roman', size: 26 }),
              new TextRun({ text: ' đồng chí/đại biểu; Vắng mặt: ', font: 'Times New Roman', size: 26 }),
              new TextRun({ text: `${data.soLuongVangMat}`, bold: true, font: 'Times New Roman', size: 26 }),
              new TextRun({ text: ` (Lý do: ${data.lyDoVangMat}).`, font: 'Times New Roman', size: 26 }),
            ],
          }),

          // II. NỘI DUNG CUỘC HỌP
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { before: 160, after: 80 },
            children: [
              new TextRun({
                text: 'II. NỘI DUNG CUỘC HỌP',
                bold: true,
                font: 'Times New Roman',
                size: 26,
              }),
            ],
          }),
          new Paragraph({
            indent: { firstLine: 400 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { before: 60, after: 60 },
            children: [
              new TextRun({ text: `Đồng chí ${data.chuToa} – ${data.chuToaChucVu} chủ trì thông qua chương trình nội dung cuộc họp:`, bold: true, font: 'Times New Roman', size: 26 }),
            ],
          }),

          // 1.1 Căn cứ & Báo cáo
          new Paragraph({
            indent: { firstLine: 400 },
            spacing: { before: 80, after: 60 },
            children: [
              new TextRun({ text: '1. Phổ biến quy định và báo cáo triển khai nhiệm vụ năm học', bold: true, font: 'Times New Roman', size: 26 }),
            ],
          }),
          new Paragraph({
            indent: { firstLine: 400 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { before: 60, after: 60 },
            children: [
              new TextRun({ text: 'Căn cứ pháp lý: ', italics: true, font: 'Times New Roman', size: 26 }),
              new TextRun({ text: data.canCuPhapLy, font: 'Times New Roman', size: 26 }),
            ],
          }),
          ...formatMultiLines(data.noiDungBaoCao),

          // 1.2 Bầu Ban đại diện cha mẹ học sinh
          new Paragraph({
            indent: { firstLine: 400 },
            spacing: { before: 120, after: 60 },
            children: [
              new TextRun({ text: '2. Bầu Ban đại diện cha mẹ học sinh', bold: true, font: 'Times New Roman', size: 26 }),
            ],
          }),
          new Paragraph({
            indent: { firstLine: 400 },
            spacing: { before: 60, after: 100 },
            children: [
              new TextRun({ text: `Toàn thể cuộc họp đã thảo luận và thống nhất bầu ra Ban đại diện Cha mẹ học sinh gồm `, font: 'Times New Roman', size: 26 }),
              new TextRun({ text: `0${data.soLuongBanDaiDien} người`, bold: true, font: 'Times New Roman', size: 26 }),
              new TextRun({ text: `, cụ thể như sau:`, font: 'Times New Roman', size: 26 }),
            ],
          }),
          boardTable,
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            spacing: { before: 60, after: 140 },
            children: [
              new TextRun({ text: `(Danh sách ấn định gồm 0${data.soLuongBanDaiDien} người./.)`, italics: true, font: 'Times New Roman', size: 24 }),
            ],
          }),

          // 1.3 Triển khai các khoản thu
          new Paragraph({
            indent: { firstLine: 400 },
            spacing: { before: 120, after: 60 },
            children: [
              new TextRun({ text: '3. Triển khai dự kiến một số hoạt động và các khoản thu năm học', bold: true, font: 'Times New Roman', size: 26 }),
            ],
          }),
          new Paragraph({
            indent: { firstLine: 400 },
            spacing: { before: 60, after: 100 },
            children: [
              new TextRun({ text: 'Các khoản thu theo quy định và thỏa thuận phục vụ trực tiếp cho học sinh:', italics: true, font: 'Times New Roman', size: 26 }),
            ],
          }),
          feeTable,

          // 1.4 Quỹ dư
          new Paragraph({
            indent: { firstLine: 400 },
            spacing: { before: 140, after: 60 },
            children: [
              new TextRun({ text: '4. Thông báo quỹ còn dư của năm học trước', bold: true, font: 'Times New Roman', size: 26 }),
            ],
          }),
          new Paragraph({
            indent: { firstLine: 400 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { before: 60, after: 120 },
            children: [
              new TextRun({ text: '- Tồn quỹ năm học cũ: ', font: 'Times New Roman', size: 26 }),
              new TextRun({ text: data.quyConDuNamTruoc, bold: true, font: 'Times New Roman', size: 26 }),
              new TextRun({ text: ', đã được bàn giao đầy đủ cho Ban đại diện/kế toán CMHS năm học 2026-2027.', font: 'Times New Roman', size: 26 }),
            ],
          }),

          // 1.5 Ý kiến phụ huynh
          new Paragraph({
            indent: { firstLine: 400 },
            spacing: { before: 120, after: 60 },
            children: [
              new TextRun({ text: '5. Ý kiến thảo luận của Phụ huynh học sinh', bold: true, font: 'Times New Roman', size: 26 }),
            ],
          }),
          ...formatMultiLines(data.noiDungPhuHuynhYKien),

          // III. KẾT LUẬN & BIỂU QUYẾT
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { before: 160, after: 80 },
            children: [
              new TextRun({
                text: 'III. KẾT LUẬN VÀ BIỂU QUYẾT',
                bold: true,
                font: 'Times New Roman',
                size: 26,
              }),
            ],
          }),
          new Paragraph({
            indent: { firstLine: 400 },
            spacing: { before: 60, after: 60 },
            children: [
              new TextRun({ text: `Đồng chí ${data.chuToa} kết luận các nội dung thống nhất sau:`, bold: true, font: 'Times New Roman', size: 26 }),
            ],
          }),
          ...data.ketLuanChuToa.map(kl => new Paragraph({
            indent: { left: 400, hanging: 200 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { before: 60, after: 60 },
            children: [
              new TextRun({ text: `- ${kl}`, font: 'Times New Roman', size: 26 }),
            ],
          })),

          // Biểu quyết
          new Paragraph({
            indent: { firstLine: 400 },
            spacing: { before: 100, after: 60 },
            children: [
              new TextRun({ text: 'Biểu quyết các nội dung trên:', bold: true, font: 'Times New Roman', size: 26 }),
            ],
          }),
          new Paragraph({
            indent: { left: 600 },
            spacing: { before: 40, after: 40 },
            children: [
              new TextRun({ text: `+ Nhất trí: `, font: 'Times New Roman', size: 26 }),
              new TextRun({ text: `${data.tiLeNhatTri}`, bold: true, font: 'Times New Roman', size: 26 }),
            ],
          }),
          new Paragraph({
            indent: { left: 600 },
            spacing: { before: 40, after: 40 },
            children: [
              new TextRun({ text: `+ Không nhất trí: `, font: 'Times New Roman', size: 26 }),
              new TextRun({ text: `${data.tiLeKhongNhatTri}`, bold: true, font: 'Times New Roman', size: 26 }),
            ],
          }),
          new Paragraph({
            indent: { left: 600 },
            spacing: { before: 40, after: 120 },
            children: [
              new TextRun({ text: `+ Ý kiến khác: `, font: 'Times New Roman', size: 26 }),
              new TextRun({ text: `${data.yKienKhac}`, font: 'Times New Roman', size: 26 }),
            ],
          }),

          // Bế mạc
          new Paragraph({
            indent: { firstLine: 400 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { before: 80, after: 280 },
            children: [
              new TextRun({
                text: `Cuộc họp kết thúc hồi ${data.thoiGianKetThuc}, biên bản đã được đọc lại cho toàn thể các thành viên tham dự nghe, thống nhất và nhất trí ký tên./.`,
                italics: true,
                font: 'Times New Roman',
                size: 26,
              }),
            ],
          }),

          // Chữ ký
          signatureTable,
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, defaultFileName);
};

export const exportClassListToDocx = async (list: ClassRepresentative[], fileName?: string) => {
  const defaultFileName = fileName || 'DS_BAN_DAI_DIEN_CHA_ME_HOC_SINH_2026-2027.docx';

  const tableBorderSingle = {
    top: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
    bottom: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
    left: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
    right: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
  };

  const headerRow = new TableRow({
    children: [
      new TableCell({
        borders: tableBorderSingle,
        width: { size: 6, type: WidthType.PERCENTAGE },
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'STT', bold: true, font: 'Times New Roman', size: 22 })] })],
      }),
      new TableCell({
        borders: tableBorderSingle,
        width: { size: 10, type: WidthType.PERCENTAGE },
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'LỚP', bold: true, font: 'Times New Roman', size: 22 })] })],
      }),
      new TableCell({
        borders: tableBorderSingle,
        width: { size: 24, type: WidthType.PERCENTAGE },
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'GIÁO VIÊN CHỦ NHIỆM', bold: true, font: 'Times New Roman', size: 22 })] })],
      }),
      new TableCell({
        borders: tableBorderSingle,
        width: { size: 26, type: WidthType.PERCENTAGE },
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'BAN ĐẠI DIỆN CMHS', bold: true, font: 'Times New Roman', size: 22 })] })],
      }),
      new TableCell({
        borders: tableBorderSingle,
        width: { size: 18, type: WidthType.PERCENTAGE },
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'SỐ ĐIỆN THOẠI', bold: true, font: 'Times New Roman', size: 22 })] })],
      }),
      new TableCell({
        borders: tableBorderSingle,
        width: { size: 16, type: WidthType.PERCENTAGE },
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'GHI CHÚ', bold: true, font: 'Times New Roman', size: 22 })] })],
      }),
    ],
  });

  const dataRows = list.map((item, idx) => {
    return new TableRow({
      children: [
        new TableCell({
          borders: tableBorderSingle,
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: (idx + 1).toString(), font: 'Times New Roman', size: 22 })] })],
        }),
        new TableCell({
          borders: tableBorderSingle,
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: item.lop, bold: true, font: 'Times New Roman', size: 22 })] })],
        }),
        new TableCell({
          borders: tableBorderSingle,
          children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: item.gvcn, font: 'Times New Roman', size: 22 })] })],
        }),
        new TableCell({
          borders: tableBorderSingle,
          children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: item.banDaiDien, bold: true, font: 'Times New Roman', size: 22 })] })],
        }),
        new TableCell({
          borders: tableBorderSingle,
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: item.soDienThoai, font: 'Times New Roman', size: 22 })] })],
        }),
        new TableCell({
          borders: tableBorderSingle,
          children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: item.ghiChu, font: 'Times New Roman', size: 20 })] })],
        }),
      ],
    });
  });

  const table = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: tableBorderSingle,
    rows: [headerRow, ...dataRows],
  });

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1134,
              bottom: 1134,
              left: 1417,
              right: 1134,
            },
          },
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({ text: 'Đơn vị: Trường THPT Phục Hòa', bold: true, font: 'Times New Roman', size: 24 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 180, after: 60 },
            children: [
              new TextRun({ text: 'DANH SÁCH BAN ĐẠI DIỆN CHA MẸ HỌC SINH CÁC LỚP', bold: true, font: 'Times New Roman', size: 28 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 40, after: 240 },
            children: [
              new TextRun({ text: 'NĂM HỌC 2026 - 2027', bold: true, font: 'Times New Roman', size: 24 }),
            ],
          }),
          table,
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            spacing: { before: 180, after: 60 },
            children: [
              new TextRun({ text: 'Phục Hòa, ngày 27 tháng 9 năm 2026', italics: true, font: 'Times New Roman', size: 22 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            spacing: { before: 40, after: 80 },
            children: [
              new TextRun({ text: 'HIỆU TRƯỞNG', bold: true, font: 'Times New Roman', size: 24 }),
            ],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, defaultFileName);
};
