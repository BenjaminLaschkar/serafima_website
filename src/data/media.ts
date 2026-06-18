export type VideoItem = {
  id: string;
  title: string;
  composer: string;
  work: string;
  role?: string;
  poster?: string;
  youtubeId?: string;
  local?: string;
};

export const featuredVideo: VideoItem = {
  id: "manon-adieu",
  title: "Adieu, notre petite table",
  composer: "Jules Massenet",
  work: "Manon — « Allons, il le faut »",
  role: "Manon",
  poster: "/media/serafima-liberman-7.jpg",
  local: "/media/manon-adieu.mp4",
};

export const videos: VideoItem[] = [
  {
    id: "reinecke-schwane",
    title: "Elfriedens Gruss an das Meer",
    composer: "Carl Reinecke",
    work: "Die wilden Schwäne",
    role: "Elfrieden",
    poster: "/media/Die-Wilden-Schwane-Reinecke-Elfriedens-Gruss-an-das-Meer-mp4-image.png",
    youtubeId: "FruRGgDDZPM",
  },
  {
    id: "turandot-tu-che",
    title: "Tu, che di gel sei cinta",
    composer: "G. Puccini",
    work: "Turandot",
    role: "Liù",
    poster: "/media/serafima-liberman-1.jpg",
    youtubeId: "I4K4gC2BLFc",
  },
  {
    id: "gianni-schicchi-babbino",
    title: "O mio babbino caro",
    composer: "G. Puccini",
    work: "Gianni Schicchi",
    role: "Lauretta",
    poster: "/media/serafima-liberman-2.jpg",
    youtubeId: "21--9NR3g2k",
  },
];

// Photos disponibles dans /public/media (synchronisées avec les fichiers réels)
export const gallery: { src: string; alt: string }[] = [
  { src: "/media/serafima-liberman-0.jpg", alt: "Serafima Liberman — portrait" },
  { src: "/media/serafima-liberman-1.jpg", alt: "Serafima Liberman — portrait" },
  { src: "/media/serafima-liberman-2.jpg", alt: "Serafima Liberman — scène" },
  { src: "/media/serafima-liberman-3.jpg", alt: "Serafima Liberman — récital" },
  { src: "/media/serafima-liberman-4.jpg", alt: "Serafima Liberman — portrait" },
  { src: "/media/serafima-liberman-5.jpg", alt: "Serafima Liberman — scène" },
  { src: "/media/serafima-liberman-6.jpg", alt: "Serafima Liberman — récital" },
  { src: "/media/serafima-liberman-7.jpg", alt: "Serafima Liberman — Iolanta" },
  { src: "/media/serafima-liberman-8.jpg", alt: "Serafima Liberman — portrait" },
  { src: "/media/serafima-liberman-9.jpg", alt: "Serafima Liberman — scène" },
  { src: "/media/serafima-liberman-12.jpeg", alt: "Serafima Liberman — scène" },
  { src: "/media/serafima-liberman-13.jpeg", alt: "Serafima Liberman — récital" },
  { src: "/media/serafima-liberman-14.jpeg", alt: "Serafima Liberman — portrait" },
  { src: "/media/serafima-liberman-15.jpeg", alt: "Serafima Liberman — scène" },
  { src: "/media/serafima-liberman-17.jpeg", alt: "Serafima Liberman — portrait" },
  { src: "/media/serafima-liberman-18.jpeg", alt: "Serafima Liberman — scène" },
  { src: "/media/serafima-liberman-20.jpeg", alt: "Serafima Liberman — récital" },
  { src: "/media/serafima-liberman-21.jpeg", alt: "Serafima Liberman — portrait" },
  { src: "/media/serafima-liberman-22.jpeg", alt: "Serafima Liberman — scène" },
  { src: "/media/serafima-liberman-23.jpeg", alt: "Serafima Liberman — récital" },
  { src: "/media/serafima-liberman-25.jpeg", alt: "Serafima Liberman — portrait" },
  { src: "/media/serafima-liberman-26.jpeg", alt: "Serafima Liberman — scène" },
  { src: "/media/serafima-liberman-27.jpeg", alt: "Serafima Liberman — récital" },
  { src: "/media/serafima-liberman-28.jpeg", alt: "Serafima Liberman — portrait" },
  { src: "/media/serafima-liberman-29.jpeg", alt: "Serafima Liberman — scène" },
  { src: "/media/serafima-liberman-30.jpeg", alt: "Serafima Liberman — récital" },
  { src: "/media/serafima-liberman-33.jpeg", alt: "Serafima Liberman — récital" },
  { src: "/media/serafima-liberman-36.jpg", alt: "Serafima Liberman — scène" },
  { src: "/media/serafima-liberman-37.jpg", alt: "Serafima Liberman — récital" },
  { src: "/media/serafima-liberman-38.jpg", alt: "Serafima Liberman — portrait" },
  { src: "/media/serafima-liberman-39.jpg", alt: "Serafima Liberman — scène" },
];

export const institutions = [
  { name: "GITIS", logo: "/media/logo_gitis.jpg", url: "https://gitis.net/en/" },
  { name: "École Normale de Musique Alfred Cortot", logo: "/media/logo_cortot.png", url: "https://www.ecolenormalecortot.com/" },
  { name: "Jerusalem Academy of Music and Dance", logo: "/media/logo-jerusalem_academy_of_music_and_dance.jpg", url: "https://jamd.ac.il/" },
  { name: "Opera Fuoco", logo: "/media/logo_opera_fuoco.png", url: "https://operafuoco.fr/" },
];
