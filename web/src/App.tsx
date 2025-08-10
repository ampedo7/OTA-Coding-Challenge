import React from 'react';
import Routes from './routes/index';
import { RouterProvider, Link } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={Routes} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
