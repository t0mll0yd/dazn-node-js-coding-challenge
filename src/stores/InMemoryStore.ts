import { IStore } from "./store";

export class InMemoryStore implements IStore {
    private store: { [userId: string]: Set<string> } = {};

    public getStreams(userId: string): Set<string> {
        return this.store[userId];
    }

    public addStream(userId: string, streamId: string): void {
        const streams = this.getStreams(userId);

        this.store[userId] = streams.add(streamId);
    }
}
