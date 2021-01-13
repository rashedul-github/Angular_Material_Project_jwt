export const dataUrl = 'http://localhost:59863';
export class AppConfig {
  static apiUrl = "http://localhost:59863/api";
}
export enum Role {

  Admin = 'Admin',
  Staff = 'Staff'
}

export const menuList = [
  {
    label: 'Home',
    icon: 'home',
    link: '/home',

  },
  {
    label: 'Vehicles',
    icon: 'directions_car',
    link: '/vehicle'
  },
  {
    label: 'Services',
    icon: 'miscellaneous_services',
    link: '/service'
  },
  {
    label: 'About Us.',
    icon: 'emoji_people',
    link: '/about',

  }
];

