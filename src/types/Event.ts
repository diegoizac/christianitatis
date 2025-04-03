export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  href?: string;
  status: "upcoming" | "ongoing" | "past";
}
