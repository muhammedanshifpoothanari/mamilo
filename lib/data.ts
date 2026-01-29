
// Helper to create color object
const color = (name: string, hex: string, image: string) => ({ name, hex, image });

export const products = [
    // Pink Collection - Birthday & Party Occasions
    {
        id: '1',
        name: 'Blushing Rose Princess Dress',
        slug: 'blushing-rose-princess-dress',
        price: 189,
        originalPrice: undefined,
        image: '/pink.webp',
        occasion: 'Birthday',
        description: 'Enchanting pink princess dress adorned with delicate rose details. Perfect for making your little one feel like royalty on their special day.',
        isNew: true,
        isBestseller: true,
        sizes: ['2T', '3T', '4T', '5T', '6T'],
        colors: [
            color('Blushing Pink', '#FFB6C1', '/pink.webp'),
            color('Rose Pink', '#FF69B4', '/pink2.webp')
        ]
    },
    {
        id: '2',
        name: 'Fairy Tale Party Gown',
        slug: 'fairy-tale-party-gown',
        price: 159,
        originalPrice: 199,
        image: '/pink1.webp',
        occasion: 'Party',
        description: 'Magical pink party dress with flowing tulle and sparkle details. Your little princess will steal the show at any celebration.',
        isNew: true,
        isBestseller: false,
        sizes: ['2T', '3T', '4T', '5T'],
        colors: [
            color('Soft Pink', '#FFC0CB', '/pink1.webp')
        ]
    },
    {
        id: '3',
        name: 'Sweet Dreams Celebration Dress',
        slug: 'sweet-dreams-celebration-dress',
        price: 149,
        originalPrice: undefined,
        image: '/pink3.webp',
        occasion: 'Birthday',
        description: 'Adorable pink dress with bow accents and layers of soft tulle. Perfect for birthday parties and special celebrations.',
        isNew: false,
        isBestseller: true,
        sizes: ['2T', '3T', '4T', '5T', '6T'],
        colors: [
            color('Powder Pink', '#FFB6C1', '/pink3.webp'),
            color('Candy Pink', '#FF69B4', '/pink4.webp')
        ]
    },
    {
        id: '4',
        name: 'Butterfly Garden Gown',
        slug: 'butterfly-garden-gown',
        price: 175,
        originalPrice: undefined,
        image: '/pink5.webp',
        occasion: 'Party',
        description: 'Elegant pink gown with butterfly embellishments and delicate lace. Made for unforgettable party moments.',
        isNew: false,
        isBestseller: false,
        sizes: ['3T', '4T', '5T', '6T'],
        colors: [
            color('Ballet Pink', '#FFC0CB', '/pink5.webp')
        ]
    },

    // White Collection - Wedding & Christening Occasions
    {
        id: '5',
        name: 'Pure Angel Christening Gown',
        slug: 'pure-angel-christening-gown',
        price: 225,
        originalPrice: undefined,
        image: '/white.webp',
        occasion: 'Christening',
        description: 'Exquisite white christening gown with intricate lace and satin ribbons. A timeless piece for your baby\'s blessed day.',
        isNew: true,
        isBestseller: true,
        sizes: ['0-3M', '3-6M', '6-12M', '12-18M'],
        colors: [
            color('Pure White', '#FFFFFF', '/white.webp'),
            color('Ivory White', '#FFFFF0', '/white1.webp')
        ]
    },
    {
        id: '6',
        name: 'Little Bride Flower Girl Dress',
        slug: 'little-bride-flower-girl-dress',
        price: 195,
        originalPrice: 245,
        image: '/white2.webp',
        occasion: 'Wedding',
        description: 'Stunning white flower girl dress with pearl accents and elegant train. Perfect for making magical wedding memories.',
        isNew: true,
        isBestseller: true,
        sizes: ['2T', '3T', '4T', '5T', '6T'],
        colors: [
            color('Bridal White', '#FFFFFF', '/white2.webp')
        ]
    },
    {
        id: '7',
        name: 'Heaven Sent Baptism Dress',
        slug: 'heaven-sent-baptism-dress',
        price: 165,
        originalPrice: undefined,
        image: '/white3.webp',
        occasion: 'Christening',
        description: 'Delicate white baptism dress with hand-embroidered details and soft tulle layers. A cherished keepsake for generations.',
        isNew: false,
        isBestseller: false,
        sizes: ['0-3M', '3-6M', '6-12M', '12-18M', '18-24M'],
        colors: [
            color('Snow White', '#FFFAFA', '/white3.webp'),
            color('Cream White', '#FFFFF0', '/white4.webp')
        ]
    },
    {
        id: '8',
        name: 'Princess Grace Ceremony Gown',
        slug: 'princess-grace-ceremony-gown',
        price: 210,
        originalPrice: undefined,
        image: '/white5.webp',
        occasion: 'Wedding',
        description: 'Luxurious white ceremony gown with sequin bodice and flowing skirt. Designed to make your little one shine at formal events.',
        isNew: false,
        isBestseller: true,
        sizes: ['2T', '3T', '4T', '5T', '6T', '7'],
        colors: [
            color('Diamond White', '#FFFFFF', '/white5.webp')
        ]
    },

    // Red Collection - Holiday & Special Occasions
    {
        id: '9',
        name: 'Velvet Holiday Princess',
        slug: 'velvet-holiday-princess',
        price: 179,
        originalPrice: 220,
        image: '/red.webp',
        occasion: 'Holiday',
        description: 'Luxurious red velvet dress with white fur trim and sparkle details. Perfect for Christmas parties and winter celebrations.',
        isNew: true,
        isBestseller: true,
        sizes: ['2T', '3T', '4T', '5T', '6T'],
        colors: [
            color('Ruby Red', '#E0115F', '/red.webp'),
            color('Crimson Red', '#DC143C', '/red2.webp')
        ]
    },
    {
        id: '10',
        name: 'Santa\'s Little Helper Dress',
        slug: 'santas-little-helper-dress',
        price: 145,
        originalPrice: undefined,
        image: '/red3.webp',
        occasion: 'Holiday',
        description: 'Festive red dress with white collar and seasonal embellishments. Your little one will spread Christmas cheer in this adorable outfit.',
        isNew: true,
        isBestseller: false,
        sizes: ['2T', '3T', '4T', '5T'],
        colors: [
            color('Christmas Red', '#C41E3A', '/red3.webp')
        ]
    },
    {
        id: '11',
        name: 'Winter Rose Formal Gown',
        slug: 'winter-rose-formal-gown',
        price: 199,
        originalPrice: undefined,
        image: '/red4.webp',
        occasion: 'Party',
        description: 'Elegant red formal gown with rose appliqués and satin finish. Perfect for holiday galas and special winter events.',
        isNew: false,
        isBestseller: true,
        sizes: ['3T', '4T', '5T', '6T', '7'],
        colors: [
            color('Wine Red', '#722F37', '/red4.webp'),
            color('Cherry Red', '#DE3163', '/red5.webp')
        ]
    },

    // Additional White Collection
    {
        id: '12',
        name: 'Angelic Dreams Dress',
        slug: 'angelic-dreams-dress',
        price: 155,
        originalPrice: undefined,
        image: '/white6.webp',
        occasion: 'Christening',
        description: 'Sweet white dress with delicate embroidery and ribbon ties. A beautiful choice for christenings and first communions.',
        isNew: false,
        isBestseller: false,
        sizes: ['12-18M', '18-24M', '2T', '3T'],
        colors: [
            color('Angel White', '#FFFFFF', '/white6.webp')
        ]
    },
    {
        id: '13',
        name: 'Elegant Pearl Flower Girl',
        slug: 'elegant-pearl-flower-girl',
        price: 185,
        originalPrice: 225,
        image: '/white7.webp',
        occasion: 'Wedding',
        description: 'Sophisticated white dress with pearl beading and tulle overlay. Your flower girl will look picture-perfect.',
        isNew: false,
        isBestseller: true,
        sizes: ['2T', '3T', '4T', '5T', '6T'],
        colors: [
            color('Pearl White', '#F0EAD6', '/white7.webp')
        ]
    },

    // More Pink Collection  
    {
        id: '14',
        name: 'Ballerina Birthday Dream',
        slug: 'ballerina-birthday-dream',
        price: 139,
        originalPrice: undefined,
        image: '/pink6.webp',
        occasion: 'Birthday',
        description: 'Charming pink ballerina-style dress with tutu layers and bow details. Perfect for dance-themed birthday parties.',
        isNew: true,
        isBestseller: false,
        sizes: ['2T', '3T', '4T', '5T'],
        colors: [
            color('Tutu Pink', '#FFB6D9', '/pink6.webp'),
            color('Ballet Rose', '#FF69B4', '/pink7.webp')
        ]
    },
    {
        id: '15',
        name: 'Little Princess Castle Gown',
        slug: 'little-princess-castle-gown',
        price: 169,
        originalPrice: undefined,
        image: '/pink8.webp',
        occasion: 'Party',
        description: 'Magnificent pink castle-worthy gown with sparkles and layers. For the little princess who deserves to feel magical.',
        isNew: false,
        isBestseller: true,
        sizes: ['2T', '3T', '4T', '5T', '6T'],
        colors: [
            color('Castle Pink', '#FFC0CB', '/pink8.webp')
        ]
    }
];

export const categories = [
    'Birthday', 'Wedding', 'Party', 'Holiday', 'Christening'
];

export const settings = {
    currency: 'SAR',
    siteName: 'Mamilo',
    siteDescription: 'Exquisite party dresses and occasion wear for little princesses and special moments.'
};
