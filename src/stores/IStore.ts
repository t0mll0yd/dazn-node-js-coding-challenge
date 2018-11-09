export default interface IStore {
    getStreams(userId: string): Promise<Set<string>>;

    addStream(userId: string, streamId: string): Promise<void>;
}
