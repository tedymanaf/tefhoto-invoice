import React, { useState, useEffect, useRef } from 'react';
import { Camera, Printer, FileText, User, Calendar, MapPin, Check, ArrowLeft, Plus, Trash2, Download, Instagram, Phone, Menu, X, Image as ImageIcon, Mail, Globe, Upload, CreditCard, Share2, Send, AlertTriangle, FileDown, History, Save, Eye, HelpCircle, CheckCircle } from 'lucide-react';

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

const generateInvoiceNumber = () => {
  const date = new Date();
  const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `INV/${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}/${randomStr}`;
};

const formatDateIndo = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
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

// --- COMPONENT: PACKAGE CARD ---
const PackageCard = ({ pkg, onSelect }) => (
  <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 group flex flex-col h-full active:scale-[0.98] transform">
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
        onClick={() => onSelect(pkg)}
        className="bg-white text-black hover:bg-amber-400 px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-md"
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
  const [isHistoryMode, setIsHistoryMode] = useState(false); // NEW: Track if we are viewing from history
  
  const [clientData, setClientData] = useState({
    name: '',
    phone: '',
    eventDateStart: '', 
    eventDateEnd: '',   
    address: '',
    notes: '',
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
    setClientData(prev => ({ ...prev, invoiceNo: generateInvoiceNumber() }));
    setDpAmount('');
    setDpProofImage(null);
    setAdditionalItems([]);
    setIsHistoryMode(false); // Reset mode: We are creating a NEW invoice
    setView('form');
    window.scrollTo(0,0);
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
  const saveToHistory = () => {
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
    
    // Use Toast instead of alert
    showToast("Berhasil disimpan ke History!");
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

  // --- PRINT FUNCTION ---
  // Ensuring direct call and no overlay issues
  const handlePrint = () => {
    // Small delay to ensure any open modals are closed visually if needed, but primarily direct call
    setTimeout(() => {
       window.print();
    }, 100);
  };
  
  // --- WA LOGIC WITH MODAL ---
  const handleWaClick = () => {
    setShowWaModal(true);
  };

  const openWaLink = () => {
    const total = formatCurrency(calculateTotal());
    const dp = dpAmount ? formatCurrency(parseNumberInput(dpAmount)) : 'Rp 0';
    const sisa = formatCurrency(calculateBalance());
    const eventDate = clientData.eventDateStart 
      ? `${formatDateIndo(clientData.eventDateStart)} ${clientData.eventDateEnd ? 's/d ' + formatDateIndo(clientData.eventDateEnd) : ''}`
      : '-';

    let message = `Halo *${clientData.name.toUpperCase()}*,\n\n`;
    message += `Berikut saya lampirkan Invoice Resmi dalam format PDF (Lihat lampiran file).\n\n`;
    message += `*RINGKASAN:*\n`;
    message += `No: ${clientData.invoiceNo}\n`;
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
  
  const handlePrintHelp = () => {
    alert("JIKA TOMBOL SIMPAN PDF TIDAK BERFUNGSI:\n\n1. Cari menu 'Share' atau 'Bagikan' di browser HP Anda.\n2. Pilih 'Print' atau 'Cetak'.\n3. Pada pilihan Printer, pilih 'Save as PDF'.\n4. Simpan file.");
  };

  // --- VIEWS ---
  if (view === 'home') {
    return (
      <div className="min-h-screen bg-black text-white font-sans selection:bg-amber-500 selection:text-black pb-20">
        <Navbar currentView={view} onNavigate={navigateTo} isMobileMenuOpen={isMobileMenuOpen} onToggleMobileMenu={toggleMobileMenu} />
        <div className="pt-32 pb-8 px-6 text-center max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">Tangkap Momen Sempurna</h1>
          <p className="text-zinc-400 text-sm md:text-lg mb-8 max-w-lg mx-auto leading-relaxed">Abadikan kenangan tak terlupakan dengan sentuhan artistik profesional.</p>
        </div>
        
        {/* MODIFIED: CENTERED PACKAGE FILTER NAVBAR */}
        <div className="px-6 mb-8 flex flex-wrap justify-center gap-2">
          <button onClick={() => setActiveCategory('All')} className={`whitespace-nowrap px-4 py-2 rounded-full text-xs md:text-sm font-medium border transition-all ${activeCategory === 'All' ? 'bg-white text-black border-white' : 'bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-600'}`}>All Packages</button>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`whitespace-nowrap px-4 py-2 rounded-full text-xs md:text-sm font-medium border transition-all ${activeCategory === cat ? 'bg-white text-black border-white' : 'bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-600'}`}>{cat}</button>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PACKAGES.filter(p => activeCategory === 'All' || p.category === activeCategory).map(pkg => (
            <PackageCard key={pkg.id} pkg={pkg} onSelect={handleSelectPackage} />
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
                      onClick={() => loadFromHistory(invoice)}
                      className="flex-1 md:flex-none bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4"/> Lihat
                    </button>
                    <button 
                      onClick={() => deleteFromHistory(invoice.id)}
                      className="flex-1 md:flex-none bg-red-900/20 hover:bg-red-900/40 text-red-500 border border-red-900/50 px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
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
    return (
      <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-12 font-sans pt-24 md:pt-12">
        <div className="max-w-3xl mx-auto">
          <button onClick={() => setView('home')} className="flex items-center text-zinc-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
          </button>

          <div className="bg-black border border-zinc-800 rounded-2xl p-6 md:p-8 shadow-2xl">
            {/* ... Form Header and Client Inputs ... */}
            <div className="mb-8 border-b border-zinc-800 pb-6">
              <h2 className="text-xl md:text-2xl font-bold mb-1">Detail Pemesanan</h2>
              <p className="text-sm text-zinc-500">Isi data klien untuk membuat invoice</p>
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
                    onChange={(e) => setClientData({...clientData, name: e.target.value})}
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
                    value={clientData.phone}
                    onChange={(e) => setClientData({...clientData, phone: e.target.value})}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2.5 pl-10 px-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                    placeholder="08..."
                  />
                </div>
              </div>

              {/* TANGGAL MULAI */}
              <div className="space-y-2 relative z-10">
                <label className="text-sm font-medium text-zinc-400">Tanggal Mulai Acara</label>
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
                <label className="text-sm font-medium text-zinc-400">Tanggal Selesai Acara (s/d)</label>
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
              <FileText className="w-5 h-5" /> Buat Invoice
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
              <Save className="w-4 h-4 mr-2" /> Simpan ke History
            </button>
            <button 
              onClick={handlePrint}
              className="flex items-center bg-zinc-800 text-white hover:bg-zinc-700 px-4 py-2 rounded-lg font-bold shadow-lg transition-colors text-sm md:text-base border border-zinc-600"
            >
              <FileDown className="w-4 h-4 mr-2" /> Simpan PDF
            </button>
            <button 
              onClick={handleWaClick}
              className="flex items-center bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-lg font-bold shadow-lg transition-colors text-sm md:text-base border border-green-500"
            >
              <Send className="w-4 h-4 mr-2" /> Kirim ke WA
            </button>
          </div>
        </div>

        {/* WA Modal */}
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
                      <div className="bg-zinc-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</div>
                      <p className="text-sm text-zinc-300 font-medium">Simpan File PDF</p>
                    </div>
                    <button onClick={handlePrint} className="w-full py-2 bg-zinc-700 hover:bg-zinc-600 rounded text-sm text-white transition-colors flex items-center justify-center gap-2">
                       <FileDown className="w-4 h-4"/> Download / Simpan PDF
                    </button>
                  </div>

                  <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700">
                    <div className="flex gap-3 mb-2">
                      <div className="bg-zinc-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</div>
                      <p className="text-sm text-zinc-300 font-medium">Buka WA & Lampirkan</p>
                    </div>
                    <p className="text-xs text-zinc-400 mb-3">Klik tombol di bawah untuk membuka chat WA, lalu klik ikon <b>Lampiran (Paperclip)</b> &gt; <b>Dokumen</b> dan pilih file PDF tadi.</p>
                    <button onClick={openWaLink} className="w-full py-2 bg-green-600 hover:bg-green-500 rounded text-sm text-white font-bold transition-colors flex items-center justify-center gap-2">
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
                   <div>
                      <p className="text-xs text-gray-400 uppercase">Paket</p>
                      <p className="font-medium text-lg">{selectedPackage?.category}</p>
                   </div>
                   <div>
                      <p className="text-xs text-gray-400 uppercase">Tanggal</p>
                      <p className="font-medium text-lg">
                        {clientData.eventDateStart 
                          ? `${formatDateIndo(clientData.eventDateStart)} ${clientData.eventDateEnd ? ' - ' + formatDateIndo(clientData.eventDateEnd) : ''}`
                          : '-'}
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
                    <th className="text-left py-4 text-xs font-bold uppercase tracking-widest text-gray-500 w-2/3">Deskripsi Layanan</th>
                    <th className="text-right py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Jumlah (IDR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {/* Package Row */}
                  <tr>
                    <td className="py-6 align-top">
                      <p className="font-bold text-xl mb-2">{selectedPackage?.name}</p>
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
                <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Bukti Pembayaran</h4>
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
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Tefhoto Studio</p>
                   <p className="text-sm text-gray-600">0822 8121 1122</p>
                   <p className="text-sm text-gray-600">@tefhoto | @tere.production</p>
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