import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import MagicCard from './components/MagicCard';
import ShimmerButton from './components/ShimmerButton';

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  useEffect(() => {
    if (selectedProject) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [selectedProject]);

  const navLinks = [
    { label: "Hakkımda", id: "hakkımda" },
    { label: "Projeler", id: "projeler" },
    { label: "İletişim", id: "iletişim" },
  ];

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
      description: "AFAD verilerinin Python ile analizi ve büyük depremlerin bölgesel fay hatlarıyla otomatik eşleştirilmesi.",
      tags: ["Python", "Veri Analizi", "Folium"],
      downloadUrl: "/acsp_proje.zip",
      techDetails: {
        highlights: [
          "Python tabanlı otomatik fay hattı eşleştirme algoritması.",
          "UTF-8 standartlarında karakter düzeltme ve veri temizleme.",
          "Folium ile interaktif sismik yoğunluk haritası üretimi."
        ],
        files: ["data.csv", "fay_atamasi.py", "turkiye_sismik_yogunluk_haritasi.html"],
        note: "Excel'in format hatalarını engelleyen Pre-formatting mimarisi uygulanmıştır."
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
    if (error) setSubmitStatus('error');
    else {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
    setIsSubmitting(false);
  };

  const buttonLabel = isSubmitting ? 'Gönderiliyor...' : submitStatus === 'success' ? 'Başarılı!' : submitStatus === 'error' ? 'Hata! Tekrar dene' : 'Mesaj Gönder';

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-blue-500/30 selection:text-white">
      
      {/* Navbar - Keskin ve Temiz */}
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <a href="#" className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-sm bg-blue-500" />
            <span className="font-display text-lg font-bold tracking-tight text-zinc-100">Arda Berke Aday</span>
          </a>
          <div className="hidden items-center gap-2 md:flex">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={`#${item.id}`}
                onClick={scrollToSection(item.id)}
                className="rounded-md px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-100"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center sm:px-6 md:py-32">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
            </span>
            <span className="font-mono text-xs text-zinc-400">Dokuz Eylül Üniv. · Bilgisayar Müh.</span>
          </div>

          <h1 className="font-display max-w-4xl text-4xl font-bold leading-tight tracking-tight text-zinc-100 sm:text-5xl md:text-6xl">
            Kod ile <span className="text-blue-500">Algoritmaları</span>, <br className="hidden md:block" />
            Donanım ile <span className="text-blue-500">Performansı</span> Birleştiriyorum.
          </h1>

          <div className="mt-10 flex gap-4">
            <a
              href="#projeler"
              onClick={scrollToSection('projeler')}
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Projelerimi Gör
            </a>
            <a
              href="#iletişim"
              onClick={scrollToSection('iletişim')}
              className="inline-flex items-center gap-2 rounded-md border border-zinc-700 bg-transparent px-6 py-3 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-white"
            >
              İletişime Geç
            </a>
          </div>

          <div className="mt-24 grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stack.map((card) => (
              <div key={card.label} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 text-left transition-colors hover:border-zinc-700">
                <div className="mb-3 flex justify-between text-zinc-500">
                  <span className="font-mono text-[10px] uppercase tracking-widest">{card.label}</span>
                  <span className="font-mono text-base">{card.glyph}</span>
                </div>
                <p className="text-sm font-medium text-zinc-200">{card.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Hakkımda Section */}
        <section id="hakkımda" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 border-t border-zinc-800/50">
          <div className="mb-12">
            <h2 className="font-display text-3xl font-bold text-zinc-100">Hakkımda</h2>
          </div>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="space-y-6 text-zinc-400 leading-relaxed">
              <p>Dokuz Eylül Üniversitesi Bilgisayar Mühendisliği 2. sınıf öğrencisiyim. Yazılım geliştirme ve yapay zeka alanlarına güçlü bir ilgi duyuyorum. Temel algoritmik problem çözme becerilerimi, düşük seviyeli donanım mimarilerinden modern web teknolojilerine kadar geniş bir yelpazede uyguluyorum.</p>
              <p>Akademik projelerimde nesne yönelimli programlama (OOP), veri yapıları ve algoritma analizi üzerine yoğunlaşıyorum. Bunun yanı sıra, Google Developer Groups (GDG) bünyesinde İnsan Kaynakları Koordinatörü olarak görev alıyor; topluluk içi iletişimi yönetiyorum.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                <h3 className="mb-1 font-mono text-[10px] uppercase tracking-widest text-zinc-500">Eğitim</h3>
                <p className="font-semibold text-zinc-100">Dokuz Eylül Üniv.</p>
                <p className="text-sm text-zinc-400">Bilgisayar Müh. (2. Sınıf)</p>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                <h3 className="mb-1 font-mono text-[10px] uppercase tracking-widest text-zinc-500">Topluluk</h3>
                <p className="font-semibold text-zinc-100">İK Koordinatörü</p>
                <p className="text-sm text-zinc-400">Google Developer Groups</p>
              </div>
            </div>
          </div>
        </section>

        {/* Projeler Section */}
        <section id="projeler" className="mx-auto max-w-7xl px-4 py-24 border-t border-zinc-800/50">
          <div className="mb-12">
            <h2 className="font-display text-3xl font-bold text-zinc-100">Öne Çıkan Projeler</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <MagicCard key={project.index}>
                <div className="mb-6 flex items-start justify-between">
                  <div className="text-blue-500">{project.icon}</div>
                  <span className="font-mono text-xs text-zinc-600">/{project.index}</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-zinc-100">{project.title}</h3>
                <p className="mb-6 flex-1 text-sm text-zinc-400">{project.description}</p>
                <div className="mb-8 flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="rounded border border-zinc-800 bg-zinc-900 px-2 py-1 font-mono text-[10px] text-zinc-300">{tag}</span>
                  ))}
                </div>
                <button 
                  onClick={() => setSelectedProject(project)}
                  className="mt-auto inline-flex w-fit items-center text-sm font-medium text-blue-500 hover:text-blue-400"
                >
                  Detayları İncele →
                </button>
              </MagicCard>
            ))}
          </div>
        </section>

        {/* İletişim Formu */}
        <section id="iletişim" className="mx-auto max-w-7xl px-4 py-24 border-t border-zinc-800/50">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-bold text-zinc-100">İletişime Geçin</h2>
              <p className="mt-4 text-zinc-400">ardaberke221@gmail.com</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text" required placeholder="İsim"
                value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <input
                type="email" required placeholder="E-Posta"
                value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <textarea
                rows={4} required placeholder="Mesajınız"
                value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <ShimmerButton type="submit" disabled={isSubmitting}>
                {buttonLabel}
              </ShimmerButton>
            </form>
          </div>
        </section>

        <footer className="border-t border-zinc-800/50 py-8 text-center font-mono text-xs text-zinc-600">
          &copy; {new Date().getFullYear()} Arda Berke Aday. Tüm hakları saklıdır.
        </footer>
      </main>

      {/* Modal / Detay Penceresi */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm" onClick={() => setSelectedProject(null)} />
          <div className="relative w-full max-w-2xl rounded-xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
            <button onClick={() => setSelectedProject(null)} className="absolute right-6 top-6 text-zinc-500 hover:text-zinc-300">✕</button>
            <div className="mb-8 flex items-center gap-4">
              <div className="text-blue-500">{selectedProject.icon}</div>
              <h3 className="text-2xl font-bold text-zinc-100">{selectedProject.title}</h3>
            </div>
            <div className="space-y-6 text-sm">
              <div>
                <h4 className="mb-3 font-mono text-xs uppercase text-zinc-500">Teknik Analiz Notları</h4>
                <ul className="list-inside list-disc space-y-2 text-zinc-300">
                  {selectedProject.techDetails.highlights.map((h: string) => <li key={h}>{h}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="mb-3 font-mono text-xs uppercase text-zinc-500">Dosya Yapısı</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techDetails.files.map((f: string) => (
                    <code key={f} className="rounded bg-zinc-800 px-2 py-1 font-mono text-zinc-300">{f}</code>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                <h4 className="mb-2 font-mono text-[10px] uppercase text-zinc-500">Mühendislik Notu</h4>
                <p className="text-zinc-400">{selectedProject.techDetails.note}</p>
              </div>
            </div>

            {/* ---> YENİ EKLENEN İNDİRME VE KAPATMA BUTONLARI <--- */}
            <div className="mt-8 flex gap-4">
              {selectedProject.downloadUrl && (
                <a
                  href={selectedProject.downloadUrl}
                  download
                  className="flex-1 rounded-xl bg-blue-600 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  ↓ Proje Dosyalarını İndir
                </a>
              )}
              <button
                onClick={() => setSelectedProject(null)}
                className="flex-1 rounded-xl border border-zinc-700 bg-zinc-800 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700"
              >
                Kapat
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default App;