import {
  SonOfParish,
  ParishVocation,
  ReligiousServantProfile
} from "@/types";

/**
 * Parish Vocation Profiles - Sons of the Soil
 * Source: SONS OF SOIL - Sheet1.pdf (excluding Rev. Bro. A. Charles)
 */
export const parishVocations: ParishVocation[] = [
  {
    id: "rev-fr-i-andrew",
    name: "Rev.Fr.i.Andrew",
    title: "Rev. Fr.",
    type: "Priestly Vocation",
    vocation: "Priest",
    dateOfBirth: "29.11.1962",
    dateOfOrdination: "22 May 1999",
    ordained: "22 May 1999",
    ordinationYear: "1999",
    feastDay: "30 Nov",
    currentService:
      "Parish Priest, Velankanni Arockia Annai Church, Cheran-Ma Nagar",
    diocese: "Diocese of Coimbatore",
    photo: "/images/sons_of_soil/50.Rev.Fr.I.Andrew.jpg",
    photoUrl: "/images/sons_of_soil/50.Rev.Fr.I.Andrew.jpg",
    order: 1,
    published: true
  },
  {
    id: "rev-fr-j-patrick-iruthayaraj",
    name: "Rev.Fr j.Patrick Iruthayaraj",
    title: "Rev. Fr.",
    type: "Priestly Vocation",
    vocation: "Priest",
    dateOfBirth: "17.10.1971",
    dateOfOrdination: "5 May 2002",
    ordained: "5 May 2002",
    ordinationYear: "2002",
    feastDay: "March 17",
    currentService: "Parish Priest, St. Joseph's Church, Ondipudur",
    diocese: "Diocese of Coimbatore",
    photo: "/images/sons_of_soil/51.Rev. Fr. J. Patrick Iruthayaraj.jpg",
    photoUrl: "/images/sons_of_soil/51.Rev. Fr. J. Patrick Iruthayaraj.jpg",
    order: 2,
    published: true
  },
  {
    id: "rev-fr-g-sebastin-durai",
    name: "Rev.Fr.G.Sebastin Durai",
    title: "Rev. Fr.",
    type: "Priestly Vocation",
    vocation: "Priest",
    dateOfBirth: "05.03.1975",
    dateOfOrdination: "2 May 2004",
    ordained: "2 May 2004",
    ordinationYear: "2004",
    feastDay: "January-20",
    currentService: "Parish Priest, Holy Trinity Church, Sidco",
    diocese: "Diocese of Coimbatore",
    photo: "/images/sons_of_soil/52.Rev. Fr. G. Sebastin Durai.jpg",
    photoUrl: "/images/sons_of_soil/52.Rev. Fr. G. Sebastin Durai.jpg",
    order: 3,
    published: true
  },
  {
    id: "rev-fr-f-hendry-lawrence",
    name: "Rev.Fr.F.Hendry lawrence",
    title: "Rev. Fr.",
    type: "Priestly Vocation",
    vocation: "Priest",
    dateOfBirth: "09.09,1977",
    dateOfOrdination: "30 April 2006",
    ordained: "30 April 2006",
    ordinationYear: "2006",
    feastDay: "August -10",
    currentService:
      "Parish Priest, St. Joseph's Church, Kumar Nagar, Tiruppur",
    diocese: "Diocese of Coimbatore",
    photo: "/images/sons_of_soil/53.Rev. Fr. F. Hendry Lawrence.jpg",
    photoUrl: "/images/sons_of_soil/53.Rev. Fr. F. Hendry Lawrence.jpg",
    order: 4,
    published: true
  },
  {
    id: "rev-fr-c-vincent-pushpraj",
    name: "Rev.Fr.C.Vincent pushpraj",
    title: "Rev. Fr.",
    type: "Priestly Vocation",
    vocation: "Priest",
    dateOfBirth: "24.08.1978",
    dateOfOrdination: "30 April 2006",
    ordained: "30 April 2006",
    ordinationYear: "2006",
    feastDay: "September-27",
    currentService:
      "Director of Madha TV, Secretary to Commission for Social Communication- Bishop's House, Coimbatore",
    diocese: "Diocese of Coimbatore",
    photo: "/images/sons_of_soil/54.Rev. Fr. C. Vincent Pushparaj.jpg",
    photoUrl: "/images/sons_of_soil/54.Rev. Fr. C. Vincent Pushparaj.jpg",
    order: 5,
    published: true
  },
  {
    id: "rev-fr-m-alexander",
    name: "Rev.Fr.M.Alexander",
    title: "Rev. Fr.",
    type: "Priestly Vocation",
    vocation: "Priest",
    dateOfBirth: "29.01.1979",
    dateOfOrdination: "6 May2007",
    ordained: "6 May2007",
    ordinationYear: "2007",
    feastDay: "July-17",
    currentService: "Dicastery, Rome",
    diocese: "Diocese of Coimbatore",
    photo: "/images/sons_of_soil/55.Rev. Fr. M. Alexander.jpg",
    photoUrl: "/images/sons_of_soil/55.Rev. Fr. M. Alexander.jpg",
    order: 6,
    published: true
  },
  {
    id: "rev-fr-john-yesu-shiju",
    name: "Rev.Fr.John Yesu shiju",
    title: "Rev. Fr.",
    type: "Priestly Vocation",
    vocation: "Priest",
    dateOfBirth: "29.05.1986",
    dateOfOrdination: "3 May 2015",
    ordained: "3 May 2015",
    ordinationYear: "2015",
    feastDay: "December 27",
    currentService: "Parish Priest, St. Mary Magdalene Church, Karamadai",
    diocese: "Diocese of Coimbatore",
    photo: "/images/sons_of_soil/56.Rev. Fr. John Yesu Shiju.jpg",
    photoUrl: "/images/sons_of_soil/56.Rev. Fr. John Yesu Shiju.jpg",
    order: 7,
    published: true
  },
  {
    id: "rev-fr-d-arul-santhosh",
    name: "Rev.Fr.D.Arul santhosh",
    title: "Rev. Fr.",
    type: "Priestly Vocation",
    vocation: "Priest",
    dateOfBirth: "13.03.1991",
    dateOfOrdination: "1 November 2020",
    ordained: "1 November 2020",
    ordinationYear: "2020",
    feastDay: "February 04",
    currentService:
      "Assistant Parish Priest, Infant Jesus Shrine, Kovaipudur",
    diocese: "Diocese of Coimbatore",
    photo: "/images/sons_of_soil/57.Rev. Fr. Arul Santhosh.jpg",
    photoUrl: "/images/sons_of_soil/57.Rev. Fr. Arul Santhosh.jpg",
    order: 8,
    published: true
  },
  {
    id: "rev-fr-s-rayappa-dass",
    name: "Rev.Fr.S.Rayappa dass",
    title: "Rev. Fr.",
    type: "Priestly Vocation",
    vocation: "Priest",
    dateOfBirth: "2.08.1991",
    dateOfOrdination: "3 May 2021",
    ordained: "3 May 2021",
    ordinationYear: "2021",
    feastDay: "June -29",
    currentService: "Staff, Good Shepherd Seminary, Coimbatore",
    diocese: "Diocese of Coimbatore",
    photo: "/images/sons_of_soil/58.REV. FR. S. RAYAPPA DASS.jpg",
    photoUrl: "/images/sons_of_soil/58.REV. FR. S. RAYAPPA DASS.jpg",
    order: 9,
    published: true
  },
  {
    id: "rev-fr-a-naveen-antony",
    name: "Rev.Fr.A. Naveen antony",
    title: "Rev. Fr.",
    type: "Priestly Vocation",
    vocation: "Priest",
    dateOfBirth: "02.01.1994",
    dateOfOrdination: "5 May2024",
    ordained: "5 May2024",
    ordinationYear: "2024",
    feastDay: "13 June",
    currentService: "coimbatore",
    diocese: "Diocese of Coimbatore",
    photo: "/images/sons_of_soil/59.Rev. Fr. A. Naveen Antony.jpg",
    photoUrl: "/images/sons_of_soil/59.Rev. Fr. A. Naveen Antony.jpg",
    order: 10,
    published: true
  },
  {
    id: "rev-fr-dinato-joseph",
    name: "Rev.Fr.Dinato joseph",
    title: "Rev. Fr.",
    type: "Priestly Vocation",
    vocation: "Priest",
    dateOfBirth: "04.07,1994",
    dateOfOrdination: "5 May 2024",
    ordained: "5 May 2024",
    ordinationYear: "2024",
    feastDay: "March -19",
    currentService:
      "Assistant Parish Priest, St. Antony's Shrine, Puliakulam",
    diocese: "Diocese of Coimbatore",
    photo: "/images/sons_of_soil/60.Rev. Fr. Dinato Joseph.jpg",
    photoUrl: "/images/sons_of_soil/60.Rev. Fr. Dinato Joseph.jpg",
    order: 11,
    published: true
  },
  {
    id: "rev-fr-ajitto-xavier",
    name: "Rev.Fr. Ajitto Xavier",
    title: "Rev. Fr.",
    type: "Priestly Vocation",
    vocation: "Priest",
    dateOfBirth: "28.10.1996",
    dateOfOrdination: "3 May 2026",
    ordained: "3 May 2026",
    ordinationYear: "2026",
    feastDay: "3 Dec",
    currentService:
      "Assistant Parish Priest, Our Lady of Rosary Basilica, Karumathampatti",
    diocese: "Diocese of Coimbatore",
    photo: "/images/sons_of_soil/61.Rev Fr. Ajitto Xavier.jpg",
    photoUrl: "/images/sons_of_soil/61.Rev Fr. Ajitto Xavier.jpg",
    order: 12,
    published: true
  },
  {
    id: "rev-fr-francis-xavier",
    name: "Rev.Fr. Francis Xavier",
    title: "Rev. Fr.",
    type: "Priestly Vocation",
    vocation: "Priest",
    dateOfBirth: "9.11.1996",
    dateOfOrdination: "3 May 2026",
    ordained: "3 May 2026",
    ordinationYear: "2026",
    feastDay: "3 Dec",
    currentService:
      "Assistant Parish Priest, St. Michael's Cathedral, Coimbatore",
    diocese: "Diocese of Coimbatore",
    photo: "/images/sons_of_soil/62.Rev. Fr. Francis Xavier.jpg",
    photoUrl: "/images/sons_of_soil/62.Rev. Fr. Francis Xavier.jpg",
    order: 13,
    published: true
  }
];

// Backward compatibility export
export const initialSonsOfParish: SonOfParish[] = parishVocations;

/**
 * Religious Brothers & Sisters Section - Separate Editable Data Array
 * Update name, photo, dateOfBirth, dateOfProfession, feastDay, and currentService when ready.
 */
export const religiousBrothersAndSisters: ReligiousServantProfile[] = [
  {
    id: "religious-brother-1",
    role: "brother",
    designation: "Rev. Bro.",
    badgeLabel: "Religious Brother",
    name: "Rev.Bro.A.Charles",
    photo: "/images/sons_of_soil/63.Rev.Bro.A.Charles.png",
    photoUrl: "/images/sons_of_soil/63.Rev.Bro.A.Charles.png",
    dateOfBirth: "10.12.1974  ",
    dateOfProfession: "10 May 2003",
    feastDay: "4 Nov",
    currentService: "Details coming soon",
    about:
      "Dedicated to consecrated brotherhood, prayer, and faithful service to the Church and God's people.",
    order: 1,
    published: true
  },
  {
    id: "religious-sister-1",
    role: "sister",
    designation: "Sister",
    badgeLabel: "Religious Sister",
    name: "Rev.Sister.Teena Rubi",
    photo: "/images/sons_of_soil/64.Rev. Sr.Teena Rubi.png",
    photoUrl: "/images/sons_of_soil/64.Rev. Sr.Teena Rubi.png",
    dateOfBirth: "Details coming soon",
    dateOfProfession: "Details coming soon",
    feastDay: "Details coming soon",
    currentService: "Details coming soon",
    about:
      "Dedicated to consecrated religious life, spiritual mission, and loving service in response to God's call.",
    order: 2,
    published: true
  },
  {
    id: "religious-sister-2",
    role: "sister",
    designation: "Sister",
    badgeLabel: "Religious Sister",
    name: "Rev.Sister.Beena",
    photo: "/images/sons_of_soil/65.Rev. Sr.Beena.png",
    photoUrl: "/images/sons_of_soil/65.Rev. Sr.Beena.png",
    dateOfBirth: "Details coming soon",
    dateOfProfession: "Details coming soon",
    feastDay: "Details coming soon",
    currentService: "Details coming soon",
    about:
      "Dedicated to consecrated religious life, spiritual mission, and loving service in response to God's call.",
    order: 3,
    published: true
  }
];

