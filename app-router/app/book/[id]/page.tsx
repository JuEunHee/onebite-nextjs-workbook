import ClientComponent from "@/components/client-component";

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
