'use client';

import ServerComponent from "./server-component";

export default function ClientComponent() {
    console.log('클라이언트 컴포넌트');

    return (
        <div>
            <ServerComponent />
        </div>
    );
}