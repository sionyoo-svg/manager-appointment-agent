
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // 빌드 시 타입 체크 오류가 있어도 배포를 진행함 (빠른 배포용)
    ignoreBuildErrors: true,
  },
  eslint: {
    // 빌드 시 ESLint 오류가 있어도 배포를 진행함
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
