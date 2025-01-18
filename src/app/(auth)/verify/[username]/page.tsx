"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Page = () => {
  const router = useRouter()
  const params = useParams<{username : string}>()

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/api/verify-code", {
        username: params.username,
        code: code
      });

      router.replace("/sign-in");
    } catch (error) {
      setError("Invalid code. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Enter your verification code</h2>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter code"
      />
      
      {error && <div style={{ color: 'red' }}>{error}</div>}
      
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Verifying...' : 'Submit'}
      </button>
    </div>
  )
}

export default Page;
