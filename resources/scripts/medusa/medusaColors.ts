// Medusa theme - General colors

// WARNING!!! USE ONLY HEX COLOR CODE
// WARNING!!! USE ONLY HEX COLOR CODE
// WARNING!!! USE ONLY HEX COLOR CODE
const color1 = '#111111'; // Black
const color2 = '#161625'; // Blue-Black
const color3 = '#24b299'; // Cyan
const color4 = '#8367FF'; // Light Purple
const color5 = '#ffffff'; // White
const color6 = '#ff4655'; // Red
const color7 = '#1c1c28'; // Dark
const color8 = '#181b29'; // Blue-Black2
const color9 = '#2c2c2d'; // Gray
const color10 = '#4566FF'; // Light blue
const color11 = '#67A7FF'; // Light blue2
const color12 = '#FFBC46'; // Yellow
const color13 = '#A0FF46';
const color14 = '#76D936';

export const eggsList = {
    defaultEgg: ['Unknown Egg Id', 'https://www.pixel4k.com/wp-content/uploads/2018/11/946805.jpg'],
    eggs: {
        1: [
            'Proxy - Bungeecord',
            'https://www.minecraft.net/content/dam/games/minecraft/key-art/MC-Vanilla_Media-Block-Image_PC-Bundle-Keyart_800x450.jpg',
        ],
        2: [
            'Forge Minecraft',
            'https://www.minecraft.net/content/dam/games/minecraft/key-art/MC-Vanilla_Media-Block-Image_PC-Bundle-Keyart_800x450.jpg',
        ],
        3: [
            'Sponge (Sponge Vanilla)',
            'https://www.minecraft.net/content/dam/games/minecraft/key-art/MC-Vanilla_Media-Block-Image_PC-Bundle-Keyart_800x450.jpg',
        ],
        4: [
            'Paper',
            'https://www.minecraft.net/content/dam/games/minecraft/key-art/MC-Vanilla_Media-Block-Image_PC-Bundle-Keyart_800x450.jpg',
        ],
        5: [
            'Vanilla Minecraft',
            'https://www.minecraft.net/content/dam/games/minecraft/key-art/MC-Vanilla_Media-Block-Image_PC-Bundle-Keyart_800x450.jpg',
        ],
        6: ['Insurgency', 'https://images8.alphacoders.com/126/1260011.jpg'],
        7: ['Counter-Strike: Global Offensive', 'https://i.redd.it/v065cssvidh01.jpg'],
        8: ['Custom Source Engine Game', 'https://www.xoer.cc/wp-content/uploads/2021/05/21d8N7105222_3680779.jpg'],
        9: ['Team Fortress 2', 'https://wallpapers.com/images/featured/tf2-zwetbrzccif01dfd.jpg'],
        10: ['Garrys Mod', 'https://images3.alphacoders.com/557/557525.jpg'],
        11: ['ARK Survival Evolved', 'https://wallpapers.com/images/hd/ark-f2p3c4e2twsyaj0q.jpg'],
        12: [
            'Mumble Server',
            'https://i0.wp.com/fosslovers.com/wp-content/uploads/2018/06/Mumble-Server-installation-and-configuration-in-CentOS-7.png',
        ],
        13: ['Teamspeak3 Server', 'https://miro.medium.com/v2/resize:fit:820/1*9h0bK-Y1BIqcDi2NeLTvIQ.jpeg'],
        14: ['Rust', 'https://wallpapers.com/images/hd/rust-game-fvem7wo2c4nc4rfq.jpg'],
    } as { [key: number]: string[] },
};

export const medusaColors = {
    logo: 'https://www.theodor.work/products/medusa-logo.png',
    white: color5,
    white2: color4,
    bblack2: color8,
    lightBlue: color10,
    lightBlue2: color11,
    danger: color6,
    yellow: color12,
    lime: color13,
    green: color14,
    gray: color9,
    cyan: color3,
    body: {
        background: color1,
        text: color5,
        bgImg: 'https://www.theodor.work/products/medusa-background.jpg',
    },
    nav: {
        background: color2,
        text: color5,
        link: {
            background: color4,
            text: color5,
            hoverBg: color3,
        },
        bars: {
            background: color4,
        },
    },
    subnav: {
        background: color7,
        background2: color2,
        borderColor: color4,
    },
    contentBox: {
        background: color7,
        background2: color8,
        borderColor: color9,
        textColor: color5,
        bubble: {
            color1: color3,
            color2: color4,
        },
    },
    input: {
        background: color7,
        switch: {
            bg: color4,
            bubble: color4,
            border: color4,
        },
        group: {
            bg: color4,
        },
    },
    button: {
        bg1: color4,
        border: color4,
        bgDanger: color6,
        borderDanger: color6,
        bgText: color4,
        borderText: color4,
        bgTrash: color6,
        borderTrash: color6,
    },
    rowbox: {
        background: color4,
        borderColor: color5,
        codeBg: color2,
        codeBorder: color4,
        icon: {
            bg: color8,
            border: color4,
            bgTrash: color6,
            borderTrash: color6,
        },
    },
    dialog: {
        background: color7,
        background2: color8,
        borderColor: color9,
        textColor: color5,
        close: {
            bg: color4,
            text: color4,
            border: color4,
        },
    },
    title: {
        c1: color4,
        c2: color10,
        c3: color11,
        hasLine: {
            bg: color4,
        },
    },
    code: {
        bg: color2,
        bgLight: color4,
        border: color4,
    },
    modal: {
        background: color7,
        background2: color8,
        borderColor: color9,
        textColor: color5,
    },
    // CopyOnClick
    coc: {
        bg: color2,
        border: color4,
    },
    activity: {
        bg1: color2,
        bg2: color8,
        border: color4,
        route: {
            border: color4,
            circle: color4,
        },
        text: color5,
        textHover: color4,
    },
    tooltip: {
        bg1: color2,
        bg2: color4,
        border: color4,
        text: color5,
    },
    label: {
        darkText: color4,
        lightText: color5,
    },
    infobox: {
        bg: color4,
        text: color4,
        textWhite: color5,
        border: color4,
        textDesc: color5,
    },
    select: {
        bg: color7,
        border: color4,
    },
    desc: {
        text: color5,
        textP: color5,
    },
    box: {
        bg1: color7,
        bg2: color8,
        bg3: color4,
        bg4: color2,
        border: color4,
        icon: {
            bg: color4,
            text: color4,
            border: color4,
            textPrimary: color5,
        },
        details: {
            textStrong: color4,
        },
        menuElement: {
            bg1: color4,
            bg2: color11,
            border: color10,
            text: color5,
        },
        status: {
            success: color4,
            failed: color6,
            textSucces: color4,
            textFailed: color6,
            locked: color11,
            textLocked: color11,
        },
    },
    addbox: {
        bg: color4,
        border: color4,
        text: color4,
    },
    user: {
        text: color5,
        avatar: {
            bg: color4,
            text: color5,
            border: color4,
        },
        box: {
            bg1: color7,
            bg2: color8,
            border: color4,
        },
    },
    permissionRow: {
        bg1: color7,
        bg2: color8,
        border: color4,
    },
    badge: {
        normal: {
            bg: color4,
            text: color4,
            border: color4,
        },
        warning: {
            bg: color12,
            text: color12,
            border: color12,
        },
    },
    rowFile: {
        bg1: color4,
        bg2: color8,
        border: color4,
        text: color5,
    },
    terminal: {
        bg: color7,
        fontSize: 14,
        head: {
            bg1: color4,
            bg2: color8,
            border: color4,
        },
        search: {
            bg: color9,
            shadow: color4,
        },
        cmd: {
            bg: color8,
        },
    },
    detailBlock: {
        bg1: color4,
        bg2: color2,
        border: color4,
    },
    powerbtn: {
        normalBg: color4,
        warningBg: color10,
        dangerBg: color6,
    },
    auth: {
        bg1: color4,
        bg2: color2,
        border: color4,
        authSide: {
            bg: color2,
        },
    },
    cheatseet: {
        bg1: color4,
        textColor: color5,
        col1Bg: color4,
    },
};
