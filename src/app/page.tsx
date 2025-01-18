import React from 'react'
import { messages } from "@/TemporaryPrepPages/Messages"

const Page = () => {
  const year = new Date().getFullYear()

  return (
    <div>

      <main className="container mx-auto p-4 md:p-6">
        <h1 className="text-4xl font-bold text-center">Welcome to 5Chan</h1>
        <p className="text-center mt-4">
          Anonymous Messaging | Profile Image Review | Sometimes Roasting, Sometimes Toasting
        </p>
      </main>

      {messages.map((message) => (
        <div key={message.id} className="container mx-auto p-4 md:p-6">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <p>{message.content}</p>
            <p className="text-right text-sm text-gray-500 mt-2">
              {new Date(message.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      ))}

      <footer className="text-center p-4 md:p-6 bg-gray-900 text-white">
        © {year} 5Chan . All rights reserved.
      </footer>
    </div>
  )
}

export default Page