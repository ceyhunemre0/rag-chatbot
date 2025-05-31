# AI Agent Chatbot

## Proje Hakkında

Bu proje, **Next.js**, **TypeScript**, **LangChain**, **OpenAI GPT** ve **Pinecone** vektör veritabanı kullanarak geliştirilmiş, dokümanlara dayalı akıllı chatbot çözümüdür. Kullanıcıdan gelen soruları anlayıp, önceden indekslenmiş verilerden benzerlik araması yaparak cevap üretir.

---

## Özellikler

- Next.js tabanlı hızlı ve modern frontend & API backend  
- OpenAI GPT modelleri ile doğal dil işleme  
- LangChain ile prompt yönetimi ve zincirleme işlemler  
- Pinecone ile ölçeklenebilir ve hızlı vektör tabanlı arama  
- TypeScript ile tip güvenliği ve sürdürülebilir kod yapısı

---

## Kurulum

1. Depoyu klonla:

   ```bash
   git clone https://github.com/ceyhunemre0/rag-chatbot.git
   cd rag-chatbot
   ```

2. Bağımlılıkları yükle:

   ```bash
   npm install
   # veya
   yarn install
   ```

3. `.env.local` dosyasını oluştur ve aşağıdaki ortam değişkenlerini ekle:

   ```env
   OPENAI_API_KEY=your_openai_api_key
   PINECONE_API_KEY=your_pinecone_api_key
   PINECONE_ENVIRONMENT=your_pinecone_environment
   PINECONE_INDEX_NAME=your_pinecone_index_name
   ```

4. Geliştirme sunucusunu başlat:

   ```bash
   npm run dev
   # veya
   yarn dev
   ```

5. Tarayıcıda aç: `http://localhost:3000`

---

## Proje Yapısı

- `/pages/api` – Next.js API route’ları (backend işlemleri)  
- `/components` – React bileşenleri  
- `/lib` – LangChain, OpenAI ve Pinecone entegrasyon kodları  
- `/utils` – Yardımcı fonksiyonlar  
- `/public` – Statik dosyalar  

---

## Kullanım

- Uygulama ana sayfasında kullanıcı sorusunu girin.  
- Sorunuz OpenAI modeli ve Pinecone arama sonucu ile işlenip cevap verilir.  
- İsterseniz yeni dokümanlar ekleyip indeksleyerek chatbot’u geliştirebilirsiniz.  

---

## Teknolojiler

- [Next.js](https://nextjs.org/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [LangChain](https://python.langchain.com/en/latest/)  
- [OpenAI GPT](https://openai.com/api/)  
- [Pinecone](https://www.pinecone.io/)  

---

## Katkıda Bulunma

Katkı ve öneriler için PR açabilir veya issue gönderebilirsiniz.

---

## Lisans

MIT License © 2025 Ceyhun Emre
