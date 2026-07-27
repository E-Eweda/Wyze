import { Builder } from './components/Builder';
import { ReviewPanel } from './components/ReviewPanel';
import { BundleProvider } from './state/BundleContext';

export default function App() {
  return (
    <BundleProvider>
      <div className="min-h-screen bg-white py-4 sm:py-8">
        <main className="mx-auto w-full max-w-340 px-3 sm:px-6">
          <h1 className="mb-4 text-center text-2xl font-bold text-zinc-900 md:sr-only">
            Let’s get started!
          </h1>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_380px] xl:gap-8">
            <Builder />
            <div className="min-w-0 xl:sticky xl:top-6 xl:self-start">
              <ReviewPanel />
            </div>
          </div>
        </main>
      </div>
    </BundleProvider>
  );
}
