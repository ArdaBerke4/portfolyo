import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import RetroGrid from './components/RetroGrid'; // Bunu ekledik

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // --- Detay Penceresi (Modal) State ---
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  // Modal açıkken arkadaki sayfanın kaymasını engelle
  useEffect(() => {
    if (selectedProject) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [selectedProject]);

  const navLinks = [
    { label: "Hakkımda", id: "hakkımda" },
    { label: "Projeler", id: "projeler" },
    { label: "İletişim", id: "iletişim" },
  ];

  // URL'i değiştirmeden manuel smooth-scroll
  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const stack = [
    { label: "Düşük Seviye", value: "C · Java · Algoritma", glyph: "{ }" },
    { label: "Donanım", value: "Quartus II · ALU · Mimari", glyph: "⌘" },
    { label: "Veri & Analiz", value: "Python · Pandas · Folium", glyph: "∑" },
    { label: "Modern Web", value: "React · Tailwind · Supabase", glyph: "✦" },
  ];

  const projects = [
    {
      index: "01",
      title: "ACSP Sismik Veri Analizi",
      description: "AFAD verilerinin Python ile analizi ve büyük depremlerin (M >= 5.0) bölgesel fay hatlarıyla (KAF, DAF, BAFS) otomatik eşleştirilmesi.",
      tags: ["Python", "Veri Analizi", "Folium"],
      techDetails: {
        highlights: [
          "Python tabanlı otomatik fay hattı eşleştirme algoritması.",
          "UTF-8 standartlarında karakter düzeltme ve veri temizleme.",
          "Folium ile interaktif sismik yoğunluk haritası üretimi."
        ],
        files: ["data.csv", "fay_atamasi.py", "turkiye_sismik_yogunluk_haritasi.html"],
        note: "Excel'in format hatalarını (5.2 -> 5.Şub) engelleyen Pre-formatting mimarisi uygulanmıştır."
      },
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path d="M2 12h3l2 8 4-16 4 16 2-8h5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      index: "02",
      title: "Graph Builder",
      description: "Basit çizgelerin bağlantısallık ve iki-parçalı (bipartite) olma özelliklerini analiz eden kapsamlı Java yazılımı.",
      tags: ["Java", "Yazılım Geliştirme"],
      techDetails: {
        highlights: [
          "Çizge teorisi algoritmalarının Java implementasyonu.",
          "Bipartite ve connectivity kontrol mekanizmaları.",
          "Performans odaklı nesne yönelimli tasarım."
        ],
        files: ["Graph.java", "AnalysisTool.java", "Main.java"],
        note: "Yazılım, Dokuz Eylül Üniversitesi Bilgisayar Mühendisliği kapsamında geliştirilmiştir."
      },
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <circle cx="5" cy="6" r="2" /><circle cx="19" cy="6" r="2" />
          <circle cx="12" cy="18" r="2" /><circle cx="5" cy="14" r="1.5" />
          <path d="M7 6h10M6 8l5 8M18 8l-5 8M6.5 13l4.5 4M12 18l-5-4" strokeLinecap="round" />
        </svg>
      )
    },
    {
      index: "03",
      title: "5-Bit ALU ve Bellek Mimarisi",
      description: "Quartus II üzerinde ROM/RAM bileşenleri ve 5-bitlik veriler üzerine kurulu Aritmetik Mantık Birimi simülasyonları.",
      tags: ["Quartus II", "Logic Design"],
      techDetails: {
        highlights: [
          "5-bit veri yolu üzerinde çalışan ALU tasarımı.",
          "RAM ve ROM bellek birimlerinin entegrasyonu.",
          "Mantıksal kapılar ile düşük seviyeli donanım simülasyonu."
        ],
        files: ["ALU.vhd", "Memory_Unit.bdf", "Simulation_Waveform.vwf"],
        note: "Donanım mimarisi ve mantıksal devre tasarımı prensipleri uygulanmıştır."
      },
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <rect x="6" y="6" width="12" height="12" rx="1.5" />
          <path d="M9 6V3M12 6V3M15 6V3M9 21v-3M12 21v-3M15 21v-3M6 9H3M6 12H3M6 15H3M21 9h-3M21 12h-3M21 15h-3" strokeLinecap="round" />
        </svg>
      )
    },
    {
      index: "04",
      title: "Algoritma Performans Analizi",
      description: "Timsort, Quicksort ve LCS algoritmalarının zaman ve alan karmaşıklıklarının C üzerinde performans matrisi incelemesi.",
      tags: ["C", "Big O Analysis"],
      techDetails: {
        highlights: [
          "Sıralama algoritmalarının mikro-saniye bazlı testleri.",
          "LCS (En Uzun Ortak Alt Dizi) dinamik programlama analizi.",
          "Veri yapıları için bellek kullanım optimizasyonu."
        ],
        files: ["sorting_tests.c", "complexity_report.pdf", "lcs_analysis.c"],
        note: "Akademik performans matrisi ve algoritma karşılaştırma raporu içerir."
      },
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path d="M4 4v16h16" strokeLinecap="round" />
          <path d="M7 16l3-5 3 3 4-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { error } = await supabase.from('messages').insert([{ name: formData.name, email: formData.email, message: formData.message }]);
    if (error) {
      setSubmitStatus('error');
    } else {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
    setIsSubmitting(false);
  };

  const buttonLabel =
    isSubmitting ? 'Gönderiliyor...' :
    submitStatus === 'success' ? 'Başarılı!' :
    submitStatus === 'error' ? 'Hata! Tekrar dene' :
    'Mesaj Gönder';

  return (
    <div className="relative min-h-screen overflow-x-clip bg-ink text-slate-100 font-sans">
      {/* Dekoratif Arka Plan */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-indigo-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-48 -right-48 h-[40rem] w-[40rem] rounded-full bg-violet-500/15 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(139,92,246,0.08),transparent_60%)]" />
      <RetroGrid />

      {/* Navbar */}
      <header className="sticky top-0 z-50">
        <nav className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
          <div className="flex items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.03] px-5 py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <a href="#" className="group flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.85)]" />
              <span className="font-display text-lg font-semibold tracking-tight text-white">Arda Berke Aday</span>
            </a>
            <div className="hidden items-center gap-1 md:flex">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={`#${item.id}`}
                  onClick={scrollToSection(item.id)}
                  className="rounded-lg px-4 py-2 text-sm text-slate-300 transition-colors duration-200 hover:bg-white/[0.05] hover:text-violet-400"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="mx-auto flex max-w-7xl flex-col items-center px-4 py-20 text-center sm:px-6 md:py-28">
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-400" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-300">Dokuz Eylül Üniv. · Bilgisayar Müh.</span>
          </div>

          <h1 className="font-display max-w-5xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Kod ile <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-fuchsia-400 bg-clip-text text-transparent">Algoritmaları</span>, <br className="hidden md:block" />
            Donanım ile <span className="bg-gradient-to-r from-fuchsia-400 via-purple-300 to-violet-400 bg-clip-text text-transparent">Performansı</span> Birleştiriyorum.
          </h1>

          {/* --- CTA Butonları --- */}
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <a
              href="#projeler"
              onClick={scrollToSection('projeler')}
              className="group relative inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-violet-400 to-fuchsia-400 px-7 py-3.5 text-sm font-semibold tracking-wide text-slate-950 shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-lg"
            >
              Projelerimi Gör
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#iletişim"
              onClick={scrollToSection('iletişim')}
              className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-7 py-3.5 text-sm font-medium text-slate-200 backdrop-blur-md transition-all hover:border-white/[0.16] hover:bg-white/[0.08]"
            >
              İletişime Geç
            </a>
          </div>

          <div className="mt-20 grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stack.map((card) => (
              <div key={card.label} className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 text-left backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/30">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-violet-400/80">{card.label}</span>
                  <span className="font-mono text-lg text-violet-400/60">{card.glyph}</span>
                </div>
                <p className="font-display text-sm font-medium text-slate-100">{card.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- Hakkımda Section --- */}
        <section id="hakkımda" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 border-t border-white/[0.05]">
          <div className="mb-14">
            <h2 className="font-display text-3xl font-bold text-white md:text-5xl">Kısaca <span className="text-violet-400">Ben</span></h2>
          </div>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6 text-slate-400 leading-relaxed">
              <p>
                Dokuz Eylül Üniversitesi Bilgisayar Mühendisliği 2. sınıf öğrencisiyim. Yazılım geliştirme ve yapay zeka alanlarına güçlü bir ilgi duyuyorum. Temel algoritmik problem çözme becerilerimi, düşük seviyeli donanım mimarilerinden modern web teknolojilerine kadar geniş bir yelpazede uyguluyorum.
              </p>
              <p>
                Akademik projelerimde nesne yönelimli programlama (OOP), veri yapıları ve algoritma analizi üzerine yoğunlaşıyorum. Bunun yanı sıra, Google Developer Groups (GDG) bünyesinde İnsan Kaynakları Koordinatörü olarak görev alıyor; topluluk içi iletişimi yönetiyor ve organizasyonel süreçlere liderlik ediyorum.
              </p>
              <p>
                Teknik yetkinliklerimi iletişim ve liderlik becerileriyle harmanlayarak, teknoloji odaklı projelere mühendislik vizyonuyla değer katmayı hedefliyorum.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-xl transition-all hover:border-violet-400/30">
                <h3 className="mb-2 font-mono text-[10px] uppercase tracking-widest text-violet-400">Eğitim</h3>
                <p className="font-display text-lg font-semibold text-white">Dokuz Eylül Üniv.</p>
                <p className="mt-1 text-sm text-slate-400">Bilgisayar Mühendisliği<br />2. Sınıf</p>
              </div>

              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-xl transition-all hover:border-violet-400/30">
                <h3 className="mb-2 font-mono text-[10px] uppercase tracking-widest text-violet-400">Topluluk & Liderlik</h3>
                <p className="font-display text-lg font-semibold text-white">İK Koordinatörü</p>
                <p className="mt-1 text-sm text-slate-400">Google Developer Groups (GDG)</p>
              </div>

              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-xl transition-all hover:border-violet-400/30">
                <h3 className="mb-2 font-mono text-[10px] uppercase tracking-widest text-violet-400">Odak Alanları</h3>
                <p className="font-display text-base font-semibold text-white">Yapay Zeka & Yazılım</p>
                <p className="mt-1 text-sm text-slate-400">OOP, Veri Yapıları, Sistem Mimarisi</p>
              </div>

              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-xl transition-all hover:border-violet-400/30">
                <h3 className="mb-2 font-mono text-[10px] uppercase tracking-widest text-violet-400">Yabancı Dil</h3>
                <p className="font-display text-lg font-semibold text-white">İngilizce</p>
                <p className="mt-1 text-sm text-slate-400">C1 (Advanced)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Projeler Section */}
        <section id="projeler" className="mx-auto max-w-7xl px-4 py-20 border-t border-white/[0.05]">
          <div className="mb-14">
            <h2 className="font-display text-3xl font-bold text-white md:text-5xl">Öne Çıkan <span className="text-violet-400">Projelerim</span></h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <article key={project.index} className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-300 hover:border-violet-400/40">
                <div className="mb-5 flex items-start justify-between">
                  <div className="h-12 w-12 text-violet-300">{project.icon}</div>
                  <span className="font-mono text-xs text-slate-500">/{project.index}</span>
                </div>
                <h3 className="font-display text-2xl font-semibold text-white">{project.title}</h3>
                <p className="mt-3 flex-1 text-slate-400">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="rounded-md border border-white/[0.06] bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] uppercase text-slate-300">{tag}</span>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedProject(project)}
                  className="mt-8 inline-flex items-center justify-between text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Detayları Gör →
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* İletişim Formu */}
        <section id="iletişim" className="mx-auto max-w-7xl px-4 py-20 border-t border-white/[0.05]">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-4xl font-bold text-white">Birlikte <span className="text-violet-400">üretelim.</span></h2>
              <p className="mt-4 text-slate-400">ardaberke221@gmail.com</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8">
              <input
                type="text"
                required
                placeholder="İsim"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 outline-none text-white focus:border-violet-400/50"
              />
              <input
                type="email"
                required
                placeholder="E-Posta"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 outline-none text-white focus:border-violet-400/50"
              />
              <textarea
                rows={4}
                required
                placeholder="Mesajınız"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 outline-none text-white focus:border-violet-400/50"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-violet-500 py-4 font-bold text-white transition-all hover:bg-violet-400 disabled:opacity-60"
              >
                {buttonLabel}
              </button>
            </form>
          </div>
        </section>

        <footer className="py-10 text-center font-mono text-xs text-slate-600">
          $ arda.berke.aday — 2026
        </footer>
      </main>

      {/* --- PROJE DETAY PENCERESİ (MODAL) --- */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md">
          <div
            className="absolute inset-0 bg-ink/60"
            onClick={() => setSelectedProject(null)}
          />
          <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/[0.1] bg-white/[0.05] p-8 shadow-2xl backdrop-blur-2xl">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute right-6 top-6 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <div className="mb-6 flex items-center gap-4">
              <div className="h-10 w-10 text-violet-400">{selectedProject.icon}</div>
              <h3 className="font-display text-2xl font-bold text-white">{selectedProject.title}</h3>
            </div>

            <div className="space-y-6 text-sm">
              <div>
                <h4 className="mb-2 font-mono text-xs uppercase text-violet-400">Teknik Analiz Notları</h4>
                <ul className="list-inside list-disc space-y-2 text-slate-300">
                  {selectedProject.techDetails.highlights.map((h: string) => <li key={h}>{h}</li>)}
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-mono text-xs uppercase text-violet-400">Dosya Yapısı</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techDetails.files.map((f: string) => (
                    <code key={f} className="rounded bg-white/[0.07] px-2 py-1 text-violet-200">{f}</code>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-violet-500/10 p-4 border border-violet-500/20">
                <h4 className="mb-1 font-mono text-[10px] uppercase text-violet-400">Mühendislik Notu</h4>
                <p className="italic text-slate-400">{selectedProject.techDetails.note}</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedProject(null)}
              className="mt-8 w-full rounded-xl bg-white/[0.05] py-3 text-sm font-semibold hover:bg-white/[0.1] text-white transition-colors"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
