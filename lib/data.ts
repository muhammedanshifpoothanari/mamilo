
// Helper to create color object
const color = (name: string, hex: string, image: string) => ({ name, hex, image });

export const products = [
    {
        id: '1',
        name: 'Rosebud Princess Dress',
        slug: 'rosebud-princess-dress',
        price: 89,
        originalPrice: undefined,
        image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&q=80',
        occasion: 'Birthday',
        description: 'A beautiful rosebud princess dress perfect for special occasions.',
        isNew: true,
        isBestseller: true,
        sizes: ['2T', '3T', '4T', '5T'],
        colors: [
            color('Pink', '#FFC0CB', 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&q=80'),
            color('White', '#FFFFFF', 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&q=80')
        ]
    },
    {
        id: '2',
        name: 'Tulle Dreams Gown',
        slug: 'tulle-dreams-gown',
        price: 94,
        originalPrice: 120,
        image: 'https://images.unsplash.com/photo-1524416268818-0845245e3e12?w=800&q=80',
        occasion: 'Wedding',
        description: 'Elegant tulle gown for weddings and formal events.',
        isNew: true,
        isBestseller: false,
        sizes: ['3T', '4T', '5T', '6T'],
        colors: [color('Ivory', '#FFFFF0', 'https://images.unsplash.com/photo-1524416268818-0845245e3e12?w=800&q=80')]
    },
    {
        id: '3',
        name: 'Garden Fairy Dress',
        slug: 'garden-fairy-dress',
        price: 79,
        originalPrice: undefined,
        image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&q=80',
        occasion: 'Party',
        description: 'Magical fairy dress with delicate wings detail.',
        isNew: true,
        isBestseller: false,
        sizes: ['2T', '3T', '4T'],
        colors: [color('Sage Green', '#9DC183', 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&q=80')]
    },
    {
        id: '4',
        name: 'Midnight Sparkle Gown',
        slug: 'midnight-sparkle-gown',
        price: 110,
        originalPrice: undefined,
        image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=800&q=80',
        occasion: 'Holiday',
        description: 'Dark blue gown with sparkling sequins like the night sky.',
        isNew: false,
        isBestseller: true,
        sizes: ['4T', '5T', '6T', '7'],
        colors: [color('Midnight Blue', '#191970', 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=800&q=80')]
    },
    // ... Keeping other items simple for now or mapping them
    {
        id: '5',
        name: 'Sunshine Day Dress',
        slug: 'sunshine-day-dress',
        price: 65,
        originalPrice: undefined,
        image: 'https://images.unsplash.com/photo-1621452773781-0f992fd0f5d0?w=800&q=80',
        occasion: 'Casual',
        description: 'Bright and cheerful yellow dress for sunny days.',
        isNew: false,
        isBestseller: false,
        sizes: ['2T', '3T', '4T'],
        colors: [color('Yellow', '#FFFF00', 'https://images.unsplash.com/photo-1621452773781-0f992fd0f5d0?w=800&q=80')]
    },
    {
        id: '6',
        name: 'Velvet Holiday Classic',
        slug: 'velvet-holiday-classic',
        price: 95,
        originalPrice: 130,
        image: 'https://images.unsplash.com/photo-1609357602123-5e93df17d5e4?w=800&q=80',
        occasion: 'Holiday',
        description: 'Red velvet dress with white lace collar.',
        isNew: false,
        isBestseller: true,
        sizes: ['3T', '4T', '5T', '6T'],
        colors: [color('Red', '#FF0000', 'https://images.unsplash.com/photo-1609357602123-5e93df17d5e4?w=800&q=80')]
    },
    {
        id: '7',
        name: 'Ballerina Tutu Dress',
        slug: 'ballerina-tutu-dress',
        price: 85,
        originalPrice: undefined,
        image: 'https://images.unsplash.com/photo-1544280145-934c7678e826?w=800&q=80',
        occasion: 'Party',
        description: 'Classic ballerina style tutu dress in soft pink.',
        isNew: false,
        isBestseller: true,
        sizes: ['2T', '3T', '4T'],
        colors: [color('Pink', '#FFC0CB', 'https://images.unsplash.com/photo-1544280145-934c7678e826?w=800&q=80')]
    },
    {
        id: '8',
        name: 'Floral Tea Party Dress',
        slug: 'floral-tea-party-dress',
        price: 72,
        originalPrice: undefined,
        image: 'https://images.unsplash.com/photo-1502467261937-23ba6279f044?w=800&q=80',
        occasion: 'Party',
        description: 'Vintage floral print dress perfect for tea parties.',
        isNew: false,
        isBestseller: false,
        sizes: ['3T', '4T', '5T', '6T'],
        colors: [color('Floral', '#FFFDD0', 'https://images.unsplash.com/photo-1502467261937-23ba6279f044?w=800&q=80')]
    },
    {
        id: '9',
        name: 'Winter Wonderland Coat',
        slug: 'winter-wonderland-coat',
        price: 145,
        originalPrice: undefined,
        image: 'https://images.unsplash.com/photo-1476900966801-64858b9b6e68?w=800&q=80',
        occasion: 'Holiday',
        description: 'Warm and stylish wool coat for winter events.',
        isNew: true,
        isBestseller: false,
        sizes: ['4T', '5T', '6T', '8'],
        colors: [color('Cream', '#FFFDD0', 'https://images.unsplash.com/photo-1476900966801-64858b9b6e68?w=800&q=80')]
    },
    {
        id: '10',
        name: 'Summer Breeze Linen',
        slug: 'summer-breeze-linen',
        price: 55,
        originalPrice: 75,
        image: 'https://images.unsplash.com/photo-1601648764658-028f2658fa13?w=800&q=80',
        occasion: 'Casual',
        description: 'Breathable linen dress for hot summer days.',
        isNew: false,
        isBestseller: false,
        sizes: ['2T', '3T', '4T', '5T'],
        colors: [color('Beige', '#F5F5DC', 'https://images.unsplash.com/photo-1601648764658-028f2658fa13?w=800&q=80')]
    },
    {
        id: '11',
        name: 'Royal Blue Velour',
        slug: 'royal-blue-velour',
        price: 88,
        originalPrice: undefined,
        image: 'https://images.unsplash.com/photo-1598282928399-c88f2195dfb4?w=800&q=80',
        occasion: 'Party',
        description: 'Luxurious velour fabric in a stunning royal blue.',
        isNew: false,
        isBestseller: false,
        sizes: ['3T', '4T', '5T'],
        colors: [color('Royal Blue', '#4169E1', 'https://images.unsplash.com/photo-1598282928399-c88f2195dfb4?w=800&q=80')]
    },
    {
        id: '12',
        name: 'Polka Dot Joy',
        slug: 'polka-dot-joy',
        price: 60,
        originalPrice: 120,
        image: 'https://images.unsplash.com/photo-1513904664817-aaf663955694?w=800&q=80',
        occasion: 'Casual',
        description: 'Fun polka dot pattern for everyday joy.',
        isNew: false,
        isBestseller: true,
        sizes: ['2T', '3T', '4T'],
        colors: [color('Red', '#FF0000', 'https://images.unsplash.com/photo-1513904664817-aaf663955694?w=800&q=80')]
    }
];

export const categories = [
    'Birthday', 'Wedding', 'Party', 'Holiday'
];

export const settings = {
    currency: 'USD',
    siteName: 'Mamilo',
    siteDescription: 'Handcrafted party dresses for little ones.'
};
