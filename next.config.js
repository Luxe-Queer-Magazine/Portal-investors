/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ]
  },
  images: {
    domains: ['rhpgzlnklromtcnrfrko.supabase.co']
  },
  // Configure custom domain
  async rewrites() {
    return {
      beforeFiles: [
        // Handle invest.luxequeer.com domain
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'invest.luxequeer.com',
            },
          ],
          destination: '/:path*',
        },
      ],
    }
  },
  // Add domain configuration
  async redirects() {
    return [
      {
        source: '/',
        destination: '/landing',
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig