import React from 'react';

const About = () => {
  return (
    <div className="container py-5">
      <div className="card" style={{ borderRadius: '0.75rem', backgroundColor: '#eff1f2' }}>
        <div className="card-body py-4 px-4 px-md-5">
          <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
            <u>About ToDO-iDo</u>
          </p>
          
          <div className="px-3">
            <h3 className="text-primary">Tentang ToDO-iDo</h3>
            <p>
              Banyak mahasiswa yang kesulitan dalam menjalankan kegiatan yang direncanakan karena 
              sering lupa atau tidak konsisten, sehingga kebiasaan positif dalam manajemen waktu 
              tidak terwujud. Untuk mengatasi masalah tersebut aplikasi toDo-iDo hadir untuk 
              membantu mengelola kegiatan dan membantu konsistensi untuk membangun kebiasaan 
              positif dalam manajemen waktu. toDo-iDO adalah aplikasi todo list berbasis website 
              yang dapat mengelola kegiatan yang telah direncanakan agar berjalan sesuai planning 
              dan konsisten.
            </p>

            <h3 className="text-primary mt-4">Manfaat dan Kelebihan ToDo-iDo:</h3>
            <ul>
              <li>Sebagai Pengingat Task yang akan dikerjakan daily todo</li>
              <li>Report Weekly dan Monthly berbentuk Line Chart sebagai Progress User</li>
              <li>Kata kata motivasi untuk mendukungmu membangun kebiasan positif secara konsisten</li>
              <li>Aplikasi ini dapat digunakan pada device mobile maupun desktop.</li>
            </ul>

            <h3 className="text-primary mt-4">Capstone Project SIB Kampus merdeka Dicoding Batch 3</h3>
            <p><strong>Team ID : C22-164</strong></p>
            <ol>
              <li>F251X0546 - TM Veri Agustian</li>
              <li>F492Y1031 - Djihan Amartia</li>
              <li>F492X1030 - Dedi Fakhriansyah</li>
            </ol>

            <h3 className="text-primary mt-4">Teknologi yang Digunakan:</h3>
            <ul>
              <li><strong>Frontend:</strong> React, React Router</li>
              <li><strong>Backend:</strong> ExpressJS, NodeJS</li>
              <li><strong>Build Tools:</strong> Webpack, Babel</li>
              <li><strong>Styling:</strong> Bootstrap, Font Awesome</li>
              <li><strong>Deployment:</strong> Vercel</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
