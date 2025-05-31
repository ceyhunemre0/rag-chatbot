import { vectorStore } from "./retriever";
import { loadTextFile } from "./loaders";
import { model } from "./models";
import { RetrievalQAChain } from "langchain/chains";
import { splitter } from "./splitter";


export async function upsertData(filePath: string): Promise<void> {
  try {
    const text = await loadTextFile(filePath);
    const docs = await splitter.splitDocuments(text);
    await vectorStore.addDocuments(docs);
    console.log("Upsert işlemi başarılı:", filePath);
  } catch (error) {
    console.error("Error upserting data:", error);
    throw error;
  }
}

export async function queryChain(question: string): Promise<string> {
  try {
    const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), {
      returnSourceDocuments: false,
    });
    const response = await chain.call({ query: question });
    return response.text;
  } catch (error) {
    console.error("Error querying chain:", error);
    throw error;
  }
}

