export interface IStore {
    getStreams(userId: string): Set<string>;

    addStream(userId: string, streamId: string): void;
}
