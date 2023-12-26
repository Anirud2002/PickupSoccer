export interface PlayerStatus {
    isTraining: boolean;
    isAvailable: boolean;
    leavingAt?: Date;
}

export interface Player {
    userName: string;
    checkedIn: boolean;
    status: PlayerStatus;
}

export interface Admin {
    userName: string;
}

export interface Announcement {
    content: string;
    postedOn?: Date;
}

export interface Group {
    groupId: string;
    groupName: string;
    inviteLink: string;
    players: Player[];
    announcements: Announcement[];
    admins: Admin[];
}