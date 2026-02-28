import ClientComponent from "../../components/client-component";
import ServerComponent from "../../components/server-component";
import styles from "./page.module.css";

export default function Home() {
  console.log('Home 컴포넌트 실행');

  const secretKey = "qwer123과 같은 시크릿 키도 브라우저에 전달 안되므로 보안상 안전";

  /**
   * useEffect(() => {});
   * 이거는 Failed to component 오류 발생.
   * React hook only works in a client component
   * 
   * 상호작용하는 상태 관리 훅이기 때문에 클라이언트 컴포넌트에서만 사용할 수 있다.
   * 
   * To fix, mark the file with the 'use client'
   */

  return (
    <div className={styles.page}>
      인덱스 페이지

      {/* Home -> Client Component -> Server Component */}
      <ServerComponent />
    </div>
  );
}

