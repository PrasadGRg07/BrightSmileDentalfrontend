export const doctors = [
  {
    id: "dr-sachin-pradhan",
    name: "Dr. Sachin Pradhan",
    specialty: "General & Cosmetic Dentistry",
    experience: "12+ years",
    education: "BDS, BPKIHS",
    languages: ["Nepali", "English", "Hindi"],
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    shortBio:
      "Founder and lead dental surgeon at Bright Smile Dental with a passion for cosmetic and family dentistry.",
    bio: "Dr. Sachin Pradhan is the founder of Bright Smile Dental Pvt Ltd. He completed his Bachelor of Dental Surgery from BPKIHS and has over a decade of hands-on experience across general and cosmetic dentistry. Known for his gentle approach and artistic eye, he has helped thousands of patients achieve confident smiles through whitening, veneers, and full smile makeovers. He regularly attends international workshops to bring the latest techniques to his practice.",
    services: [
      "Teeth Whitening",
      "Veneers",
      "Smile Makeovers",
      "Routine Checkups",
      "Dental Cleaning",
    ],
  },
  {
    id: "dr-sushmita-shrestha",
    name: "Dr. Sushmita Shrestha",
    specialty: "Orthodontist",
    experience: "8+ years",
    education: "BDS, MDS (Orthodontics)",
    languages: ["Nepali", "English"],
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    shortBio:
      "Specialist in braces and clear aligners, helping both children and adults achieve straight, healthy smiles.",
    bio: "Dr. Sushmita Shrestha is an orthodontist specializing in correcting misaligned teeth and bite issues. After earning her MDS in Orthodontics, she practiced at leading dental hospitals before joining Bright Smile Dental. She offers metal braces, ceramic braces, and clear aligners, creating personalized treatment plans that fit each patient's lifestyle and budget. Her friendly, patient manner makes her especially popular with younger patients and their families.",
    services: [
      "Metal Braces",
      "Ceramic Braces",
      "Clear Aligners",
      "Bite Correction",
      "Retainers",
    ],
  },
  {
    id: "dr-ramesh-karki",
    name: "Dr. Ramesh Karki",
    specialty: "Oral & Maxillofacial Surgeon",
    experience: "10+ years",
    education: "BDS, MDS (Oral Surgery)",
    languages: ["Nepali", "English"],
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    shortBio:
      "Skilled oral surgeon for wisdom teeth removal, extractions, and complex dental surgeries.",
    bio: "Dr. Ramesh Karki is an oral and maxillofacial surgeon with extensive experience in surgical dental care. He handles everything from routine tooth extractions to complex impacted wisdom tooth surgeries and dental implant placements. His calm demeanour and precise technique help even anxious patients feel at ease. He believes in clear communication and always explains procedures thoroughly before treatment begins.",
    services: [
      "Wisdom Tooth Removal",
      "Tooth Extractions",
      "Dental Implants",
      "Impacted Tooth Surgery",
    ],
  },
  {
    id: "dr-anju-maharjan",
    name: "Dr. Anju Maharjan",
    specialty: "Pediatric Dentistry",
    experience: "6+ years",
    education: "BDS, MDS (Pedodontics)",
    languages: ["Nepali", "English", "Newari"],
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    shortBio:
      "Dedicated to making dental visits fun and stress-free for children of all ages.",
    bio: "Dr. Anju Maharjan is our pediatric dentist, dedicated to children's oral health. She believes that early, positive dental experiences build lifelong healthy habits. Her warm and playful approach turns dental visits into a fun adventure for kids, while her gentle techniques and patience put parents at ease. She specializes in cavity prevention, fluoride treatments, and child-friendly care that grows with your child.",
    services: [
      "Children's Checkups",
      "Cavity Prevention",
      "Fluoride Treatment",
      "Sealants",
      "Kids-Friendly Dental Care",
    ],
  },
];

export function getDoctorById(id) {
  return doctors.find((d) => d.id === id);
}