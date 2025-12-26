import React, { useState, useEffect, useRef } from 'react';
import { Camera, Printer, FileText, User, Calendar, MapPin, Check, ArrowLeft, Plus, Trash2, Download, Instagram, Phone, Menu, X, Image as ImageIcon, Mail, Globe, Upload, CreditCard, Share2, Send, AlertTriangle, FileDown, History, Save, Eye, HelpCircle, CheckCircle, PartyPopper, Maximize2, Minimize2, ChevronDown, Pencil, ZoomIn, ZoomOut, Loader2, Sparkles, Star } from 'lucide-react';

// --- DATA PAKET DARI FILE TEXT ---
const PACKAGES = [
  // --- AQIQAH / LAMARAN / PENGAJIAN ---
  {
    id: 'pure',
    category: 'Acara (Aqiqah/Lamaran)',
    name: 'PAKET PURE',
    price: 1700000,
    features: [
      '1 Fotografer',
      '5-6 Jam Kerja',
      'Area Kota Muaraenim',
      '1 Foto & Bingkai 22r (40x60 cm)',
      'Minimal 10-50 Foto Editan',
      '1 Flashdisk Seluruh File Foto',
      'Seluruh File Edit via Google Drive'
    ]
  },
  {
    id: 'fairy',
    category: 'Acara (Aqiqah/Lamaran)',
    name: 'PAKET FAIRY',
    price: 3700000,
    features: [
      '1 Fotografer & 1 Videografer',
      '5-6 Jam Kerja',
      'Area Kota Muaraenim',
      '1 Foto & Bingkai 22r (40x60 cm)',
      'Minimal 20-70 Foto Editan',
      '1 Video Dokumentasi / Teaser 1 Menit',
      '1 Flashdisk Seluruh File Foto',
      'Seluruh File Edit via Google Drive'
    ]
  },
  // --- PREWEDDING ---
  {
    id: 'dreamy',
    category: 'Prewedding',
    name: 'PAKET DREAMY',
    price: 1700000,
    features: [
      '1 Fotografer',
      '3 Jam Kerja',
      'Area Kota Muaraenim',
      '1 Lokasi',
      '1 Foto & Bingkai 22r (40x60 cm)',
      'Minimal 10-40 Foto Editan',
      'Seluruh File Foto Edit via Google Drive'
    ]
  },
  {
    id: 'stellar',
    category: 'Prewedding',
    name: 'PAKET STELLAR',
    price: 3700000,
    features: [
      '1 Fotografer & 1 Videografer',
      '4 Jam Kerja',
      'Area Kota Muaraenim',
      '1 Lokasi',
      '1 Foto & Bingkai 22r (40x60 cm)',
      'Reels/Teaser 30-60 Detik',
      'Minimal 15-50 Foto Editan',
      '1 Flashdisk Seluruh File Foto',
      'Seluruh File Foto Edit via Google Drive'
    ]
  },
  // --- WEDDING ---
  {
    id: 'std-wedding',
    category: 'Wedding',
    name: 'STANDAR WEDDING',
    price: 3700000,
    features: [
      '1 Fotografer',
      'Area Kota Muaraenim',
      '1 Album Kolase Wedding 20x30 cm (11 Lembar, Kotak Standar)',
      'Minimal 100-150 Foto Editan Album / Medsos',
      '1 Flashdisk Seluruh File Foto',
      'Seluruh File Foto Edit via Google Drive'
    ]
  },
  {
    id: 'spc-wedding',
    category: 'Wedding',
    name: 'SPECIAL WEDDING',
    price: 4700000,
    features: [
      '1 Fotografer',
      'Area Kota Muaraenim',
      '1 Album Kolase Wedding 20x30 cm (15 Lembar, Kotak Elegan)',
      '1 Foto & Bingkai 22r (40x60 cm)',
      'Minimal 100-200 Foto Editan Album / Medsos',
      '1 Flashdisk Seluruh File Foto',
      'Seluruh File Foto Edit via Google Drive'
    ]
  },
  {
    id: 'starlight',
    category: 'Wedding',
    name: 'STARLIGHT WEDDING',
    price: 5300000,
    features: [
      '1 Fotografer & 1 Videografer',
      '6-8 Jam Kerja',
      'Area Kota Muaraenim',
      '1 Album Kolase Wedding 20x30 cm (15 Lembar, Kotak Akrilik)',
      '1 Foto & Bingkai 22r (40x60 cm)',
      '1 Video Dokumentasi Acara 20-40 menit',
      'Minimal 100-250 Foto Editan Album / Medsos',
      '1 Flashdisk Seluruh File Foto',
      'Seluruh File Foto Edit via Google Drive'
    ]
  },
  {
    id: 'majestic',
    category: 'Wedding',
    name: 'MAJESTIC WEDDING',
    price: 5700000,
    features: [
      '1 Fotografer & 1 Videografer',
      '6-8 Jam Kerja',
      'Area Kota Muaraenim',
      '1 Album Kolase Wedding 30x40 cm (11 Lembar, Kotak Elegan)',
      '1 Foto & Bingkai 22r (40x60 cm)',
      '1 Video Dokumentasi Acara 20-40 menit',
      'Minimal 100-300 Foto Editan Album / Medsos',
      '1 Flashdisk Seluruh File Foto & Video',
      'Seluruh File Foto Edit via Google Drive'
    ]
  },
  {
    id: 'royal',
    category: 'Wedding',
    name: 'ROYAL WEDDING',
    price: 7300000,
    features: [
      '1 Fotografer & 1 Videografer',
      '6-8 Jam Kerja',
      'Area Kota Muaraenim',
      '1 Album Kolase Wedding 30x40 cm (15 Lembar, Kotak Elegan)',
      '1 Foto & Bingkai 22r (40x60 cm)',
      '1 Video Dokumentasi Acara 20-40 Menit',
      'Teaser 1 Menit',
      'Minimal 100-350 Foto Editan Album / Medsos',
      '1 Flashdisk Seluruh File Foto & Video',
      'Seluruh File Foto Edit via Google Drive'
    ]
  }
];

// --- EVENT OPTIONS ---
const EVENT_OPTIONS = [
  'Lamaran',
  'Prawedding',
  'Wedding',
  '7 Bulanan',
  'Ngunduh Mantu',
  'Aqiqah & Tasyakuran',
  'Lainnya'
];

// --- UTILS ---
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const formatNumberInput = (value) => {
  if (!value) return '';
  const rawValue = value.replace(/\D/g, '');
  return new Intl.NumberFormat('id-ID').format(rawValue);
};

const parseNumberInput = (value) => {
  if (!value) return 0;
  return parseInt(value.replace(/\./g, '')) || 0;
};

const generateInvoiceNumber = (history = []) => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const yymm = `${year}${month}`;
  
  let maxSeq = 0;
  const prefix = `INV-TEF-${yymm}-`;
  
  history.forEach(inv => {
    const invNo = inv.clientData?.invoiceNo || '';
    if (invNo.startsWith(prefix)) {
      const parts = invNo.split('-');
      if (parts.length >= 4) {
        const seq = parseInt(parts[3], 10);
        if (!isNaN(seq) && seq > maxSeq) {
          maxSeq = seq;
        }
      }
    }
  });

  const nextSeq = String(maxSeq + 1).padStart(3, '0');
  const randomStr = Math.random().toString(36).substring(2, 5).toUpperCase();
  
  return `INV-TEF-${yymm}-${nextSeq}-${randomStr}`;
};

const formatDateIndo = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
};

const formatEventDateRange = (startDateStr, endDateStr) => {
  if (!startDateStr) return '-';
  
  const optionsShort = { month: 'short' };
  const optionsFull = { year: 'numeric', month: 'short', day: 'numeric' };

  if (endDateStr && startDateStr === endDateStr) {
      const date = new Date(startDateStr);
      return date.toLocaleDateString('id-ID', optionsFull);
  }

  const start = new Date(startDateStr);
  const end = endDateStr ? new Date(endDateStr) : null;

  if (!end) {
    return start.toLocaleDateString('id-ID', optionsFull);
  }

  const startYear = start.getFullYear();
  const endYear = end.getFullYear();
  const startMonth = start.getMonth();
  const endMonth = end.getMonth();
  const startDay = start.getDate();
  const endDay = end.getDate();

  if (startYear === endYear) {
    if (startMonth === endMonth) {
      if (endDay - startDay === 1) {
        return `${startDay}-${endDay} ${start.toLocaleDateString('id-ID', optionsShort)} ${startYear}`;
      } else {
        return `${startDay} ${start.toLocaleDateString('id-ID', optionsShort)} & ${endDay} ${end.toLocaleDateString('id-ID', optionsShort)} ${startYear}`;
      }
    }
  }

  return `${start.toLocaleDateString('id-ID', optionsFull)} - ${end.toLocaleDateString('id-ID', optionsFull)}`;
};

const loadHtml2Pdf = () => {
  return new Promise((resolve, reject) => {
    if (window.html2pdf) {
      resolve(window.html2pdf);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.onload = () => resolve(window.html2pdf);
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// --- MODERN UI COMPONENTS ---

const Navbar = ({ currentView, onNavigate, isMobileMenuOpen, onToggleMobileMenu }) => (
  <header className="fixed top-0 w-full z-40 bg-black/60 backdrop-blur-xl border-b border-white/10 print:hidden transition-all duration-300">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div 
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => onNavigate('home')}
      >
        <div className="relative">
          <Camera className="w-6 h-6 text-amber-500 relative z-10 transition-transform group-hover:rotate-12" />
          <div className="absolute inset-0 bg-amber-500/50 blur-lg rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
        </div>
        <span className="font-bold text-xl tracking-tighter text-white group-hover:text-amber-100 transition-colors">TEFHOTO</span>
      </div>
      
      <nav className="hidden md:flex gap-8 text-sm font-medium text-zinc-400">
        <button onClick={() => onNavigate('portfolio')} className={`hover:text-white transition-all hover:scale-105 ${currentView === 'portfolio' ? 'text-white font-semibold' : ''}`}>Portfolio</button>
        <button onClick={() => onNavigate('home')} className={`hover:text-white transition-all hover:scale-105 ${currentView === 'home' ? 'text-white font-semibold' : ''}`}>Harga & Paket</button>
        <button onClick={() => onNavigate('history')} className={`flex items-center gap-1 hover:text-white transition-all hover:scale-105 ${currentView === 'history' ? 'text-amber-500 font-semibold' : ''}`}><History className="w-4 h-4"/> Riwayat</button>
        <button onClick={() => onNavigate('contact')} className={`hover:text-white transition-all hover:scale-105 ${currentView === 'contact' ? 'text-white font-semibold' : ''}`}>Kontak</button>
      </nav>

      <button className="md:hidden text-zinc-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors" onClick={onToggleMobileMenu}>
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    </div>

    {isMobileMenuOpen && (
      <div className="md:hidden absolute top-16 left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 p-4 flex flex-col gap-2 shadow-2xl animate-in slide-in-from-top-5 duration-200 z-50">
          <button onClick={() => onNavigate('portfolio')} className="text-left px-4 py-3 rounded-xl hover:bg-white/10 text-zinc-300 font-medium transition-colors">Portfolio</button>
          <button onClick={() => onNavigate('home')} className="text-left px-4 py-3 rounded-xl hover:bg-white/10 text-zinc-300 font-medium transition-colors">Harga & Paket</button>
          <button onClick={() => onNavigate('history')} className="text-left px-4 py-3 rounded-xl hover:bg-white/10 text-zinc-300 font-medium flex items-center gap-2 transition-colors"><History className="w-4 h-4"/> Riwayat</button>
          <button onClick={() => onNavigate('contact')} className="text-left px-4 py-3 rounded-xl hover:bg-white/10 text-zinc-300 font-medium transition-colors">Kontak</button>
      </div>
    )}
  </header>
);

const PackageCard = ({ pkg, onSelect, onToggleFocus, isFocused }) => (
  <div 
    onClick={() => onToggleFocus(pkg.id)}
    className={`
      relative bg-zinc-900/40 backdrop-blur-md border rounded-2xl overflow-hidden transition-all duration-500 group flex flex-col h-full 
      hover:shadow-[0_0_40px_-10px_rgba(245,158,11,0.3)]
      ${isFocused 
        ? 'border-amber-500 shadow-[0_0_50px_rgba(245,158,11,0.2)] scale-[1.02] z-10 cursor-zoom-out' 
        : 'border-white/5 hover:border-amber-500/50 hover:-translate-y-1 cursor-zoom-in'
      }
    `}
  >
    {/* Glow Effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

    <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
       {isFocused ? (
         <div className="bg-black/60 p-2 rounded-full backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors"><Minimize2 className="w-4 h-4 text-white" /></div>
       ) : (
         <div className="bg-black/60 p-2 rounded-full backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors"><Maximize2 className="w-4 h-4 text-white" /></div>
       )}
    </div>

    <div className="p-8 flex-grow relative z-10">
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-3">{pkg.category}</span>
          <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">{pkg.name}</h3>
        </div>
      </div>
      <div className="space-y-4 mb-6">
        {pkg.features.map((feature, idx) => (
          <div key={idx} className="flex items-start text-zinc-400 text-sm group-hover:text-zinc-300 transition-colors">
            <div className="mt-1 mr-3 min-w-[16px]">
              <Check className="w-4 h-4 text-emerald-500" />
            </div>
            <span className="leading-snug">{feature}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="bg-black/40 p-6 border-t border-white/5 flex items-center justify-between relative z-10">
      <div>
        <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-0.5">Mulai Dari</p>
        <span className="text-xl font-bold text-white tracking-tight">{formatCurrency(pkg.price)}</span>
      </div>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onSelect(pkg);
        }}
        className="bg-white text-black hover:bg-amber-400 px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg hover:shadow-amber-500/50 transform hover:scale-105 active:scale-95 z-20 relative cursor-pointer flex items-center gap-2"
      >
        Pilih Paket <ArrowLeft className="w-4 h-4 rotate-180" />
      </button>
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---
const App = () => {
  const [view, setView] = useState('home'); 
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [invoiceHistory, setInvoiceHistory] = useState([]);
  
  const [toastMessage, setToastMessage] = useState(null);
  const [showWaModal, setShowWaModal] = useState(false);
  const [isHistoryMode, setIsHistoryMode] = useState(false);
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);
  
  const [focusedPackageId, setFocusedPackageId] = useState(null);
  const [editingInvoiceId, setEditingInvoiceId] = useState(null);

  // --- PREVIEW SCALING STATE ---
  const [previewScale, setPreviewScale] = useState(1);
  const previewContainerRef = useRef(null);
  
  const [clientData, setClientData] = useState({
    name: '',
    phone: '',
    eventDateStart: '', 
    eventDateEnd: '',   
    address: '',
    notes: '',
    eventType: '',
    invoiceNo: ''
  });
  
  const [dpAmount, setDpAmount] = useState(''); 
  const [dpProofImage, setDpProofImage] = useState(null);

  const [additionalItems, setAdditionalItems] = useState([]);
  const [newItem, setNewItem] = useState({ desc: '', cost: '' });

  const categories = [...new Set(PACKAGES.map(p => p.category))];
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const savedHistory = localStorage.getItem('tefhoto_invoices');
    if (savedHistory) {
      try {
        setInvoiceHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // --- AUTO SCALE LOGIC FOR MOBILE PREVIEW ---
  useEffect(() => {
    const handleResize = () => {
      if (view === 'preview' && previewContainerRef.current) {
        const containerWidth = window.innerWidth;
        const targetWidth = 830; // 794px A4 + margins
        
        // Hanya scale down jika layar lebih kecil dari dokumen
        if (containerWidth < targetWidth) {
           const newScale = (containerWidth - 32) / 794; // 32px padding safety
           setPreviewScale(newScale);
        } else {
           setPreviewScale(1);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Init call
    return () => window.removeEventListener('resize', handleResize);
  }, [view]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg);
    setEditingInvoiceId(null);
    setClientData(prev => ({ 
      ...prev, 
      invoiceNo: generateInvoiceNumber(invoiceHistory),
      eventType: '', 
      eventDateEnd: '', 
    }));
    setDpAmount('');
    setDpProofImage(null);
    setAdditionalItems([]);
    setIsHistoryMode(false); 
    setView('form');
    setFocusedPackageId(null);
    window.scrollTo(0,0);
  };

  const handleToggleFocus = (pkgId) => {
    if (focusedPackageId === pkgId) {
       setFocusedPackageId(null);
    } else {
       setFocusedPackageId(pkgId);
       window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAddItem = () => {
    const costValue = parseNumberInput(newItem.cost);
    if (newItem.desc && costValue) {
      setAdditionalItems([...additionalItems, { ...newItem, cost: costValue }]);
      setNewItem({ desc: '', cost: '' });
    }
  };

  const handleRemoveItem = (index) => {
    const newItems = [...additionalItems];
    newItems.splice(index, 1);
    setAdditionalItems(newItems);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDpProofImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDpChange = (e) => {
    const formatted = formatNumberInput(e.target.value);
    setDpAmount(formatted);
  };

  const handleNewItemCostChange = (e) => {
    const formatted = formatNumberInput(e.target.value);
    setNewItem({ ...newItem, cost: formatted });
  };

  const calculateAdditionalTotal = () => {
    let total = 0;
    additionalItems.forEach(item => total += item.cost);
    return total;
  };

  const calculateTotal = () => {
    let total = selectedPackage ? selectedPackage.price : 0;
    total += calculateAdditionalTotal();
    return total;
  };

  const calculateBalance = () => {
    const total = calculateTotal();
    const dp = parseNumberInput(dpAmount);
    return total - dp;
  };

  const handleCreateInvoice = () => {
    if (newItem.desc || newItem.cost) {
      const confirmAdd = window.confirm("Peringatan: Anda memiliki Biaya Tambahan yang belum ditambahkan.\n\nApakah Anda ingin menambahkannya sekarang?");
      if (confirmAdd) {
        handleAddItem();
      }
      return; 
    }
    setView('preview');
  };

  const handleEditFromHistory = (invoice) => {
    setClientData({ ...invoice.clientData });
    setSelectedPackage({ ...invoice.selectedPackage });
    setAdditionalItems([...(invoice.additionalItems || [])]);
    setDpAmount(invoice.dpAmount || '');
    setDpProofImage(null);
    setEditingInvoiceId(invoice.id);
    setIsHistoryMode(false);
    setView('form');
    window.scrollTo(0,0);
  };

  const saveToHistory = () => {
    if (editingInvoiceId) {
       const updatedHistory = invoiceHistory.map(inv => 
         inv.id === editingInvoiceId ? {
             ...inv,
             clientData: { ...clientData },
             selectedPackage: { ...selectedPackage },
             additionalItems: [...additionalItems],
             dpAmount: dpAmount,
             totalAmount: calculateTotal(),
             balance: calculateBalance(),
             updatedAt: new Date().toISOString()
         } : inv
       );
       setInvoiceHistory(updatedHistory);
       localStorage.setItem('tefhoto_invoices', JSON.stringify(updatedHistory));
       showToast("Invoice diperbarui!");
    } else {
       const newInvoice = {
         id: Date.now(),
         createdAt: new Date().toISOString(),
         clientData: { ...clientData },
         selectedPackage: { ...selectedPackage },
         additionalItems: [...additionalItems],
         dpAmount: dpAmount,
         totalAmount: calculateTotal(),
         balance: calculateBalance()
       };
       const updatedHistory = [newInvoice, ...invoiceHistory];
       setInvoiceHistory(updatedHistory);
       localStorage.setItem('tefhoto_invoices', JSON.stringify(updatedHistory));
       showToast("Simpan History Berhasil!");
    }
  };

  const deleteFromHistory = (id) => {
    if (window.confirm("Hapus invoice ini dari riwayat?")) {
      const updatedHistory = invoiceHistory.filter(inv => inv.id !== id);
      setInvoiceHistory(updatedHistory);
      localStorage.setItem('tefhoto_invoices', JSON.stringify(updatedHistory));
      showToast("Invoice dihapus.");
    }
  };

  const loadFromHistory = (invoice) => {
    setClientData(invoice.clientData);
    setSelectedPackage(invoice.selectedPackage);
    setAdditionalItems(invoice.additionalItems || []);
    setDpAmount(invoice.dpAmount || '');
    setDpProofImage(null); 
    setIsHistoryMode(true);
    setView('preview');
  };

  const handleClearDateStart = () => setClientData({ ...clientData, eventDateStart: '' });
  const handleClearDateEnd = () => setClientData({ ...clientData, eventDateEnd: '' });

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  
  const navigateTo = (destination) => {
    setView(destination);
    setIsMobileMenuOpen(false);
    window.scrollTo(0,0);
  };

  const handleDownloadPDF = async () => {
    setIsPdfGenerating(true);
    let tempContainer = null;
    try {
      await loadHtml2Pdf();
      
      const original = document.getElementById('invoice-print-area');
      if (!original) throw new Error("Element not found");

      const A4_WIDTH_PX = 794; 
      
      // Menggunakan container tersembunyi untuk proses generate PDF
      // agar tidak terpengaruh oleh scaling CSS di preview
      tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '0';
      tempContainer.style.width = `${A4_WIDTH_PX}px`;
      tempContainer.style.backgroundColor = 'white';
      tempContainer.style.zIndex = '-9999';
      document.body.appendChild(tempContainer);

      const clone = original.cloneNode(true);
      
      // Reset transform scaling pada clone untuk hasil PDF yang tajam
      // Hapus inline style transform yang mungkin terbawa
      clone.style.transform = 'none'; 
      clone.style.width = '100%';
      clone.style.height = '1123px';
      clone.style.minWidth = `${A4_WIDTH_PX}px`;
      clone.style.margin = '0';
      clone.style.padding = '0';
      clone.style.display = 'flex';
      clone.style.flexDirection = 'column';
      
      tempContainer.appendChild(clone);

      const today = new Date();
      const dateStr = today.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
      const clientName = clientData.name ? clientData.name.replace(/[^a-zA-Z0-9 ]/g, '') : 'CLIENT';
      const fileName = `${clientData.invoiceNo} - ${clientName} - ${dateStr}.pdf`;

      const opt = {
        margin: 0,
        filename: fileName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 3, 
          useCORS: true, 
          logging: false,
          windowWidth: A4_WIDTH_PX,
          width: A4_WIDTH_PX,
          x: 0,
          y: 0,
          scrollX: 0,
          scrollY: 0
        }, 
        jsPDF: { unit: 'px', format: [794, 1123], orientation: 'portrait' }
      };

      await window.html2pdf().set(opt).from(clone).save();
      showToast("PDF Tersimpan!");
      
    } catch (error) {
      console.error("Gagal membuat PDF:", error);
      alert("Gagal mengunduh PDF. Pastikan internet aktif.");
    } finally {
      if (tempContainer && document.body.contains(tempContainer)) {
        document.body.removeChild(tempContainer);
      }
      setIsPdfGenerating(false);
    }
  };

  const generatePdfFile = async () => {
    await loadHtml2Pdf();
    let tempContainer = null;
    try {
        const original = document.getElementById('invoice-print-area');
        const A4_WIDTH_PX = 794; 

        tempContainer = document.createElement('div');
        tempContainer.style.position = 'absolute'; 
        tempContainer.style.left = '-9999px'; 
        tempContainer.style.top = '0';
        tempContainer.style.width = `${A4_WIDTH_PX}px`; 
        tempContainer.style.backgroundColor = 'white';
        tempContainer.style.zIndex = '-9999';
        document.body.appendChild(tempContainer);
        
        const clone = original.cloneNode(true);
        clone.style.transform = 'none';
        clone.style.width = '100%';
        clone.style.height = '1123px';
        clone.style.minWidth = `${A4_WIDTH_PX}px`;
        clone.style.margin = '0';
        clone.style.padding = '0';
        clone.style.display = 'flex';
        clone.style.flexDirection = 'column';
        
        tempContainer.appendChild(clone);
        
        const today = new Date();
        const dateStr = today.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
        const clientName = clientData.name ? clientData.name.replace(/[^a-zA-Z0-9 ]/g, '') : 'CLIENT';
        const fileName = `${clientData.invoiceNo} - ${clientName} - ${dateStr}.pdf`;

        const opt = {
          margin: 0,
          filename: fileName,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { 
              scale: 3, 
              useCORS: true, 
              logging: false, 
              windowWidth: A4_WIDTH_PX, 
              width: A4_WIDTH_PX,
              x: 0,
              y: 0,
              scrollX: 0,
              scrollY: 0
          },
          jsPDF: { unit: 'px', format: [794, 1123], orientation: 'portrait' }
        };

        const blob = await window.html2pdf().set(opt).from(clone).output('blob');
        return new File([blob], fileName, { type: 'application/pdf' });

    } finally {
        if (tempContainer && document.body.contains(tempContainer)) {
            document.body.removeChild(tempContainer);
        }
    }
  };
  
  const handleSmartShare = async () => {
    setIsPdfGenerating(true);
    try {
      const file = await generatePdfFile();
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: file.name,
            text: `Halo ${clientData.name}, berikut Invoice dari TEFHOTO.`
          });
          showToast("Berhasil membagikan!");
        } catch (shareError) {
          if (shareError.name !== 'AbortError') {
             handleFallbackWa(file);
          }
        }
      } else {
        handleFallbackWa(file);
      }
    } catch (error) {
      console.error("Gagal share PDF:", error);
    } finally {
      setIsPdfGenerating(false);
    }
  };

  const handleFallbackWa = (file) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowWaModal(true);
  };
  
  const handlePrintHelp = () => {
    alert("DOKUMEN PDF:\n\nSistem akan mengunduh PDF resmi ke folder 'Download' perangkat Anda.\n\nPastikan untuk melampirkan file tersebut saat mengirim pesan ke klien.");
  };

  const openWaLinkManual = () => {
      const total = formatCurrency(calculateTotal());
      const dp = dpAmount ? formatCurrency(parseNumberInput(dpAmount)) : 'Rp 0';
      const sisa = formatCurrency(calculateBalance());
      const eventDate = clientData.eventDateStart 
        ? `${formatDateIndo(clientData.eventDateStart)} ${clientData.eventDateEnd ? 's/d ' + formatDateIndo(clientData.eventDateEnd) : ''}`
        : '-';

      let message = `Halo *${clientData.name.toUpperCase()}*,\n\n`;
      message += `Berikut saya lampirkan Invoice Resmi dalam format PDF.\n\n`;
      message += `*RINGKASAN:*\n`;
      message += `No: ${clientData.invoiceNo}\n`;
      if(clientData.eventType) message += `Acara: ${clientData.eventType}\n`;
      message += `Paket: ${selectedPackage?.name}\n`;
      message += `Tanggal: ${eventDate}\n`;
      message += `------------------------------\n`;
      message += `*Total Tagihan: ${total}*\n`;
      message += `*DP: ${dp}*\n`;
      message += `*Sisa Tagihan: ${sisa}*\n`;
      message += `------------------------------\n\n`;
      message += `Pembayaran via: \n*BCA 812-023-8192*\na.n TEDY PURNAJAYA\n\n`;
      message += `Terima kasih,\n*TEFHOTO*`;

      const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
      setShowWaModal(false);
  };

  if (view === 'home') {
    let packagesToDisplay = PACKAGES;
    if (focusedPackageId) {
      packagesToDisplay = PACKAGES.filter(p => p.id === focusedPackageId);
    } else {
      packagesToDisplay = PACKAGES.filter(p => activeCategory === 'All' || p.category === activeCategory);
    }

    return (
      <div className="min-h-screen bg-black text-white font-sans selection:bg-amber-500 selection:text-black pb-20 relative overflow-hidden">
        {/* Background Ambient Light */}
        <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-zinc-800/20 via-black to-black -z-10"></div>
        <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[128px] -z-10"></div>

        <Navbar currentView={view} onNavigate={navigateTo} isMobileMenuOpen={isMobileMenuOpen} onToggleMobileMenu={toggleMobileMenu} />
        
        {!focusedPackageId && (
          <>
            <div className="pt-32 pb-10 px-6 text-center max-w-5xl mx-auto animate-in slide-in-from-top-10 fade-in duration-700">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-amber-500 mb-6 backdrop-blur-md">
                <Sparkles className="w-3 h-3" /> <span>Professional Photography Services</span>
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 bg-gradient-to-br from-white via-white to-zinc-500 bg-clip-text text-transparent pb-2 leading-tight tracking-tighter drop-shadow-2xl">
                Tangkap Momen Sempurna
              </h1>
              <p className="text-zinc-400 text-sm sm:text-base md:text-xl max-w-2xl mx-auto font-light tracking-wide leading-relaxed mb-8">
                Abadikan kenangan tak terlupakan dengan sentuhan artistik profesional bersama TEFHOTO.
              </p>
            </div>
            
            <div className="px-6 mb-12 flex flex-wrap justify-center gap-3">
              <button onClick={() => setActiveCategory('All')} className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold border transition-all duration-300 ${activeCategory === 'All' ? 'bg-white text-black border-white shadow-lg shadow-white/10 scale-105' : 'bg-white/5 text-zinc-400 border-white/10 hover:bg-white/10 hover:text-white'}`}>Semua Paket</button>
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold border transition-all duration-300 ${activeCategory === cat ? 'bg-white text-black border-white shadow-lg shadow-white/10 scale-105' : 'bg-white/5 text-zinc-400 border-white/10 hover:bg-white/10 hover:text-white'}`}>{cat}</button>
              ))}
            </div>
          </>
        )}

        {focusedPackageId && (
          <div className="pt-24 pb-4 px-6 max-w-md mx-auto flex justify-start animate-in fade-in slide-in-from-bottom-4 duration-500">
             <button 
               onClick={() => setFocusedPackageId(null)}
               className="flex items-center text-zinc-400 hover:text-white transition-colors group px-4 py-2 rounded-xl hover:bg-white/5"
             >
               <div className="p-1.5 rounded-full bg-zinc-800 group-hover:bg-zinc-700 mr-2 transition-colors border border-zinc-700">
                 <ArrowLeft className="w-4 h-4" /> 
               </div>
               <span className="font-medium">Kembali ke Daftar Paket</span>
             </button>
          </div>
        )}

        <div className={`mx-auto px-6 transition-all duration-500 pb-20 ${focusedPackageId ? 'max-w-md mt-0' : 'max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'}`}>
          {packagesToDisplay.map(pkg => (
            <PackageCard 
              key={pkg.id} 
              pkg={pkg} 
              onSelect={handleSelectPackage} 
              onToggleFocus={handleToggleFocus}
              isFocused={focusedPackageId === pkg.id}
            />
          ))}
        </div>
      </div>
    );
  }

  if (view === 'history') {
    return (
      <div className="min-h-screen bg-zinc-950 text-white font-sans relative">
         <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black -z-10"></div>
        <Navbar currentView={view} onNavigate={navigateTo} isMobileMenuOpen={isMobileMenuOpen} onToggleMobileMenu={toggleMobileMenu} />
        <div className="pt-28 pb-12 px-6 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-white/10 pb-6 gap-4">
             <div>
               <h2 className="text-3xl font-bold text-white flex items-center gap-3"><History className="w-8 h-8 text-amber-500"/> Riwayat Invoice</h2>
               <p className="text-zinc-400 mt-2">Kelola semua invoice yang pernah Anda buat di sini.</p>
             </div>
             <button onClick={() => navigateTo('home')} className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-zinc-200 transition-colors flex items-center gap-2 shadow-lg shadow-white/5 hover:scale-105 active:scale-95 transform duration-200">
               <Plus className="w-4 h-4"/> Buat Invoice Baru
             </button>
          </div>

          {invoiceHistory.length === 0 ? (
            <div className="text-center py-24 bg-zinc-900/30 rounded-3xl border border-white/5 border-dashed backdrop-blur-sm">
              <div className="bg-zinc-800/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                 <FileText className="w-10 h-10 text-zinc-600"/>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Belum Ada Riwayat</h3>
              <p className="text-zinc-500 text-base mb-6">Anda belum membuat invoice apapun.</p>
              <button onClick={() => navigateTo('home')} className="text-amber-500 hover:text-amber-400 font-bold tracking-wide hover:underline decoration-amber-500/30 underline-offset-4">Buat Invoice Sekarang &rarr;</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {invoiceHistory.map((invoice) => (
                <div key={invoice.id} className="bg-zinc-900/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-amber-500/30 transition-all hover:bg-zinc-900/80 group">
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-zinc-800/80 text-zinc-300 px-3 py-1 rounded-md text-xs font-mono font-bold tracking-wider border border-white/5">{invoice.invoiceNo}</span>
                      <span className="text-zinc-500 text-xs font-medium flex items-center gap-1"><Calendar className="w-3 h-3"/> {new Date(invoice.createdAt).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'})}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-amber-500 transition-colors">{invoice.clientData.name?.toUpperCase() || 'TANPA NAMA'}</h3>
                    <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-zinc-400 mt-2">
                      <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-zinc-600"></div> {invoice.selectedPackage.name}</span>
                      <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div> <span className="text-white font-mono">{formatCurrency(invoice.totalAmount)}</span></span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 w-full md:w-auto">
                    <button onClick={() => handleEditFromHistory(invoice)} className="flex-1 md:flex-none bg-zinc-800 hover:bg-zinc-700 text-white w-10 h-10 rounded-xl font-medium transition-colors flex items-center justify-center border border-white/5" title="Edit"><Pencil className="w-4 h-4"/></button>
                    <button onClick={() => loadFromHistory(invoice)} className="flex-1 md:flex-none bg-amber-500 hover:bg-amber-400 text-black px-5 py-2.5 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-900/20"><Eye className="w-4 h-4"/> Lihat</button>
                    <button onClick={() => deleteFromHistory(invoice.id)} className="flex-1 md:flex-none bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 w-10 h-10 rounded-xl font-medium transition-colors flex items-center justify-center" title="Hapus"><Trash2 className="w-4 h-4"/></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {toastMessage && (
           <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-emerald-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 z-50 animate-in slide-in-from-bottom-5">
             <CheckCircle className="w-5 h-5"/>
             <span className="font-medium">{toastMessage}</span>
           </div>
        )}
      </div>
    );
  }

  if (view === 'portfolio') {
    return (
      <div className="min-h-screen bg-zinc-950 text-white font-sans relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>

        <Navbar currentView={view} onNavigate={navigateTo} isMobileMenuOpen={isMobileMenuOpen} onToggleMobileMenu={toggleMobileMenu} />
        <div className="pt-24 pb-12 px-6 max-w-4xl mx-auto flex flex-col justify-center min-h-[85vh]">
          <div className="bg-zinc-900/30 backdrop-blur-xl p-8 md:p-16 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden group">
             {/* Removed Name & Logo as requested */}
             
             <div className="relative z-10">
                <h1 className="text-3xl md:text-5xl font-black mb-8 leading-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                  Mengabadikan Esensi dalam Setiap Frame
                </h1>
                
                <div className="space-y-6 text-zinc-300 text-lg md:text-xl leading-relaxed font-light">
                  <p>
                    Berangkat dari perjalanan kreatif <a href="https://instagram.com/tere.production" target="_blank" rel="noopener noreferrer" className="text-amber-500 font-medium hover:text-amber-400 hover:underline transition-all">@TERE.PRODUCTION</a>, TEFHOTO menghadirkan fotografi sebagai medium bercerita—mengolah momen, emosi, dan detail dengan pendekatan artistik yang personal.
                  </p>
                  <p>
                    Setiap sesi dirancang sebagai kolaborasi intim, menghasilkan karya visual yang tidak hanya estetis, tetapi juga meninggalkan kesan mendalam.
                  </p>
                </div>

                <div className="mt-12 flex flex-col sm:flex-row gap-4">
                  <button onClick={() => window.open('https://instagram.com/tefhoto', '_blank')} className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-black hover:bg-zinc-200 rounded-xl transition-all font-bold shadow-lg shadow-white/10 hover:scale-105 active:scale-95">
                    <Instagram className="w-5 h-5" /> Kunjungi Instagram
                  </button>
                  <button onClick={() => navigateTo('home')} className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl transition-colors text-white font-medium backdrop-blur-md">
                    Lihat Paket Harga
                  </button>
                </div>
             </div>

             {/* Decorative Elements */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-500/10 to-transparent rounded-bl-full opacity-50 group-hover:opacity-80 transition-opacity duration-1000"></div>
          </div>
          
          {/* Aesthetic Footer */}
          <div className="mt-8 text-center opacity-60 hover:opacity-100 transition-opacity duration-500">
             <p className="text-[10px] tracking-[0.3em] font-light text-zinc-500 uppercase">
               Created by <span className="font-medium text-zinc-400">@gayaku_tedy</span>
             </p>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'contact') {
    return (
      <div className="min-h-screen bg-zinc-950 text-white font-sans relative">
         <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-zinc-900 to-transparent -z-10 opacity-50"></div>
        <Navbar currentView={view} onNavigate={navigateTo} isMobileMenuOpen={isMobileMenuOpen} onToggleMobileMenu={toggleMobileMenu} />
        <div className="pt-24 pb-12 px-6 max-w-3xl mx-auto flex flex-col justify-center min-h-[80vh]">
          <div className="bg-zinc-900/40 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
             
             <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 mb-4 ring-1 ring-amber-500/20">
                  <Phone className="w-6 h-6 text-amber-500"/>
                </div>
                <h2 className="text-4xl font-bold mb-3">Hubungi Kami</h2>
                <p className="text-zinc-400 text-lg">Konsultasikan momen spesial Anda bersama tim TEFHOTO</p>
             </div>

             <div className="space-y-4">
               {/* Contact Items - Modern Card Style */}
               <div className="group flex items-center gap-5 p-5 bg-black/40 rounded-2xl border border-white/5 hover:border-amber-500/30 hover:bg-zinc-900/60 transition-all duration-300">
                 <div className="bg-zinc-800 p-3 rounded-xl group-hover:bg-amber-500 group-hover:text-black transition-colors duration-300"><Phone className="w-6 h-6" /></div>
                 <div><p className="text-xs text-zinc-500 uppercase font-bold tracking-widest mb-1">WhatsApp / Telepon</p><p className="text-xl font-bold text-white tracking-tight">0822 8121 1122 <span className="text-zinc-600 text-sm font-normal ml-2">| TEDY</span></p></div>
               </div>

                <div className="group flex items-center gap-5 p-5 bg-black/40 rounded-2xl border border-white/5 hover:border-pink-500/30 hover:bg-zinc-900/60 transition-all duration-300 cursor-pointer" onClick={() => window.open('https://instagram.com/tefhoto', '_blank')}>
                 <div className="bg-zinc-800 p-3 rounded-xl group-hover:bg-pink-600 group-hover:text-white transition-colors duration-300"><Instagram className="w-6 h-6" /></div>
                 <div><p className="text-xs text-zinc-500 uppercase font-bold tracking-widest mb-1">Instagram</p><p className="text-xl font-bold text-white tracking-tight">@TEFHOTO</p></div>
               </div>

               <div className="group flex items-center gap-5 p-5 bg-black/40 rounded-2xl border border-white/5 hover:border-blue-500/30 hover:bg-zinc-900/60 transition-all duration-300 cursor-pointer" onClick={() => window.open('https://s.id/tefhoto', '_blank')}>
                 <div className="bg-zinc-800 p-3 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300"><Globe className="w-6 h-6" /></div>
                 <div><p className="text-xs text-zinc-500 uppercase font-bold tracking-widest mb-1">Tautan Resmi</p><p className="text-lg font-bold text-white">s.id/tefhoto</p></div>
               </div>

               <div className="group flex items-center gap-5 p-5 bg-black/40 rounded-2xl border border-white/5 hover:border-emerald-500/30 hover:bg-zinc-900/60 transition-all duration-300">
                 <div className="bg-zinc-800 p-3 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300"><Mail className="w-6 h-6" /></div>
                 <div><p className="text-xs text-zinc-500 uppercase font-bold tracking-widest mb-1">Email</p><p className="text-lg font-medium text-white">tefhoto@gmail.com</p></div>
               </div>
             </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'form') {
    const isCustomEvent = !EVENT_OPTIONS.includes(clientData.eventType) && clientData.eventType !== '';
    const currentSelectValue = isCustomEvent ? 'Lainnya' : clientData.eventType;

    return (
      <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-12 font-sans pt-24 md:pt-16">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => setView('home')} className="flex items-center text-zinc-400 hover:text-white mb-8 transition-colors px-4 py-2 hover:bg-white/5 rounded-lg w-fit">
            <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
          </button>

          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">
            <div className="mb-8 border-b border-white/10 pb-6 flex justify-between items-start">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight">{editingInvoiceId ? 'Edit Invoice' : 'Detail Pemesanan'}</h2>
                <p className="text-sm text-zinc-400">Lengkapi formulir di bawah ini untuk membuat invoice profesional.</p>
              </div>
              {editingInvoiceId && (
                <span className="bg-amber-500/10 border border-amber-500/20 text-amber-500 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider animate-pulse">Mode Edit</span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10">
              {/* Selected Package Display */}
              <div className="col-span-1 md:col-span-2">
                <div className="p-6 bg-gradient-to-r from-zinc-900 to-black border border-white/10 rounded-2xl flex flex-col md:flex-row justify-between md:items-center gap-4 group hover:border-amber-500/30 transition-colors">
                  <div>
                    <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest mb-1">Paket Terpilih</p>
                    <p className="text-2xl font-bold text-white">{selectedPackage?.name}</p>
                    <p className="text-sm text-amber-500 font-medium mt-1">{selectedPackage?.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold tracking-tighter">{formatCurrency(selectedPackage?.price)}</p>
                  </div>
                </div>
              </div>

               <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-400 ml-1">Nama Klien</label>
                <div className="relative group">
                  <User className="absolute left-4 top-3.5 w-5 h-5 text-zinc-600 group-focus-within:text-amber-500 transition-colors pointer-events-none" />
                  <input type="text" value={clientData.name} onChange={(e) => setClientData({...clientData, name: e.target.value.replace(/[^a-zA-Z\s.,'-]/g, '')})} className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-3 pl-12 px-4 text-white focus:outline-none focus:border-amber-500 focus:bg-zinc-900 transition-all uppercase font-medium placeholder:text-zinc-700" placeholder="Nama Lengkap"/>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-400 ml-1">Nomor WhatsApp</label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-3.5 w-5 h-5 text-zinc-600 group-focus-within:text-amber-500 transition-colors pointer-events-none" />
                  <input type="text" inputMode="numeric" value={clientData.phone} onChange={(e) => setClientData({...clientData, phone: e.target.value.replace(/\D/g, '')})} className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-3 pl-12 px-4 text-white focus:outline-none focus:border-amber-500 focus:bg-zinc-900 transition-all font-mono" placeholder="08..."/>
                </div>
              </div>

              <div className="space-y-2 col-span-1 md:col-span-2">
                <label className="text-sm font-bold text-zinc-400 ml-1">Jenis Kegiatan / Acara</label>
                <div className="relative group">
                  <PartyPopper className="absolute left-4 top-3.5 w-5 h-5 text-zinc-600 group-focus-within:text-amber-500 transition-colors pointer-events-none z-10" />
                  <div className="relative">
                    <select value={currentSelectValue} onChange={(e) => setClientData({...clientData, eventType: e.target.value})} className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-3 pl-12 px-4 text-white focus:outline-none focus:border-amber-500 focus:bg-zinc-900 transition-all appearance-none cursor-pointer font-medium">
                      <option value="" disabled>Pilih Jenis Acara...</option>
                      {EVENT_OPTIONS.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
                    </select>
                    <ChevronDown className="absolute right-4 top-3.5 w-4 h-4 text-zinc-500 pointer-events-none"/>
                  </div>
                </div>
                {(currentSelectValue === 'Lainnya') && (
                  <div className="mt-3 animate-in slide-in-from-top-2">
                    <input type="text" value={clientData.eventType === 'Lainnya' ? '' : clientData.eventType} onChange={(e) => setClientData({...clientData, eventType: e.target.value})} className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500 focus:bg-zinc-900 transition-all uppercase" placeholder="Ketik Nama Acara Lainnya..." autoFocus/>
                  </div>
                )}
              </div>

              <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 relative z-10">
                    <label className="text-sm font-bold text-zinc-400 ml-1">Dari Tanggal</label>
                    <div className="relative group flex items-center">
                      <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-zinc-600 group-focus-within:text-amber-500 transition-colors pointer-events-none z-0" />
                      <input type="date" value={clientData.eventDateStart} onChange={(e) => setClientData({...clientData, eventDateStart: e.target.value})} className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-3 pl-12 px-4 text-white focus:outline-none focus:border-amber-500 focus:bg-zinc-900 transition-all cursor-pointer relative z-10 pr-10" style={{ colorScheme: 'dark' }} />
                      {clientData.eventDateStart && (
                        <button onClick={handleClearDateStart} className="absolute right-3 z-20 text-zinc-500 hover:text-white bg-zinc-800 rounded-full p-1 transition-colors" title="Hapus"><X className="w-3 h-3" /></button>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2 relative z-10">
                    <label className="text-sm font-bold text-zinc-400 ml-1">Sampai Tanggal</label>
                    <div className="relative group flex items-center">
                      <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-zinc-600 group-focus-within:text-amber-500 transition-colors pointer-events-none z-0" />
                      <input type="date" value={clientData.eventDateEnd} onChange={(e) => setClientData({...clientData, eventDateEnd: e.target.value})} className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-3 pl-12 px-4 text-white focus:outline-none focus:border-amber-500 focus:bg-zinc-900 transition-all cursor-pointer relative z-10 pr-10" style={{ colorScheme: 'dark' }} />
                      {clientData.eventDateEnd && (
                        <button onClick={handleClearDateEnd} className="absolute right-3 z-20 text-zinc-500 hover:text-white bg-zinc-800 rounded-full p-1 transition-colors" title="Hapus"><X className="w-3 h-3" /></button>
                      )}
                    </div>
                  </div>
              </div>

              <div className="space-y-2 col-span-1 md:col-span-2">
                <label className="text-sm font-bold text-zinc-400 ml-1">Alamat Lengkap</label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-zinc-600 group-focus-within:text-amber-500 transition-colors pointer-events-none" />
                  <textarea value={clientData.address} onChange={(e) => setClientData({...clientData, address: e.target.value})} className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-3 pl-12 px-4 text-white focus:outline-none focus:border-amber-500 focus:bg-zinc-900 transition-all min-h-[80px] resize-y uppercase font-medium" placeholder="Alamat lengkap acara..." rows={1}/>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-zinc-400 ml-1">Catatan Tambahan (Opsional)</label>
                <textarea value={clientData.notes} onChange={(e) => setClientData({...clientData, notes: e.target.value})} className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500 focus:bg-zinc-900 transition-all h-24 resize-none uppercase font-medium" placeholder="Request khusus..."/>
              </div>

              <div className="col-span-1 md:col-span-2 border-t border-white/10 pt-8 mt-2">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-zinc-300"><CreditCard className="w-5 h-5 text-amber-500" /> Informasi Pembayaran</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-zinc-400 ml-1">Nominal DP</label>
                    <div className="relative group">
                      <span className="absolute left-4 top-3 text-zinc-500 font-bold group-focus-within:text-amber-500 transition-colors">Rp</span>
                      <input type="text" value={dpAmount} onChange={handleDpChange} className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-3 pl-12 px-4 text-white focus:outline-none focus:border-amber-500 focus:bg-zinc-900 transition-all font-mono font-bold text-lg" placeholder="0"/>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-zinc-400 ml-1">Bukti DP (Opsional)</label>
                    <div className="relative">
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="dp-upload" />
                      <label htmlFor="dp-upload" className="flex items-center justify-center w-full bg-zinc-900/50 border border-white/10 border-dashed hover:border-amber-500 hover:bg-zinc-900/80 rounded-xl py-3 px-4 text-zinc-400 cursor-pointer transition-all h-[52px]">
                        {dpProofImage ? (<span className="text-emerald-500 flex items-center gap-2 font-bold"><Check className="w-4 h-4" /> Gambar Terpilih</span>) : (<span className="flex items-center gap-2 group"><Upload className="w-4 h-4 group-hover:-translate-y-1 transition-transform" /> Pilih Bukti Gambar</span>)}
                      </label>
                    </div>
                  </div>
                </div>
                {dpProofImage && (
                  <div className="mt-4 p-2 bg-black border border-white/10 rounded-xl w-fit relative group">
                    <img src={dpProofImage} alt="Bukti DP" className="h-24 object-contain rounded-lg" />
                    <button onClick={() => setDpProofImage(null)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-3 h-3"/></button>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-10 border-t border-white/10 pt-8">
               <label className="text-sm font-bold text-zinc-400 mb-3 block flex justify-between items-center">
                 <span>Biaya Tambahan Lainnya (Opsional)</span>
                 {(newItem.desc || newItem.cost) && <span className="text-amber-500 text-xs animate-pulse flex items-center gap-1 font-bold"><AlertTriangle className="w-3 h-3"/> Klik Tombol TAMBAH</span>}
               </label>
               <div className="flex flex-col md:flex-row gap-3 mb-4">
                 <input type="text" placeholder="NAMA ITEM (MISAL: TRANSPORT LUAR KOTA)" value={newItem.desc} onChange={(e) => setNewItem({...newItem, desc: e.target.value})} className="flex-grow bg-zinc-900/50 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-amber-500 focus:bg-zinc-900 transition-all uppercase font-medium"/>
                 <div className="flex gap-3">
                   <div className="relative w-full md:w-48">
                      <span className="absolute left-3 top-3 text-zinc-500 text-sm font-bold">Rp</span>
                      <input type="text" placeholder="0" value={newItem.cost} onChange={handleNewItemCostChange} className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-3 pl-9 px-4 text-sm text-white focus:outline-none focus:border-amber-500 focus:bg-zinc-900 transition-all font-mono"/>
                   </div>
                   <button onClick={handleAddItem} className="bg-amber-500 hover:bg-amber-400 px-6 py-3 rounded-xl text-black font-bold shrink-0 transition-colors flex items-center gap-2 shadow-lg shadow-amber-900/20 active:scale-95"><Plus className="w-4 h-4" /> TAMBAH</button>
                 </div>
               </div>
               
               {additionalItems.length > 0 && (
                 <div className="space-y-2 bg-zinc-900/50 p-4 rounded-xl border border-white/5">
                   {additionalItems.map((item, idx) => (
                     <div key={idx} className="flex justify-between items-center text-sm border-b border-white/5 last:border-0 pb-3 last:pb-0">
                       <span className="uppercase font-medium text-zinc-300">{item.desc}</span>
                       <div className="flex items-center gap-4">
                         <span className="font-mono font-bold text-white">{formatCurrency(item.cost)}</span>
                         <button onClick={() => handleRemoveItem(idx)} className="text-red-500 hover:text-red-400 p-1 hover:bg-red-500/10 rounded transition-colors"><Trash2 className="w-4 h-4" /></button>
                       </div>
                     </div>
                   ))}
                 </div>
               )}
            </div>

            <button onClick={handleCreateInvoice} disabled={!clientData.name} className="w-full bg-white text-black hover:bg-zinc-200 py-4 rounded-xl font-bold text-lg shadow-xl shadow-white/5 transition-all disabled:opacity-50 flex justify-center items-center gap-3 transform hover:-translate-y-1 active:translate-y-0">
              <FileText className="w-5 h-5" /> {editingInvoiceId ? 'Simpan Perubahan' : 'Buat Invoice Sekarang'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'preview') {
    return (
      <div className="min-h-screen bg-zinc-950 p-0 md:p-8 overflow-x-hidden print:bg-white print:p-0 flex flex-col items-center">
        <style>{`
          @media print {
            body * { visibility: hidden; }
            #invoice-print-area, #invoice-print-area * { visibility: visible; }
            #invoice-print-area { position: absolute; left: 0; top: 0; width: 100%; margin: 0; padding: 0; }
            .print\\:hidden { display: none !important; }
          }
        `}</style>

        <div className="sticky top-4 z-50 bg-zinc-900/80 backdrop-blur-md p-2 pl-4 pr-2 border border-white/10 rounded-full max-w-fit mx-auto mb-8 flex items-center gap-3 shadow-2xl animate-in slide-in-from-top-10 print:hidden">
          <button onClick={() => setView(isHistoryMode ? 'history' : 'form')} className="flex items-center text-white hover:text-amber-400 transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full text-sm font-medium border border-white/5">
            <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
          </button>
          <div className="h-6 w-px bg-white/10 mx-1"></div>
          <div className="flex items-center gap-2">
            <button onClick={handlePrintHelp} className="p-2.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors" title="Bantuan"><HelpCircle className="w-5 h-5" /></button>
            <button onClick={saveToHistory} className="p-2.5 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20" title="Simpan ke History"><Save className="w-5 h-5" /></button>
            <button onClick={handleDownloadPDF} disabled={isPdfGenerating} className="p-2.5 rounded-full bg-zinc-100 text-black hover:bg-white transition-colors shadow-lg disabled:opacity-50" title="Download PDF">{isPdfGenerating ? <Loader2 className="w-5 h-5 animate-spin"/> : <FileDown className="w-5 h-5" />}</button>
            <button onClick={handleSmartShare} disabled={isPdfGenerating} className="px-4 py-2.5 rounded-full bg-green-600 text-white hover:bg-green-500 transition-colors shadow-lg shadow-green-900/20 font-bold text-sm flex items-center gap-2 disabled:opacity-50"><Send className="w-4 h-4" /> Kirim WA</button>
          </div>
        </div>

        {showWaModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200 print:hidden">
            <div className="bg-zinc-900 border border-white/10 p-6 rounded-3xl max-w-sm w-full shadow-2xl relative">
               <button onClick={() => setShowWaModal(false)} className="absolute top-4 right-4 p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors"><X className="w-4 h-4 text-white"/></button>
               <div className="flex items-center gap-4 mb-6">
                 <div className="bg-green-500/20 p-4 rounded-2xl"><Share2 className="w-8 h-8 text-green-500"/></div>
                 <div>
                    <h3 className="text-xl font-bold text-white">Siap Dikirim</h3>
                    <p className="text-zinc-500 text-xs">Invoice telah dibuat.</p>
                 </div>
               </div>
               <div className="space-y-4">
                  <div className="bg-zinc-800/50 p-4 rounded-xl border border-white/5 text-sm">
                    <p className="text-emerald-400 font-bold mb-2 flex items-center gap-2"><CheckCircle className="w-4 h-4"/> PDF Berhasil Diunduh</p>
                    <p className="text-xs text-zinc-400 leading-relaxed">File PDF sudah tersimpan otomatis di perangkat Anda. Silakan lampirkan file tersebut setelah membuka WhatsApp.</p>
                  </div>
                  <button onClick={openWaLinkManual} className="w-full py-3 bg-green-600 hover:bg-green-500 rounded-xl text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-900/20 transition-all hover:scale-105 active:scale-95">Buka WhatsApp Sekarang</button>
               </div>
            </div>
          </div>
        )}

        {toastMessage && (
           <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-emerald-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 z-[70] animate-in slide-in-from-top-5 print:hidden font-medium">
             <CheckCircle className="w-5 h-5"/>
             <span>{toastMessage}</span>
           </div>
        )}

        {/* CONTAINER UTAMA INVOICE - DENGAN SCALE TRANSFORMATION UNTUK MOBILE */}
        <div 
            ref={previewContainerRef}
            className="origin-top transition-transform duration-300 ease-out"
            style={{ 
              transform: `scale(${previewScale})`,
              marginBottom: `-${(1 - previewScale) * 1123}px` // Negative margin to reduce white space caused by scaling
            }}
        >
            <div id="invoice-print-area" className="bg-white text-black w-[210mm] min-w-[210mm] h-[297mm] shadow-2xl print:shadow-none print:w-full print:m-0 print:static box-border relative font-sans flex flex-col shrink-0 overflow-hidden">
                {/* Header - Fixed Height */}
                <div className="bg-black text-white px-12 py-10 flex justify-between items-center print:bg-black print:text-white flex-none relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-800 rounded-full blur-[80px] opacity-40 -mr-10 -mt-10"></div>
                    <div className="relative z-10">
                        <h1 className="text-4xl font-black tracking-tighter mb-1">TEFHOTO</h1>
                        <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 leading-none">Fotografi & Videografi</p>
                    </div>
                    <div className="text-right relative z-10">
                        <h2 className="text-3xl font-light tracking-[0.2em] opacity-60 leading-none mb-2">INVOICE</h2>
                        <p className="text-xs text-zinc-400 font-mono tracking-wider">{clientData.invoiceNo}</p>
                    </div>
                </div>

                {/* Content Area */}
                <div className="px-12 py-10 flex-grow relative">
                    <div className="grid grid-cols-2 gap-12 mb-10">
                        <div>
                            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">Informasi Klien</h3>
                            <p className="font-bold text-xl uppercase leading-tight mb-1.5 text-gray-900">{clientData.name || 'PELANGGAN'}</p>
                            <p className="text-sm text-gray-600 mb-2 font-medium">{clientData.phone || '-'}</p>
                            {clientData.address && <p className="text-xs text-gray-500 uppercase leading-relaxed max-w-[280px]">{clientData.address}</p>}
                        </div>
                        <div className="text-right">
                            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">Detail Acara</h3>
                            <div className="space-y-3">
                                {clientData.eventType && (
                                    <div className="flex flex-col items-end">
                                        <span className="text-[9px] text-gray-400 uppercase tracking-tighter">Jenis Acara</span>
                                        <span className="font-bold text-sm uppercase leading-none text-gray-800">{clientData.eventType}</span>
                                    </div>
                                )}
                                <div className="flex flex-col items-end">
                                    <span className="text-[9px] text-gray-400 uppercase tracking-tighter">Kategori</span>
                                    <span className="font-bold text-sm leading-none text-gray-800">{selectedPackage?.category}</span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-[9px] text-gray-400 uppercase tracking-tighter">Jadwal</span>
                                    <span className="font-bold text-sm leading-none text-gray-800">
                                        {formatEventDateRange(clientData.eventDateStart, clientData.eventDateEnd)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b-2 border-black">
                                    <th className="text-left py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 w-2/3">Deskripsi Layanan</th>
                                    <th className="text-right py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">Harga (IDR)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr>
                                    <td className="py-6 align-top">
                                        <div className="mb-3">
                                            <p className="font-bold text-lg leading-tight text-gray-900">{selectedPackage?.name}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                                            {selectedPackage?.features.map((feat, i) => (
                                                <div key={i} className="text-[11px] text-gray-500 flex items-start leading-relaxed">
                                                    <span className="w-1 h-1 bg-amber-500 rounded-full mr-2 mt-1.5 shrink-0"></span> {feat}
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="py-6 text-right align-top font-mono font-bold text-gray-800 text-base">
                                        {formatCurrency(selectedPackage?.price)}
                                    </td>
                                </tr>
                                {additionalItems.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="py-4 align-middle">
                                            <div className="flex items-center">
                                                <span className="text-[9px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded mr-3 uppercase tracking-wider">Tambahan</span>
                                                <span className="text-gray-700 font-semibold uppercase text-xs">{item.desc}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 text-right font-mono text-gray-600 font-medium">{formatCurrency(item.cost)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="flex justify-end mt-4">
                        <div className="w-[320px]">
                            <div className="space-y-3 pb-4 border-b border-gray-100">
                                <div className="flex justify-between text-gray-400 text-[11px] font-medium uppercase tracking-tight">
                                    <span>Paket Dasar</span>
                                    <span className="font-mono">{formatCurrency(selectedPackage?.price)}</span>
                                </div>
                                {additionalItems.length > 0 && (
                                    <div className="flex justify-between text-gray-400 text-[11px] font-medium uppercase tracking-tight">
                                        <span>Biaya Tambahan</span>
                                        <span className="font-mono">{formatCurrency(calculateAdditionalTotal())}</span>
                                    </div>
                                )}
                            </div>

                            <div className="py-4 space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-xs text-gray-600 uppercase tracking-tighter">Total Tagihan</span>
                                    <span className="font-bold font-mono text-lg text-gray-900">{formatCurrency(calculateTotal())}</span>
                                </div>
                                {dpAmount && parseNumberInput(dpAmount) > 0 && (
                                    <div className="flex justify-between items-center text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                                        <span className="text-[10px] font-bold uppercase tracking-tight flex items-center"><CheckCircle className="w-3 h-3 mr-1"/> DP Diterima</span>
                                        <span className="font-mono font-bold text-xs">-{formatCurrency(parseNumberInput(dpAmount))}</span>
                                    </div>
                                )}
                            </div>

                            <div className="bg-black text-white px-5 py-4 rounded-lg flex justify-between items-center print:bg-black print:text-white shadow-xl">
                                <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-zinc-400">Sisa Pembayaran</span>
                                <span className="text-2xl font-black tracking-tight">{formatCurrency(calculateBalance())}</span>
                            </div>
                        </div>
                    </div>

                    {clientData.notes && (
                        <div className="mt-10 p-5 bg-gray-50 border-l-[3px] border-amber-500 rounded-r-lg">
                            <h4 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Catatan Khusus</h4>
                            <p className="text-xs text-gray-700 italic leading-relaxed">"{clientData.notes.toUpperCase()}"</p>
                        </div>
                    )}
                    
                    {dpProofImage && (
                        <div className="mt-8 break-inside-avoid">
                            <h4 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-3">Pratinjau Bukti Pembayaran</h4>
                            <img src={dpProofImage} alt="Bukti Transfer" className="h-32 object-contain border border-gray-200 rounded p-1 bg-white" />
                        </div>
                    )}
                </div>

                {/* Footer - Fixed at bottom */}
                <div className="bg-gray-50 px-12 py-8 border-t border-gray-200 print:bg-gray-50 break-inside-avoid flex-none">
                    <div className="grid grid-cols-2 gap-8 items-end">
                        <div className="space-y-3">
                            <div>
                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Metode Pembayaran</p>
                                <p className="font-black text-xl text-gray-800 leading-none tracking-tight">BCA 812-023-8192</p>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter mt-1">A.N TEDY PURNAJAYA</p>
                            </div>
                        </div>
                        <div className="text-right flex flex-col items-end">
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Informasi Kontak</p>
                            <p className="text-xs text-gray-700 font-bold">0822-8121-1122</p>
                            <p className="text-xs text-gray-500 font-medium">Instagram: @TEFHOTO</p>
                            <p className="text-[9px] text-gray-400 mt-4 italic leading-tight">"Mengabadikan momen berharga Anda dengan sempurna."</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }

  return null;
};

export default App;