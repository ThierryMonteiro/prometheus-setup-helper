
import { ScrapeJobEditor } from "@/components/ScrapeJobEditor";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-800">Prometheus Scrape Job Editor</h1>
          <p className="text-gray-600">Create and manage your Prometheus scrape job configurations with ease</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <ScrapeJobEditor />
      </main>

      <footer className="mt-16 py-6 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>A user-friendly interface for Prometheus monitoring configuration</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
