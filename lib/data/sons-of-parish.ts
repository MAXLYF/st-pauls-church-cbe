import { SonOfParish, ParishVocation } from "@/types";

/**
 * Parish Vocation Profiles - Sons & Daughters of the Parish
 * Contains Rev. Fr. and Rev. Sr. profiles who have answered God's call to consecrated service.
 */
export const parishVocations: ParishVocation[] = [
  {
    id: "john-paul-vincent",
    name: "Rev. Fr. John Paul Vincent",
    title: "Rev. Fr.",
    type: "Priestly Vocation",
    vocation: "Priest",
    ordained: "2014",
    ordinationYear: "2014",
    ministry: "Parish Ministry",
    currentService: "St. Paul's Church, Rathinapuri",
    diocese: "Diocese of Coimbatore",
    photo: "/images/fathers/johnpaul-vincent.jpg",
    photoUrl: "/images/fathers/johnpaul-vincent.jpg",
    about:
      "Faithfully serving God and the Church with dedication to pastoral ministry, celebration of the Holy Sacraments, and spiritual guidance of the parish community.",
    description:
      "Faithfully serving God and the Church with dedication to pastoral ministry, celebration of the Holy Sacraments, and spiritual guidance of the parish community.",
    order: 1,
    published: true
  },
  {
    id: "joseph-dhanaraj",
    name: "Rev. Fr. Joseph Dhanaraj",
    title: "Rev. Fr.",
    type: "Priestly Vocation",
    vocation: "Priest",
    ordained: "2021",
    ordinationYear: "2021",
    ministry: "Parish Ministry",
    currentService: "St. Paul's Church, Rathinapuri",
    diocese: "Diocese of Coimbatore",
    photo: "/images/fathers/joseph-dhanaraj.jpg",
    photoUrl: "/images/fathers/joseph-dhanaraj.jpg",
    about:
      "Dedicated to preaching the Gospel, pastoral care, and fostering spiritual growth and youth faith formation among the faithful.",
    description:
      "Dedicated to preaching the Gospel, pastoral care, and fostering spiritual growth and youth faith formation among the faithful.",
    order: 2,
    published: true
  },
  {
    id: "maria-antony",
    name: "Rev. Sr. Maria Antony",
    title: "Rev. Sis.",
    type: "Religious Vocation",
    vocation: "Religious Sister",
    profession: "2016",
    professionYear: "2016",
    ministry: "Education & Faith Formation",
    currentService: "Religious Ministry",
    congregation: "Congregation of Religious Sisters",
    diocese: "Diocese of Coimbatore",
    photo: "",
    photoUrl: "",
    about:
      "Dedicated to consecrated religious life, Christian education, catechism, and loving service in response to God's holy call.",
    description:
      "Dedicated to consecrated religious life, Christian education, catechism, and loving service in response to God's holy call.",
    order: 3,
    published: true
  }
];

// Backward compatibility export
export const initialSonsOfParish: SonOfParish[] = parishVocations;
