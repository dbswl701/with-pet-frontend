import React, { useEffect } from 'react';

function NotificationComponent() {
  useEffect(() => {
    const eventSource = new EventSource('https://withpet.site/api/v1/notifications/subscribe', { withCredentials: true });

    eventSource.onopen = () => {
      // 연결 시 할 일
      console.log('연결!!');
    };

    eventSource.onmessage = (event) => {
      console.log('알람!!!');
      const newNotification = JSON.parse(event.data);
      console.log(newNotification); // 알림 객체를 콘솔에 출력
    };

    eventSource.onerror = () => {
      // 종료 또는 에러 발생 시 할 일
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <>
    </>
  );
}

export default NotificationComponent;
