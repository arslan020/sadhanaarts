export type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Learn",
    href: "/learn",
    children: [
      { label: "Workshops & Shibirs", href: "/learn/workshops" },
      { label: "Masterclasses", href: "/learn/masterclasses" },
      { label: "Education & Schools", href: "/learn/education" },
    ],
  },
  {
    label: "Parampara",
    href: "/parampara",
    children: [
      { label: "About Parampara", href: "/parampara" },
      { label: "Parampara 2026", href: "/parampara/2026" },
      { label: "Parampara 2025", href: "/parampara/2025" },
    ],
  },
  { label: "Artists", href: "/artists" },
  { label: "What’s New", href: "/news" },
  { label: "Support Us", href: "/support" },
  { label: "Contact", href: "/contact" },
];

export type Cta = {
  label: string;
  href: string;
};

export type WorkArea = {
  title: string;
  description: string;
};

export type Artist = {
  name: string;
  role: string;
  category: "master" | "emerging";
  bio: string;
  photoUrl: string;
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
};

export type NewsArticle = {
  title: string;
  slug: string;
  date: string;
  category: string;
  excerpt: string;
  body: string[];
  photoUrl: string;
};

export type SiteContent = {
  site: {
    name: string;
    brandStatement: string;
    tagline: string;
    website: string;
  };
  home: {
    heading: string;
    lead: string;
    paragraphs: string[];
    closingHeading: string;
    closingParagraphs: string[];
    ctas: Cta[];
    heroImage: string;
  };
  about: {
    heading: string;
    lead: string;
    paragraphs: string[];
    whatWeDoHeading: string;
    whatWeDoIntro: string;
    areas: WorkArea[];
    whyHeading: string;
    whyParagraphs: string[];
    photoUrl: string;
    teamHeading: string;
    teamIntro: string;
    teamMembers: TeamMember[];
  };
  workshops: {
    heading: string;
    lead: string;
    paragraphs: string[];
    shibirHeading: string;
    shibirParagraphs: string[];
    beyondHeading: string;
    beyondParagraphs: string[];
    ctas: Cta[];
    photoUrl: string;
  };
  masterclasses: {
    heading: string;
    lead: string;
    paragraphs: string[];
  };
  education: {
    heading: string;
    lead: string;
    paragraphs: string[];
  };
  parampara: {
    heading: string;
    lead: string;
    paragraphs: string[];
    ctas: Cta[];
    photoUrl: string;
  };
  parampara2025: {
    heading: string;
    subtitle: string;
    paragraphs: string[];
    legacyHeading: string;
    legacyParagraphs: string[];
    lineup: string;
    venue: string;
    ctas: Cta[];
    photoUrl: string;
  };
  parampara2026: {
    heading: string;
    subtitle: string;
    paragraphs: string[];
    featured: WorkArea[];
    programmeNotes: string[];
    ctas: Cta[];
    photoUrl: string;
  };
  artists: {
    heading: string;
    lead: string;
    paragraphs: string[];
    mastersHeading: string;
    mastersIntro: string;
    emergingHeading: string;
    emergingIntro: string;
    passingHeading: string;
    passingParagraphs: string[];
    people: Artist[];
  };
  news: {
    heading: string;
    intro: string;
    categories: string[];
    articles: NewsArticle[];
  };
  support: {
    heading: string;
    lead: string;
    paragraphs: string[];
    journeyHeading: string;
    journeyParagraphs: string[];
    legacyHeading: string;
    legacyItems: string[];
    ctas: Cta[];
    payItForward: {
      heading: string;
      paragraphs: string[];
      photoUrl: string;
      photoUrls: string[];
      videoUrl: string;
      cta: Cta;
    };
  };
  contact: {
    heading: string;
    intro: string;
    organisation: string;
    addressLines: string[];
    email: string;
    emails: string[];
    enquiryCategories: string[];
    instagram: string;
    facebook: string;
  };
};

export const DEFAULT_CONTENT: SiteContent = {
  site: {
    name: "Sadhana Arts",
    brandStatement: "Preserving a living tradition. Building a global platform.",
    tagline: "Indian classical music, taught through lineage, presented at the highest level and carried forward for generations to come.",
    website: "https://sadhana-arts.org",
  },
  home: {
    heading: "Preserving a Living Tradition. Building a Global Platform.",
    lead: "Indian classical music, taught through lineage, presented at the highest level and carried forward for generations to come.",
    paragraphs: [
      "Sadhana Arts is a UK-based cultural organisation dedicated to preserving, developing and promoting Indian classical music.",
      "Since 2003, our work has been rooted in education, live performance and the continuation of an extraordinary musical tradition. We bring together world-leading maestros, emerging artists, students and audiences, creating a bridge between heritage and the future.",
      "At the heart of everything we do is Parampara: the passing of knowledge, discipline, values and artistic tradition from Guru to student, and from one generation to the next.",
    ],
    closingHeading: "Learn. Experience. Perform. Preserve.",
    closingParagraphs: [
      "Through Shibirs, workshops, masterclasses, education and live performance, we create opportunities to experience Indian classical music directly from those who have dedicated their lives to it.",
      "Our ambition is not simply to present great music.",
      "It is to help ensure that the knowledge behind it continues to live.",
    ],
    ctas: [
      { label: "Discover Sadhana Arts", href: "/about" },
      { label: "Explore Parampara", href: "/parampara" },
      { label: "Support Our Work", href: "/support" },
    ],
    heroImage: "/images/home-feature.jpg",
  },
  about: {
    heading: "Keeping Indian Classical Music Alive, and Thriving",
    lead: "Sadhana Arts exists to preserve, develop and promote the rich tradition of Indian classical music.",
    paragraphs: [
      "We believe a living tradition must be more than celebrated. It must be learnt, practised, performed, shared and passed forward.",
      "That means creating opportunities for students to learn directly from masters, supporting emerging musicians as they develop their artistry, and giving audiences the opportunity to experience Indian classical music at its highest level.",
    ],
    whatWeDoHeading: "What We Do",
    whatWeDoIntro: "Our work spans four connected areas:",
    areas: [
      {
        title: "Education & Community",
        description:
          "Introducing tabla, rhythm, melody and Indian classical music to young people, schools and communities, supporting creativity, focus, confidence and cultural understanding.",
      },
      {
        title: "Workshops, Masterclasses & Shibirs",
        description:
          "Creating intensive opportunities for students to learn directly from internationally respected maestros and teachers, complementing regular study with immersive learning.",
      },
      {
        title: "Artist Development",
        description:
          "Providing emerging musicians with opportunities to learn, perform, develop confidence and ultimately share platforms with established masters.",
      },
      {
        title: "Live Performance",
        description:
          "Producing high-quality concerts, including our flagship Parampara series, bringing internationally respected artists to UK stages while creating meaningful pathways for the next generation.",
      },
    ],
    whyHeading: "Why It Matters",
    whyParagraphs: [
      "Indian classical music carries centuries of scholarship, creativity, devotion and oral transmission.",
      "Learning rhythm develops counting, timing, pattern recognition and structured thinking. Dedicated practice develops memory, patience, concentration and confidence. Group learning teaches students to listen, respond and work towards a shared standard of excellence.",
      "But there is something deeper.",
      "In an increasingly digital world, the relationship between teacher and student remains profoundly human. A maestro passes on far more than notes or compositions: judgement, timing, touch, discipline, character and lived experience are transmitted over years of learning.",
      "This is the tradition Sadhana Arts exists to protect.",
    ],
    photoUrl: "",
    teamHeading: "Meet the Team",
    teamIntro: "The people who carry the work of Sadhana Arts, day to day and year to year.",
    teamMembers: [
      {
        name: "Amritpal Sidhu",
        role: "Team member",
        bio: "A short biography will appear here. Add the photograph and text in the admin.",
        photoUrl: "",
      },
      {
        name: "Jaswinder Hanspal",
        role: "Team member",
        bio: "A short biography will appear here. Add the photograph and text in the admin.",
        photoUrl: "",
      },
    ],
  },
  workshops: {
    heading: "Learning at the Source",
    lead: "Indian classical music has traditionally been passed from Guru to student through close observation, repetition, discipline and time.",
    paragraphs: [
      "Our workshops, masterclasses and Shibirs create opportunities for students to experience that tradition directly.",
      "Rather than replacing regular learning, these intensive programmes deepen it, allowing students to spend concentrated time studying repertoire, technique, interpretation, rhythm and the wider discipline of the art form.",
      "Sadhana Arts brings internationally respected artists and maestros into this learning environment, giving students access to knowledge that has itself been passed through generations.",
    ],
    shibirHeading: "The Sadhana Arts Shibir",
    shibirParagraphs: [
      "Our Shibirs provide immersive periods of study for musicians at different stages of their development.",
      "Students learn together, practise together and experience the discipline and collective energy that comes from concentrated study.",
      "Our programme has included intensive tabla Shibirs led by Pt. Yogesh Samsi, giving students direct exposure to authentic teaching and disciplined practice.",
    ],
    beyondHeading: "Beyond the Shibir",
    beyondParagraphs: [
      "Learning does not end when the workshop finishes.",
      "Our aim is to build an ongoing development pathway through masterclasses, follow-up learning, mentorship and performance opportunities, helping students turn inspiration into sustained development.",
    ],
    ctas: [
      { label: "View Upcoming Workshops", href: "/news" },
      { label: "Register Your Interest", href: "/contact" },
    ],
    photoUrl: "",
  },
  masterclasses: {
    heading: "Masterclasses",
    lead: "Intensive study with internationally respected maestros and teachers, complementary to regular learning, and rooted in Parampara.",
    paragraphs: [
      "Masterclasses give students concentrated time with artists who have dedicated their lives to Indian classical music.",
      "They are designed to deepen repertoire, technique, interpretation and rhythm, while also transmitting the discipline, judgement and values that cannot be learned from notation alone.",
      "Whether you are an emerging musician or a dedicated student, a masterclass is an opportunity to learn at the source, and to carry that knowledge back into daily practice.",
    ],
  },
  education: {
    heading: "Education & Schools",
    lead: "Introducing tabla, rhythm, melody and Indian classical music to young people, schools and communities.",
    paragraphs: [
      "Sadhana Arts supports creativity, focus, confidence and cultural understanding through education programmes for young people, schools and local communities.",
      "Learning rhythm develops counting, timing, pattern recognition and structured thinking. Dedicated practice develops memory, patience, concentration and confidence. Group learning teaches students to listen, respond and work towards a shared standard of excellence.",
      "Our education work sits alongside workshops, Shibirs and performance, so that young people who discover the tradition have a pathway to continue.",
    ],
  },
  parampara: {
    heading: "Parampara: Keeping the Chain Alive",
    lead: "Parampara means the passing of knowledge from one generation to the next.",
    paragraphs: [
      "Within Indian classical music, that inheritance carries far more than compositions and technique. It carries interpretation, discipline, history, values and the individual wisdom of generations of great teachers.",
      "Our annual Parampara programme is an expression of that philosophy.",
      "It brings together internationally respected masters of Indian classical music with emerging musicians and students, connecting those carrying the tradition today with those who will carry it tomorrow.",
      "Parampara is therefore more than a concert.",
      "It is continuity.",
      "It is an opportunity to hear extraordinary artistry while understanding the lineage, learning and human relationships that made that artistry possible. This philosophy is also central to the supporting letter, which describes Parampara as representing heritage, continuity and an opportunity for the next generation to encounter the tradition at its highest level.",
    ],
    ctas: [
      { label: "Parampara 2025", href: "/parampara/2025" },
      { label: "Parampara 2026", href: "/parampara/2026" },
    ],
    photoUrl: "",
  },
  parampara2025: {
    heading: "Parampara 2025",
    subtitle: "A Tribute to Ustad Zakir Hussain",
    paragraphs: [
      "In 2025, Sadhana Arts presented Parampara: A Tribute to Ustad Zakir Hussain, honouring the legacy of one of Indian classical music's most celebrated figures.",
      "The programme reflected the very principle from which Parampara takes its name: that a musical legacy lives not only through memory, but through the students, musicians, compositions, traditions and relationships that carry it forward.",
      "Parampara 2025 formed part of Sadhana Arts' growing platform connecting world-class artistry with education and the development of future generations.",
    ],
    legacyHeading: "The Legacy Continues",
    legacyParagraphs: [
      "Every generation inherits something from the one before it.",
      "Our responsibility is to honour that inheritance by ensuring that it continues to be heard, learnt and passed forward.",
    ],
    lineup: "",
    venue: "",
    ctas: [
      { label: "View Gallery", href: "/news" },
      { label: "Watch Highlights", href: "/news" },
    ],
    photoUrl: "",
  },
  parampara2026: {
    heading: "Parampara 2026",
    subtitle: "The Tradition Continues",
    paragraphs: [
      "Parampara returned in 2026, continuing Sadhana Arts' commitment to presenting Indian classical music at its highest level while connecting performance with lineage and learning.",
      "The 2026 platform featured internationally acclaimed bansuri maestro Pt. Rakesh Chaurasia alongside tabla maestro Pt. Yogesh Samsi.",
      "But Parampara is deliberately about more than internationally recognised names.",
      "At the heart of the programme is the relationship between generations, masters, established musicians, emerging artists and students occupying the same artistic space.",
      "It reflects what Sadhana Arts is ultimately trying to build: a living platform where excellence is experienced, knowledge is transmitted and the next generation is given something meaningful to aspire towards.",
    ],
    featured: [
      {
        title: "Pt. Rakesh Chaurasia",
        description: "Internationally acclaimed bansuri maestro.",
      },
      {
        title: "Pt. Yogesh Samsi",
        description: "Tabla maestro.",
      },
      {
        title: "Upneet Singh & Harkiran Sahota",
        description: "Tabla duet. Disciples of Pt. Sanju Sahai.",
      },
      {
        title: "Avtar Singh",
        description: "Nagma on Dilruba.",
      },
    ],
    programmeNotes: [
      "Full venue, photography, programme details and video can be added here once available.",
    ],
    ctas: [
      { label: "View Parampara 2026", href: "/parampara/2026" },
      { label: "Gallery", href: "/news" },
      { label: "Meet the Artists", href: "/artists" },
    ],
    photoUrl: "",
  },
  artists: {
    heading: "The Artists Who Carry the Tradition",
    lead: "At the centre of Sadhana Arts are the musicians.",
    paragraphs: [
      "We work with internationally recognised maestros, established performers and emerging artists who represent the depth, discipline and diversity of Indian classical music.",
      "Our platform is designed not simply to present great artists on stage, but to bring their knowledge into the wider Sadhana Arts journey through performance, teaching, workshops, Shibirs, mentorship and artistic development.",
    ],
    mastersHeading: "Masters & Maestros",
    mastersIntro:
      "Artists who have dedicated decades to their craft and who represent some of the highest standards within Indian classical music.",
    emergingHeading: "Emerging Artists",
    emergingIntro:
      "The next generation of musicians developing their artistry, building performance experience and carrying their respective traditions forward.",
    passingHeading: "Passing It Forward",
    passingParagraphs: [
      "The connection between these generations is fundamental to Sadhana Arts.",
      "When emerging musicians can learn directly from masters, and eventually stand on stages alongside them, Parampara becomes something tangible rather than simply an idea.",
    ],
    people: [
      {
        name: "Pt. Yogesh Samsi",
        role: "Tabla maestro",
        category: "master",
        bio: "Internationally respected tabla maestro. Has led intensive tabla Shibirs for Sadhana Arts and appeared as a featured artist in Parampara 2026.",
        photoUrl: "",
      },
      {
        name: "Pt. Rakesh Chaurasia",
        role: "Bansuri maestro",
        category: "master",
        bio: "Internationally acclaimed bansuri maestro and a featured artist of Parampara 2026.",
        photoUrl: "",
      },
      {
        name: "Upneet Singh",
        role: "Tabla · Disciple of Pt. Sanju Sahai",
        category: "emerging",
        bio: "Emerging tabla artist. Performed in tabla duet at Parampara 2026.",
        photoUrl: "",
      },
      {
        name: "Harkiran Sahota",
        role: "Tabla · Disciple of Pt. Sanju Sahai",
        category: "emerging",
        bio: "Emerging tabla artist. Performed in tabla duet at Parampara 2026.",
        photoUrl: "",
      },
      {
        name: "Avtar Singh",
        role: "Dilruba",
        category: "emerging",
        bio: "Provided Nagma on Dilruba for the Parampara 2026 tabla duet.",
        photoUrl: "",
      },
    ],
  },
  news: {
    heading: "What’s New at Sadhana Arts",
    intro:
      "Follow the latest from Sadhana Arts, from forthcoming concerts and artist announcements to Shibirs, workshops, education programmes and opportunities to get involved.",
    categories: ["Events", "Workshops & Shibirs", "Artist News", "Education", "Parampara", "Community", "Announcements"],
    articles: [
      {
        title: "Parampara 2026: The Tradition Continues",
        slug: "parampara-2026",
        date: "2026-01-15",
        category: "Parampara",
        excerpt:
          "Parampara returns with Pt. Rakesh Chaurasia and Pt. Yogesh Samsi, connecting world-class artistry with lineage and learning.",
        body: [
          "Parampara returned in 2026, continuing Sadhana Arts' commitment to presenting Indian classical music at its highest level while connecting performance with lineage and learning.",
          "The 2026 platform featured internationally acclaimed bansuri maestro Pt. Rakesh Chaurasia alongside tabla maestro Pt. Yogesh Samsi, alongside emerging artists occupying the same artistic space.",
        ],
        photoUrl: "",
      },
      {
        title: "Parampara 2025: A Tribute to Ustad Zakir Hussain",
        slug: "parampara-2025",
        date: "2025-09-01",
        category: "Parampara",
        excerpt:
          "Honouring the legacy of one of Indian classical music's most celebrated figures, and the students, musicians and traditions that carry it forward.",
        body: [
          "In 2025, Sadhana Arts presented Parampara: A Tribute to Ustad Zakir Hussain, honouring the legacy of one of Indian classical music's most celebrated figures.",
          "The programme reflected the principle from which Parampara takes its name: that a musical legacy lives not only through memory, but through the students, musicians, compositions, traditions and relationships that carry it forward.",
        ],
        photoUrl: "",
      },
      {
        title: "Tabla Shibir with Pt. Yogesh Samsi",
        slug: "tabla-shibir-yogesh-samsi",
        date: "2025-06-01",
        category: "Workshops & Shibirs",
        excerpt:
          "An immersive period of study giving students direct exposure to authentic teaching and disciplined practice.",
        body: [
          "Our programme has included intensive tabla Shibirs led by Pt. Yogesh Samsi, giving students direct exposure to authentic teaching and disciplined practice.",
          "Students learn together, practise together and experience the discipline and collective energy that comes from concentrated study.",
        ],
        photoUrl: "",
      },
    ],
  },
  support: {
    heading: "Help Us Carry the Tradition Forward",
    lead: "For generations, Indian classical music has survived because people understood that great traditions cannot simply be admired.",
    paragraphs: [
      "They must be actively supported, taught and preserved.",
      "Sadhana Arts is building a long-term platform to ensure that this extraordinary tradition continues not only to survive, but to grow.",
      "Support enables us to create greater access to world-leading maestros and teachers, nurture emerging talent, expand workshops and Shibirs, develop education within schools and communities, create scholarships and bursaries, and build a sustainable performance platform for Indian classical music.",
    ],
    journeyHeading: "Become Part of the Journey",
    journeyParagraphs: [
      "We welcome support from individuals, families, philanthropists, businesses, trusts, foundations and cultural partners who share our belief in preserving and passing forward this tradition.",
      "There are many ways to contribute, through donations, programme funding, patronage, partnerships, introductions or supporting specific educational and cultural initiatives.",
      "Supporters can also develop a closer relationship with Sadhana Arts through selected events, programmes, artists and the communities their contribution helps us reach.",
    ],
    legacyHeading: "Above All, This Is About Legacy.",
    legacyItems: [
      "Helping a student gain knowledge and opportunity.",
      "Giving a maestro the opportunity to pass on a lifetime of learning.",
      "Creating a stage for an emerging musician.",
      "Bringing families and communities together through music.",
      "And ensuring that an extraordinary artistic tradition remains alive for generations to come.",
    ],
    ctas: [
      { label: "Support Sadhana Arts", href: "/contact" },
      { label: "Become a Partner", href: "/contact" },
      { label: "Talk to Us", href: "/contact" },
    ],
    payItForward: {
      heading: "Pay it Forward",
      paragraphs: [
        "A living tradition continues because someone chooses to pass it on.",
        "Pay it Forward is a way to give a student, a family or a community the chance to learn, experience and carry Indian classical music onward. Your gift can support workshops, Shibirs, education, artist development and the wider Sadhana Arts programme.",
      ],
      photoUrl: "",
      photoUrls: [],
      videoUrl: "",
      cta: { label: "Donate", href: "/contact?type=Donate" },
    },
  },
  contact: {
    heading: "Connect With Sadhana Arts",
    intro:
      "Whether you would like to attend an event, participate in a Shibir, work with us, support our programmes or simply learn more about Sadhana Arts, we would be delighted to hear from you.",
    organisation: "Sadhana Arts CIC",
    addressLines: ["78 High Street", "Newport Pagnell", "Milton Keynes", "MK16 8AQ", "United Kingdom"],
    email: "info@sadhana-arts.org",
    emails: ["info@sadhana-arts.org", "amritpal.sidhu@sadhana-arts.org", "jaswinder.hanspal@sadhana-arts.org"],
    enquiryCategories: [
      "General Enquiries",
      "Donate",
      "Workshops & Shibirs",
      "Artist & Performance Enquiries",
      "Partnerships & Funding",
      "Schools & Education",
      "Press & Media",
    ],
    instagram: "#",
    facebook: "#",
  },
};

export function articleBySlug(content: SiteContent, slug: string): NewsArticle | undefined {
  return content.news.articles.find((article) => article.slug === slug);
}

export function enquiryCategories(contact: SiteContent["contact"]): string[] {
  const list = [...(contact.enquiryCategories || [])].map((value) => value.trim()).filter(Boolean);
  if (!list.some((category) => category.toLowerCase() === "donate")) {
    list.splice(Math.min(1, list.length), 0, "Donate");
  }
  return list;
}

export function contactEmails(contact: SiteContent["contact"]): string[] {
  const listed = (contact.emails || []).map((value) => value.trim().toLowerCase()).filter(Boolean);
  const fallback = contact.email?.trim() ? [contact.email.trim().toLowerCase()] : [];
  const merged = ["info@sadhana-arts.org", ...listed, ...fallback];
  const seen = new Set<string>();
  return merged.filter((address) => {
    if (address.endsWith("@sadhanaarts.com")) return false;
    if (seen.has(address)) return false;
    seen.add(address);
    return true;
  });
}

export function displayWebsite(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function payItForwardPhotos(payItForward: SiteContent["support"]["payItForward"]): string[] {
  const listed = [payItForward?.photoUrl, ...(payItForward?.photoUrls || [])]
    .map((value) => (value || "").trim())
    .filter(Boolean);
  const seen = new Set<string>();
  return listed.filter((src) => {
    if (seen.has(src)) return false;
    seen.add(src);
    return true;
  });
}
