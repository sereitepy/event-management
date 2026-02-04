import { EventDetailType } from '@/types/event'

export const mockEventDetails: EventDetailType[] = [
  {
    id: '2234',
    title: 'Tech Summit 2026',
    description: `Join over 5,000 developers, innovators, and industry leaders for two days of inspiration, networking, and learning at the heart of San Francisco. Tech Summit 2024 is dedicated to exploring the future of Artificial Intelligence, blockchain, sustainable computing, and Web3 technologies.

Whether you are a seasoned CTO or a junior developer, you will find value in our curated tracks featuring hands-on workshops, keynote speeches from tech giants, and intimate fireside chats. Don't miss the opportunity to connect with the minds shaping our digital future.

This year's summit features exclusive access to breakthrough technologies, networking opportunities with leading VCs and startup founders, and hands-on labs where you can experiment with cutting-edge tools and frameworks.`,
    start_date: '2026-10-24T19:00:00Z',
    end_date: '2026-10-26T19:00:00Z',
    start_time: '2026-10-24T09:00:00Z',
    end_time: '2026-10-24T12:00:00Z',
    image:
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbmNlcnR8ZW58MHx8MHx8fDA%3D',
    location: 'Koh Pich, Phnom Penh',
    google_map_link:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7818.149293916423!2d104.94034548010765!3d11.546502970374318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310956d330da8527%3A0x7eff3ca8d12ecc0f!2sKoh%20Pich!5e0!3m2!1sen!2skh!4v1770108763292!5m2!1sen!2skh',
    price: 29900, // $299.00
    currency: 'USD',
    category: 'Tech',

    speakers: [
      {
        id: 'sp1',
        name: 'David Chen',
        title: 'CEO',
        company: 'FutureTech',
        image: 'https://randomuser.me/api/portraits/men/1.jpg',
        bio: 'David is a pioneer in AI research with over 15 years of experience leading innovation at top tech companies.',
      },
      {
        id: 'sp2',
        name: 'Sarah Miller',
        title: 'Head of AI',
        company: 'Nexus',
        image: 'https://randomuser.me/api/portraits/women/2.jpg',
        bio: 'Sarah leads AI development at Nexus and has published over 50 papers on machine learning.',
      },
      {
        id: 'sp3',
        name: 'James Wilson',
        title: 'VP Engineering',
        company: 'CloudCo',
        image: 'https://randomuser.me/api/portraits/men/3.jpg',
        bio: 'James specializes in cloud infrastructure and has built systems serving millions of users.',
      },
      {
        id: 'sp4',
        name: 'Emily Zhang',
        title: 'Founder',
        company: 'GreenWeb',
        image: 'https://randomuser.me/api/portraits/women/4.jpg',
        bio: 'Emily founded GreenWeb to make sustainable computing accessible to startups worldwide.',
      },
    ],

    schedule: [
      {
        id: 'sch1',
        time: '09:00 AM',
        title: 'Registration & Breakfast',
        description: 'Networking and light refreshments served',
        location: 'Main Lobby',
      },
      {
        id: 'sch2',
        time: '10:00 AM',
        title: 'Opening Keynote: The Age of AI',
        description: 'David Chen, CEO of FutureTech',
        location: 'Grand Hall',
        speaker: 'David Chen',
      },
      {
        id: 'sch3',
        time: '11:30 AM',
        title: 'Workshop: Building Sustainable Clouds',
        description: 'Practical session on green computing',
        location: 'Room 204',
      },
      {
        id: 'sch4',
        time: '13:00 PM',
        title: 'Networking Lunch',
        description: 'Connect with fellow attendees',
        location: 'Terrace Level',
      },
      {
        id: 'sch5',
        time: '14:30 PM',
        title: 'Panel: Future of Web3',
        description: 'Industry leaders discuss decentralization',
        location: 'Main Stage',
      },
      {
        id: 'sch6',
        time: '16:00 PM',
        title: 'Breakout Sessions',
        description: 'Various Rooms • Choose from 8 specialized tracks',
        location: 'Various Rooms',
      },
      {
        id: 'sch7',
        time: '17:30 PM',
        title: 'Closing Remarks & Networking',
        description: 'Day 1 wrap-up and evening reception',
        location: 'Grand Hall',
      },
    ],
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-10-20T14:30:00Z',
    // ticket_types: [
    //   {
    //     id: 'tkt1',
    //     name: 'General Admission',
    //     price: 29900, // $299.00
    //     description: 'Full conference access',
    //     features: [
    //       'Access to all keynotes and sessions',
    //       'Conference materials and swag bag',
    //       'Lunch and refreshments',
    //       'Networking events',
    //       'Certificate of attendance',
    //     ],
    //     available: true,
    //     quantity_remaining: 12,
    //   },
    //   {
    //     id: 'tkt2',
    //     name: 'VIP Pass',
    //     price: 59900, // $599.00
    //     description: 'Access + Afterparty + Swag',
    //     features: [
    //       'All General Admission benefits',
    //       'VIP lounge access',
    //       'Priority seating',
    //       'Exclusive evening afterparty',
    //       'One-on-one speaker meetings',
    //       'Premium swag package',
    //       'Early access to recordings',
    //     ],
    //     available: true,
    //     quantity_remaining: 8,
    //   },
    //   {
    //     id: 'tkt3',
    //     name: 'Early Bird',
    //     price: 24900, // $249.00
    //     description: 'Limited time offer',
    //     features: [
    //       'Same as General Admission',
    //       'Save $50 with early registration',
    //     ],
    //     available: false, // Sold out
    //   },
    // ],

    // venue: {
    //   name: 'Moscone Center',
    //   address: '747 Howard St',
    //   city: 'San Francisco',
    //   state: 'CA',
    //   country: 'United States',
    //   postal_code: '94103',
    //   coordinates: {
    //     lat: 37.784,
    //     lng: -122.4015,
    //   },
    // },

    // organizer: {
    //   name: 'EventManager Inc.',
    //   email: 'support@eventmanager.com',
    //   phone: '+1 (888) 123-4567',
    //   website: 'https://eventmanager.com',
    //   logo: '/logo.png',
    // },

    // capacity: 5000,
    // attendees_count: 4988,

    // tags: [
    //   'Technology',
    //   'AI',
    //   'Blockchain',
    //   'Web3',
    //   'Networking',
    //   'Professional Development',
    // ],

    // requirements: [
    //   'Valid government-issued ID required',
    //   'Proof of ticket purchase (digital or printed)',
    //   'Professional attire recommended',
    //   'Laptop recommended for workshops',
    // ],

    // amenities: [
    //   'Free WiFi throughout venue',
    //   'Charging stations available',
    //   'Wheelchair accessible',
    //   'Gender-neutral restrooms',
    //   'Coat check available',
    //   'On-site medical support',
    //   'Coffee and refreshments',
    //   'Parking available ($25/day)',
    // ],

    // faq: [
    //   {
    //     question: "Can I get a refund if I can't attend?",
    //     answer:
    //       'Full refunds are available up to 30 days before the event. After that, tickets are non-refundable but transferable to another person.',
    //   },
    //   {
    //     question: 'Will sessions be recorded?',
    //     answer:
    //       'Yes, all keynotes and main sessions will be recorded and made available to ticket holders within 48 hours after the event.',
    //   },
    //   {
    //     question: 'Is there a dress code?',
    //     answer:
    //       'Business casual attire is recommended, but feel free to dress comfortably. Many attendees wear company t-shirts and jeans.',
    //   },
    //   {
    //     question: 'Can I upgrade my ticket after purchase?',
    //     answer:
    //       'Yes, you can upgrade from General Admission to VIP Pass by contacting our support team and paying the difference.',
    //   },
    // ],

    // social_links: {
    //   twitter: 'https://twitter.com/techsummit2024',
    //   linkedin: 'https://linkedin.com/company/techsummit',
    //   instagram: 'https://instagram.com/techsummit2024',
    //   facebook: 'https://facebook.com/techsummit2024',
    // },

    // status: 'upcoming',
    // is_featured: true,
  },
]
