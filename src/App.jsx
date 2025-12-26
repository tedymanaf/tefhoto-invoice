import React, { useState, useEffect, useRef } from 'react';
import { Camera, Printer, FileText, User, Calendar, MapPin, Check, ArrowLeft, Plus, Trash2, Download, Instagram, Phone, Menu, X, Image as ImageIcon, Mail, Globe, Upload, CreditCard, Share2, Send, AlertTriangle, FileDown, History, Save, Eye, HelpCircle, CheckCircle, PartyPopper, Maximize2, Minimize2, ChevronDown, Pencil, ZoomIn, ZoomOut, Loader2 } from 'lucide-react';

// --- DATA PAKET DARI FILE TEXT ---
const PACKAGES = [
  // --- AQIQAH / LAMARAN / PENGAJIAN ---
  {
    id: 'pure',
    category: 'Events (Aqiqah/Lamaran)',
    name: 'PAKET PURE',
    price: 1700000,
    features: [
      '1 Fotografer',
      '5-6 Jam Kerja',
      'Muaraenim Area Kota',
      '1 Foto & Frame 22r (40x60 cm)',
      'Minimal 10-50 Photo Editing',
      '1 Flashdisk All File Foto',
      'All File Edit via Google Drive'
    ]
  },
  {
    id: 'fairy',
    category: 'Events (Aqiqah/Lamaran)',
    name: 'PAKET FAIRY',
    price: 3700000,
    features: [
      '1 Fotografer & 1 Videografer',
      '5-6 Jam Kerja',
      'Muaraenim Area Kota',
      '1 Foto & Frame 22r (40x60 cm)',
      'Minimal 20-70 Photo Editing',
      '1 Video Dokumentasi / Teaser 1 Menit',
      '1 Flashdisk All File Foto',
      'All File Edit via Google Drive'
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
      'Muaraenim Area Kota',
      '1 Lokasi',
      '1 Foto & Frame 22r (40x60 cm)',
      'Minimal 10-40 Photo Editing',
      'All File Foto Edit via Google Drive'
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
      'Muaraenim Area Kota',
      '1 Lokasi',
      '1 Foto & Frame 22r (40x60 cm)',
      'Reels/Teaser 30-60 Detik',
      'Minimal 15-50 Photo Editing',
      '1 Flashdisk All File Foto',
      'All File Foto Edit via Google Drive'
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
      'Muaraenim Area Kota',
      '1 Wedding Album Colase 20x30 cm (11 Sheet, Box Standar)',
      'Minimal 100-150 Photo Editing Album / Medsos',
      '1 Flashdisk All File Foto',
      'All File Foto Edit via Google Drive'
    ]
  },
  {
    id: 'spc-wedding',
    category: 'Wedding',
    name: 'SPECIAL WEDDING',
    price: 4700000,
    features: [
      '1 Fotografer',
      'Muaraenim Area Kota',
      '1 Wedding Album Colase 20x30 cm (15 Sheet, Box Elegant)',
      '1 Foto & Frame 22r (40x60 cm)',
      'Minimal 100-200 Photo Editing Album / Medsos',
      '1 Flashdisk All File Foto',
      'All File Foto Edit via Google Drive'
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
      'Muaraenim Area Kota',
      '1 Wedding Album Colase 20x30 cm (15 Sheet, Box Acrylic)',
      '1 Foto & Frame 22r (40x60 cm)',
      '1 Video Dokumentasi Acara 20-40 menit',
      'Minimal 100-250 Photo Editing Album / Medsos',
      '1 Flashdisk All File Foto',
      'All File Foto Edit via Google Drive'
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
      'Muaraenim Area Kota',
      '1 Wedding Album Colase 30x40 cm (11 Sheet, Box Elegant)',
      '1 Foto & Frame 22r (40x60 cm)',
      '1 Video Dokumentasi Acara 20-40 menit',
      'Minimal 100-300 Photo Editing Album / Medsos',
      '1 Flashdisk All File Foto & Video',
      'All File Foto Edit via Google Drive'
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
      'Muaraenim Area Kota',
      '1 Wedding Album Colase 30x40 cm (15 Sheet, Box Elegant)',
      '1 Foto & Frame 22r (40x60 cm)',
      '1 Video Dokumentasi Acara 20-40 Menit',
      'Teaser 1 Menit',
      'Minimal 100-350 Photo Editing Album / Medsos',
      '1 Flashdisk All File Foto & Video',
      'All File Foto Edit via Google Drive'
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

// NEW INVOICE FORMAT: INV-TEF-YYMM-SEQ-RAND
const generateInvoiceNumber = (history = []) => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2); // 2 Digit Year (e.g., 25)
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 2 Digit Month (e.g., 12)
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

  const nextSeq = String(maxSeq + 1).padStart(3, '0'); // e.g., 001, 002
  const randomStr = Math.random().toString(36).substring(2, 5).toUpperCase(); // 3 Random Chars
  
  return `INV-TEF-${yymm}-${nextSeq}-${randomStr}`;
};

const formatDateIndo = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
};

// --- SMART DATE FORMATTER FOR PDF ---
const formatEventDateRange = (startDateStr, endDateStr) => {
  if (!startDateStr) return '-';
  
  const optionsShort = { month: 'short' };
  const optionsFull = { year: 'numeric', month: 'short', day: 'numeric' };

  // FIX: JIKA TANGGAL SAMA PERSIS (String YYYY-MM-DD sama)
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

  // Jika tahun sama
  if (startYear === endYear) {
    // Jika bulan sama
    if (startMonth === endMonth) {
      // Jika tanggal berurutan (misal 27 & 28)
      if (endDay - startDay === 1) {
        return `${startDay}-${endDay} ${start.toLocaleDateString('id-ID', optionsShort)} ${startYear}`;
      } else {
        // Jika tidak berurutan (misal 04 & 17)
        return `${startDay} ${start.toLocaleDateString('id-ID', optionsShort)} & ${endDay} ${end.toLocaleDateString('id-ID', optionsShort)} ${startYear}`;
      }
    }
  }

  // Fallback: Beda bulan atau beda tahun (Standard Range)
  // Contoh: 27 Des 2025 - 02 Jan 2026
  return `${start.toLocaleDateString('id-ID', optionsFull)} - ${end.toLocaleDateString('id-ID', optionsFull)}`;
};

// --- HELPER UNTUK LOAD SCRIPT HTML2PDF ---
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

// --- COMPONENT: NAVBAR ---
const Navbar = ({ currentView, onNavigate, isMobileMenuOpen, onToggleMobileMenu }) => (
  <header className="fixed top-0 w-full z-40 bg-black/90 backdrop-blur-md border-b border-zinc-800 print:hidden">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div 
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => onNavigate('home')}
      >
        <Camera className="w-6 h-6 text-amber-500" />
        <span className="font-bold text-xl tracking-tighter text-white">TEFHOTO</span>
      </div>
      
      <nav className="hidden md:flex gap-6 text-sm font-medium text-zinc-400">
        <button onClick={() => onNavigate('portfolio')} className={`hover:text-white transition-colors ${currentView === 'portfolio' ? 'text-white' : ''}`}>Portfolio</button>
        <button onClick={() => onNavigate('home')} className={`hover:text-white transition-colors ${currentView === 'home' ? 'text-white' : ''}`}>Pricing</button>
        <button onClick={() => onNavigate('history')} className={`flex items-center gap-1 hover:text-white transition-colors ${currentView === 'history' ? 'text-amber-500' : ''}`}><History className="w-4 h-4"/> History</button>
        <button onClick={() => onNavigate('contact')} className={`hover:text-white transition-colors ${currentView === 'contact' ? 'text-white' : ''}`}>Contact</button>
      </nav>

      <button className="md:hidden text-zinc-400 hover:text-white" onClick={onToggleMobileMenu}>
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    </div>

    {isMobileMenuOpen && (
      <div className="md:hidden absolute top-16 left-0 w-full bg-zinc-900 border-b border-zinc-800 p-4 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-5 duration-200 z-50">
          <button onClick={() => onNavigate('portfolio')} className="text-left px-4 py-3 rounded-lg hover:bg-zinc-800 text-zinc-300 font-medium">Portfolio</button>
          <button onClick={() => onNavigate('home')} className="text-left px-4 py-3 rounded-lg hover:bg-zinc-800 text-zinc-300 font-medium">Pricing</button>
          <button onClick={() => onNavigate('history')} className="text-left px-4 py-3 rounded-lg hover:bg-zinc-800 text-zinc-300 font-medium flex items-center gap-2"><History className="w-4 h-4"/> History</button>
          <button onClick={() => onNavigate('contact')} className="text-left px-4 py-3 rounded-lg hover:bg-zinc-800 text-zinc-300 font-medium">Contact</button>
      </div>
    )}
  </header>
);

// --- COMPONENT: PACKAGE CARD (UPDATED) ---
const PackageCard = ({ pkg, onSelect, onToggleFocus, isFocused }) => (
  <div 
    onClick={() => onToggleFocus(pkg.id)}
    className={`bg-zinc-900 border rounded-xl overflow-hidden transition-all duration-300 group flex flex-col h-full active:scale-[0.98] relative ${
      isFocused 
        ? 'border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.2)] scale-[1.02] z-10 cursor-zoom-out' 
        : 'border-zinc-800 hover:border-amber-500/50 cursor-zoom-in'
    }`}
  >
    {/* Visual indicator for focus toggle */}
    <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
       {isFocused ? (
         <div className="bg-black/50 p-1 rounded-full backdrop-blur"><Minimize2 className="w-4 h-4 text-zinc-400" /></div>
       ) : (
         <div className="bg-black/50 p-1 rounded-full backdrop-blur"><Maximize2 className="w-4 h-4 text-zinc-400" /></div>
       )}
    </div>

    <div className="p-6 flex-grow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-xs font-medium text-amber-500 uppercase tracking-wider">{pkg.category}</span>
          <h3 className="text-xl font-bold text-white mt-1 group-hover:text-amber-400 transition-colors">{pkg.name}</h3>
        </div>
      </div>
      <div className="space-y-3 mb-6">
        {pkg.features.map((feature, idx) => (
          <div key={idx} className="flex items-start text-zinc-400 text-sm">
            <Check className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
            <span className="leading-snug">{feature}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="bg-zinc-950 p-4 border-t border-zinc-800 flex items-center justify-between">
      <span className="text-lg font-bold text-white">{formatCurrency(pkg.price)}</span>
      <button 
        onClick={(e) => {
          e.stopPropagation(); // Prevents card focus toggle when clicking Select
          onSelect(pkg);
        }}
        className="bg-white text-black hover:bg-amber-400 px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-md z-20 relative cursor-pointer"
      >
        Pilih
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
  
  // UI STATES
  const [toastMessage, setToastMessage] = useState(null);
  const [showWaModal, setShowWaModal] = useState(false);
  const [isHistoryMode, setIsHistoryMode] = useState(false);
  const [isPdfGenerating, setIsPdfGenerating] = useState(false); // New State
  
  // FOCUS MODE & EDIT MODE STATE
  const [focusedPackageId, setFocusedPackageId] = useState(null);
  const [editingInvoiceId, setEditingInvoiceId] = useState(null); // NEW: Track ID being edited
  
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

  // Load history from local storage on mount
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

  // TOAST HANDLER
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000); // Hide after 3 seconds
  };

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg);
    setEditingInvoiceId(null); // RESET EDIT ID: New Package Selection means NEW Invoice
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
       // Unfocus
       setFocusedPackageId(null);
    } else {
       // Focus
       setFocusedPackageId(pkgId);
       // Scroll to top smoothly to ensure the focused card is visible
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
      const confirmAdd = window.confirm("Peringatan: Anda memiliki Biaya Tambahan yang sudah diketik tapi belum ditambahkan (Tombol Tambah belum diklik).\n\nApakah Anda ingin menambahkannya sekarang?");
      if (confirmAdd) {
        handleAddItem();
      } else {
        alert("Biaya yang ada di kolom input tidak akan masuk ke Invoice jika tidak ditambahkan.");
      }
      return; 
    }
    setView('preview');
  };

  // --- HISTORY FUNCTIONS ---
  
  // NEW: HANDLE EDIT FROM HISTORY
  const handleEditFromHistory = (invoice) => {
    setClientData({ ...invoice.clientData });
    setSelectedPackage({ ...invoice.selectedPackage });
    setAdditionalItems([...(invoice.additionalItems || [])]);
    setDpAmount(invoice.dpAmount || '');
    setDpProofImage(null); // Image data usually not persisted fully or to save space
    setEditingInvoiceId(invoice.id); // SET EDITING ID
    setIsHistoryMode(false); // Active editing mode, not just viewing
    setView('form'); // Go to form
    window.scrollTo(0,0);
  };

  const saveToHistory = () => {
    // UPDATED SAVE LOGIC
    if (editingInvoiceId) {
       // UPDATE EXISTING
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
       showToast("Invoice berhasil diperbarui!");
    } else {
       // CREATE NEW
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
       showToast("Berhasil disimpan ke History!");
    }
  };

  const deleteFromHistory = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus invoice ini dari riwayat?")) {
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
    setIsHistoryMode(true); // SET MODE: Viewing History
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

  // --- DOWNLOAD PDF FUNCTION (MENGGANTIKAN WINDOW.PRINT) ---
  const handleDownloadPDF = async () => {
    setIsPdfGenerating(true);
    try {
      await loadHtml2Pdf();
      const element = document.getElementById('invoice-print-area');
      
      const today = new Date();
      const dateStr = today.toLocaleDateString('id-ID', {
        day: '2-digit', month: '2-digit', year: 'numeric'
      }).replace(/\//g, '-');
      const clientName = clientData.name ? clientData.name.replace(/[^a-zA-Z0-9 ]/g, '') : 'CLIENT';
      const invoiceNo = clientData.invoiceNo || 'INVOICE';
      const fileName = `${invoiceNo} - ${clientName} - ${dateStr}.pdf`;

      const opt = {
        margin: [0, 0, 0, 0], 
        filename: fileName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false }, 
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      await window.html2pdf().set(opt).from(element).save();
      
      showToast("PDF Berhasil Diunduh!");
      
    } catch (error) {
      console.error("Gagal membuat PDF:", error);
      alert("Gagal mengunduh PDF. Pastikan koneksi internet stabil (untuk memuat library).");
    } finally {
      setIsPdfGenerating(false);
    }
  };

  // --- NEW: GENERATE PDF AS FILE OBJECT (FOR SHARING) ---
  const generatePdfFile = async () => {
    await loadHtml2Pdf();
    const element = document.getElementById('invoice-print-area');
    
    const today = new Date();
    const dateStr = today.toLocaleDateString('id-ID', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    }).replace(/\//g, '-');
    const clientName = clientData.name ? clientData.name.replace(/[^a-zA-Z0-9 ]/g, '') : 'CLIENT';
    const invoiceNo = clientData.invoiceNo || 'INVOICE';
    const fileName = `${invoiceNo} - ${clientName} - ${dateStr}.pdf`;

    const opt = {
      margin: [0, 0, 0, 0],
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Output as blob
    const blob = await window.html2pdf().set(opt).from(element).output('blob');
    return new File([blob], fileName, { type: 'application/pdf' });
  };
  
  // --- SMART SHARE TO WA (NATIVE SHARE API) ---
  const handleSmartShare = async () => {
    setIsPdfGenerating(true);
    try {
      // 1. Generate PDF File di Memory
      const file = await generatePdfFile();
      
      // 2. Cek apakah Browser support Share File (Biasanya HP Android/iPhone Support)
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: file.name,
            text: `Halo ${clientData.name}, berikut Invoice resmi dari TEFHOTO.`
          });
          // Jika sukses share, tidak perlu lakukan apa-apa lagi
          showToast("Berhasil membagikan Invoice!");
        } catch (shareError) {
          // Jika user membatalkan (AbortError) biarkan saja
          if (shareError.name !== 'AbortError') {
             console.error('Share error:', shareError);
             // Jika error lain, fallback ke metode manual
             handleFallbackWa(file);
          }
        }
      } else {
        // 3. Fallback: Jika di Laptop/Browser lama yang tidak support share file
        handleFallbackWa(file);
      }
    } catch (error) {
      console.error("Gagal generate PDF untuk share:", error);
      alert("Terjadi kesalahan saat memproses file.");
    } finally {
      setIsPdfGenerating(false);
    }
  };

  // Fungsi Fallback untuk Desktop: Download File + Buka WA Manual
  const handleFallbackWa = (file) => {
    // Download file secara manual
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Tampilkan Modal Instruksi Manual
    setShowWaModal(true);
  };
  
  const handlePrintHelp = () => {
    alert("FITUR DOWNLOAD PDF:\n\nSistem sekarang akan mengunduh file PDF secara langsung ke penyimpanan HP/Laptop Anda, tidak lagi membuka menu Printer.\n\nCek folder 'Downloads' di HP Anda setelah klik tombol Simpan.");
  };

  // Function Buka WA Manual (Hanya Text)
  const openWaLinkManual = () => {
      const total = formatCurrency(calculateTotal());
      const dp = dpAmount ? formatCurrency(parseNumberInput(dpAmount)) : 'Rp 0';
      const sisa = formatCurrency(calculateBalance());
      const eventDate = clientData.eventDateStart 
        ? `${formatDateIndo(clientData.eventDateStart)} ${clientData.eventDateEnd ? 's/d ' + formatDateIndo(clientData.eventDateEnd) : ''}`
        : '-';

      let message = `Halo *${clientData.name.toUpperCase()}*,\n\n`;
      message += `Berikut saya lampirkan Invoice Resmi dalam format PDF (File sudah saya unduh, mohon dicek).\n\n`;
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

  // --- VIEWS ---
  if (view === 'home') {
    // Filter packages based on category OR focus
    // If focused, show ONLY that package regardless of category filter (or consistent with focus logic)
    // Actually simpler: if focused, show that one. If not, apply filters.
    
    let packagesToDisplay = PACKAGES;
    if (focusedPackageId) {
      packagesToDisplay = PACKAGES.filter(p => p.id === focusedPackageId);
    } else {
      packagesToDisplay = PACKAGES.filter(p => activeCategory === 'All' || p.category === activeCategory);
    }

    return (
      <div className="min-h-screen bg-black text-white font-sans selection:bg-amber-500 selection:text-black pb-20">
        <Navbar currentView={view} onNavigate={navigateTo} isMobileMenuOpen={isMobileMenuOpen} onToggleMobileMenu={toggleMobileMenu} />
        
        {/* Hide header in focused mode to give more focus to the card, or keep it? User said "only displaying package UI". 
            Let's keep the header but maybe simplified, or just keep as is for context. 
            User said "layar akan hanya menampilkan ui paket tersebut" (screen will only display that package UI).
            Let's hide the big title and filters when focused.
        */}
        
        {!focusedPackageId && (
          <>
            <div className="pt-32 pb-10 px-6 text-center max-w-5xl mx-auto animate-in slide-in-from-top-10 fade-in duration-500">
              {/* Added pb-3 to prevent bg-clip-text from cutting off descenders like g, p, q, y */}
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-1 bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-transparent pb-3 leading-tight tracking-tighter drop-shadow-lg">
                Tangkap Momen Sempurna
              </h1>
              <div className="w-24 h-1 bg-amber-500 mx-auto mb-4 rounded-full opacity-80"></div>
              <p className="text-zinc-300 text-sm sm:text-base md:text-xl max-w-3xl mx-auto font-light tracking-wide leading-relaxed">
                Abadikan kenangan tak terlupakan dengan sentuhan artistik profesional.
              </p>
            </div>
            
            <div className="px-6 mb-8 flex flex-wrap justify-center gap-2">
              <button onClick={() => setActiveCategory('All')} className={`whitespace-nowrap px-4 py-2 rounded-full text-xs md:text-sm font-medium border transition-all ${activeCategory === 'All' ? 'bg-white text-black border-white' : 'bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-600'}`}>All Packages</button>
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={`whitespace-nowrap px-4 py-2 rounded-full text-xs md:text-sm font-medium border transition-all ${activeCategory === cat ? 'bg-white text-black border-white' : 'bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-600'}`}>{cat}</button>
              ))}
            </div>
          </>
        )}

        {/* Focused Header/Back button if focused */}
        {focusedPackageId && (
          <div className="pt-24 pb-4 px-6 max-w-md mx-auto flex justify-start animate-in fade-in slide-in-from-bottom-4 duration-500">
             <button 
               onClick={() => setFocusedPackageId(null)}
               className="flex items-center text-zinc-400 hover:text-white transition-colors group"
             >
               <div className="p-1 rounded-full bg-zinc-800 group-hover:bg-zinc-700 mr-2 transition-colors">
                 <ArrowLeft className="w-4 h-4" /> 
               </div>
               Kembali ke Daftar Paket
             </button>
          </div>
        )}

        <div className={`mx-auto px-6 transition-all duration-500 ${focusedPackageId ? 'max-w-md mt-0' : 'max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'}`}>
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

  // --- HISTORY VIEW ---
  if (view === 'history') {
    return (
      <div className="min-h-screen bg-zinc-950 text-white font-sans">
        <Navbar currentView={view} onNavigate={navigateTo} isMobileMenuOpen={isMobileMenuOpen} onToggleMobileMenu={toggleMobileMenu} />
        <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-zinc-800 pb-6 gap-4">
             <div>
               <h2 className="text-3xl font-bold text-white flex items-center gap-3"><History className="w-8 h-8 text-amber-500"/> Riwayat Invoice</h2>
               <p className="text-zinc-400 mt-2">Daftar semua invoice yang pernah Anda buat.</p>
             </div>
             <button onClick={() => navigateTo('home')} className="bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-zinc-200 transition-colors flex items-center gap-2">
               <Plus className="w-4 h-4"/> Buat Baru
             </button>
          </div>

          {invoiceHistory.length === 0 ? (
            <div className="text-center py-20 bg-zinc-900/50 rounded-2xl border border-zinc-800 border-dashed">
              <FileText className="w-16 h-16 text-zinc-700 mx-auto mb-4"/>
              <p className="text-zinc-500 text-lg">Belum ada riwayat invoice tersimpan.</p>
              <button onClick={() => navigateTo('home')} className="mt-4 text-amber-500 hover:text-amber-400 font-medium">Buat invoice sekarang &rarr;</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {invoiceHistory.map((invoice) => (
                <div key={invoice.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-zinc-700 transition-colors">
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded text-xs font-mono font-bold tracking-wider">{invoice.invoiceNo}</span>
                      <span className="text-zinc-500 text-xs">{new Date(invoice.createdAt).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'})}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{invoice.clientData.name?.toUpperCase() || 'TANPA NAMA'}</h3>
                    <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-zinc-400">
                      <span>Paket: <span className="text-zinc-300">{invoice.selectedPackage.name}</span></span>
                      <span>Total: <span className="text-amber-500 font-mono">{formatCurrency(invoice.totalAmount)}</span></span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 w-full md:w-auto">
                    <button 
                      onClick={() => handleEditFromHistory(invoice)}
                      className="flex-1 md:flex-none bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                      title="Edit Data Invoice"
                    >
                      <Pencil className="w-4 h-4"/> Edit
                    </button>
                    <button 
                      onClick={() => loadFromHistory(invoice)}
                      className="flex-1 md:flex-none bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                      title="Lihat Preview PDF"
                    >
                      <Eye className="w-4 h-4"/> Lihat
                    </button>
                    <button 
                      onClick={() => deleteFromHistory(invoice.id)}
                      className="flex-1 md:flex-none bg-red-900/20 hover:bg-red-900/40 text-red-500 border border-red-900/50 px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                      title="Hapus Invoice"
                    >
                      <Trash2 className="w-4 h-4"/> Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* GLOBAL TOAST */}
        {toastMessage && (
           <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 z-50 animate-in slide-in-from-bottom-5">
             <CheckCircle className="w-5 h-5"/>
             <span className="font-medium">{toastMessage}</span>
           </div>
        )}
      </div>
    );
  }

  if (view === 'portfolio') {
    return (
      <div className="min-h-screen bg-zinc-950 text-white font-sans">
        <Navbar currentView={view} onNavigate={navigateTo} isMobileMenuOpen={isMobileMenuOpen} onToggleMobileMenu={toggleMobileMenu} />
        <div className="pt-24 pb-12 px-6 max-w-3xl mx-auto flex flex-col justify-center min-h-[80vh]">
          {/* Portfolio Content */}
          <div className="bg-zinc-900/50 p-8 md:p-12 rounded-2xl border border-zinc-800 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full blur-2xl"></div>
             <div className="flex items-center gap-3 mb-8">
               <div className="p-3 bg-amber-500/20 rounded-lg"><ImageIcon className="w-8 h-8 text-amber-500" /></div>
               <h2 className="text-2xl font-bold tracking-tight text-white">TEFHOTO</h2>
             </div>
             <h1 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">Mengabadikan Esensi dalam Setiap Foto</h1>
             <div className="space-y-6 text-zinc-400 text-lg leading-relaxed border-l-2 border-zinc-700 pl-6">
               <p>Evolusi artistik dari <span className="text-amber-500 font-semibold">@tere.production</span>.</p>
               <p>Fokus pada seni fotografi murni melalui kolaborasi intim, menciptakan pengalaman visual yang berbekas.</p>
             </div>
             <div className="mt-12 flex flex-col sm:flex-row gap-4">
               <button onClick={() => window.open('https://instagram.com/tefhoto', '_blank')} className="flex items-center justify-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors text-white font-medium"><Instagram className="w-5 h-5" /> Visit Instagram</button>
               <button onClick={() => navigateTo('home')} className="px-6 py-3 border border-zinc-700 hover:border-zinc-500 rounded-xl transition-colors text-zinc-300">Lihat Paket Harga</button>
             </div>
          </div>
        </div>
      </div>
    );
  }

  // --- CONTACT VIEW ---
  if (view === 'contact') {
    return (
      <div className="min-h-screen bg-zinc-950 text-white font-sans">
        <Navbar currentView={view} onNavigate={navigateTo} isMobileMenuOpen={isMobileMenuOpen} onToggleMobileMenu={toggleMobileMenu} />
        <div className="pt-24 pb-12 px-6 max-w-3xl mx-auto flex flex-col justify-center min-h-[80vh]">
          {/* Contact Content */}
          <div className="bg-zinc-900/50 p-8 md:p-12 rounded-2xl border border-zinc-800 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/10 rounded-br-full blur-2xl"></div>
             <h2 className="text-3xl font-bold mb-2 text-center">Hubungi Kami</h2>
             <p className="text-zinc-400 text-center mb-10">Konsultasikan momen spesial Anda bersama TEFHOTO</p>
             <div className="space-y-6">
               <div className="flex items-center gap-4 p-4 bg-black/40 rounded-xl border border-zinc-800 hover:border-amber-500/50 transition-colors">
                 <div className="bg-amber-500/20 p-3 rounded-lg"><Phone className="w-6 h-6 text-amber-500" /></div>
                 <div><p className="text-sm text-zinc-500 uppercase font-semibold">WhatsApp / Telepon</p><p className="text-lg font-bold text-white">082281211122 <span className="text-zinc-500 font-normal">| TEDY</span></p></div>
               </div>
                <div className="flex items-center gap-4 p-4 bg-black/40 rounded-xl border border-zinc-800 hover:border-amber-500/50 transition-colors cursor-pointer" onClick={() => window.open('https://instagram.com/tefhoto', '_blank')}>
                 <div className="bg-amber-500/20 p-3 rounded-lg"><Instagram className="w-6 h-6 text-amber-500" /></div>
                 <div><p className="text-sm text-zinc-500 uppercase font-semibold">Instagram</p><p className="text-lg font-bold text-white">@TERE.PRODUCTION</p><p className="text-lg font-bold text-white">@TEFHOTO</p></div>
               </div>
               <div className="flex items-center gap-4 p-4 bg-black/40 rounded-xl border border-zinc-800 hover:border-amber-500/50 transition-colors cursor-pointer" onClick={() => window.open('https://s.id/tefhoto', '_blank')}>
                 <div className="bg-amber-500/20 p-3 rounded-lg"><Globe className="w-6 h-6 text-amber-500" /></div>
                 <div><p className="text-sm text-zinc-500 uppercase font-semibold">Official Link</p><p className="text-lg font-bold text-white">https://s.id/tefhoto</p></div>
               </div>
               <div className="flex items-center gap-4 p-4 bg-black/40 rounded-xl border border-zinc-800 hover:border-amber-500/50 transition-colors">
                 <div className="bg-amber-500/20 p-3 rounded-lg"><Mail className="w-6 h-6 text-amber-500" /></div>
                 <div><p className="text-sm text-zinc-500 uppercase font-semibold">Email</p><p className="text-base text-white">Tere.Production@gmail.com</p><p className="text-base text-white">tefhoto@gmail.com</p></div>
               </div>
             </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. FORM VIEW
  if (view === 'form') {
    // Logic for Event Type Select
    const isCustomEvent = !EVENT_OPTIONS.includes(clientData.eventType) && clientData.eventType !== '';
    const currentSelectValue = isCustomEvent ? 'Lainnya' : clientData.eventType;

    return (
      <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-12 font-sans pt-24 md:pt-12">
        <div className="max-w-3xl mx-auto">
          <button onClick={() => setView('home')} className="flex items-center text-zinc-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
          </button>

          <div className="bg-black border border-zinc-800 rounded-2xl p-6 md:p-8 shadow-2xl">
            {/* ... Form Header and Client Inputs ... */}
            <div className="mb-8 border-b border-zinc-800 pb-6 flex justify-between items-start">
              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-1">
                  {editingInvoiceId ? 'Edit Invoice' : 'Detail Pemesanan'}
                </h2>
                <p className="text-sm text-zinc-500">
                  {editingInvoiceId ? 'Perbarui data invoice yang sudah ada' : 'Isi data klien untuk membuat invoice'}
                </p>
              </div>
              {editingInvoiceId && (
                <span className="bg-amber-500/20 text-amber-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Mode Edit</span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
              <div className="col-span-1 md:col-span-2">
                <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg flex flex-col md:flex-row justify-between md:items-center gap-2">
                  <div>
                    <p className="text-xs text-zinc-500 uppercase font-semibold">Paket Terpilih</p>
                    <p className="text-lg font-bold text-amber-500">{selectedPackage?.name}</p>
                  </div>
                  <p className="text-xl font-bold">{formatCurrency(selectedPackage?.price)}</p>
                </div>
              </div>

               <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Nama Klien</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-zinc-600 pointer-events-none" />
                  <input 
                    type="text" 
                    value={clientData.name}
                    onChange={(e) => {
                       // Validasi: Hanya huruf, spasi, titik, koma, petik, strip
                       const val = e.target.value.replace(/[^a-zA-Z\s.,'-]/g, '');
                       setClientData({...clientData, name: val});
                    }}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2.5 pl-10 px-4 text-white focus:outline-none focus:border-amber-500 transition-colors uppercase"
                    placeholder="Nama Lengkap"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Nomor WhatsApp</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-5 h-5 text-zinc-600 pointer-events-none" />
                  <input 
                    type="text" 
                    inputMode="numeric"
                    value={clientData.phone}
                    onChange={(e) => {
                       // Validasi: Hanya angka
                       const val = e.target.value.replace(/\D/g, '');
                       setClientData({...clientData, phone: val});
                    }}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2.5 pl-10 px-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                    placeholder="08..."
                  />
                </div>
              </div>

              {/* NEW: JENIS KEGIATAN (UPDATED DROPDOWN) */}
              <div className="space-y-2 col-span-1 md:col-span-2">
                <label className="text-sm font-medium text-zinc-400">Jenis Kegiatan / Acara</label>
                <div className="relative">
                  <PartyPopper className="absolute left-3 top-3 w-5 h-5 text-zinc-600 pointer-events-none z-10" />
                  <div className="relative">
                    <select 
                      value={currentSelectValue}
                      onChange={(e) => {
                         if(e.target.value === 'Lainnya') {
                             setClientData({...clientData, eventType: 'Lainnya'});
                         } else {
                             setClientData({...clientData, eventType: e.target.value});
                         }
                      }}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2.5 pl-10 px-4 text-white focus:outline-none focus:border-amber-500 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Pilih Jenis Acara...</option>
                      {EVENT_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-zinc-500 pointer-events-none"/>
                  </div>
                </div>
                
                {/* Manual Input if "Lainnya" is selected */}
                {(currentSelectValue === 'Lainnya') && (
                  <div className="mt-2 animate-in slide-in-from-top-2">
                    <input 
                      type="text" 
                      value={clientData.eventType === 'Lainnya' ? '' : clientData.eventType}
                      onChange={(e) => setClientData({...clientData, eventType: e.target.value})}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-amber-500 transition-colors uppercase"
                      placeholder="Tulis Nama Acara Lainnya..."
                      autoFocus
                    />
                  </div>
                )}
              </div>

              {/* TANGGAL ACARA - 2 KOLOM (DARI TANGGAL & SAMPAI TANGGAL) */}
              <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* TANGGAL MULAI */}
                  <div className="space-y-2 relative z-10">
                    <label className="text-sm font-medium text-zinc-400">Dari Tanggal</label>
                    <div className="relative group flex items-center">
                      <Calendar className="absolute left-3 top-3 w-5 h-5 text-zinc-600 pointer-events-none z-0" />
                      <input 
                        type="date" 
                        value={clientData.eventDateStart}
                        onChange={(e) => setClientData({...clientData, eventDateStart: e.target.value})}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2.5 pl-10 px-4 text-white focus:outline-none focus:border-amber-500 transition-colors cursor-pointer relative z-10 pr-10"
                        style={{ colorScheme: 'dark' }} 
                      />
                      {clientData.eventDateStart && (
                        <button onClick={handleClearDateStart} className="absolute right-3 z-20 text-zinc-500 hover:text-white bg-zinc-800 rounded-full p-0.5" title="Hapus Tanggal">
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* TANGGAL SELESAI */}
                  <div className="space-y-2 relative z-10">
                    <label className="text-sm font-medium text-zinc-400">Sampai Tanggal</label>
                    <div className="relative group flex items-center">
                      <Calendar className="absolute left-3 top-3 w-5 h-5 text-zinc-600 pointer-events-none z-0" />
                      <input 
                        type="date" 
                        value={clientData.eventDateEnd}
                        onChange={(e) => setClientData({...clientData, eventDateEnd: e.target.value})}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2.5 pl-10 px-4 text-white focus:outline-none focus:border-amber-500 transition-colors cursor-pointer relative z-10 pr-10"
                        style={{ colorScheme: 'dark' }} 
                      />
                      {clientData.eventDateEnd && (
                        <button onClick={handleClearDateEnd} className="absolute right-3 z-20 text-zinc-500 hover:text-white bg-zinc-800 rounded-full p-0.5" title="Hapus Tanggal">
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
              </div>

              <div className="space-y-2 col-span-1 md:col-span-2">
                <label className="text-sm font-medium text-zinc-400">Alamat Lengkap</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-zinc-600 pointer-events-none" />
                  <textarea 
                    value={clientData.address}
                    onChange={(e) => setClientData({...clientData, address: e.target.value})}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2.5 pl-10 px-4 text-white focus:outline-none focus:border-amber-500 transition-colors min-h-[50px] resize-y uppercase"
                    placeholder="Alamat lengkap acara..."
                    rows={1}
                  />
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-zinc-400">Catatan Tambahan (Opsional)</label>
                <textarea 
                  value={clientData.notes}
                  onChange={(e) => setClientData({...clientData, notes: e.target.value})}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-amber-500 transition-colors h-24 resize-none uppercase"
                  placeholder="Request khusus, warna baju, dll..."
                />
              </div>

              {/* ... DP Section ... */}
              <div className="col-span-1 md:col-span-2 border-t border-zinc-800 pt-6 mt-2">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><CreditCard className="w-5 h-5 text-amber-500" /> Down Payment (DP)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Nominal DP</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-zinc-500 font-bold">Rp</span>
                      <input 
                        type="text" 
                        value={dpAmount}
                        onChange={handleDpChange}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2.5 pl-10 px-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Upload Bukti DP</label>
                    <div className="relative">
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="dp-upload" />
                      <label htmlFor="dp-upload" className="flex items-center justify-center w-full bg-zinc-900 border border-zinc-800 border-dashed hover:border-amber-500 rounded-lg py-2.5 px-4 text-zinc-400 cursor-pointer transition-colors">
                        {dpProofImage ? (<span className="text-emerald-500 flex items-center gap-2"><Check className="w-4 h-4" /> Foto Terupload</span>) : (<span className="flex items-center gap-2"><Upload className="w-4 h-4" /> Pilih Foto Bukti</span>)}
                      </label>
                    </div>
                  </div>
                </div>
                {dpProofImage && (
                  <div className="mt-4 p-2 bg-zinc-900 border border-zinc-800 rounded-lg w-fit">
                    <p className="text-xs text-zinc-500 mb-2">Preview Bukti DP:</p>
                    <img src={dpProofImage} alt="Bukti DP" className="h-32 object-contain rounded" />
                  </div>
                )}
              </div>
            </div>

            {/* Additional Items Section */}
            <div className="mb-8 border-t border-zinc-800 pt-6">
               <label className="text-sm font-medium text-zinc-400 mb-2 block flex justify-between">
                 <span>Biaya Tambahan Lainnya (Opsional)</span>
                 {(newItem.desc || newItem.cost) && <span className="text-amber-500 text-xs animate-pulse flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> Klik tombol TAMBAH untuk menyimpan</span>}
               </label>
               <div className="flex flex-col md:flex-row gap-2 mb-3">
                 <input 
                    type="text" 
                    placeholder="ITEM (EX: TRANSPORT LUAR KOTA)"
                    value={newItem.desc}
                    onChange={(e) => setNewItem({...newItem, desc: e.target.value})}
                    className="flex-grow bg-zinc-900 border border-zinc-800 rounded-lg py-2 px-4 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors uppercase placeholder:normal-case"
                 />
                 <div className="flex gap-2">
                   <div className="relative w-full md:w-40">
                      <span className="absolute left-3 top-2 text-zinc-500 text-sm">Rp</span>
                      <input 
                          type="text" 
                          placeholder="0"
                          value={newItem.cost}
                          onChange={handleNewItemCostChange}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2 pl-9 px-4 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                      />
                   </div>
                   <button 
                    onClick={handleAddItem}
                    className="bg-amber-500 hover:bg-amber-400 px-4 py-2 rounded-lg text-black font-bold shrink-0 transition-colors flex items-center gap-2"
                   >
                     <Plus className="w-4 h-4" /> TAMBAH
                   </button>
                 </div>
               </div>
               
               {additionalItems.length > 0 && (
                 <div className="space-y-2 bg-zinc-900/30 p-3 rounded-lg">
                   {additionalItems.map((item, idx) => (
                     <div key={idx} className="flex justify-between items-center text-sm border-b border-zinc-800 last:border-0 pb-2 last:pb-0">
                       <span className="uppercase">{item.desc}</span>
                       <div className="flex items-center gap-3">
                         <span className="font-mono">{formatCurrency(item.cost)}</span>
                         <button onClick={() => handleRemoveItem(idx)} className="text-red-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                       </div>
                     </div>
                   ))}
                 </div>
               )}
            </div>

            <button onClick={handleCreateInvoice} disabled={!clientData.name} className="w-full bg-white text-black hover:bg-amber-400 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-amber-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2">
              <FileText className="w-5 h-5" /> {editingInvoiceId ? 'Perbarui Invoice' : 'Buat Invoice'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 5. PREVIEW & PRINT VIEW
  if (view === 'preview') {
    return (
      <div className="min-h-screen bg-zinc-900 p-0 md:p-8 overflow-visible print:bg-white print:p-0">
        
        {/* Style for Printing */}
        <style>{`
          @media print {
            body * {
              visibility: hidden;
            }
            #invoice-print-area, #invoice-print-area * {
              visibility: visible;
            }
            #invoice-print-area {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              margin: 0;
              padding: 0;
            }
            .print\\:hidden {
              display: none !important;
            }
          }
        `}</style>

        {/* Print Controls */}
        <div className="sticky top-0 z-50 bg-zinc-900/90 backdrop-blur p-4 border-b border-zinc-800 max-w-[210mm] mx-auto mb-6 flex flex-col md:flex-row justify-between items-center print:hidden gap-3">
          {isHistoryMode ? (
             <button onClick={() => setView('history')} className="flex items-center text-zinc-400 hover:text-white transition-colors bg-black px-4 py-2 rounded-lg border border-zinc-800 text-sm">
               <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
             </button>
          ) : (
             <button onClick={() => setView('form')} className="flex items-center text-zinc-400 hover:text-white transition-colors bg-black px-4 py-2 rounded-lg border border-zinc-800 text-sm">
               <ArrowLeft className="w-4 h-4 mr-2" /> Edit
             </button>
          )}
          <div className="flex flex-wrap items-center gap-2 justify-end">
            <button 
              onClick={handlePrintHelp}
              className="p-2 rounded-full bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700"
              title="Bantuan Cetak"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
            <button 
              onClick={saveToHistory}
              className="flex items-center bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg font-bold shadow-lg transition-colors text-sm md:text-base border border-blue-500"
            >
              <Save className="w-4 h-4 mr-2" /> {editingInvoiceId ? 'Perbarui History' : 'Simpan ke History'}
            </button>
            <button 
              onClick={handleDownloadPDF}
              disabled={isPdfGenerating}
              className="flex items-center bg-zinc-800 text-white hover:bg-zinc-700 px-4 py-2 rounded-lg font-bold shadow-lg transition-colors text-sm md:text-base border border-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPdfGenerating ? <Loader2 className="w-4 h-4 mr-2 animate-spin"/> : <FileDown className="w-4 h-4 mr-2" />} 
              {isPdfGenerating ? 'Memproses...' : 'Simpan PDF'}
            </button>
            <button 
              onClick={handleSmartShare}
              disabled={isPdfGenerating}
              className="flex items-center bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-lg font-bold shadow-lg transition-colors text-sm md:text-base border border-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4 mr-2" /> Kirim ke WA
            </button>
          </div>
        </div>

        {/* WA Modal Fallback (For Desktop Only) */}
        {showWaModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 animate-in fade-in duration-200 print:hidden">
            <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-xl max-w-sm w-full shadow-2xl relative">
               <button onClick={() => setShowWaModal(false)} className="absolute top-4 right-4"><X className="w-5 h-5 text-zinc-500 hover:text-white"/></button>
               
               <div className="flex items-center gap-3 mb-6">
                 <div className="bg-green-900/30 p-3 rounded-full"><Share2 className="w-6 h-6 text-green-500"/></div>
                 <h3 className="text-xl font-bold text-white">Kirim Invoice ke WA</h3>
               </div>
               
               <div className="space-y-4">
                  <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700">
                    <div className="flex gap-3 mb-2">
                      <div className="bg-emerald-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 text-white"><Check className="w-4 h-4"/></div>
                      <p className="text-sm text-emerald-400 font-medium">PDF Sudah Terunduh</p>
                    </div>
                    <p className="text-xs text-zinc-400">File PDF sudah tersimpan otomatis di perangkat Anda.</p>
                  </div>

                  <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700">
                    <div className="flex gap-3 mb-2">
                      <div className="bg-zinc-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 text-white">2</div>
                      <p className="text-sm text-zinc-300 font-medium">Buka WA & Lampirkan</p>
                    </div>
                    <p className="text-xs text-zinc-400 mb-3">Klik tombol di bawah untuk membuka chat WA, lalu <b>Lampirkan File PDF</b> yang baru saja terunduh.</p>
                    <button onClick={openWaLinkManual} className="w-full py-2 bg-green-600 hover:bg-green-500 rounded text-sm text-white font-bold transition-colors flex items-center justify-center gap-2">
                       <Send className="w-4 h-4"/> Buka WhatsApp
                    </button>
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* GLOBAL TOAST */}
        {toastMessage && (
           <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-emerald-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 z-[70] animate-in slide-in-from-top-5 print:hidden">
             <CheckCircle className="w-5 h-5"/>
             <span className="font-bold text-sm">{toastMessage}</span>
           </div>
        )}

        {/* Invoice Paper A4 - MODERN ELEGANT DESIGN */}
        <div id="invoice-print-area" className="bg-white text-black w-full md:w-[210mm] min-h-[297mm] mx-auto shadow-2xl print:shadow-none print:w-full print:m-0 print:static box-border relative font-sans flex flex-col">
          
          {/* Header Block - FULL WIDTH BLACK */}
          <div className="bg-black text-white px-8 py-10 flex justify-between items-center print:bg-black print:text-white">
             <div>
                <h1 className="text-5xl font-black tracking-tighter mb-1">TEFHOTO</h1>
                <p className="text-xs tracking-[0.2em] uppercase text-zinc-400">Professional Photography & Videography</p>
             </div>
             <div className="text-right">
                <h2 className="text-4xl font-thin tracking-widest opacity-80">INVOICE</h2>
                <p className="text-sm text-zinc-400 mt-1 font-mono">{clientData.invoiceNo}</p>
             </div>
          </div>

          <div className="p-8 md:p-12 flex-grow">
            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-12 mb-12">
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-200 pb-2">Ditagihkan Kepada</h3>
                <p className="font-bold text-2xl uppercase mb-1">{clientData.name?.toUpperCase()}</p>
                <p className="text-gray-600 mb-1">{clientData.phone}</p>
                {clientData.address && <p className="text-gray-500 text-sm uppercase leading-relaxed">{clientData.address?.toUpperCase()}</p>}
              </div>
              <div className="text-right">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-200 pb-2">Detail Acara</h3>
                <div className="space-y-2">
                   {clientData.eventType && (
                     <div>
                        <p className="text-xs text-gray-400 uppercase">Kegiatan</p>
                        <p className="font-medium text-lg uppercase">{clientData.eventType}</p>
                     </div>
                   )}
                   <div>
                      <p className="text-xs text-gray-400 uppercase">Paket</p>
                      <p className="font-medium text-lg">{selectedPackage?.category}</p>
                   </div>
                   <div>
                      <p className="text-xs text-gray-400 uppercase">Tanggal</p>
                      <p className="font-medium text-lg">
                        {formatEventDateRange(clientData.eventDateStart, clientData.eventDateEnd)}
                      </p>
                   </div>
                </div>
              </div>
            </div>

            {/* Modern Table */}
            <div className="mb-8">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th className="text-left py-4 text-xs font-bold uppercase tracking-widest text-gray-500 w-2/3">Deskripsi Layanan & Kegiatan</th>
                    <th className="text-right py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Jumlah (IDR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {/* Package Row */}
                  <tr>
                    <td className="py-6 align-top">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-bold text-xl">{selectedPackage?.name}</p>
                      </div>
                      <ul className="space-y-1.5">
                        {selectedPackage?.features.map((feat, i) => (
                          <li key={i} className="text-sm text-gray-600 flex items-start">
                            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-3 mt-1.5"></span> {feat}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-6 text-right align-top font-mono text-lg font-medium">
                      {formatCurrency(selectedPackage?.price)}
                    </td>
                  </tr>

                  {/* Additional Items */}
                  {additionalItems.map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-4 pl-4 align-middle">
                          <div className="flex items-center">
                             <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded mr-3">TAMBAHAN</span>
                             <span className="text-gray-700 font-medium uppercase">{item.desc?.toUpperCase()}</span>
                          </div>
                        </td>
                        <td className="py-4 text-right font-mono text-gray-700">{formatCurrency(item.cost)}</td>
                      </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Totals Section - Modern Card */}
            <div className="flex justify-end mt-4">
              <div className="w-full md:w-5/12">
                 <div className="space-y-3 pb-4 border-b border-gray-200">
                    <div className="flex justify-between text-gray-500 text-sm">
                       <span>Subtotal Paket</span>
                       <span className="font-mono">{formatCurrency(selectedPackage?.price)}</span>
                    </div>
                    {additionalItems.length > 0 && (
                      <div className="flex justify-between text-gray-500 text-sm">
                         <span>Biaya Tambahan</span>
                         <span className="font-mono">{formatCurrency(calculateAdditionalTotal())}</span>
                      </div>
                    )}
                 </div>

                 <div className="py-4 space-y-3">
                    <div className="flex justify-between items-center">
                       <span className="font-bold text-gray-800">Total Tagihan</span>
                       <span className="font-bold font-mono text-lg">{formatCurrency(calculateTotal())}</span>
                    </div>
                    {dpAmount && parseNumberInput(dpAmount) > 0 && (
                       <div className="flex justify-between items-center text-emerald-600">
                          <span className="text-sm flex items-center"><Check className="w-3 h-3 mr-1"/> Pembayaran DP</span>
                          <span className="font-mono font-medium">- {formatCurrency(parseNumberInput(dpAmount))}</span>
                       </div>
                    )}
                 </div>

                 <div className="bg-black text-white p-4 rounded-lg mt-2 flex justify-between items-center shadow-lg print:bg-black print:text-white">
                    <span className="text-sm font-bold uppercase tracking-widest">Sisa Tagihan</span>
                    <span className="text-2xl font-black">{formatCurrency(calculateBalance())}</span>
                 </div>
              </div>
            </div>

            {/* Notes Section */}
            {clientData.notes && (
               <div className="mt-12 p-6 bg-gray-50 border-l-4 border-amber-500 rounded-r-lg">
                 <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Catatan Khusus</h4>
                 <p className="text-sm text-gray-700 italic">"{clientData.notes?.toUpperCase()}"</p>
               </div>
            )}
             
             {/* DP Image */}
            {dpProofImage && (
              <div className="mt-8 break-inside-avoid">
                <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">
                  {dpAmount && parseNumberInput(dpAmount) > 0 ? 'Bukti Pembayaran DP' : 'Bukti Pembayaran'}
                </h4>
                <img src={dpProofImage} alt="Bukti Transfer" className="h-32 object-contain border border-gray-200 rounded p-1 bg-white" />
              </div>
            )}
          </div>

          {/* Footer - Elegant */}
          <div className="bg-zinc-50 px-8 py-8 border-t border-zinc-200 print:bg-gray-50 break-inside-avoid">
             <div className="grid grid-cols-2 gap-8">
                <div>
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Pembayaran Transfer</p>
                   <p className="font-bold text-xl text-gray-800">BCA 812-023-8192</p>
                   <p className="text-sm text-gray-500 uppercase mt-1">A.N TEDY PURNAJAYA</p>
                </div>
                <div className="text-right">
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Tefhoto</p>
                   <p className="text-sm text-gray-600">0822-8121-1122</p>
                   <p className="text-sm text-gray-600">@TEFHOTO | @TERE.PRODUCTION</p>
                   <p className="text-xs text-gray-400 mt-4 italic">"Terima kasih telah mempercayakan momen Anda kepada kami"</p>
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