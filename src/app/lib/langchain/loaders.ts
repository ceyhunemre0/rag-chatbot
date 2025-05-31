import { TextLoader } from "langchain/document_loaders/fs/text";

export const loadTextFile = async (filePath: string) => {
  const loader = new TextLoader(filePath);
  const docs = await loader.load();
  return docs;
};