export interface ParishAssociation {
  id: string;
  name: string;
  order: number;
  iconName?: string;
}

export const parishAssociations: ParishAssociation[] = [
  {
    id: "society-saint-vincent-de-paul",
    name: "Society of Saint Vincent de Paul",
    order: 1,
    iconName: "HeartHandshake"
  },
  {
    id: "st-pauls-resurrection-club",
    name: "St. Paul's Resurrection Club",
    order: 2,
    iconName: "Sun"
  },
  {
    id: "christian-family-movement",
    name: "Christian Family Movement",
    order: 3,
    iconName: "Users"
  },
  {
    id: "catholic-association",
    name: "Catholic Association",
    order: 4,
    iconName: "Church"
  },
  {
    id: "our-lady-of-good-health-welfare",
    name: "Our Lady of Good Health Welfare/Social Service Association",
    order: 5,
    iconName: "Heart"
  },
  {
    id: "saint-veronica-womens-commission",
    name: "Saint Veronica Women's Commission",
    order: 6,
    iconName: "UsersRound"
  },
  {
    id: "choir",
    name: "Choir",
    order: 7,
    iconName: "Music"
  },
  {
    id: "catechism",
    name: "Catechism",
    order: 8,
    iconName: "BookOpen"
  },
  {
    id: "altar-servers",
    name: "Altar Servers (இயேசுவின் கண்மணிகள்)",
    order: 9,
    iconName: "Flame"
  },
  {
    id: "st-pauls-youth-mission",
    name: "St. Paul's Youth Mission",
    order: 10,
    iconName: "Compass"
  },
  {
    id: "secular-franciscan-order",
    name: "Secular Franciscan Order",
    order: 11,
    iconName: "Cross"
  },
  {
    id: "st-sebastian-association",
    name: "St. Sebastian Association",
    order: 12,
    iconName: "Shield"
  },
  {
    id: "legion-of-mary-mirror-of-justice",
    name: "Legion of Mary - Mirror of Justice",
    order: 13,
    iconName: "Crown"
  },
  {
    id: "legion-of-mary-mother-of-the-church",
    name: "Legion of Mary - Mother of the Church",
    order: 14,
    iconName: "Crown"
  }
];
