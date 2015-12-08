interface SnarlOptions {
    title: string;
    text?: string;
    icon?: string;
    timeout?: number;
    action?: any;
    dismissable?: boolean;
}

interface snarl {
    addNotification(model: SnarlOptions): void;
    editNotification(id, options: SnarlOptions): void;
    reOpenNotification(id): void;
    removeNotification(id): void;
    isDismissed(id): void;
    exists(id): boolean;
    setTitle(id, title): void;
    setText(id, text): void;
    setIcon(id, icon): void;
    setTimeout(id, timeout): void;
}
declare var Snarl: snarl;