import { MenuType, MessageType } from './enums';

// Sample data
export const ShuttleBuses=[
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
    { id:2, name:'班车线路', type: MenuType.menu, value: ShuttleBuses }, 
    { id:3, name:'个人中心', type: MenuType.link, value: '/user'}
];


export const PreDefinedMenuResponses=[
    { id: 1, value: '张江线', detail: '闵行 浦江 张江', type: MessageType.thumb },
    { id: 2, value: '辛庄线', detail: '闵行 莲花路 辛庄', type: MessageType.thumb },
    { id: 3, value: '徐汇线 1', detail: '闵行 上海南站 徐家汇', type: MessageType.thumb },
    { id: 4, value: '徐汇线 2', detail: '闵行 上海南站 宜山路', type: MessageType.thumb },
    { id: 5, value: '杨浦线', detail: '闵行 杨浦', type: MessageType.thumb },
    { id: 6, value: '宝山线', detail: '闵行 宝山', type: MessageType.thumb },
    { id: 99, value: 'All Lines', detail: 'All', type: MessageType.list, link: '/detail' }
];

export const MenuReponsesDetails=[
    { id: 1, value: '张江线', url: '' },
    { id: 2, value: '辛庄线', url: ''  },
    { id: 3, value: '徐汇线 1', url: ''  },
    { id: 4, value: '徐汇线 2', url: ''  },
    { id: 5, value: '杨浦线', url: '' },
    { id: 6, value: '宝山线', url: '' }
];

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
