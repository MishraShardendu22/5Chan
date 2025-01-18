'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, KeyRound, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Page = () => {
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      await axios.post('/api/verify-code', {
        username: params.username,
        code: code,
      });
      router.replace('/sign-in');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError('Invalid code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
        <Card className="w-full max-w-md p-6 space-y-6 bg-gray-900/60 backdrop-blur-lg border-purple-500/20">
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-4 w-1/2 mx-auto" />
          </CardHeader>
          <CardContent className="space-y-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-12 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <Card className="w-full max-w-md p-6 space-y-6 bg-gray-900/60 backdrop-blur-lg border-purple-500/20">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <ShieldCheck className="h-12 w-12 text-purple-400" />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
              Verify Your Account
            </h2>
            <p className="text-gray-400 mt-2">
              We sent a verification code to your email
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <KeyRound className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter verification code"
              className="pl-10 bg-gray-800/50 border-gray-700 focus:border-purple-500"
              maxLength={6}
            />
          </div>

          {error && (
            <Alert variant="destructive" className="bg-red-900/30 border-red-500/50">
              <AlertDescription className="text-red-400">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Verify Account
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;