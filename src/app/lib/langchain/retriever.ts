import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { embeddings } from "./models";


const pinecone = new PineconeClient({
    apiKey: process.env.PINECONE_API_KEY!
});

const index = pinecone.Index(process.env.PINECONE_INDEX_NAME!);

const vectorStore = new PineconeStore(embeddings, {
    pineconeIndex: index,
    maxConcurrency: 5,
});

export { vectorStore };