export interface ObjectValue {
    id: any;
    value: any;
}

export interface Menu {
    id: any;
    title: string;
    link: string;
    subs?: Menu;
}

export interface OptionValue {
    value: any;
    text: string;
}
