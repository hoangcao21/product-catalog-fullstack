import { PageRouting } from './components/page-routing';
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';

const root = document.getElementById('root')!;

ReactDOM.createRoot(root).render(
  <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
    <Suspense fallback={<p>⌛Loading...</p>}>
      <PageRouting />
    </Suspense>
  </ErrorBoundary>,
);
