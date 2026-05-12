// Mock data for the Airbnb-style platform

export const properties = [
  {
    id: "1",
    title: "Modern Apartment in Kigali City Center",
    location: "Kigali, Rwanda",
    price: 85,
    rating: 4.9,
    reviews: 127,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    host: "Sarah Johnson",
    guests: 4, bedrooms: 2, beds: 2, baths: 2,
    amenities: ["WiFi", "Kitchen", "Free parking", "Air conditioning", "Workspace"],
    description: "Beautiful modern apartment with stunning city views. Perfect for business travelers and families.",
    type: "Apartment", category: "Apartment",
    lat: -1.9441, lng: 30.0619,
  },
  {
    id: "2",
    title: "Luxury Villa with Pool in Nairobi",
    location: "Nairobi, Kenya",
    price: 250,
    rating: 5.0,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    host: "Michael Chen",
    guests: 8, bedrooms: 4, beds: 5, baths: 3,
    amenities: ["Pool", "WiFi", "Kitchen", "Free parking", "Garden", "BBQ grill"],
    description: "Stunning luxury villa with private pool and garden. Ideal for large groups and special occasions.",
    type: "Villa", category: "Villa",
    lat: -1.3032, lng: 36.7073,
  },
  {
    id: "3",
    title: "Charming Studio near Eiffel Tower",
    location: "Paris, France",
    price: 120,
    rating: 4.8,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    host: "Marie Dubois",
    guests: 2, bedrooms: 1, beds: 1, baths: 1,
    amenities: ["WiFi", "Kitchen", "City view", "Workspace"],
    description: "Cozy studio apartment in the heart of Paris, walking distance to the Eiffel Tower.",
    type: "Studio", category: "Apartment",
    lat: 48.8584, lng: 2.2944,
  },
  {
    id: "4",
    title: "Penthouse Loft in Manhattan",
    location: "New York, USA",
    price: 350,
    rating: 4.95,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
    host: "David Williams",
    guests: 6, bedrooms: 3, beds: 3, baths: 2,
    amenities: ["WiFi", "Kitchen", "Gym", "Doorman", "Elevator", "City view"],
    description: "Luxurious penthouse with panoramic city views. Modern design with premium finishes.",
    type: "Loft", category: "Apartment",
    lat: 40.7549, lng: -73.9851,
  },
  {
    id: "5",
    title: "Beachfront Bungalow in Mombasa",
    location: "Mombasa, Kenya",
    price: 180,
    rating: 4.85,
    reviews: 94,
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&h=600&fit=crop",
    host: "Grace Mwangi",
    guests: 5, bedrooms: 2, beds: 3, baths: 2,
    amenities: ["Beach access", "WiFi", "Kitchen", "Free parking", "Ocean view"],
    description: "Relaxing beachfront property with direct access to pristine white sand beaches.",
    type: "Bungalow", category: "Beachfront",
    lat: -4.0435, lng: 39.6682,
  },
  {
    id: "6",
    title: "Historic Townhouse in Kigali",
    location: "Kigali, Rwanda",
    price: 95,
    rating: 4.7,
    reviews: 71,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop",
    host: "James Mukasa",
    guests: 4, bedrooms: 2, beds: 2, baths: 1,
    amenities: ["WiFi", "Kitchen", "Free parking", "Garden"],
    description: "Charming townhouse in a quiet neighborhood. Perfect for a peaceful stay.",
    type: "Townhouse", category: "Apartment",
    lat: -1.9706, lng: 30.1044,
  },
  {
    id: "7",
    title: "Alpine Cabin Retreat",
    location: "Swiss Alps, Switzerland",
    price: 320,
    rating: 4.92,
    reviews: 58,
    image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&h=600&fit=crop",
    host: "Hans Weber",
    guests: 6, bedrooms: 3, beds: 4, baths: 2,
    amenities: ["WiFi", "Fireplace", "Mountain view", "Ski-in/ski-out", "Hot tub"],
    description: "Cozy alpine cabin perfect for winter sports enthusiasts and nature lovers.",
    type: "Cabin", category: "Cabin",
    lat: 46.5197, lng: 7.5857,
  },
  {
    id: "8",
    title: "Oceanfront Suite in Cape Town",
    location: "Cape Town, South Africa",
    price: 195,
    rating: 4.88,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    host: "Amara Osei",
    guests: 4, bedrooms: 2, beds: 2, baths: 2,
    amenities: ["Ocean view", "WiFi", "Pool", "Kitchen", "Balcony"],
    description: "Stunning oceanfront suite with breathtaking views of the Atlantic Ocean.",
    type: "Suite", category: "Beachfront",
    lat: -33.9249, lng: 18.4241,
  }
];

export const users = [
  { id: "1", name: "Sarah Johnson", email: "sarah.j@email.com", role: "host", status: "active", joined: "2024-01-15", avatar: "SJ", bookings: 24, revenue: 4820 },
  { id: "2", name: "Michael Chen", email: "m.chen@email.com", role: "host", status: "active", joined: "2024-02-20", avatar: "MC", bookings: 18, revenue: 6240 },
  { id: "3", name: "Marie Dubois", email: "marie.d@email.com", role: "host", status: "active", joined: "2023-11-10", avatar: "MD", bookings: 31, revenue: 3720 },
  { id: "4", name: "David Williams", email: "d.williams@email.com", role: "host", status: "active", joined: "2023-09-05", avatar: "DW", bookings: 42, revenue: 14700 },
  { id: "5", name: "Grace Mwangi", email: "grace.m@email.com", role: "host", status: "active", joined: "2024-03-12", avatar: "GM", bookings: 15, revenue: 2700 },
  { id: "6", name: "John Smith", email: "john.s@email.com", role: "guest", status: "active", joined: "2024-04-01", avatar: "JS", bookings: 7, revenue: 0 },
  { id: "7", name: "Emma Watson", email: "emma.w@email.com", role: "guest", status: "suspended", joined: "2024-01-22", avatar: "EW", bookings: 3, revenue: 0 },
  { id: "8", name: "Lucas Martinez", email: "l.martinez@email.com", role: "guest", status: "active", joined: "2024-05-10", avatar: "LM", bookings: 12, revenue: 0 },
  { id: "9", name: "Priya Patel", email: "p.patel@email.com", role: "host", status: "active", joined: "2024-02-01", avatar: "PP", bookings: 22, revenue: 5400 },
  { id: "10", name: "Omar Hassan", email: "o.hassan@email.com", role: "guest", status: "active", joined: "2024-06-15", avatar: "OH", bookings: 5, revenue: 0 }
];

export const bookings = [
  {
    id: "B001",
    propertyId: "1",
    propertyTitle: "Modern Apartment in Kigali City Center",
    propertyImage: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&h=200&fit=crop",
    guest: "John Smith",
    guestAvatar: "JS",
    checkIn: "2026-05-15",
    checkOut: "2026-05-20",
    status: "confirmed",
    total: 425,
    nights: 5,
    location: "Kigali, Rwanda"
  },
  {
    id: "B002",
    propertyId: "2",
    propertyTitle: "Luxury Villa with Pool in Nairobi",
    propertyImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&h=200&fit=crop",
    guest: "Emma Watson",
    guestAvatar: "EW",
    checkIn: "2026-05-22",
    checkOut: "2026-05-25",
    status: "pending",
    total: 750,
    nights: 3,
    location: "Nairobi, Kenya"
  },
  {
    id: "B003",
    propertyId: "3",
    propertyTitle: "Charming Studio near Eiffel Tower",
    propertyImage: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300&h=200&fit=crop",
    guest: "Oliver Brown",
    guestAvatar: "OB",
    checkIn: "2026-05-10",
    checkOut: "2026-05-17",
    status: "confirmed",
    total: 840,
    nights: 7,
    location: "Paris, France"
  },
  {
    id: "B004",
    propertyId: "4",
    propertyTitle: "Penthouse Loft in Manhattan",
    propertyImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&h=200&fit=crop",
    guest: "Sophia Lee",
    guestAvatar: "SL",
    checkIn: "2026-05-08",
    checkOut: "2026-05-12",
    status: "completed",
    total: 1400,
    nights: 4,
    location: "New York, USA"
  },
  {
    id: "B005",
    propertyId: "5",
    propertyTitle: "Beachfront Bungalow in Mombasa",
    propertyImage: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=300&h=200&fit=crop",
    guest: "Lucas Martinez",
    guestAvatar: "LM",
    checkIn: "2026-05-18",
    checkOut: "2026-05-25",
    status: "confirmed",
    total: 1260,
    nights: 7,
    location: "Mombasa, Kenya"
  },
  {
    id: "B006",
    propertyId: "7",
    propertyTitle: "Alpine Cabin Retreat",
    propertyImage: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=300&h=200&fit=crop",
    guest: "Priya Patel",
    guestAvatar: "PP",
    checkIn: "2026-06-01",
    checkOut: "2026-06-08",
    status: "pending",
    total: 2240,
    nights: 7,
    location: "Swiss Alps, Switzerland"
  }
];

export const payments = [
  { id: "PAY001", bookingId: "B001", guest: "John Smith", amount: 425, date: "2026-04-20", method: "Credit Card", status: "completed", property: "Kigali Apartment" },
  { id: "PAY002", bookingId: "B002", guest: "Emma Watson", amount: 750, date: "2026-04-25", method: "PayPal", status: "pending", property: "Nairobi Villa" },
  { id: "PAY003", bookingId: "B003", guest: "Oliver Brown", amount: 840, date: "2026-04-15", method: "Credit Card", status: "completed", property: "Paris Studio" },
  { id: "PAY004", bookingId: "B004", guest: "Sophia Lee", amount: 1400, date: "2026-04-10", method: "Bank Transfer", status: "completed", property: "Manhattan Loft" },
  { id: "PAY005", bookingId: "B005", guest: "Lucas Martinez", amount: 1260, date: "2026-04-28", method: "Credit Card", status: "completed", property: "Mombasa Bungalow" },
  { id: "PAY006", bookingId: "B006", guest: "Priya Patel", amount: 2240, date: "2026-05-01", method: "Credit Card", status: "pending", property: "Alpine Cabin" }
];

export const reviews = [
  { id: "R001", propertyId: "1", property: "Modern Apartment in Kigali", guest: "John Smith", guestAvatar: "JS", rating: 5, comment: "Amazing place! Very clean and comfortable. Sarah was incredibly helpful.", date: "2026-04-25", status: "approved" },
  { id: "R002", propertyId: "3", property: "Charming Studio Paris", guest: "Oliver Brown", guestAvatar: "OB", rating: 5, comment: "Perfect location and great host! Will definitely come back.", date: "2026-04-20", status: "approved" },
  { id: "R003", propertyId: "4", property: "Penthouse Loft Manhattan", guest: "Sophia Lee", guestAvatar: "SL", rating: 4, comment: "Beautiful apartment with stunning views. A little noisy at night.", date: "2026-04-15", status: "pending" },
  { id: "R004", propertyId: "2", property: "Luxury Villa Nairobi", guest: "Emma Watson", guestAvatar: "EW", rating: 5, comment: "Absolutely spectacular! The pool and garden were incredible.", date: "2026-04-10", status: "approved" },
  { id: "R005", propertyId: "5", property: "Beachfront Bungalow Mombasa", guest: "Lucas Martinez", guestAvatar: "LM", rating: 5, comment: "Paradise on Earth. Woke up to the sound of waves every morning.", date: "2026-04-05", status: "pending" }
];

export const stats = {
  totalUsers: 1247,
  totalHosts: 389,
  totalListings: 524,
  totalBookings: 2156,
  totalRevenue: 487920,
  activeListings: 482,
  monthlyRevenue: [
    { month: "Jul", revenue: 38000, bookings: 145 },
    { month: "Aug", revenue: 42000, bookings: 162 },
    { month: "Sep", revenue: 39500, bookings: 151 },
    { month: "Oct", revenue: 44000, bookings: 168 },
    { month: "Nov", revenue: 42000, bookings: 160 },
    { month: "Dec", revenue: 58000, bookings: 221 },
    { month: "Jan", revenue: 52000, bookings: 198 },
    { month: "Feb", revenue: 48000, bookings: 184 },
    { month: "Mar", revenue: 55000, bookings: 210 },
    { month: "Apr", revenue: 62000, bookings: 236 },
    { month: "May", revenue: 68000, bookings: 259 },
    { month: "Jun", revenue: 71000, bookings: 271 }
  ],
  weeklyBookings: [
    { day: "Mon", bookings: 32 },
    { day: "Tue", bookings: 28 },
    { day: "Wed", bookings: 41 },
    { day: "Thu", bookings: 38 },
    { day: "Fri", bookings: 67 },
    { day: "Sat", bookings: 89 },
    { day: "Sun", bookings: 74 }
  ],
  categoryRevenue: [
    { name: "Apartments", value: 35, color: "#FF385C" },
    { name: "Villas", value: 28, color: "#00A699" },
    { name: "Cabins", value: 18, color: "#FC642D" },
    { name: "Beachfront", value: 12, color: "#484848" },
    { name: "Other", value: 7, color: "#767676" }
  ],
  userGrowth: [
    { month: "Jan", users: 980 },
    { month: "Feb", users: 1020 },
    { month: "Mar", users: 1080 },
    { month: "Apr", users: 1120 },
    { month: "May", users: 1180 },
    { month: "Jun", users: 1247 }
  ]
};

export const hostListings = [
  {
    id: "HL1",
    title: "Modern Apartment in Kigali",
    location: "Kigali, Rwanda",
    price: 85,
    rating: 4.9,
    reviews: 127,
    bookings: 24,
    earnings: 2040,
    status: "active",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
    occupancyRate: 87,
    nextBooking: "May 15, 2026"
  },
  {
    id: "HL2",
    title: "Garden Cottage Kigali",
    location: "Kigali, Rwanda",
    price: 65,
    rating: 4.7,
    reviews: 89,
    bookings: 18,
    earnings: 1170,
    status: "active",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop",
    occupancyRate: 72,
    nextBooking: "May 22, 2026"
  },
  {
    id: "HL3",
    title: "Executive Suite Downtown",
    location: "Kigali, Rwanda",
    price: 120,
    rating: 4.8,
    reviews: 56,
    bookings: 12,
    earnings: 1440,
    status: "inactive",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    occupancyRate: 45,
    nextBooking: "—"
  }
];

export const hostEarnings = [
  { month: "Jan", earnings: 1240 },
  { month: "Feb", earnings: 1580 },
  { month: "Mar", earnings: 1420 },
  { month: "Apr", earnings: 1890 },
  { month: "May", earnings: 2340 },
  { month: "Jun", earnings: 2100 },
  { month: "Jul", earnings: 1960 },
  { month: "Aug", earnings: 2450 },
  { month: "Sep", earnings: 2200 },
  { month: "Oct", earnings: 2680 },
  { month: "Nov", earnings: 2840 },
  { month: "Dec", earnings: 3100 }
];

export const activities = [
  { id: 1, user: "Sarah Johnson", action: "created a new listing", detail: "Luxury Villa Kigali", time: "2 hours ago", type: "listing", avatar: "SJ" },
  { id: 2, user: "John Smith", action: "completed a booking", detail: "Modern Apartment in Kigali • $425", time: "4 hours ago", type: "booking", avatar: "JS" },
  { id: 3, user: "Emma Watson", action: "left a 5-star review", detail: "Nairobi Villa", time: "6 hours ago", type: "review", avatar: "EW" },
  { id: 4, user: "Michael Chen", action: "updated their listing", detail: "Nairobi Villa", time: "8 hours ago", type: "listing", avatar: "MC" },
  { id: 5, user: "Marie Dubois", action: "received a booking request", detail: "Paris Studio • $840", time: "10 hours ago", type: "booking", avatar: "MD" },
  { id: 6, user: "Lucas Martinez", action: "made a payment", detail: "$1,260 via Credit Card", time: "12 hours ago", type: "payment", avatar: "LM" },
  { id: 7, user: "Priya Patel", action: "registered as a new host", detail: "", time: "1 day ago", type: "user", avatar: "PP" },
  { id: 8, user: "Omar Hassan", action: "submitted a dispute", detail: "Booking B003", time: "1 day ago", type: "alert", avatar: "OH" }
];

export const testimonials = [
  {
    id: 1,
    name: "Amelia Foster",
    location: "San Francisco, CA",
    avatar: "AF",
    rating: 5,
    comment: "StayBnB completely transformed how I travel. Found an incredible villa in Nairobi at half the price of a hotel. The booking process was seamless!",
    property: "Luxury Villa, Nairobi"
  },
  {
    id: 2,
    name: "David Okonkwo",
    location: "Lagos, Nigeria",
    avatar: "DO",
    rating: 5,
    comment: "As a host, I've tripled my income using this platform. The dashboard makes managing bookings effortless and the support team is fantastic.",
    property: "Host since 2024"
  },
  {
    id: 3,
    name: "Sophie Marchand",
    location: "London, UK",
    avatar: "SM",
    rating: 5,
    comment: "Stayed in a charming Kigali apartment for a business trip. Clean, modern, and the host was incredibly welcoming. Highly recommended!",
    property: "Kigali City Apartment"
  }
];