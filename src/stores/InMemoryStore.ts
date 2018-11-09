import IStore from "./IStore";

export class InMemoryStore implements IStore {
    private store: { [userId: string]: Set<string> } = {};

    public async getStreams(userId: string): Promise<Set<string>> {
        return this.store[userId] || new Set();
    }

    public async addStream(userId: string, streamId: string): Promise<void> {
        const streams = await this.getStreams(userId);

        this.store[userId] = streams.add(streamId);
    }
}
