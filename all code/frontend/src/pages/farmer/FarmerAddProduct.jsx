import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { VoiceAssistantModal } from '../../components/VoiceAssistantModal';
import { Mic, Upload, Check, X, Sparkles, Image as ImageIcon } from 'lucide-react';

export const FarmerAddProduct = () => {
  const { addProduct, t, language, isVoiceModalOpen, setIsVoiceModalOpen, user } = useApp();
  const navigate = useNavigate();
  const locationState = useLocation();

  const [formData, setFormData] = useState({
    name: '',
    nameTa: '',
    category: 'Vegetables',
    description: '',
    price: '',
    marketPrice: '',
    costPerKg: '',
    quality: 'Grade A',
    availableQty: '',
    location: user?.location || 'Salem',
    harvestDate: new Date().toISOString().split('T')[0],
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
    unit: 'kg'
  });

  const [validationError, setValidationError] = useState('');

  // Handle voice auto-fill redirect
  useEffect(() => {
    if (locationState.state?.prefill) {
      const p = locationState.state.prefill;
      setFormData((prev) => ({
        ...prev,
        name: p.name || prev.name,
        price: p.price || prev.price,
        availableQty: p.availableQty || prev.availableQty
      }));
    }
  }, [locationState.state]);

  const presetImages = [
    { label: 'Red Tomatoes', url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80' },
    { label: 'Organic Onions', url: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8ce?auto=format&fit=crop&w=800&q=80' },
    { label: 'Premium Rice', url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80' },
    { label: 'Sweet Mangoes', url: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80' },
    { label: 'Fresh Potatoes', url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80' },
    { label: 'Yellow Turmeric', url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    if (!formData.name.trim()) {
      setValidationError('Please enter a valid product name.');
      return;
    }
    if (!formData.price || Number(formData.price) <= 0) {
      setValidationError('Price per kg must be greater than zero.');
      return;
    }
    if (!formData.availableQty || Number(formData.availableQty) <= 0) {
      setValidationError('Available quantity must be greater than zero.');
      return;
    }

    if (!formData.marketPrice || Number(formData.marketPrice) <= 0) {
      setValidationError('Please enter the current market price.');
      return;
    }

    try {
    await addProduct({
      quality: formData.quality,
      marketPrice: Number(formData.marketPrice),
      costPerKg: Number(formData.costPerKg || 0),
      name: formData.name,
      nameTa: formData.nameTa || formData.name,
      category: formData.category,
      description: formData.description || `Freshly harvested ${formData.name} directly from ${formData.location} fields.`,
      price: Number(formData.price),
      availableQty: Number(formData.availableQty),
      location: formData.location,
      harvestDate: formData.harvestDate,
      image: formData.image,
      unit: 'kg'
    });

    navigate('/farmer/products');
    } catch (err) {
      setValidationError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto max-w-4xl">
          
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 lg:p-8 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div>
                <h1 className="text-2xl font-black text-slate-900 font-tamil">{t('addProduct')}</h1>
                <p className="text-xs text-slate-500 font-tamil">
                  {language === 'ta' ? 'விளைபொருள் விவரங்களை பதிவிட்டு வாடிக்கையாளர்களுக்கு விற்கவும்' : 'List your fresh agricultural harvest for direct buyer purchasing'}
                </p>
              </div>

              {/* Voice Assistance Launcher */}
              <button
                type="button"
                onClick={() => setIsVoiceModalOpen(true)}
                className="px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold text-xs rounded-2xl shadow-md hover:opacity-95 transition flex items-center gap-2 font-tamil"
              >
                <Mic className="w-4 h-4 text-emerald-200 animate-pulse" />
                <span>{t('speakToAddProduct')}</span>
              </button>
            </div>

            {validationError && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-xs font-bold">
                ⚠️ {validationError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 font-tamil">
                    {t('productName')} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fresh Red Tomatoes"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-emerald-500 focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 font-tamil">
                    {t('category')} *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-emerald-500 focus:bg-white focus:outline-none"
                  >
                    <option value="Vegetables">Vegetables (காய்கறிகள்)</option>
                    <option value="Fruits">Fruits (பழங்கள்)</option>
                    <option value="Grains">Grains (தானியங்கள்)</option>
                    <option value="Pulses">Pulses (பருப்பு வகைகள்)</option>
                    <option value="Spices">Spices (மசாலா பொருட்கள்)</option>
                    <option value="Other">Other (மற்றவை)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 font-tamil">
                    Farmer Price (₹/kg) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₹</span>
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="40"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-emerald-500 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Market Price (₹/kg) *</label>
                  <input type="number" required min="1" placeholder="50" value={formData.marketPrice}
                    onChange={(e) => setFormData({ ...formData, marketPrice: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-emerald-500 focus:bg-white focus:outline-none" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Quality *</label>
                  <select value={formData.quality} onChange={(e) => setFormData({ ...formData, quality: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-emerald-500 focus:bg-white focus:outline-none">
                    <option>Grade A</option><option>Grade B</option><option>Grade C</option><option>Organic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Cost (₹/kg, for profit tracking)</label>
                  <input type="number" min="0" placeholder="25" value={formData.costPerKg}
                    onChange={(e) => setFormData({ ...formData, costPerKg: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-emerald-500 focus:bg-white focus:outline-none" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 font-tamil">
                    {t('availableQty')} *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="100"
                      value={formData.availableQty}
                      onChange={(e) => setFormData({ ...formData, availableQty: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-emerald-500 focus:bg-white focus:outline-none"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold uppercase">kg</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 font-tamil">
                    {t('location')} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Salem / Namakkal / Erode"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-emerald-500 focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 font-tamil">
                    {t('harvestDate')}
                  </label>
                  <input
                    type="date"
                    value={formData.harvestDate}
                    onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-emerald-500 focus:bg-white focus:outline-none"
                  />
                </div>

              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 font-tamil">
                  {t('description')}
                </label>
                <textarea
                  rows="3"
                  placeholder="Describe your harvest quality, organic farming practices, or special characteristics..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-emerald-500 focus:bg-white focus:outline-none"
                />
              </div>

              {/* Cloudinary-style Upload Area Placeholder & Presets */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700 font-tamil">
                  {t('productImage')} (Cloudinary Media Uploader)
                </label>

                <label className="block cursor-pointer border-2 border-dashed border-emerald-300 bg-emerald-50/40 rounded-2xl p-6 text-center space-y-3 hover:bg-emerald-50 transition"><input type="file" accept="image/*" className="hidden" onChange={(e) => { const file = e.target.files[0]; if (!file) return; const r = new FileReader(); r.onload = () => setFormData((p) => ({ ...p, image: r.result })); r.readAsDataURL(file); }} />
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-emerald-800 block">
                      Drag & Drop product image or click to browse
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Cloudinary auto-optimization enabled (JPG, PNG, WebP up to 10MB)
                    </span>
                  </div>
                </label>

                {/* Preset image picker */}
                <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider">
                  Or select sample agricultural crop photo:
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {presetImages.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setFormData({ ...formData, image: img.url })}
                      className={`relative rounded-xl overflow-hidden h-16 border-2 transition ${
                        formData.image === img.url ? 'border-emerald-600 ring-2 ring-emerald-300 scale-105' : 'border-slate-200 hover:border-emerald-400'
                      }`}
                    >
                      <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                      {formData.image === img.url && (
                        <div className="absolute inset-0 bg-emerald-900/40 flex items-center justify-center text-white">
                          <Check className="w-5 h-5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => navigate('/farmer/products')}
                  className="px-6 py-3 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition font-tamil"
                >
                  {t('cancel')}
                </button>

                <button
                  type="submit"
                  className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition font-tamil"
                >
                  {t('saveProduct')}
                </button>
              </div>

            </form>

          </div>

        </main>
      </div>

      <VoiceAssistantModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onParsedResult={(parsed) => {
          setFormData((prev) => ({
            ...prev,
            name: parsed.name || prev.name,
            price: parsed.price || prev.price,
            availableQty: parsed.availableQty || prev.availableQty
          }));
        }}
      />
    </div>
  );
};
