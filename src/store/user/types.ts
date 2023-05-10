export interface IUserStore {
    likes: string[];
    setLikes: (likes: string[]) => void;
}