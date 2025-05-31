import { upsertData } from "@/app/lib/langchain/chain";
const path = require("path");
const fs = require("fs/promises");

export async function POST(request: Request) {
    // this is a route for uploading files
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return new Response("File is required", { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Save the file to the public directory
        const publicDir = path.join(process.cwd(), "public");
        const filePath = path.join(publicDir, file.name);

        // Ensure the public directory exists
        await fs.mkdir(publicDir, { recursive: true });
        await fs.writeFile(filePath, buffer);

        await upsertData(filePath);

        return new Response(JSON.stringify({ ok: true, message: "File uploaded successfully" }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error("Error in upload API:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}