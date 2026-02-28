import ClientComponent from "@/components/client-component";

// book/[id]는 기본적으로 dynamic한 페이지로 설정되기때문에
// 자바스크립트 번들은 프리페칭하지 않고 RSC(서버컴포넌트)만 가져옴
export default async function Page({
  params,
}: {
  params: Promise<{ id: string | string[] }>;
}) {
  const { id } = await params;

  return (
    <div>
    book/[id] 페이지 {id}

    {/* 자바스크립트 번들 (_next/static/chunks/app/book/.../page.js)도 같이 보내기 시작한다. */}
    <ClientComponent>
      <></>
    </ClientComponent>
  </div>
  );
}
