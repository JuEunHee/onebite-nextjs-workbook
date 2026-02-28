import { NextApiRequest, NextApiResponse } from "next";

// ISR로 렌더링 시 사용하기 위한 Revalidate handler
// 게시글 수정과 같은 사용자 액션 발생 시 /api/revalidate를 호출하여 컨텐츠를 업데이트할 수 있다.
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        // 어떤 페이지를 revalidate시키고싶은지를 인수로 넣어줌
        await res.revalidate('/')

        // 인덱스 페이지의 생성이 잘 완료되었어.
        return res.json({
            revalidate: true
        });
    } catch (err) {
        // revalidate가 실패했어
        res.status(500).send('revalidation failed');
    }
}