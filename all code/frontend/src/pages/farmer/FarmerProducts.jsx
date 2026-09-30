import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { 
  Package, 
  PlusCircle, 
  Filter, 
  Search, 
  Eye, 
  Edit3, 
  Trash2, 
  Grid, 
  List, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';

export const FarmerProducts = () => {
  const { products, deleteProduct, t, language } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'table'

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;
    return matchesSearch && matchesCat && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-slate-900 font-tamil">{t('myProducts')}</h1>
              <p className="text-xs text-slate-500 font-tamil">
                {language === 'ta' ? 'உங்கள் விளைபொருட்களின் விவரங்கள் மற்றும் இருப்பு நிலை' : 'Manage your listed agricultural crops, pricing and availability'}
              </p>
            </div>

            <Link
              to="/farmer/products/add"
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl shadow-lg shadow-emerald-600/30 transition flex items-center gap-2 font-tamil"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t('addProduct')}</span>
            </Link>
          </div>

          {/* Filters & View Switcher Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto flex-1">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
              >
                <option value="All">All Categories</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Grains">Grains</option>
                <option value="Pulses">Pulses</option>
                <option value="Spices">Spices</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
              >
                <option value="All">All Availability</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('cards')}
                className={`p-1.5 rounded-lg text-xs transition ${viewMode === 'cards' ? 'bg-white shadow text-emerald-700' : 'text-slate-500'}`}
                title="Card View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs transition ${viewMode === 'table' ? 'bg-white shadow text-emerald-700' : 'text-slate-500'}`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Cards View */}
          {viewMode === 'cards' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="relative h-48 bg-slate-100">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        product.status === 'In Stock' ? 'bg-emerald-600 text-white' :
                        product.status === 'Low Stock' ? 'bg-amber-500 text-white' : 'bg-rose-600 text-white'
                      }`}>
                        {product.status}
                      </span>
                    </div>

                    <div className="p-5 space-y-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {product.category}
                      </span>

                      <h3 className="font-extrabold text-slate-900 text-base">{product.name}</h3>

                      <div className="flex items-baseline justify-between pt-1">
                        <span className="text-xl font-black text-emerald-700">₹{product.price}/kg</span>{product.marketPrice && <span className="block text-[11px] text-slate-400">Market ₹{product.marketPrice}/kg · {product.quality}</span>}
                        <span className="text-xs font-semibold text-slate-500">{product.availableQty} kg left</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex items-center gap-2 border-t border-slate-100">
                    <Link
                      to={`/buyer/product/${product.id}`}
                      className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1 transition"
                    >
                      <Eye className="w-3.5 h-3.5" /> View
                    </Link>

                    <button
                      onClick={() => alert(`Edit Product ID ${product.id}`)}
                      className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl transition"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Delete ${product.name}?`)) deleteProduct(product.id);
                      }}
                      className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Table View */
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100 uppercase tracking-wider">
                    <th className="p-3.5">Produce</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Price</th>
                    <th className="p-3.5">Available Qty</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 transition">
                      <td className="p-3.5 flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded-xl object-cover" />
                        <div>
                          <span className="font-bold text-slate-900 block">{p.name}</span>
                          <span className="text-[10px] text-slate-400">{p.location}</span>
                        </div>
                      </td>
                      <td className="p-3.5 font-semibold text-slate-700">{p.category}</td>
                      <td className="p-3.5 font-black text-emerald-700">₹{p.price}/kg</td>
                      <td className="p-3.5 font-bold">{p.availableQty} kg</td>
                      <td className="p-3.5">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          p.status === 'In Stock' ? 'bg-emerald-100 text-emerald-800' :
                          p.status === 'Low Stock' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right space-x-2">
                        <button onClick={() => alert(`Edit ${p.name}`)} className="p-1.5 text-emerald-700 hover:bg-emerald-50 rounded-lg">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => deleteProduct(p.id)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};
