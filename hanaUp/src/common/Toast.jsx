import { useState, useEffect } from 'react';
import font from '../styles/font';

function Toast({ message, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true); // Toast 표시
    const timer = setTimeout(() => {
      setVisible(false); // Toast 숨김 애니메이션 시작
      setTimeout(onClose, 3000); // 애니메이션 종료 후 컴포넌트 제거
    }, 3000); // 3초 동안 표시

    return () => clearTimeout(timer); // 클린업
  }, [onClose]);

  return (
    <div
      style={{
        width: '335px',
        height: '53px',
        position: 'absolute',
        bottom: '100px',
        right: '29px',
        padding: '9px 19px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333',
        color: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.3s, transform 0.3s',
        ...font.caption.cap2R,
        whiteSpace: 'pre-wrap', // 줄바꿈 문자 렌더링
        wordBreak: 'keep-all',
      }}
    >
      {message}
    </div>
  );
}

export default Toast;
