"use client";

import { FormEvent, useRef, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button, Modal } from "flowbite-react";

// Define TypeScript interfaces for messages
interface Message {
  _id: string;
  author: string;
  body?: string;
  format?: string;
  url?: string;
  _creationTime: string;
}

// Extracted MessagesList component for better modularity
function MessagesList({ messages }: { messages: Message[] }) {
  return (
    <ul className="space-y-2 mb-4">
      {messages.map((message) => (
        <li key={message._id} className="border p-2 rounded">
          <span className="font-bold">{message.author}:</span>
          {message.format === "image" ? (
            <Image message={message} />
          ) : (
            <span className="ml-2">{message.body}</span>
          )}
          <span className="text-gray-500 text-sm ml-2">
            {new Date(message._creationTime).toLocaleTimeString()}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Page() {
  const [openModal, setOpenModal] = useState(true);
  const messages = useQuery(api.messages.list) || [];

  const [newMessageText, setNewMessageText] = useState("");
  const sendMessage = useMutation(api.messages.sendMessage);

  const [name] = useState(() => "User " + Math.floor(Math.random() * 10000));
  async function handleSendMessage(event: FormEvent) {
    event.preventDefault();
    if (newMessageText) {
      await sendMessage({ body: newMessageText, author: name });
    }
    setNewMessageText("");
  }

  const generateUploadUrl = useMutation(api.messages.generateUploadUrl);
  const sendImage = useMutation(api.messages.sendImage);

  const imageInput = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  async function handleSendImage(event: FormEvent) {
    event.preventDefault();
    try {
      const postUrl = await generateUploadUrl();
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": selectedImage!.type },
        body: selectedImage,
      });
      const json = await result.json();
      if (!result.ok) {
        throw new Error(`Upload failed: ${JSON.stringify(json)}`);
      }
      const { storageId } = json;
      await sendImage({ storageId, author: name });
      setSelectedImage(null);
      if (imageInput.current) imageInput.current.value = "";
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Chat</Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Convex Chat</Modal.Header>
        <Modal.Body>
          <main className="p-4">
           
            <p className="badge mb-4">
              <span className="bg-blue-500 text-white py-1 px-2 rounded">
                {name}
              </span>
            </p>

            <MessagesList messages={messages} />
            <form onSubmit={handleSendMessage} className="mb-4">
              <input
                className="border p-2 rounded w-full mb-2"
                value={newMessageText}
                onChange={(event) => setNewMessageText(event.target.value)}
                placeholder="Write a message…"
              />
              <input
                type="submit"
                value="Send"
                disabled={!newMessageText}
                className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer disabled:opacity-50"
              />
            </form>
            <form onSubmit={handleSendImage}>
              <input
                type="file"
                accept="image/*"
                ref={imageInput}
                onChange={(event) => setSelectedImage(event.target.files![0])}
                className="mb-2"
                disabled={selectedImage !== null}
              />
              <input
                type="submit"
                value="Send Image"
                disabled={selectedImage === null}
                className="bg-green-500 text-white py-2 px-4 rounded cursor-pointer disabled:opacity-50"
              />
            </form>
          </main>
        </Modal.Body>
      </Modal>
    </>
  );
}

function Image({ message }: { message: { url: string } }) {
  return <img src={message.url} className="max-w-full h-auto mt-2" />;
}

export default Page;
