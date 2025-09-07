const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const Product = require('../models/Product');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://shubh7silyan:yDzD0Etus7x3tzLt@shaggsstore.mfpkmux.mongodb.net/?retryWrites=true&w=majority&appName=ShaggsStore');
    console.log('✅ MongoDB connected for seeding');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedUsers = async () => {
  try {
    // Clear existing users
    await User.deleteMany({});

    // Create admin user
    const adminUser = await User.create({
      username: 'admin',
      email: process.env.ADMIN_EMAIL || 'admin@shaggsstore.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      phone: '+1234567890'
    });

    // Create sample regular users
    const users = [
      {
        username: 'john_doe',
        email: 'john@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1234567891'
      },
      {
        username: 'jane_smith',
        email: 'jane@example.com',
        password: 'password123',
        firstName: 'Jane',
        lastName: 'Smith',
        phone: '+1234567892'
      }
    ];

    await User.create(users);
    console.log('✅ Users seeded successfully');
    return adminUser._id;
  } catch (error) {
    console.error('❌ Error seeding users:', error);
  }
};

const seedProducts = async (adminId) => {
  try {
    // Clear existing products
    await Product.deleteMany({});

    const products = [
      {
        name: 'iPhone 15 Pro',
        description: 'The latest iPhone with A17 Pro chip, titanium design, and advanced camera system.',
        price: 999,
        originalPrice: 1099,
        category: 'Electronics',
        subcategory: 'Smartphones',
        brand: 'Apple',
        sku: 'IPH15PRO001',
        images: [
          {
            url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
            alt: 'iPhone 15 Pro',
            isPrimary: true
          }
        ],
        stock: 50,
        specifications: [
          { name: 'Display', value: '6.1-inch Super Retina XDR' },
          { name: 'Chip', value: 'A17 Pro' },
          { name: 'Storage', value: '128GB' }
        ],
        features: ['Face ID', 'Wireless Charging', 'Water Resistant'],
        tags: ['smartphone', 'apple', 'premium'],
        isFeatured: true,
        createdBy: adminId
      },
      {
        name: 'MacBook Air M2',
        description: 'Supercharged by M2 chip. Incredibly thin and light laptop with all-day battery life.',
        price: 1199,
        originalPrice: 1299,
        category: 'Electronics',
        subcategory: 'Laptops',
        brand: 'Apple',
        sku: 'MBA2022001',
        images: [
          {
            url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500',
            alt: 'MacBook Air M2',
            isPrimary: true
          }
        ],
        stock: 30,
        specifications: [
          { name: 'Chip', value: 'Apple M2' },
          { name: 'Memory', value: '8GB' },
          { name: 'Storage', value: '256GB SSD' }
        ],
        features: ['Touch ID', 'Magic Keyboard', 'Force Touch trackpad'],
        tags: ['laptop', 'apple', 'ultrabook'],
        isFeatured: true,
        createdBy: adminId
      },
      {
        name: 'Nike Air Max 270',
        description: 'Lifestyle shoe with large Air unit for all-day comfort and modern style.',
        price: 150,
        category: 'Clothing',
        subcategory: 'Shoes',
        brand: 'Nike',
        sku: 'NAM270001',
        images: [
          {
            url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
            alt: 'Nike Air Max 270',
            isPrimary: true
          }
        ],
        stock: 100,
        specifications: [
          { name: 'Material', value: 'Mesh and synthetic' },
          { name: 'Sole', value: 'Rubber' },
          { name: 'Closure', value: 'Lace-up' }
        ],
        features: ['Air Max cushioning', 'Breathable mesh', 'Durable rubber sole'],
        tags: ['shoes', 'nike', 'sneakers', 'lifestyle'],
        createdBy: adminId
      },
      {
        name: 'Sony WH-1000XM4',
        description: 'Industry-leading noise canceling wireless headphones with premium sound quality.',
        price: 349,
        originalPrice: 399,
        category: 'Electronics',
        subcategory: 'Audio',
        brand: 'Sony',
        sku: 'SWH1000XM4',
        images: [
          {
            url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500',
            alt: 'Sony WH-1000XM4',
            isPrimary: true
          }
        ],
        stock: 75,
        specifications: [
          { name: 'Battery Life', value: '30 hours' },
          { name: 'Connectivity', value: 'Bluetooth 5.0' },
          { name: 'Weight', value: '254g' }
        ],
        features: ['Active Noise Canceling', 'Quick Charge', 'Touch Controls'],
        tags: ['headphones', 'sony', 'wireless', 'noise-canceling'],
        isFeatured: true,
        createdBy: adminId
      },
      {
        name: 'Levi\'s 501 Original Jeans',
        description: 'The original straight fit jeans. A classic since 1873.',
        price: 89,
        category: 'Clothing',
        subcategory: 'Jeans',
        brand: 'Levi\'s',
        sku: 'LEV501001',
        images: [
          {
            url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
            alt: 'Levi\'s 501 Jeans',
            isPrimary: true
          }
        ],
        stock: 200,
        specifications: [
          { name: 'Fit', value: 'Straight' },
          { name: 'Material', value: '100% Cotton' },
          { name: 'Rise', value: 'Mid-rise' }
        ],
        features: ['Button fly', 'Five-pocket styling', 'Classic straight fit'],
        tags: ['jeans', 'levis', 'denim', 'classic'],
        createdBy: adminId
      },
      {
        name: 'The Great Gatsby',
        description: 'F. Scott Fitzgerald\'s masterpiece about the Jazz Age and the American Dream.',
        price: 12.99,
        category: 'Books',
        subcategory: 'Fiction',
        brand: 'Scribner',
        sku: 'TGG1925001',
        images: [
          {
            url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
            alt: 'The Great Gatsby Book',
            isPrimary: true
          }
        ],
        stock: 150,
        specifications: [
          { name: 'Pages', value: '180' },
          { name: 'Publisher', value: 'Scribner' },
          { name: 'Language', value: 'English' }
        ],
        features: ['Classic Literature', 'Paperback', 'Award Winner'],
        tags: ['book', 'fiction', 'classic', 'literature'],
        createdBy: adminId
      },
      {
        name: 'Instant Pot Duo 7-in-1',
        description: 'Multi-functional pressure cooker that replaces 7 kitchen appliances.',
        price: 79.95,
        originalPrice: 99.95,
        category: 'Home & Garden',
        subcategory: 'Kitchen Appliances',
        brand: 'Instant Pot',
        sku: 'IPD7IN1001',
        images: [
          {
            url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500',
            alt: 'Instant Pot Duo',
            isPrimary: true
          }
        ],
        stock: 60,
        specifications: [
          { name: 'Capacity', value: '6 Quart' },
          { name: 'Functions', value: '7-in-1' },
          { name: 'Material', value: 'Stainless Steel' }
        ],
        features: ['Pressure Cook', 'Slow Cook', 'Rice Cooker', 'Steamer'],
        tags: ['kitchen', 'appliance', 'pressure-cooker', 'multi-function'],
        createdBy: adminId
      },
      {
        name: 'Adidas Ultraboost 22',
        description: 'Running shoes with responsive cushioning and energy return.',
        price: 190,
        category: 'Sports & Outdoors',
        subcategory: 'Running Shoes',
        brand: 'Adidas',
        sku: 'AUB22001',
        images: [
          {
            url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500',
            alt: 'Adidas Ultraboost 22',
            isPrimary: true
          }
        ],
        stock: 80,
        specifications: [
          { name: 'Drop', value: '10mm' },
          { name: 'Weight', value: '310g' },
          { name: 'Upper', value: 'Primeknit' }
        ],
        features: ['Boost midsole', 'Continental rubber outsole', 'Sock-like fit'],
        tags: ['running', 'adidas', 'boost', 'performance'],
        createdBy: adminId
      }
    ];

    await Product.create(products);
    console.log('✅ Products seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding products:', error);
  }
};

const seedDatabase = async () => {
  try {
    await connectDB();
    
    console.log('🌱 Starting database seeding...');
    
    const adminId = await seedUsers();
    await seedProducts(adminId);
    
    console.log('🎉 Database seeding completed successfully!');
    console.log('📋 Summary:');
    console.log('   - Admin user created (admin@shaggsstore.com / admin123)');
    console.log('   - 2 regular users created');
    console.log('   - 8 sample products created');
    console.log('');
    console.log('🚀 You can now start the server and begin testing!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };
