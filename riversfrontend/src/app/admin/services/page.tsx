'use client';

import AdminLayout from '@/app/admin/layout';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Save, Upload } from 'lucide-react';
import { api } from '@/lib/api';

interface Service {
  id: number;
  title: string;
  description: string;
  price?: string;
  image: string;
  icon: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const iconOptions = [
  'Heart', 'Building2', 'Cake', 'ChefHat', 'Utensils', 'Martini', 'Flame', 'Users',
  'Award', 'Star', 'Sparkles', 'Gift', 'Music', 'Camera', 'Plane', 'Car'
];

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    icon: 'Heart',
    isActive: true,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchServices = async () => {
    try {
      const data = await api.get<Service[]>('/services');
      setServices(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      image: '',
      icon: 'Heart',
      isActive: true,
    });
    setEditingId(null);
    setShowForm(false);
    setError(null);
    setSuccess(null);
  };

  const handleEdit = (service: Service) => {
    setFormData({
      title: service.title,
      description: service.description,
      price: service.price || '',
      image: service.image,
      icon: service.icon,
      isActive: service.isActive,
    });
    setEditingId(service.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      await api.delete(`/services/${id}`);
      setSuccess('Service deleted successfully');
      fetchServices();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete service');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      if (editingId) {
        await api.put(`/services/${editingId}`, formData);
        setSuccess('Service updated successfully');
      } else {
        await api.post('/services', formData);
        setSuccess('Service created successfully');
      }
      fetchServices();
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save service');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-gold text-xl font-button">Loading...</div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-cream">
              Service <span className="text-gold">Management</span>
            </h1>
            <p className="text-cream/70 mt-2">Create, edit, and manage your catering services</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 bg-gold text-black px-6 py-3 rounded-full font-button font-semibold hover:bg-gold/90 transition-all hover:scale-105 w-full sm:w-auto justify-center"
          >
            <Plus size={20} />
            Add Service
          </button>
        </div>

        {/* Alerts */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400"
            >
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400"
            >
              {success}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative bg-zinc-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gold/20 hover:border-gold/50 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                {service.price && (
                  <div className="absolute top-3 right-3 bg-gold text-black px-3 py-1 rounded-full text-sm font-button font-semibold">
                    {service.price}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-heading text-xl font-semibold text-cream mb-2 group-hover:text-gold transition-colors">
                  {service.title}
                </h3>
                <p className="text-cream/70 text-sm leading-relaxed mb-4 line-clamp-2">
                  {service.description}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-gold/20 text-gold px-4 py-2 rounded-full font-button text-sm hover:bg-gold/30 transition-colors"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="inline-flex items-center justify-center gap-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-full font-button text-sm hover:bg-red-500/30 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {services.length === 0 && (
          <div className="text-center py-20">
            <p className="text-cream/60 text-lg">No services yet. Create your first service to get started.</p>
          </div>
        )}

        {/* Add/Edit Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={(e) => e.target === e.currentTarget && resetForm()}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-zinc-900 rounded-3xl p-6 md:p-8 border border-gold/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading text-2xl font-bold text-cream">
                    {editingId ? 'Edit Service' : 'Add New Service'}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-cream hover:bg-zinc-700 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-cream font-semibold mb-2">Service Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full bg-zinc-800 border border-gold/20 rounded-xl px-4 py-3 text-cream placeholder-cream/40 focus:outline-none focus:border-gold transition-colors"
                      placeholder="e.g. Wedding Catering"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-cream font-semibold mb-2">Description *</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="w-full bg-zinc-800 border border-gold/20 rounded-xl px-4 py-3 text-cream placeholder-cream/40 focus:outline-none focus:border-gold transition-colors resize-none"
                      placeholder="Describe the service..."
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-cream font-semibold mb-2">Price (optional)</label>
                      <input
                        type="text"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full bg-zinc-800 border border-gold/20 rounded-xl px-4 py-3 text-cream placeholder-cream/40 focus:outline-none focus:border-gold transition-colors"
                        placeholder="e.g. ₦500,000"
                      />
                    </div>

                    <div>
                      <label className="block text-cream font-semibold mb-2">Icon *</label>
                      <select
                        value={formData.icon}
                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                        className="w-full bg-zinc-800 border border-gold/20 rounded-xl px-4 py-3 text-cream focus:outline-none focus:border-gold transition-colors"
                      >
                        {iconOptions.map((icon) => (
                          <option key={icon} value={icon}>{icon}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-cream font-semibold mb-2">Service Image *</label>
                    <div className="flex flex-col gap-3">
                      {formData.image && (
                        <div className="relative w-full h-48 rounded-xl overflow-hidden">
                          <img
                            src={formData.image}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, image: '' })}
                            className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <label className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-center gap-2 bg-zinc-800 border-2 border-dashed border-gold/30 rounded-xl px-4 py-6 hover:border-gold/50 transition-colors">
                            <Upload size={20} className="text-gold" />
                            <span className="text-cream/70">Upload Image</span>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                        <input
                          type="text"
                          value={formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          className="flex-1 bg-zinc-800 border border-gold/20 rounded-xl px-4 py-3 text-cream placeholder-cream/40 focus:outline-none focus:border-gold transition-colors"
                          placeholder="Or paste image URL..."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-5 h-5 rounded bg-zinc-800 border-gold/20 text-gold focus:ring-gold"
                    />
                    <label htmlFor="isActive" className="text-cream font-semibold cursor-pointer">
                      Active (visible on website)
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full bg-gold text-black py-4 rounded-full font-button font-semibold text-lg hover:bg-gold/90 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {saving ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={20} />
                        {editingId ? 'Update Service' : 'Create Service'}
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>
    </AdminLayout>
  );
}
