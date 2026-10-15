# StudyFlow – Trợ lý quản lý học tập cho sinh viên

Ứng dụng quản lý học tập dành cho sinh viên (HTML, CSS, JavaScript thuần). Hoạt động hoàn toàn trên trình duyệt, không cần đăng nhập hoặc máy chủ riêng.

## Tính năng

- **Tổng quan**: số môn học, nhiệm vụ chưa xong/quá hạn, tỷ lệ hoàn thành, lịch học hôm nay, thời gian tự học tuần.
- **Môn học**: thêm/sửa/xóa, tên, mã, giảng viên, màu; tìm kiếm, tiến độ theo môn.
- **Nhiệm vụ**: CRUD, mức ưu tiên, deadline, hoàn thành, phát hiện quá hạn, tìm kiếm/lọc/sắp xếp.
- **Thời khóa biểu**: lịch lặp theo 7 ngày, liên kết môn học, giờ học và phòng, thêm/sửa/xóa.
- **Đồng hồ tập trung**: chế độ học 25 phút/nghỉ 5 phút, bắt đầu/dừng/đặt lại, khôi phục đồng hồ khi tải lại trang. Tính thời gian đã chạy khi tạm dừng/đặt lại, đếm phiên hoàn thành khi đồng hồ về 0.
- **Thống kê**: nhiệm vụ hoàn thành, mức ưu tiên, tiến độ từng môn, thời gian tập trung và biểu đồ tuần.
- **Cá nhân hóa**: tên, mục tiêu giờ/tuần, sáng/tối, sao lưu và khôi phục qua JSON, xuất nhiệm vụ CSV.
- **Dữ liệu minh họa**: nhấn “Xem dữ liệu mẫu” để nạp. Các số liệu mẫu luôn được gắn nhãn.

## Cách chạy

**Cách nhanh nhất:** mở tệp `index.html` (trong thư mục này) bằng trình duyệt Chrome, Edge hoặc Safari. Có thể sử dụng Python nếu muốn chạy trên máy chủ thử nghiệm trên máy cá nhân:

```bash
cd studyflow
python -m http.server 8000
```

Truy cập `http://localhost:8000`.

## Triển khai lên Netlify

1. Đăng nhập https://app.netlify.com/.
2. Vào **Tạo dự án mới → Triển khai thủ công** (giao diện Netlify có thể hiển thị tiếng Anh) (hoặc trang https://app.netlify.com/drop).
3. Kéo thả thư mục `studyflow` hoặc tệp `studyflow-netlify.zip` được cung cấp cùng dự án.
4. Netlify tạo một đường dẫn dạng `https://ten-site.netlify.app`.

**Tùy chọn:** Có thêm `StudyFlow-single-file.html`, bản gộp 3 tệp thành một file chạy riêng. Khi deploy bản này, hãy đổi tên thành `index.html` trước khi tải lên.

## Lưu ý dữ liệu và bảo mật

- Dữ liệu nằm trong `localStorage` của trình duyệt hiện tại; một trình duyệt/thiết bị khác sẽ không đồng bộ tự động.
- Hãy **xuất JSON** định kỳ nếu dữ liệu quan trọng; xóa dữ liệu website hoặc dùng trình duyệt riêng tư có thể mất dữ liệu.
- Nhập JSON thay thế toàn bộ dữ liệu hiện tại, có xác nhận trước. Nên sao lưu trước khi nhập.
- Xóa môn học đồng thời xóa các nhiệm vụ/buổi học liên quan, có xác nhận.
- Dữ liệu mẫu chỉ là ví dụ, không đại diện cho thành tích học tập thật.
- Không dùng nguồn CDN, thư viện ngoài, cookie theo dõi hoặc API máy chủ.

Được phát triển dành cho sinh viên · StudyFlow · TRIDEV · Mã SV: DE220123
