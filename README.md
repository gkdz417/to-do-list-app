# To-Do List App - Gorev Yoneticisi

Modern ve sik bir gorev yoneticisi uygulamasi. Dark mode, glassmorphism tasarim ve animasyonlarla zenginlestirilmis saf HTML/CSS/JS projesi.

## Ozellikler

- Gorev ekleme (Enter veya + butonu)
- Oncelik seviyeleri: Yuksek / Normal / Dusuk
- Tamamlama (checkbox ile)
- Silme (hover ile cikan x butonu)
- Toplu silme (Tamamlananlari Sil)
- Filtreleme: Tumu / Aktif / Tamamlanan
- Istatistik paneli (toplam, aktif, tamamlanan, ilerleme cubugu)
- LocalStorage ile kalici kayit
- Responsive tasarim

## Tasarim

- Dark Mode (koyu arka plan #0d0f1a)
- Glassmorphism (yari seffaf cam efektli kartlar)
- Mor & pembe gradient renkler
- Animasyonlu arka plan orbs
- Micro-animasyonlar (gorev ekleme/silme gecisleri)
- Google Fonts - Inter

## Dosya Yapisi

`
to-do-list-app/
|-- index.html      # Ana HTML yapisi ve sayfa iskeleti
|-- style.css       # Tum stiller (glassmorphism, animasyonlar, responsive)
|-- app.js          # Uygulama mantigi (CRUD, filtreleme, localStorage)
|-- README.md       # Bu dosya
`

## Kurulum

Hicbir kurulum veya bagimlilik gerekmez! index.html dosyasini tarayicida acin.

`ash
git clone https://github.com/gkdz417/to-do-list-app.git
cd to-do-list-app
start index.html
`

## Kullanim

- Gorev eklemek icin kutucuga yazin ve Enter'a basin veya + butonuna tiklayin
- Oncelik seviyesini dropdown'dan secin (Yuksek gorevler listenin ustunde gorunur)
- Bir gorevi tamamlandi isaret etmek icin checkbox'a tiklayin
- Gorevi silmek icin uzerine gelin ve cikan x butonunu kullanin
- Tamamlananlari Sil butonu ile tum biten gorevleri temizleyin
- Gorevleriniz otomatik kaydedilir

## Teknolojiler

- HTML5 (Semantik yapi)
- CSS3 (Glassmorphism, animasyonlar, CSS custom properties)
- Vanilla JavaScript (DOM manipulasyonu, event handling)
- Web Storage API (localStorage - veri kaliciligi)
- Date API (tarih gosterimi)
- Google Fonts - Inter

## Lisans

MIT License - Ozgurce kullanabilir, degistirebilir ve dagitabilirsiniz.
