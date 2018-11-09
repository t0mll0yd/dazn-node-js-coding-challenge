import { InMemoryStore } from "./InMemoryStore";

describe("InMemoryStore", () => {
    const userId = "userId";
    const streamId = "streamId";

    test("getting streams for non saved user returns empty set", async () => {
        const store = new InMemoryStore();
        const streams = await store.getStreams(userId);

        expect(streams).toEqual(new Set());
    });

    test("can add and retrieve streams for a user", async () => {
        const store = new InMemoryStore();
        const streamsBefore = await store.getStreams(userId);

        expect(streamsBefore).toEqual(new Set());

        await store.addStream(userId, streamId);

        const streamsAfter = await store.getStreams(userId);

        expect(streamsAfter).toEqual(new Set([streamId]));
    });

    test("adding a stream is idempotent", async () => {
        const store = new InMemoryStore();
        const streamsBefore = await store.getStreams(userId);

        expect(streamsBefore).toEqual(new Set());

        await store.addStream(userId, streamId);
        await store.addStream(userId, streamId);

        const streamsAfter = await store.getStreams(userId);

        expect(streamsAfter).toEqual(new Set([streamId]));
    });
});
