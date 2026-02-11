import { Shadows } from "@mui/material";
import { alpha } from "@mui/material";
import { grey } from "@mui/material/colors";

const transparentLight1 = alpha(grey[200], 0.2);
const transparentLight2 = alpha(grey[600], 0.14);
const transparentLight3 = alpha(grey[600], 0.12);

const transparentDark1 = alpha('#000', 0.2);
const transparentDark2 = alpha('#000', 0.14);
const transparentDark3 = alpha('#000', 0.12);



export const shadowsLight: Shadows = [
        'none',
        `0px 2px 1px -1px ${transparentLight1}, 0px 1px 1px 0px ${transparentLight2}, 0px 1px 3px 0px ${transparentLight3}`,
        `0px 3px 1px -2px ${transparentLight1}, 0px 2px 2px 0px ${transparentLight2}, 0px 1px 5px 0px ${transparentLight3}`,
        `0px 3px 3px -2px ${transparentLight1}, 0px 3px 4px 0px ${transparentLight2}, 0px 1px 8px 0px ${transparentLight3}`,
        `0px 2px 4px -1px ${transparentLight1}, 0px 4px 5px 0px ${transparentLight2}, 0px 1px 10px 0px ${transparentLight3}`,
        `0px 3px 5px -1px ${transparentLight1}, 0px 5px 8px 0px ${transparentLight2}, 0px 1px 14px 0px ${transparentLight3}`,
        `0px 3px 5px -1px ${transparentLight1}, 0px 6px 10px 0px ${transparentLight2}, 0px 1px 18px 0px ${transparentLight3}`,
        `0px 4px 5px -2px ${transparentLight1}, 0px 7px 10px 1px ${transparentLight2}, 0px 2px 16px 1px ${transparentLight3}`,
        `0px 5px 5px -3px ${transparentLight1}, 0px 8px 10px 1px ${transparentLight2}, 0px 3px 14px 2px ${transparentLight3}`,
        `0px 5px 6px -3px ${transparentLight1}, 0px 9px 12px 1px ${transparentLight2}, 0px 3px 16px 2px ${transparentLight3}`,
        `0px 6px 6px -3px ${transparentLight1}, 0px 10px 14px 1px ${transparentLight2}, 0px 4px 18px 3px ${transparentLight3}`,
        `0px 6px 7px -4px ${transparentLight1}, 0px 11px 15px 1px ${transparentLight2}, 0px 4px 20px 3px ${transparentLight3}`,
        `0px 7px 8px -4px ${transparentLight1}, 0px 12px 17px 2px ${transparentLight2}, 0px 5px 22px 4px ${transparentLight3}`,
        `0px 7px 8px -4px ${transparentLight1}, 0px 13px 19px 2px ${transparentLight2}, 0px 5px 24px 4px ${transparentLight3}`,
        `0px 7px 9px -4px ${transparentLight1}, 0px 14px 21px 2px ${transparentLight2}, 0px 5px 26px 4px ${transparentLight3}`,
        `0px 8px 9px -5px ${transparentLight1}, 0px 15px 22px 2px ${transparentLight2}, 0px 6px 28px 5px ${transparentLight3}`,
        `0px 8px 10px -5px ${transparentLight1}, 0px 16px 24px 2px ${transparentLight2}, 0px 6px 30px 5px ${transparentLight3}`,
        `0px 8px 11px -5px ${transparentLight1}, 0px 17px 26px 2px ${transparentLight2}, 0px 6px 32px 5px ${transparentLight3}`,
        `0px 9px 11px -5px ${transparentLight1}, 0px 18px 28px 2px ${transparentLight2}, 0px 7px 34px 6px ${transparentLight3}`,
        `0px 9px 12px -6px ${transparentLight1}, 0px 19px 29px 2px ${transparentLight2}, 0px 7px 36px 6px ${transparentLight3}`,
        `0px 10px 13px -6px ${transparentLight1}, 0px 20px 31px 3px ${transparentLight2}, 0px 8px 38px 7px ${transparentLight3}`,
        `0px 10px 13px -6px ${transparentLight1}, 0px 21px 33px 3px ${transparentLight2}, 0px 8px 40px 7px ${transparentLight3}`,
        `0px 10px 14px -6px ${transparentLight1}, 0px 22px 35px 3px ${transparentLight2}, 0px 8px 42px 7px ${transparentLight3}`,
        `0px 11px 14px -7px ${transparentLight1}, 0px 23px 36px 3px ${transparentLight2}, 0px 9px 44px 8px ${transparentLight3}`,
        `0px 11px 15px -7px ${transparentLight1}, 0px 24px 38px 3px ${transparentLight2}, 0px 9px 46px 8px ${transparentLight3}`
];
export const shadowsDark: Shadows = [
        'none',
        `0px 2px 1px -1px ${transparentDark1}, 0px 1px 1px 0px ${transparentDark2}, 0px 1px 3px 0px ${transparentDark3}`,
        `0px 3px 1px -2px ${transparentDark1}, 0px 2px 2px 0px ${transparentDark2}, 0px 1px 5px 0px ${transparentDark3}`,
        `0px 3px 3px -2px ${transparentDark1}, 0px 3px 4px 0px ${transparentDark2}, 0px 1px 8px 0px ${transparentDark3}`,
        `0px 2px 4px -1px ${transparentDark1}, 0px 4px 5px 0px ${transparentDark2}, 0px 1px 10px 0px ${transparentDark3}`,
        `0px 3px 5px -1px ${transparentDark1}, 0px 5px 8px 0px ${transparentDark2}, 0px 1px 14px 0px ${transparentDark3}`,
        `0px 3px 5px -1px ${transparentDark1}, 0px 6px 10px 0px ${transparentDark2}, 0px 1px 18px 0px ${transparentDark3}`,
        `0px 4px 5px -2px ${transparentDark1}, 0px 7px 10px 1px ${transparentDark2}, 0px 2px 16px 1px ${transparentDark3}`,
        `0px 5px 5px -3px ${transparentDark1}, 0px 8px 10px 1px ${transparentDark2}, 0px 3px 14px 2px ${transparentDark3}`,
        `0px 5px 6px -3px ${transparentDark1}, 0px 9px 12px 1px ${transparentDark2}, 0px 3px 16px 2px ${transparentDark3}`,
        `0px 6px 6px -3px ${transparentDark1}, 0px 10px 14px 1px ${transparentDark2}, 0px 4px 18px 3px ${transparentDark3}`,
        `0px 6px 7px -4px ${transparentDark1}, 0px 11px 15px 1px ${transparentDark2}, 0px 4px 20px 3px ${transparentDark3}`,
        `0px 7px 8px -4px ${transparentDark1}, 0px 12px 17px 2px ${transparentDark2}, 0px 5px 22px 4px ${transparentDark3}`,
        `0px 7px 8px -4px ${transparentDark1}, 0px 13px 19px 2px ${transparentDark2}, 0px 5px 24px 4px ${transparentDark3}`,
        `0px 7px 9px -4px ${transparentDark1}, 0px 14px 21px 2px ${transparentDark2}, 0px 5px 26px 4px ${transparentDark3}`,
        `0px 8px 9px -5px ${transparentDark1}, 0px 15px 22px 2px ${transparentDark2}, 0px 6px 28px 5px ${transparentDark3}`,
        `0px 8px 10px -5px ${transparentDark1}, 0px 16px 24px 2px ${transparentDark2}, 0px 6px 30px 5px ${transparentDark3}`,
        `0px 8px 11px -5px ${transparentDark1}, 0px 17px 26px 2px ${transparentDark2}, 0px 6px 32px 5px ${transparentDark3}`,
        `0px 9px 11px -5px ${transparentDark1}, 0px 18px 28px 2px ${transparentDark2}, 0px 7px 34px 6px ${transparentDark3}`,
        `0px 9px 12px -6px ${transparentDark1}, 0px 19px 29px 2px ${transparentDark2}, 0px 7px 36px 6px ${transparentDark3}`,
        `0px 10px 13px -6px ${transparentDark1}, 0px 20px 31px 3px ${transparentDark2}, 0px 8px 38px 7px ${transparentDark3}`,
        `0px 10px 13px -6px ${transparentDark1}, 0px 21px 33px 3px ${transparentDark2}, 0px 8px 40px 7px ${transparentDark3}`,
        `0px 10px 14px -6px ${transparentDark1}, 0px 22px 35px 3px ${transparentDark2}, 0px 8px 42px 7px ${transparentDark3}`,
        `0px 11px 14px -7px ${transparentDark1}, 0px 23px 36px 3px ${transparentDark2}, 0px 9px 44px 8px ${transparentDark3}`,
        `0px 11px 15px -7px ${transparentDark1}, 0px 24px 38px 3px ${transparentDark2}, 0px 9px 46px 8px ${transparentDark3}`
];
