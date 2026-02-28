export default function ServerComponent() {
    // 서버 컴포넌트지만 클라이언트 밑에서 사용되고 있으므로 클라이언트 컴포넌트로 변환되어 나온다.
    // 브라우저에서도 콘솔이 찍히는 것을 알 수 있음.
    console.log('서버 컴포넌트');

    return <div></div>
}