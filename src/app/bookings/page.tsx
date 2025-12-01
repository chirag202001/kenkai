"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Clock, User, Mail, Building2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Booking {
  id: string;
  date: string;
  time: string;
  name: string;
  email: string;
  company: string;
  service: string;
  createdAt: string;
}

export default function BookingsViewPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>('all');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (response.ok) {
        setIsAuthenticated(true);
        sessionStorage.setItem('admin_authenticated', 'true');
      } else {
        setError('Invalid password');
        setPassword('');
      }
    } catch (error) {
      setError('Authentication failed');
    }
  };

  useEffect(() => {
    // Check if already authenticated in this session
    const isAuth = sessionStorage.getItem('admin_authenticated') === 'true';
    if (isAuth) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllBookings();
    }
  }, [isAuthenticated]);

  const fetchAllBookings = async () => {
    try {
      const response = await fetch('/api/bookings/all');
      if (response.ok) {
        const data = await response.json();
        setBookings(data.bookings || []);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = selectedDate === 'all' 
    ? bookings 
    : bookings.filter(b => b.date === selectedDate);

  const uniqueDates = Array.from(new Set(bookings.map(b => b.date))).sort();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <main>
        <Header />
        <section className="min-h-screen bg-gray-50 flex items-center justify-center py-16">
          <div className="max-w-md w-full mx-4">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Lock className="w-8 h-8 text-blue-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Access</h1>
                <p className="text-gray-600 mt-2">Enter password to view bookings</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter admin password"
                    required
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Security Notice:</strong> This page contains sensitive client data and is protected.
                </p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Header />
      <section className="min-h-screen bg-gray-50 py-16">
        <div className="container-width px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">All Bookings</h1>

            {/* Filter */}
            <div className="mb-6 flex gap-4">
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Dates</option>
                {uniqueDates.map(date => (
                  <option key={date} value={date}>
                    {formatDate(date)}
                  </option>
                ))}
              </select>
            </div>

            {/* Bookings List */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading bookings...</p>
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No bookings found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBookings.map(booking => (
                  <div key={booking.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                          <User className="w-4 h-4" />
                          <span className="text-sm font-medium">Client</span>
                        </div>
                        <p className="font-semibold text-gray-900">{booking.name}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                          <Mail className="w-4 h-4" />
                          <span className="text-sm font-medium">Email</span>
                        </div>
                        <a href={`mailto:${booking.email}`} className="text-blue-600 hover:underline">
                          {booking.email}
                        </a>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                          <Building2 className="w-4 h-4" />
                          <span className="text-sm font-medium">Company</span>
                        </div>
                        <p className="text-gray-900">{booking.company}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm font-medium">Date</span>
                        </div>
                        <p className="text-gray-900">{formatDate(booking.date)}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm font-medium">Time</span>
                        </div>
                        <p className="text-gray-900">{booking.time} IST</p>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-gray-600 mb-1">Service</div>
                        <p className="text-gray-900">{booking.service}</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
                      Booking ID: {booking.id} • Created: {new Date(booking.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Stats */}
            <div className="mt-8 bg-blue-50 rounded-lg p-6">
              <h3 className="font-bold text-blue-900 mb-2">Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{bookings.length}</div>
                  <div className="text-sm text-blue-800">Total Bookings</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">{uniqueDates.length}</div>
                  <div className="text-sm text-blue-800">Days with Bookings</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
