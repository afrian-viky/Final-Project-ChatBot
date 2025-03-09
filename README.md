# Artificial Intelligence menggunakan Golang

## Final Project AI-Powered Smart Home Energy Management System with Some Changes

### Description

Kamu akan mengembangkan Sistem Manajemen Energi Rumah Pintar menggunakan Golang dan [model AI Tapas](https://huggingface.co/google/tapas-base-finetuned-wtq) dari Huggingface Model Hub. Sistem ini akan memprediksi dan mengelola penggunaan energi dalam lingkungan rumah pintar. Aplikasi ini akan menerima data tentang penggunaan energi rumah dan memberikan wawasan dan rekomendasi tentang cara mengoptimalkan konsumsi energi.

Sistem Manajemen Energi ini merupakan sebuah Web App server yang dibangun menggunakan Golang. Dimana sistem menerima input berupa satu file dengan format CSV yang berisi penggunaan energi di rumah. Kita asumsikan data ini dikirim oleh server IoT yang dimiliki di rumah.

Dari data yang diupload tersebut maka kita bisa berkonsultasi terkait penggunaan and potensi penghematan energi dengan sebuah chatbot.

Fitur:

- Prediksi Konsumsi Energi: Sistem ini akan memprediksi konsumsi energi rumah berdasarkan data historis.

- Rekomendasi Penghematan Energi: Sistem ini akan memberikan rekomendasi tentang cara menghemat energi berdasarkan konsumsi energi yang diprediksi.

Data input dalam bentuk format CSV dengan kolom berikut:

- Date: Tanggal data penggunaan energi.
- Time: Waktu data penggunaan energi.
- Appliance: Nama alat.
- Energy_Consumption: Konsumsi energi alat dalam kWh.
- Room: Ruang tempat alat berada.
- Status: Status alat (On/Off).

Contoh:

```txt
Date,Time,Appliance,Energy_Consumption,Room,Status
2022-01-01,00:00,Refrigerator,1.2,Kitchen,On
2022-01-01,01:00,Refrigerator,1.2,Kitchen,On
...
2022-01-01,08:00,TV,0.8,Living Room,Off
2022-01-01,09:00,TV,0.8,Living Room,On
2022-01-01,10:00,TV,0.8,Living Room,On
...
```

Untuk contoh, kalian bisa menggunakan file yang telah disiapkan `data-series.csv`.

#### Penggunaan Model AI:

Model AI Tapas `tapas-base-finetuned-wtq` akan digunakan untuk memahami data tabel dan membuat prediksi tentang konsumsi energi masa depan. Model ini akan menerima file CSV sebagai input dan menghasilkan data berupa alat yang paling banyak menggunakan energi dan alat yang paling sedikit menggunakan energi.

Contoh untuk interface sudah diberikan di folder `frontend`. Untuk menjalankannya kamu perlu memanggil `npm install` diikuti oleh `npm start`. Interface `frontend` ini akan terkoneksi ke backend pada port `8080`. Lakukan modifikasi jika kamu menggunakan port selain itu.

Interface untuk aplikasi ini pada awalnya menerima satu file upload yang kemudian akan diproses menggunakan `tapas-base-finetuned-wtq` dan langsung memberikan informasi mengenai alat rumah tangga dengan penggunaan listrik tertinggi dan terendah. Tersedia juga satu input field untuk chat. Silahkan dikembangkan sehingga mirip dengan chatbot dimana user bisa bertanya mengenai data-data yang ada di file input.

Silahkan menggunakan model AI dari Hugging Face Hub untuk membuat aplikasi ini lebih menarik, misal-nya dengan menambahkan model AI `microsoft/Phi-3.5-mini-instruct` agar bisa memberikan rekomendasi penghematan energi.

### Constraints

Untuk Frontend tidak dinilai, jadi silahkan berkreasi sekreatif mungkin. Frontend juga boleh digunakan boleh tidak.

Kalian perlu membuat HuggingFace Token terlebih dahulu untuk bisa menggunakan model AI yang terdapat di Huggingface. Token ini kemudian akan kalian simpan pada file .env

Untuk pengerjaan, kalian diberikan file berikut:

- main.go - Berisi kode utama untuk aplikasi.
- model/model.go - Berisi struktur data yang digunakan pada aplikasi.
- repository/fileRepository.go - Berisi process terkait pembacaan, penulisan dan pengecekan file yang diupload.
- service/ai_service.go - Berisi kode untuk melakukan interaksi dengan AI model.
- service/file_service.go - Berisi kode untuk melakukan upload file.

Berikut penjelasan mengenai bagian apa yang kalian harus kerjakan.
**main.go**
Pada file main.go maka kalian wajib menyelesaikan dua handler yang tersedia, untuk endpoint `/upload` dan `/chat`. Keduanya akan menghasilkan output berupa JSON dengan struktur berikut: {"status": "success", "answer": "some response"}. Key berupa "status" dan "answer".

Pada endpoint `/upload` maka kalian perlu melakukan proses upload dan analisa data. Jadi ada 2 proses di sini, bukan hanya melakukan upload. Jika berhasil maka akan menghasilkan output dalam bentuk `string`: `From the provided data, here are the Least Electricity: TV and the Most Electricity: EVCar.` Catatan: Output ini hanya contoh berdasarkan `data-series.csv` yang diberikan. Jika kalian membuat data sendiri maka jawabannya bisa jadi berbeda dan bukan `TV` dan/atau `EVCar`.

Pada endpoint `/chat` maka kalian akan melakukan chat dengan model AI. Untuk model AI dibebaskan, untuk referensi, kalian bisa menggunakan `microsoft/Phi-3.5-mini-instruct`.

- service/file_service.go
  Pada service ini, kalian akan mengisi kode untuk function `ProcessFile` dimana function menerima isi dari file dalam bentuk `string` untuk kemudian diproses menjadi `map of string`. Ingat struktur data mengikuti `model.go.`

- service/ai_service.go
  Pada service ini, kalian akan mengisi kode untuk function `AnalyzeData` dan `ChatWithAI` dimana untuk `AnalyzeData` kalian akan berkomunikasi dengan AI model `tapas-base-finetuned-wtq`. Output-nya akan berupa teks jawaban dari AI model.
  Sedangkan untuk `ChatWithAI` maka kalian akan berkomunikasi dengan AI model Chat yang kalian pilih. Output-nya sama berupa teks jawaban dari AI model. Ingat struktur data mengikuti `model.go.`

Silahkan membuat function-function lain yang kalian perlukan.

Happy Coding!
