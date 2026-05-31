# Thời Khóa Biểu của Yuta

Chào mừng bạn đến với **Thời Khóa Biểu của Yuta**! Ứng dụng này được thiết kế với giao diện đơn giản, hiện đại và tập trung vào việc quản lý thời gian học tập cũng như nghỉ ngơi một cách khoa học.

## Tổng Quan Tính Năng Chính

### 1. Quản lý Môn Học & Kéo Thả Trực Quan
- Thêm và tùy chỉnh môn học. Mỗi môn học mới đều được đánh dấu bằng các màu sắc đẹp mắt khác nhau.
- Tính năng kéo thả thả (drag & drop) môn học vào các tiết cụ thể theo số thứ tự (Tiết 1 đến Tiết 12) từ Thứ 2 đến Chủ Nhật.
- Xoá hoặc chỉnh sửa bằng một click.
- Tự động lưu toàn bộ dữ liệu (lịch, ghi chú, môn học) dựa trên Local Storage.

### 2. Ghi Chú Ngay Trên Lịch (Notes)
- Bảng ghi chú cá nhân giúp theo dõi các nhiệm vụ, bài tập cần hoàn thành hoặc deadline cần chú ý.
- Ghi chú cũng được đồng bộ và lưu tự động vào trình duyệt.

### 3. Đồng Hồ Đo Thời Gian Học Tập (Pomodoro)
- Theo dõi thời gian tập trung (học) và thời gian thư giãn (nghỉ ngơi), giúp duy trì hiệu suất làm việc cao.
- Có thể thiết lập tuỳ chỉnh số phút Học, số phút Nghỉ.
- Hỗ trợ âm thanh chuông báo động bình thường kéo dài 5 giây rõ ràng khi chuyển tiếp giữa các trạng thái (Hết giờ học / Hết giờ nghỉ).

### 4. Thư Viện "Nhạc Đồng Hành" (Music)
- Có thể lưu trữ các liên kết Youtube (hoạt động với nền, Lofi, EDM năng suất...).
- Click vào list sẽ mở ra tab mới giúp bạn vừa nghe nhạc với một thao tác duy nhất.

### 5. Hỗ Trợ 100% Offline (PWA)
- Chạy dựa trên kiến trúc PWA (Progressive Web App). Một khi đã tải ứng dụng, bạn có thể ngắt kết nối mạng (Internet) và tiếp tục truy cập thời khóa biểu, kéo thả, ghi chú, cài đặt bộ đếm giờ như bình thường mà không phát sinh lỗi.
- Trình duyệt sẽ nhận diện và có thể yêu cầu cài đặt App ra Desktop hoặc Màn hình chính của điện thoại.

## Cách Hoạt Động (Dành Cho Nhà Phát Triển)
- **Framework & Libraries**: Được xây dựng trên React 19 và Tailwind CSS 4.
- **Icons**: Sử dụng bộ Icon `lucide-react`.
- **Offline / Caching**: Cài đặt thông qua `vite-plugin-pwa` xử lý file Service Worker.
- **Lưu TRữ**: Mọi thay đổi đều `localStorage` trigger ngay tức thì, đảm bảo không có quá trình gửi Data lên server bên ngoài – mọi thứ làm việc hoàn toàn trên máy cục bộ của bạn.

---

*Mong ứng dụng sẽ đồng hành cùng Yuta qua từng giờ học và các bài tập môn Python, IoT, Latex - Manim... Chúc bạn một ngày học tập thật hiệu quả!*
