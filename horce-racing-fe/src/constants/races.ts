export enum Bets {
  Straight = 'win',
  Place = 'place',
  Show = 'show',
}
export interface LocationIntf {
  key: number;
  title: string;
  description: string;
  betTypes: Bets[]
}

// export const getLocationBasesInf = (horseLength: number) {
//   return;
// }

export const LOCATIONS: LocationIntf[] = [
  {
    key: 1,
    title: 'North America',
    description: `In North America, where hoofbeats echo,
    Thoroughbred horses race, spirits aglow.
    Galloping with grace, a noble display,
    Where dreams are chased on tracks of clay.`,
    betTypes: [Bets.Place, Bets.Show, Bets.Straight]
  },
  {
    key: 2,
    title: 'Europe',
    description: `In Europe's lands, where history resides,
    Galloping steeds in races stride.
    From ancient fields to modern tracks,
    Champions emerge, their glory intact`,
    betTypes: [Bets.Place, Bets.Straight]
  },
  {
    key: 3,
    title: 'Australia',
    description: `In Australia's vast and sun-kissed plains,
    Horses thunder, fueled by boundless reins.
    Racing down tracks with fervor and grace,
    A land of champions, a thrilling chase.`,
    betTypes: [Bets.Place, Bets.Straight]
  },
  {
    key: 4,
    title: 'Asia',
    description: `In Asia's vibrant and diverse lands,
    Horse racing takes its exhilarating stands.
    From ancient traditions to modern delight,
    A fusion of cultures, a racing sight`,
    betTypes: [Bets.Place, Bets.Straight]
  }
]