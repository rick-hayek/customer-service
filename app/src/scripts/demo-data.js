import { MenuType, MessageType } from '../models/enums';

// Sample data
export const MenuItems=[
    { id: 1, value: '张江线' },
    { id: 2, value: '辛庄线' },
    { id: 3, value: '徐汇线 1' },
    { id: 4, value: '徐汇线 2' },
    { id: 5, value: '杨浦线' },
    { id: 6, value: '宝山线' },
    { id: 0, value: 'divider', isDivider: true },
    { id: 99, value: 'All Lines' }
];

export const MainMenus = [
    { id:1, name:'我的班车', type: MenuType.menu, value: [{id: 2, value: '辛庄线'}] }, 
    { id:2, name:'班车线路', type: MenuType.menu, value: MenuItems }, 
    { id:3, name:'个人中心', type: MenuType.link, value: '/user'}
];

export const PreDefinedMenuResponses=[
    { id: 1, value: '张江线', detail: '途经站点：闵行 浦江 张江', type: MessageType.thumb, title:'张江线班车详情', thumbImg: require('../img/shuttle-1-map.png'), pageUrl: '/shuttles' },
    { id: 2, value: '辛庄线', detail: '途经站点：闵行 莲花路 辛庄', type: MessageType.thumb, title:'辛庄线班车详情', thumbImg: require('../img/shuttle-2-map.png'), pageUrl: '/shuttles' },
    { id: 3, value: '徐汇线 1', detail: '途经站点：闵行 上海南站 徐家汇', type: MessageType.thumb, title:'徐汇线 1班车详情', thumbImg:require('../img/shuttle-1-map.png'), pageUrl: '/shuttles' },
    { id: 4, value: '徐汇线 2', detail: '途经站点：闵行 上海南站 宜山路', type: MessageType.thumb, title:'徐汇线 2班车详情', thumbImg:require('../img/shuttle-2-map.png'), pageUrl: '/shuttles' },
    { id: 5, value: '杨浦线', detail: '途经站点：闵行 杨浦', type: MessageType.thumb, title:'杨浦线班车详情', thumbImg:require('../img/shuttle-1-map.png'), pageUrl: '/shuttles' },
    { id: 6, value: '宝山线', detail: '途经站点：闵行 宝山', type: MessageType.thumb, title:'宝山线班车详情', thumbImg:require('../img/shuttle-2-map.png'), pageUrl: '/shuttles' },
    { id: 99, value: 'All Lines', detail: 'All', type: MessageType.list, link: '/detail', title:'所有班车', thumbImg:'', pageUrl: '/detail' }
];

// export const MenuReponsesDetails=[
//     { id: 1, value: '张江线', title:'', thumbImg:'', pageUrl: '' },
//     { id: 2, value: '辛庄线', title:'', thumbImg:'', pageUrl: ''  },
//     { id: 3, value: '徐汇线 1', title:'', thumbImg:'', pageUrl: ''  },
//     { id: 4, value: '徐汇线 2', title:'', thumbImg:'', pageUrl: ''  },
//     { id: 5, value: '杨浦线', title:'', thumbImg:'', pageUrl: '' },
//     { id: 6, value: '宝山线', title:'', thumbImg:'', pageUrl: '' }
// ];

export const PreDefinedTextResponses = [
    { id: 1, value: '1', detail: '公告', link: '' },
    { id: 2, value: '2', detail: '班车信息', link: '', commandId: 99 },
    { id: 3, value: '3', detail: '乘车指南', link: '' },
    { id: 4, value: '4', detail: '帮助', link: '' },
    { id: 5, value: '5', detail: '失物找回', link: '' },
];

export const DefaultTextResponse = {
    id: 0, 
    value: 'Available Services', 
    list: [
        {id: 1, value: '1.', detail: '公告'},
        {id: 2, value: '2.', detail: '班车信息'},
        {id: 3, value: '3.', detail: '乘车指南'},
        {id: 4, value: '4.', detail: '帮助'},
        {id: 5, value: '5.', detail: '失物找回'},
    ]
};
