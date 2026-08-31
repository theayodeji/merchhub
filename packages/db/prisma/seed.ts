import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../../apps/backend/.env') });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });


const categories = [
  { name: 'Fitness', slug: 'fitness' },
  { name: 'Fashion', slug: 'fashion' },
  { name: 'Sports', slug: 'sports' },
  { name: 'Gaming', slug: 'gaming' },
  { name: 'Music', slug: 'music' },
  { name: 'Tech', slug: 'tech' },
  { name: 'Comedy', slug: 'comedy' },
  { name: 'Lifestyle', slug: 'lifestyle' },
];

async function main() {
  console.log('Seeding categories...');
  
  for (const category of categories) {
    await prisma.creatorCategory.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }
  
  const productCategories = [
    { name: 'Apparel', slug: 'apparel' },
    { name: 'Accessories', slug: 'accessories' },
    { name: 'Digital', slug: 'digital' },
    { name: 'Collectibles', slug: 'collectibles' },
    { name: 'Home & Living', slug: 'home-and-living' },
    { name: 'Art', slug: 'art' },
    { name: 'Books', slug: 'books' },
    { name: 'Subscriptions', slug: 'subscriptions' },
    { name: 'Experiences', slug: 'experiences' },
    { name: 'Other', slug: 'other' },
  ];

  console.log('Seeding product categories...');
  for (const category of productCategories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }
  
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
