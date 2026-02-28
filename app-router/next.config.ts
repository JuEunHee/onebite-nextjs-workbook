import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  /**
   * [reactStrictMode: true로 설정한 경우] 
   * 
   * 1) 'use client'로 client component 사용 시
   * 
   * 클라이언트 사이드의 부작용이나 잘못된 훅 사용을 찾아내기 위해 두 번 호출함.
   * useState, useEffect같은 상태를 관리함.
   * 
   * 2) server component로 사용 시
   * 
   * 서버에서 한 번 실행되어 결과물(HTML/RSC Payload를 만들고 끝남.)
   * 서버 컴포넌트는 상태나 생명주기를 가지지 않으므로 React가 이를 두 번 실행할 필요 없음.
   */
  reactStrictMode: false,
};

export default nextConfig;
