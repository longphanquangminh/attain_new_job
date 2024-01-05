DROP DATABASE IF EXISTS attain_new_job;
CREATE DATABASE attain_new_job;

-- Drop binh_luan Table
DROP TABLE IF EXISTS binh_luan;

-- Drop thue_cong_viec Table
DROP TABLE IF EXISTS thue_cong_viec;

-- Drop cong_viec Table
DROP TABLE IF EXISTS cong_viec;

-- Drop chi_tiet_loai_cong_viec Table
DROP TABLE IF EXISTS chi_tiet_loai_cong_viec;

-- Drop loai_cong_viec Table
DROP TABLE IF EXISTS loai_cong_viec;

-- Drop nguoi_dung Table
DROP TABLE IF EXISTS nguoi_dung;

-- Create tables for the defined entities

-- nguoi_dung (Users)
CREATE TABLE IF NOT EXISTS nguoi_dung (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    birthday DATE NOT NULL,
    gender VARCHAR(255) NOT NULL CHECK (gender IN ('male', 'female')),
    role VARCHAR(255) NOT NULL CHECK (role IN ('admin', 'user')),
    skill VARCHAR(255)[] NOT NULL,
    certification VARCHAR(255)[] NOT NULL
);

-- loai_cong_viec (Job Category)
CREATE TABLE IF NOT EXISTS loai_cong_viec (
    id SERIAL PRIMARY KEY,
    ten_loai_cong_viec VARCHAR(255) NOT NULL
);

-- chi_tiet_loai_cong_viec (Category Detail of Job)
CREATE TABLE IF NOT EXISTS chi_tiet_loai_cong_viec (
    id SERIAL PRIMARY KEY,
    ten_chi_tiet VARCHAR(255) NOT NULL,
    hinh_anh VARCHAR(255) NOT NULL,
    ma_loai_cong_viec INTEGER NOT NULL,
    FOREIGN KEY (ma_loai_cong_viec) REFERENCES loai_cong_viec(id)
);

-- cong_viec (Job)
CREATE TABLE IF NOT EXISTS cong_viec (
    id SERIAL PRIMARY KEY,
    ten_cong_viec VARCHAR(255) NOT NULL,
    danh_gia INTEGER NOT NULL CHECK (danh_gia >= 0 AND danh_gia <= 5),
    gia_tien INTEGER NOT NULL,
    hinh_anh VARCHAR(255) NOT NULL,
    mo_ta TEXT NOT NULL,
    mo_ta_ngan VARCHAR(255) NOT NULL,
    sao_cong_viec INTEGER NOT NULL CHECK (sao_cong_viec >= 0 AND sao_cong_viec <= 5),
    ma_chi_tiet_loai_cong_viec INTEGER NOT NULL,
    ma_nguoi_tao INTEGER NOT NULL,
    FOREIGN KEY (ma_chi_tiet_loai_cong_viec) REFERENCES chi_tiet_loai_cong_viec(id),
    FOREIGN KEY (ma_nguoi_tao) REFERENCES nguoi_dung(id)
);

-- thue_cong_viec (Hiring Job)
CREATE TABLE IF NOT EXISTS thue_cong_viec (
    id SERIAL PRIMARY KEY,
    ma_cong_viec INTEGER NOT NULL,
    ma_nguoi_thue INTEGER NOT NULL,
    ngay_thue DATE NOT NULL,
    hoan_thanh BOOLEAN DEFAULT false NOT NULL,
    FOREIGN KEY (ma_cong_viec) REFERENCES cong_viec(id),
    FOREIGN KEY (ma_nguoi_thue) REFERENCES nguoi_dung(id)
);

-- binh_luan (Comments)
CREATE TABLE IF NOT EXISTS binh_luan (
    id SERIAL PRIMARY KEY,
    ma_cong_viec INTEGER NOT NULL,
    ma_nguoi_binh_luan INTEGER NOT NULL,
    ngay_binh_luan DATE NOT NULL,
    noi_dung TEXT NOT NULL,
    sao_binh_luan INTEGER NOT NULL CHECK (sao_binh_luan >= 0 AND sao_binh_luan <= 5),
    FOREIGN KEY (ma_cong_viec) REFERENCES cong_viec(id),
    FOREIGN KEY (ma_nguoi_binh_luan) REFERENCES nguoi_dung(id)
);

INSERT INTO nguoi_dung (name, email, password, phone, birthday, gender, role, skill, certification)
VALUES
('John Doe', 'john.doe@example.com', 'password123', '123456789', '1990-01-01', 'male', 'user', '{"Java", "Python"}', '{"CertA", "CertB"}'),
('Jane Smith', 'jane.smith@example.com', 'password456', '987654321', '1985-05-15', 'female', 'user', '{"C#", "JavaScript"}', '{"CertX", "CertY"}'),
('Alice Johnson', 'alice.johnson@example.com', 'password789', '555111222', '1992-09-20', 'female', 'user', '{"SQL", "HTML"}', '{"CertZ", "CertW"}'),
('Bob Williams', 'bob.williams@example.com', 'passwordabc', '123123123', '1988-03-10', 'male', 'user', '{"React", "Node.js"}', '{"CertM", "CertN"}'),
('Eva Davis', 'eva.davis@example.com', 'passwordefg', '999000111', '1995-07-05', 'male', 'user', '{"Angular", "CSS"}', '{"CertP", "CertQ"}');

INSERT INTO loai_cong_viec (ten_loai_cong_viec)
VALUES
('Web Development'),
('Mobile App Development'),
('Data Analysis'),
('Graphic Design'),
('Content Writing');

INSERT INTO chi_tiet_loai_cong_viec (ten_chi_tiet, hinh_anh, ma_loai_cong_viec)
VALUES
('Frontend Development', 'job1.png', 1),
('Backend Development', 'job2.png', 1),
('iOS App Development', 'job3.png', 2),
('Android App Development', 'job4.png', 2),
('Data Mining', 'job5.png', 3);

INSERT INTO cong_viec (ten_cong_viec, danh_gia, gia_tien, ma_nguoi_tao, hinh_anh, mo_ta, ma_chi_tiet_loai_cong_viec, mo_ta_ngan, sao_cong_viec)
VALUES
('Build Responsive Website', 4, 500, 1, 'website.jpg', 'Need a responsive website built using React.js for a small business.', 1, 'Looking for a web developer for a small business website.', 4),
('Develop iOS App', 5, 1000, 2, 'ios_app.jpg', 'Create a mobile app for iOS platform using Swift and SwiftUI.', 3, 'iOS App Development project for a startup.', 5),
('Data Analysis Project', 4, 800, 3, 'data_analysis.jpg', 'Analyze and visualize data sets using Python and Pandas library.', 5, 'Data analysis project for marketing data.', 4),
('Design Company Logo', 4, 200, 4, 'company_logo.jpg', 'Create a modern and professional logo for a startup company.', 4, 'Logo design project for a new startup.', 4),
('Write Blog Articles', 3, 50, 5, 'blog_writing.jpg', 'Write engaging and informative blog articles on various topics.', 5, 'Content writing project for blog articles.', 3);

INSERT INTO thue_cong_viec (ma_cong_viec, ma_nguoi_thue, ngay_thue, hoan_thanh)
VALUES
    (1, 4, '2024-01-07', false),
    (2, 2, '2024-01-08', true),
    (3, 1, '2024-01-09', false),
    (4, 3, '2024-01-10', true),
    (5, 2, '2024-01-11', false);

INSERT INTO binh_luan (ma_cong_viec, ma_nguoi_binh_luan, ngay_binh_luan, noi_dung, sao_binh_luan)
VALUES
(1, 2, '2024-01-02', 'Great job on building the website!', 5),
(2, 3, '2024-01-02', 'The iOS app looks amazing! Well done!', 4),
(3, 4, '2024-01-02', 'Impressive data analysis work. Thank you!', 4),
(4, 5, '2024-01-02', 'Love the logo design. Excellent work!', 5),
(5, 1, '2024-01-02', 'Very well-written articles. Enjoyed reading them!', 3);

-- SELECT * FROM nguoi_dung;

-- SELECT * FROM loai_cong_viec;

-- SELECT * FROM chi_tiet_loai_cong_viec;

-- SELECT * FROM cong_viec;

-- SELECT * FROM thue_cong_viec;

-- SELECT * FROM binh_luan;
