// SPDX-FileCopyrightText: 2025 Basingstoke Repair Network
// SPDX-License-Identifier: MIT

import type { Location } from '@/types/index';

export const locations: Location[] = [
  {
    id: 'chineham',
    name: 'Chineham Repair Café',
    when: '3rd Saturday of each month, 10am-1pm',
    where: 'Christ Church Chineham, Reading Road (next to Surgery)',
    postcode: 'RG24 8LT',
    description: 'Our flagship repair café has been serving the Chineham community with expert volunteers ready to help fix electrical items, textiles, bikes, and more!',
    teamImage: 'assets/images/locations/chineham-team.jpg',
    color: 'blue',
    imagePosition: 'left',
    status: 'active'
  },
  {
    id: 'hatch-warren',
    name: 'Hatch Warren & Beggarwood Repair Café',
    when: '1st Saturday of each month, 10:30am-1pm',
    where: 'Hatch Warren Community Centre',
    postcode: 'RG22 4XF',
    description: 'Bringing repair expertise to the Hatch Warren and Beggarwood communities. Join us for free repairs and a warm welcome!',
    teamImage: 'assets/images/locations/hatch-warren-team.jpg',
    color: 'green',
    imagePosition: 'right',
    status: 'active'
  },
  {
    id: 'kings-furlong',
    name: 'Kings Furlong Repair Café',
    when: 'Coming Later in 2026',
    where: '',
    postcode: '',
    description: 'We\'re excited to announce that a new repair café will be opening in Kings Furlong later in 2026. Stay tuned for updates on dates and location!',
    teamImage: '',
    color: 'purple',
    status: 'coming-soon'
  }
];
