export const SidebarMenus = [
    {
        title: 'HOME',
        link: '/',
        children: [],
        permissions: [],
        icon: 'home'
    },
    {
        title: 'Add Pallet',
        link: '/app/pallets/form',
        modal: true,
        children: [],
        permissions: ['add-pallet'],
        icon: 'add'
    },
    {
        title: 'All Pallet',
        link: '/app/pallets',
        children: [],
        permissions: ['view-pallet'],
        icon: 'pallet'
    }
    // {
    //     title: 'Wood',
    //     link: '#',
    //     children: [
    //         {
    //             permission: 'add-wood',
    //             modal: true,
    //             title: 'Add Wood',
    //             link: '/app/wood/form',
    //         },
    //         {
    //             permission: 'view-wood',
    //             modal: false,
    //             title: 'All Woods',
    //             link: '/app/wood',
    //         }
    //     ],
    //     permissions: ['add-wood', 'view-wood'],
    //     icon: 'pim'
    // },
    // {
    //     title: 'Config',
    //     link: '/app/configs/departments',
    //     children: [],
    //     permissions: ['Admin'],
    //     icon: 'config'
    // },
]
