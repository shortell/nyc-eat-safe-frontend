export const metadata = {
    title: 'Privacy Policy',
};

export default function PrivacyPolicy() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl pb-24">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <p className="mb-4 text-gray-600">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="prose max-w-none">
                <p className="mb-4">
                    This Privacy Policy describes how NYC Eat Safe collects, uses, and shares information when you use our website and services.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-3">1. Information We Collect</h2>
                <p className="mb-4">
                    We may collect information about you in various ways when you interact with our website, including analytics data and information required to serve advertisements.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-3">2. How We Use Your Information</h2>
                <p className="mb-4">
                    We use the information we collect to operate, maintain, and improve our services, as well as to serve relevant advertisements.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-3">3. Third-Party Advertising</h2>
                <p className="mb-4">
                    We may partner with third-party advertising companies to serve ads when you visit our website. These companies may use information about your visits to our website and other websites in order to provide advertisements about goods and services of interest to you.
                </p>

                {/* Mediavine Journey will automatically insert their required privacy clauses into this page */}
            </div>
        </div>
    );
}
